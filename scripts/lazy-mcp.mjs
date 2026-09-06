#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema, ReadResourceRequestSchema,
  ListPromptsRequestSchema, GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { projectDirectory, services, backendCommand } from './mcp-catalogs.mjs';

class StartupError extends Error {}

class ManagedStdioTransport extends StdioClientTransport {
  close() {
    this.closing ??= super.close();
    return this.closing;
  }
}

export function createLazyServer({ catalog, backend, startupTimeoutMs = 110000, callTimeoutMs = 180000 }) {
  const server = new Server(
    { name: `zush-lazy-${catalog.serverInfo.name}`, version: '1.0.0' },
    { capabilities: {
      tools: {},
      ...(catalog.resources ? { resources: {} } : {}),
      ...(catalog.prompts ? { prompts: {} } : {}),
    } },
  );
  let connection;
  let active;
  let closed = false;

  async function connect() {
    const client = new Client({ name: 'zush-lazy-mcp', version: '1.0.0' });
    const transport = new ManagedStdioTransport({ ...backend, stderr: 'pipe' });
    // Upstream stderr may contain credentials in errors; never relay it to Codex.
    transport.stderr?.resume();
    active = { client, transport };
    client.onclose = () => {
      if (active?.client === client) { active = undefined; connection = undefined; }
    };
    try {
      await client.connect(transport, { timeout: startupTimeoutMs });
      if (closed) throw new Error('MCP session closed');
      const tools = new Set();
      let cursor;
      do {
        const page = await client.listTools(cursor ? { cursor } : {}, { timeout: startupTimeoutMs });
        for (const tool of page.tools) tools.add(tool.name);
        cursor = page.nextCursor;
      } while (cursor);
      return { client, tools };
    } catch {
      await client.close();
      await transport.close();
      throw new StartupError('Could not start the service. Unlock 1Password and authorize Zush MCP, then retry. Check that the backend dependencies and Environment mount are installed.');
    }
  }

  function ready() {
    if (closed) throw new Error('MCP session closed');
    if (!connection) {
      connection = connect().catch(error => { connection = undefined; throw error; });
    }
    return connection;
  }

  server.setRequestHandler(ListToolsRequestSchema, () => ({ tools: catalog.tools }));
  server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
    if (!catalog.tools.some(tool => tool.name === request.params.name)) {
      return { isError: true, content: [{ type: 'text', text: 'Unknown tool' }] };
    }
    try {
      const { client, tools } = await ready();
      if (extra.signal.aborted) throw new Error('Request cancelled');
      if (!tools.has(request.params.name)) {
        return { isError: true, content: [{ type: 'text', text: 'This tool is disabled in the backend configuration.' }] };
      }
      // Never replay a failed tools/call: it may already have changed remote state.
      return await client.callTool(request.params, undefined, { signal: extra.signal, timeout: callTimeoutMs });
    } catch (error) {
      let message = 'The service request failed. No automatic retry was performed.';
      if (error instanceof StartupError) message = error.message;
      else if (extra.signal.aborted) message = 'Request cancelled. No automatic retry was performed.';
      else if (/CERTIFICATE_VERIFY_FAILED/i.test(String(error))) message = 'The backend could not verify the HTTPS certificate. Check its Python CA certificates.';
      else if (Number.isInteger(error.code)) message = `The service returned MCP error ${error.code}. No automatic retry was performed.`;
      return { isError: true, content: [{ type: 'text', text: message }] };
    }
  });
  if (catalog.resources) {
    server.setRequestHandler(ListResourcesRequestSchema, () => ({ resources: catalog.resources }));
    server.setRequestHandler(ListResourceTemplatesRequestSchema, () => ({ resourceTemplates: catalog.resourceTemplates }));
    server.setRequestHandler(ReadResourceRequestSchema, async (request, extra) => {
      const { client } = await ready();
      return client.readResource(request.params, { signal: extra.signal, timeout: callTimeoutMs });
    });
  }
  if (catalog.prompts) {
    server.setRequestHandler(ListPromptsRequestSchema, () => ({ prompts: catalog.prompts }));
    server.setRequestHandler(GetPromptRequestSchema, async (request, extra) => {
      const { client } = await ready();
      return client.getPrompt(request.params, { signal: extra.signal, timeout: callTimeoutMs });
    });
  }
  async function close() {
    closed = true;
    const current = active;
    if (current) {
      await current.client.close();
      await current.transport.close();
    }
    await connection?.catch(() => {});
    connection = undefined;
    await server.close();
  }
  return { server, close };
}

async function main() {
  const [service, ...args] = process.argv.slice(2);
  if (!services.includes(service)) throw new Error('Expected paddle, gsc, or google-ads');
  const catalog = JSON.parse(await readFile(path.join(projectDirectory, 'scripts/mcp-catalogs', `${service}.json`), 'utf8'));
  // Preserve the launcher's existing runtime/TLS/path overrides. No Environment
  // values are resolved here; only the backend loads them on first use.
  const proxy = createLazyServer({ catalog, backend: { ...backendCommand(service, args), env: { ...process.env } } });
  let closing = false;
  async function stop() {
    if (closing) return;
    closing = true;
    await proxy.close();
  }
  process.stdin.on('end', stop);
  for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(signal, stop);
  await proxy.server.connect(new StdioServerTransport());
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(() => { console.error('Could not initialize lazy MCP. Run pnpm install and verify the tool catalog.'); process.exitCode = 1; });
}

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { projectDirectory, services, discoveryCommand } from './mcp-catalogs.mjs';

const check = process.argv.includes('--check');
for (const service of services) {
  const client = new Client({ name: 'zush-catalog-generator', version: '1.0.0' });
  const transport = new StdioClientTransport(discoveryCommand(service));
  transport.stderr?.resume();
  try {
    await client.connect(transport, { timeout: 30000 });
    const capabilities = client.getServerCapabilities();
    async function collect(method, key) {
      const items = [];
      let cursor;
      do {
        const page = await client[method](cursor ? { cursor } : {});
        items.push(...page[key]);
        cursor = page.nextCursor;
      } while (cursor);
      return items;
    }
    const catalog = {
      serverInfo: client.getServerVersion(),
      tools: capabilities.tools ? await collect('listTools', 'tools') : [],
      ...(capabilities.resources ? {
        resources: await collect('listResources', 'resources'),
        resourceTemplates: await collect('listResourceTemplates', 'resourceTemplates'),
      } : {}),
      ...(capabilities.prompts ? { prompts: await collect('listPrompts', 'prompts') } : {}),
    };
    const file = path.join(projectDirectory, 'scripts/mcp-catalogs', `${service}.json`);
    if (check) assert.deepEqual(catalog, JSON.parse(await readFile(file, 'utf8')), `${service}: regenerate catalog after upgrading the backend`);
    else {
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, JSON.stringify(catalog, null, 2) + '\n');
    }
    console.log(`${service}: ${catalog.tools.length} tools; metadata ${check ? 'verified' : 'saved'} without secrets`);
  } finally {
    await client.close();
    await transport.close();
  }
}

import { appendFileSync, readFileSync } from 'node:fs';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
const log = process.env.TEST_LOG;
appendFileSync(log, `start:${process.pid}\n`);
if (process.env.FAIL_FIRST === '1' && readFileSync(log, 'utf8').split('start:').length === 2) process.exit(1);
if (process.env.HANG_START === '1') await new Promise(resolve => setTimeout(resolve, 60000));
const server = new Server({ name: 'fixture', version: '1' }, { capabilities: { tools: {} } });
const tools = ['echo', 'failure', 'slow'].map(name => ({ name, inputSchema: { type: 'object', properties: {} } }));
server.setRequestHandler(ListToolsRequestSchema, () => ({ tools }));
server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
  appendFileSync(log, `call:${request.params.name}\n`);
  if (request.params.name === 'failure') throw new Error('fixture-error-with-sensitive-value');
  if (request.params.name === 'slow') {
    await new Promise(resolve => {
      const timer = setTimeout(resolve, 10000);
      extra.signal.addEventListener('abort', () => { clearTimeout(timer); appendFileSync(log, 'cancelled\n'); resolve(); }, { once: true });
    });
  }
  return { content: [{ type: 'text', text: JSON.stringify(request.params.arguments) }] };
});
process.stdin.on('end', () => server.close());
process.on('SIGTERM', async () => { await server.close(); process.exit(0); });
await server.connect(new StdioServerTransport());

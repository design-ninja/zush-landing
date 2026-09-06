import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createLazyServer } from '../lazy-mcp.mjs';
import { projectDirectory, services } from '../mcp-catalogs.mjs';

const catalog = {
  serverInfo: { name: 'fixture', version: '1' },
  tools: ['echo', 'failure', 'slow', 'disabled'].map(name => ({ name, inputSchema: { type: 'object', properties: {} } })),
  resources: [], resourceTemplates: [], prompts: [],
};
async function setup(t, env = {}) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'zush-lazy-test-'));
  const log = path.join(dir, 'events');
  const proxy = createLazyServer({ catalog, backend: {
    command: process.execPath,
    args: [fileURLToPath(new URL('./fixtures/lazy-backend.mjs', import.meta.url))],
    env: { TEST_LOG: log, ...env },
  }, startupTimeoutMs: 1000 });
  const [upstream, downstream] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: 'test', version: '1' });
  t.after(async () => { await proxy.close(); await client.close(); await rm(dir, { recursive: true, force: true }); });
  await proxy.server.connect(downstream);
  await client.connect(upstream);
  return { client, proxy, log, events: async () => existsSync(log) ? readFile(log, 'utf8') : '' };
}

test('initialize, ping, and all discovery requests do not start the backend', async t => {
  const { client, events } = await setup(t);
  assert.deepEqual((await client.listTools()).tools, catalog.tools);
  assert.deepEqual((await client.listResources()).resources, []);
  assert.deepEqual((await client.listResourceTemplates()).resourceTemplates, []);
  assert.deepEqual((await client.listPrompts()).prompts, []);
  await client.ping();
  assert.equal(await events(), '');
});

test('first call starts once; concurrent and later calls reuse that backend', async t => {
  const { client, events } = await setup(t);
  const values = await Promise.all([1, 2].map(n => client.callTool({ name: 'echo', arguments: { n } })));
  assert.deepEqual(values.map(v => JSON.parse(v.content[0].text)), [{ n: 1 }, { n: 2 }]);
  await client.callTool({ name: 'echo', arguments: { n: 3 } });
  assert.equal((await events()).match(/start:/g).length, 1);
  assert.equal((await events()).match(/call:echo/g).length, 3);
});

test('unknown tools do not start a backend; disabled backend tools are not invoked', async t => {
  const { client, events } = await setup(t);
  assert.equal((await client.callTool({ name: 'unknown' })).isError, true);
  assert.equal(await events(), '');
  assert.equal((await client.callTool({ name: 'disabled' })).isError, true);
  assert.equal((await events()).includes('call:'), false);
});

test('failed startup can be retried explicitly', async t => {
  const { client, events } = await setup(t, { FAIL_FIRST: '1' });
  assert.equal((await client.callTool({ name: 'echo' })).isError, true);
  const result = await client.callTool({ name: 'echo', arguments: { ok: true } });
  assert.equal(result.isError, undefined);
  assert.equal((await events()).match(/start:/g).length, 2);
  assert.equal((await events()).match(/call:/g).length, 1);
});

test('tool failures are not automatically replayed and do not leak raw errors', async t => {
  const { client, events } = await setup(t);
  const result = await client.callTool({ name: 'failure' });
  assert.equal(result.isError, true);
  assert.equal(JSON.stringify(result).includes('sensitive-value'), false);
  assert.equal((await events()).match(/call:failure/g).length, 1);
});

test('authorization timeout closes the backend and keeps discovery available', async t => {
  const { client, events } = await setup(t, { HANG_START: '1' });
  assert.equal((await client.callTool({ name: 'echo' })).isError, true);
  assert.equal((await client.listTools()).tools.length, catalog.tools.length);
  const pid = Number((await events()).match(/start:(\d+)/)[1]);
  assert.throws(() => process.kill(pid, 0), { code: 'ESRCH' });
});

test('closing the session terminates its authenticated backend', async t => {
  const { client, proxy, events } = await setup(t);
  await client.callTool({ name: 'echo', arguments: {} });
  const pid = Number((await events()).match(/start:(\d+)/)[1]);
  await proxy.close();
  assert.throws(() => process.kill(pid, 0), { code: 'ESRCH' });
});

test('cancellation reaches the backend without replaying the call', async t => {
  const { client, events } = await setup(t);
  await client.callTool({ name: 'echo', arguments: {} });
  const controller = new AbortController();
  const request = client.callTool({ name: 'slow' }, undefined, { signal: controller.signal });
  const rejected = assert.rejects(request);
  for (let i = 0; i < 100 && !(await events()).includes('call:slow'); i++) await delay(10);
  controller.abort();
  await rejected;
  for (let i = 0; i < 100 && !(await events()).includes('cancelled'); i++) await delay(10);
  assert.match(await events(), /cancelled/);
  assert.equal((await events()).match(/call:slow/g).length, 1);
});

for (const service of services) {
  test(`${service}: real launcher lists unchanged tools even with an invalid secret path`, async () => {
    const expected = JSON.parse(await readFile(path.join(projectDirectory, 'scripts/mcp-catalogs', `${service}.json`), 'utf8'));
    const client = new Client({ name: 'offline-discovery-test', version: '1' });
    const transport = new StdioClientTransport({
      command: path.join(projectDirectory, 'scripts', `${service}-mcp`),
      env: { ZUSH_MCP_ENV_FILE: '/nonexistent/no-secrets.env' }, stderr: 'pipe',
    });
    transport.stderr?.resume();
    try {
      await client.connect(transport, { timeout: 3000 });
      assert.deepEqual((await client.listTools()).tools, expected.tools);
      await client.ping();
      if (expected.resources) assert.deepEqual((await client.listResources()).resources, expected.resources);
    } finally { await client.close(); await transport.close(); }
  });
}

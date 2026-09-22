#!/usr/bin/env node
/**
 * AI visibility panel: asks ChatGPT, Gemini, Claude and Perplexity the buyer-intent
 * questions in prompts.json with live web search on, then records whether Zush is
 * named, where it ranks against competitors, which zushapp.com page is cited
 * (homepage vs blog), and which third-party sources the answers lean on.
 *
 * Run through the 1Password profile so keys never touch disk:
 *   ./scripts/with-1password.sh --env-file .env.1password.ai-visibility -- node scripts/ai-visibility/run.mjs
 * Flags: --engines=chatgpt,gemini,perplexity,claude  --limit=3  --out=reports/ai-visibility
 * Defaults to the cheapest search-capable model per provider and skips Claude (little
 * traffic comes from it); pass --engines=...,claude to include it.
 * Model overrides: AIV_OPENAI_MODEL, AIV_GEMINI_MODEL, AIV_CLAUDE_MODEL, AIV_PERPLEXITY_MODEL
 * (update PRICES below when you change a model).
 */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = 'true'] = arg.replace(/^--/, '').split('=');
    return [key, value];
  }),
);

const MODELS = {
  chatgpt: process.env.AIV_OPENAI_MODEL || 'gpt-5-mini',
  gemini: process.env.AIV_GEMINI_MODEL || 'gemini-3.5-flash-lite',
  claude: process.env.AIV_CLAUDE_MODEL || 'claude-haiku-4-5',
  perplexity: process.env.AIV_PERPLEXITY_MODEL || 'perplexity/sonar',
};
const DEFAULT_ENGINES = ['chatgpt', 'gemini', 'perplexity'];

// List prices in USD, checked 2026-09-22 on each provider's pricing page.
// Perplexity needs none: OpenRouter returns the billed cost with each response.
const PRICES = {
  chatgpt: { input: 0.25, output: 2.0, perSearch: 10 / 1000 },
  // Google includes 5,000 grounded searches a month free across Gemini 3.x; this counts
  // them at the $14/1k paid rate, so it is an upper bound until that quota runs out.
  gemini: { input: 0.3, output: 2.5, perSearch: 14 / 1000 },
  claude: { input: 1.0, output: 5.0, perSearch: 10 / 1000 },
};

function tokenCost(engine, input, output, searches) {
  const price = PRICES[engine];
  return (input * price.input + output * price.output) / 1e6 + searches * price.perSearch;
}
// Order matters only for display. Patterns are matched case-insensitively on answer text.
const BRANDS = [
  ['Zush', /\bzush\b/i],
  ['NameQuick', /\bname\s?quick\b/i],
  ['RenameClick', /\brename\s?\.?click\b/i],
  ['Renamer.ai', /\brenamer\.ai\b/i],
  ['FilesDesk', /\bfiles\s?desk\b/i],
  ['renamed.to', /\brenamed\.to\b/i],
  ['Hazel', /\bhazel\b/i],
  ['A Better Finder Rename', /better finder rename/i],
  ['Advanced Renamer', /\badvanced renamer\b/i],
  ['Bulk Rename Utility', /\bbulk rename utility\b/i],
  ['PowerRename', /\bpowerrename\b/i],
  ['NameChanger', /\bnamechanger\b/i],
];

const QUESTION_SUFFIX =
  ' Answer the way you would for a normal user: name specific apps or tools where relevant and include links.';

async function postJson(url, body, headers) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 400)}`);
  return JSON.parse(text);
}

async function askChatGPT(question) {
  const data = await postJson(
    'https://api.openai.com/v1/responses',
    { model: MODELS.chatgpt, input: question, tools: [{ type: 'web_search' }], reasoning: { effort: 'low' } },
    { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  );
  let text = '';
  const urls = [];
  let searches = 0;
  for (const item of data.output ?? []) {
    if (item.type === 'web_search_call') searches += 1;
    if (item.type !== 'message') continue;
    for (const part of item.content ?? []) {
      if (part.type !== 'output_text') continue;
      text += part.text;
      for (const note of part.annotations ?? []) {
        if (note.type === 'url_citation' && note.url) urls.push(note.url);
      }
    }
  }
  const usage = data.usage ?? {};
  return { text, urls, cost: tokenCost('chatgpt', usage.input_tokens ?? 0, usage.output_tokens ?? 0, searches) };
}

// Gemini grounding returns vertexaisearch redirect links; follow each once to get the real URL.
async function resolveRedirect(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'manual' });
    return response.headers.get('location') || url;
  } catch {
    return url;
  }
}

async function askGemini(question) {
  const data = await postJson(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.gemini}:generateContent`,
    { contents: [{ parts: [{ text: question }] }], tools: [{ google_search: {} }] },
    { 'x-goog-api-key': process.env.GEMINI_API_KEY },
  );
  const candidate = data.candidates?.[0] ?? {};
  const text = (candidate.content?.parts ?? []).map((part) => part.text ?? '').join('');
  const grounding = candidate.groundingMetadata ?? {};
  const urls = await Promise.all(
    (grounding.groundingChunks ?? []).filter((c) => c.web?.uri).map((c) => resolveRedirect(c.web.uri)),
  );
  const usage = data.usageMetadata ?? {};
  const output = (usage.candidatesTokenCount ?? 0) + (usage.thoughtsTokenCount ?? 0);
  const searches = grounding.webSearchQueries?.length ?? 0;
  return { text, urls, cost: tokenCost('gemini', usage.promptTokenCount ?? 0, output, searches) };
}

const anthropic = new Anthropic();

async function askClaude(question) {
  const messages = [{ role: 'user', content: question }];
  let text = '';
  const urls = [];
  let cost = 0;
  // Server-side web search can pause a long turn; resume it a few times at most.
  for (let turn = 0; turn < 4; turn += 1) {
    const response = await anthropic.messages.create({
      model: MODELS.claude,
      max_tokens: 4000,
      // Haiku 4.5 takes the basic search tool; three searches keep each answer cheap.
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
      messages,
    });
    cost += tokenCost(
      'claude',
      response.usage.input_tokens,
      response.usage.output_tokens,
      response.usage.server_tool_use?.web_search_requests ?? 0,
    );
    if (response.stop_reason === 'refusal') throw new Error('Claude refused the question');
    for (const block of response.content) {
      if (block.type === 'text') {
        text += block.text;
        for (const citation of block.citations ?? []) {
          if (citation.url) urls.push(citation.url);
        }
      }
    }
    if (response.stop_reason !== 'pause_turn') break;
    messages.push({ role: 'assistant', content: response.content });
  }
  return { text, urls, cost };
}

async function askPerplexity(question) {
  const data = await postJson(
    'https://openrouter.ai/api/v1/chat/completions',
    { model: MODELS.perplexity, messages: [{ role: 'user', content: question }], usage: { include: true } },
    { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
  );
  const message = data.choices?.[0]?.message ?? {};
  const urls = [
    ...(data.citations ?? []),
    ...(message.annotations ?? []).map((note) => note.url_citation?.url).filter(Boolean),
  ];
  return { text: message.content ?? '', urls, cost: data.usage?.cost ?? 0 };
}

const ENGINES = {
  chatgpt: { ask: askChatGPT, key: 'OPENAI_API_KEY' },
  gemini: { ask: askGemini, key: 'GEMINI_API_KEY' },
  claude: { ask: askClaude, key: 'ANTHROPIC_API_KEY' },
  perplexity: { ask: askPerplexity, key: 'OPENROUTER_API_KEY' },
};

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function zushPathOf(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.replace(/^www\./, '') !== 'zushapp.com') return null;
    return parsed.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return null;
  }
}

function analyze(text, urls) {
  const uniqueUrls = [...new Set(urls)];
  const mentions = BRANDS.map(([name, pattern]) => ({ name, index: text.search(pattern) }))
    .filter((brand) => brand.index >= 0)
    .sort((a, b) => a.index - b.index)
    .map((brand) => brand.name);
  const zushPaths = [...new Set(uniqueUrls.map(zushPathOf).filter(Boolean))];
  // Plain links written into the answer text count too — ChatGPT often links the brand inline.
  for (const match of text.matchAll(/https?:\/\/(?:www\.)?zushapp\.com[^\s)\]"'>]*/gi)) {
    const zushPath = zushPathOf(match[0].replace(/[.,;:]+$/, ''));
    if (zushPath && !zushPaths.includes(zushPath)) zushPaths.push(zushPath);
  }
  return {
    mentionsZush: mentions.includes('Zush'),
    zushRank: mentions.includes('Zush') ? mentions.indexOf('Zush') + 1 : null,
    brandsInOrder: mentions,
    zushPaths,
    citesHomepage: zushPaths.includes('/'),
    sourceHosts: [...new Set(uniqueUrls.map(hostOf).filter(Boolean))],
  };
}

function pct(part, total) {
  return total ? `${Math.round((part / total) * 100)}%` : '—';
}

function usd(value) {
  return `$${value.toFixed(value < 1 ? 3 : 2)}`;
}

function sumCost(rows) {
  return rows.reduce((total, r) => total + (r.cost ?? 0), 0);
}

function summarize(results, date) {
  const lines = [`# AI visibility panel — ${date}`, ''];
  const engines = [...new Set(results.map((r) => r.engine))];

  lines.push('| Engine | Model | Answers | Names Zush | Avg rank | Cites zushapp.com | Cites homepage | Target Qs → homepage | Cost |');
  lines.push('|---|---|---|---|---|---|---|---|---|');
  for (const engine of engines) {
    const rows = results.filter((r) => r.engine === engine && !r.error);
    const named = rows.filter((r) => r.mentionsZush);
    const ranks = named.map((r) => r.zushRank);
    const citing = rows.filter((r) => r.zushPaths.length);
    const target = rows.filter((r) => r.target === 'home');
    lines.push(
      `| ${engine} | ${MODELS[engine]} | ${rows.length} | ${named.length} (${pct(named.length, rows.length)}) | ${
        ranks.length ? (ranks.reduce((a, b) => a + b, 0) / ranks.length).toFixed(1) : '—'
      } | ${citing.length} | ${rows.filter((r) => r.citesHomepage).length} | ${target.filter((r) => r.citesHomepage).length}/${target.length} | ${usd(sumCost(results.filter((r) => r.engine === engine)))} |`,
    );
  }
  lines.push('', `Total cost of this run: ${usd(sumCost(results))} (Gemini search counted at the paid rate; the first 5,000 searches a month are free).`);

  const zushPages = new Map();
  for (const r of results) for (const p of r.zushPaths ?? []) zushPages.set(p, (zushPages.get(p) ?? 0) + 1);
  lines.push('', '## zushapp.com pages cited', '');
  if (!zushPages.size) lines.push('None.');
  for (const [page, count] of [...zushPages].sort((a, b) => b[1] - a[1])) lines.push(`- ${page} — ${count}`);

  const competitors = new Map();
  for (const r of results) for (const b of r.brandsInOrder ?? []) competitors.set(b, (competitors.get(b) ?? 0) + 1);
  lines.push('', '## Brands named (answers)', '');
  for (const [brand, count] of [...competitors].sort((a, b) => b[1] - a[1])) lines.push(`- ${brand} — ${count}`);

  const hosts = new Map();
  for (const r of results) for (const h of r.sourceHosts ?? []) if (h !== 'zushapp.com') hosts.set(h, (hosts.get(h) ?? 0) + 1);
  lines.push('', '## Third-party sources cited (outreach targets)', '');
  for (const [host, count] of [...hosts].sort((a, b) => b[1] - a[1]).slice(0, 30)) lines.push(`- ${host} — ${count}`);

  lines.push('', '## Per question', '', '| Question | ' + engines.join(' | ') + ' |', '|---|' + engines.map(() => '---').join('|') + '|');
  for (const id of [...new Set(results.map((r) => r.id))]) {
    const cells = engines.map((engine) => {
      const r = results.find((x) => x.id === id && x.engine === engine);
      if (!r) return '';
      if (r.error) return 'error';
      if (!r.mentionsZush) return '—';
      return `#${r.zushRank}${r.zushPaths.length ? ` ${r.zushPaths.join(', ')}` : ''}`;
    });
    lines.push(`| ${id} | ${cells.join(' | ')} |`);
  }

  const errors = results.filter((r) => r.error);
  if (errors.length) {
    lines.push('', '## Errors', '');
    for (const r of errors) lines.push(`- ${r.engine} / ${r.id}: ${r.error}`);
  }
  return `${lines.join('\n')}\n`;
}

async function main() {
  const { prompts } = JSON.parse(fs.readFileSync(path.join(here, 'prompts.json'), 'utf8'));
  const selectedPrompts = args.limit ? prompts.slice(0, Number(args.limit)) : prompts;
  const requested = args.engines ? args.engines.split(',') : DEFAULT_ENGINES;
  const engines = requested.filter((name) => {
    if (!ENGINES[name]) throw new Error(`Unknown engine: ${name}`);
    if (process.env[ENGINES[name].key]) return true;
    console.warn(`Skipping ${name}: ${ENGINES[name].key} is not set`);
    return false;
  });

  // Engines run in parallel; questions run one at a time per engine to stay under rate limits.
  const results = (
    await Promise.all(
      engines.map(async (engine) => {
        const rows = [];
        for (const prompt of selectedPrompts) {
          const base = { engine, model: MODELS[engine], id: prompt.id, target: prompt.target, question: prompt.text };
          try {
            const { text, urls, cost } = await ENGINES[engine].ask(prompt.text + QUESTION_SUFFIX);
            rows.push({ ...base, ...analyze(text, urls), cost, urls: [...new Set(urls)], answer: text });
            console.log(`${engine} ${prompt.id}: ${rows.at(-1).mentionsZush ? `Zush #${rows.at(-1).zushRank}` : 'no Zush'}`);
          } catch (error) {
            rows.push({ ...base, error: String(error.message ?? error) });
            console.warn(`${engine} ${prompt.id}: ${error.message ?? error}`);
          }
        }
        return rows;
      }),
    )
  ).flat();

  const date = new Date().toISOString().slice(0, 10);
  const outDir = path.resolve(args.out ?? 'reports/ai-visibility');
  fs.mkdirSync(outDir, { recursive: true });
  // Never overwrite an earlier run from the same day: it may be the baseline.
  let name = date;
  for (let n = 2; fs.existsSync(path.join(outDir, `${name}.json`)); n += 1) name = `${date}-run${n}`;
  const models = Object.fromEntries(engines.map((engine) => [engine, MODELS[engine]]));
  fs.writeFileSync(path.join(outDir, `${name}.json`), `${JSON.stringify({ date, models, results }, null, 2)}\n`);
  fs.writeFileSync(path.join(outDir, `${name}.md`), summarize(results, date));
  console.log(`\nWrote ${path.relative(process.cwd(), path.join(outDir, `${name}.md`))} — cost ${usd(sumCost(results))}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const MODE = process.env.MODE || 'production';
const ALLOW_SANDBOX = process.env.ALLOW_SANDBOX_STRIPE_BUILD === '1';

const ENV_FILES = [
  '.env',
  '.env.local',
  `.env.${MODE}`,
  `.env.${MODE}.local`,
];

const STRIPE_PRICE_ID_PATTERN = /^price_[A-Za-z0-9]+$/;

function parseEnvFile(filePath) {
  const values = {};
  if (!existsSync(filePath)) return values;

  for (const rawLine of readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[match[1]] = value;
  }

  return values;
}

function loadBuildEnv() {
  const resolved = new Map();

  for (const envFile of ENV_FILES) {
    const values = parseEnvFile(join(ROOT, envFile));
    for (const [key, value] of Object.entries(values)) {
      resolved.set(key, { value, source: envFile });
    }
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) {
      resolved.set(key, { value, source: 'process.env' });
    }
  }

  return resolved;
}

function firstDefined(env, names) {
  for (const name of names) {
    const entry = env.get(name);
    const value = entry?.value?.trim();
    if (value) return { name, value, source: entry.source };
  }
  return null;
}

function fail(message) {
  console.error(`[check-production-stripe-env] FAILED: ${message}`);
  process.exit(1);
}

function assertStripePriceId(env, names, label) {
  const entry = firstDefined(env, names);
  if (!entry) {
    fail(`${label} Stripe price id is required`);
  }
  if (!STRIPE_PRICE_ID_PATTERN.test(entry.value)) {
    fail(`${entry.name} from ${entry.source} is not a valid Stripe price id`);
  }
  return entry;
}

function main() {
  const env = loadBuildEnv();
  const stripeMode = firstDefined(env, [
    'PUBLIC_STRIPE_MODE',
    'VITE_STRIPE_MODE',
  ]);

  const monthlyPrice = assertStripePriceId(
    env,
    ['PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID', 'VITE_STRIPE_PRO_MONTHLY_PRICE_ID'],
    'monthly',
  );
  const oneTimePrice = assertStripePriceId(
    env,
    [
      'PUBLIC_STRIPE_PRO_ONE_TIME_PRICE_ID',
      'VITE_STRIPE_PRO_ONE_TIME_PRICE_ID',
    ],
    'one-time',
  );

  if (!stripeMode) {
    fail('PUBLIC_STRIPE_MODE or VITE_STRIPE_MODE is required');
  }

  const mode = stripeMode.value.toLowerCase();
  if (ALLOW_SANDBOX) {
    if (mode !== 'sandbox' && mode !== 'production') {
      fail(`${stripeMode.name} resolves to unsupported Stripe mode ${stripeMode.value}`);
    }
    console.warn(
      `[check-production-stripe-env] ALLOW_SANDBOX_STRIPE_BUILD=1 is set; ${mode} Stripe build is explicitly allowed for this command.`,
    );
    console.log(
      `[check-production-stripe-env] OK: ${mode} mode, monthly ${monthlyPrice.name} from ${monthlyPrice.source}, one-time ${oneTimePrice.name} from ${oneTimePrice.source}.`,
    );
    return;
  }

  if (mode !== 'production') {
    fail(
      `${stripeMode.name} resolves to ${stripeMode.value} from ${stripeMode.source}; production builds must not compile Stripe sandbox config.`,
    );
  }

  console.log(
    `[check-production-stripe-env] OK: production mode, monthly ${monthlyPrice.name} from ${monthlyPrice.source}, one-time ${oneTimePrice.name} from ${oneTimePrice.source}.`,
  );
}

main();

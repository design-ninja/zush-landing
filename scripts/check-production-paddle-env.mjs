#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const MODE = process.env.MODE || "production";
const ALLOW_SANDBOX = process.env.ALLOW_SANDBOX_PADDLE_BUILD === "1";

const EXPECTED_MONTHLY_PRICE_ID = "pri_01krxnw9dpvm51d3e59g24ep5z";
const EXPECTED_ONE_TIME_PRICE_ID = "pri_01ke0rya71hzwhy8y1wdt76v1y";

const ENV_FILES = [
  ".env",
  // Vite always loads this file. Keep it in the guard so an accidental
  // recreated sandbox .env.local still fails production builds.
  ".env.local",
  `.env.${MODE}`,
  `.env.${MODE}.local`,
];

function parseEnvFile(filePath) {
  const values = {};
  if (!existsSync(filePath)) return values;

  for (const rawLine of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

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
      resolved.set(key, { value, source: "process.env" });
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
  console.error(`[check-production-paddle-env] FAILED: ${message}`);
  process.exit(1);
}

function assertExpectedPrice(env, names, expectedValue, label) {
  const entry = firstDefined(env, names);
  if (!entry) return;
  if (entry.value !== expectedValue) {
    fail(
      `${label} price id comes from ${entry.source} and does not match the expected production price id.`,
    );
  }
}

function verifyPricingFallbacks() {
  const pricingSource = readFileSync(
    join(ROOT, "src/constants/pricing.ts"),
    "utf8",
  );
  if (!pricingSource.includes(EXPECTED_MONTHLY_PRICE_ID)) {
    fail("monthly production price fallback changed in src/constants/pricing.ts");
  }
  if (!pricingSource.includes(EXPECTED_ONE_TIME_PRICE_ID)) {
    fail("one-time production price fallback changed in src/constants/pricing.ts");
  }
}

function main() {
  const env = loadBuildEnv();
  const paddleEnv = firstDefined(env, [
    "PUBLIC_PADDLE_ENVIRONMENT",
    "VITE_PADDLE_ENVIRONMENT",
  ]);
  const paddleToken = firstDefined(env, [
    "PUBLIC_PADDLE_TOKEN",
    "VITE_PADDLE_TOKEN",
  ]);

  verifyPricingFallbacks();

  if (!paddleToken) {
    fail("PUBLIC_PADDLE_TOKEN or VITE_PADDLE_TOKEN is required");
  }

  if (ALLOW_SANDBOX) {
    if (!paddleEnv) {
      fail("PUBLIC_PADDLE_ENVIRONMENT or VITE_PADDLE_ENVIRONMENT is required");
    }

    const allowedEnv = paddleEnv.value.toLowerCase();
    if (allowedEnv === "sandbox") {
      if (!paddleToken.value.startsWith("test_")) {
        fail(`${paddleToken.name} from ${paddleToken.source} is not a test Paddle token`);
      }
    } else if (allowedEnv === "production") {
      if (!paddleToken.value.startsWith("live_")) {
        fail(`${paddleToken.name} from ${paddleToken.source} is not a live Paddle token`);
      }
    } else {
      fail(`${paddleEnv.name} resolves to unsupported Paddle environment ${paddleEnv.value}`);
    }
    console.warn(
      "[check-production-paddle-env] ALLOW_SANDBOX_PADDLE_BUILD=1 is set; sandbox Paddle build is explicitly allowed for this command.",
    );
    return;
  }

  if (!paddleEnv) {
    fail("PUBLIC_PADDLE_ENVIRONMENT or VITE_PADDLE_ENVIRONMENT must be set to production");
  }
  if (paddleEnv.value.toLowerCase() !== "production") {
    fail(
      `${paddleEnv.name} resolves to ${paddleEnv.value} from ${paddleEnv.source}; production builds must not compile Paddle sandbox.`,
    );
  }
  if (!paddleToken.value.startsWith("live_")) {
    fail(`${paddleToken.name} from ${paddleToken.source} is not a live Paddle token`);
  }

  assertExpectedPrice(
    env,
    ["PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID", "VITE_PADDLE_PRO_MONTHLY_PRICE_ID"],
    EXPECTED_MONTHLY_PRICE_ID,
    "monthly",
  );
  assertExpectedPrice(
    env,
    ["PUBLIC_PADDLE_PRO_ONE_TIME_PRICE_ID", "VITE_PADDLE_PRO_ONE_TIME_PRICE_ID"],
    EXPECTED_ONE_TIME_PRICE_ID,
    "one-time",
  );

  console.log(
    "[check-production-paddle-env] OK: production Paddle environment, live token, and production price ids.",
  );
}

main();

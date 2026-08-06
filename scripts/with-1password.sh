#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILES=()

usage() {
  cat <<'USAGE'
Usage:
  scripts/with-1password.sh [--env-file <path>]... -- <command> [args...]

Runs a command with values resolved from 1Password secret references.
The default reference file is .env.1password and contains public runtime values only.

Examples:
  scripts/with-1password.sh -- pnpm build
  scripts/with-1password.sh --env-file .env.1password --env-file .env.1password.local -- pnpm dev
  scripts/with-1password.sh --env-file .env.1password.sandbox -- pnpm dev:sandbox
  scripts/with-1password.sh --env-file .env.1password.operations -- pnpm youtube:dry-run
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --env-file)
      [[ $# -ge 2 ]] || { echo "Missing value for --env-file" >&2; exit 1; }
      ENV_FILES+=("$2")
      shift 2
      ;;
    --env-file=*)
      ENV_FILES+=("${1#--env-file=}")
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    --)
      shift
      break
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

[[ $# -gt 0 ]] || { echo "A command is required after --" >&2; exit 1; }
command -v op >/dev/null 2>&1 || {
  echo "1Password CLI (op) is required: https://developer.1password.com/docs/cli/" >&2
  exit 1
}

if [[ ${#ENV_FILES[@]} -eq 0 ]]; then
  ENV_FILES=(".env.1password")
fi

OP_ARGS=()
for env_file in "${ENV_FILES[@]}"; do
  if [[ "$env_file" != /* ]]; then
    env_file="$ROOT_DIR/$env_file"
  fi
  [[ -f "$env_file" ]] || { echo "1Password reference file not found: $env_file" >&2; exit 1; }
  OP_ARGS+=(--env-file "$env_file")
done

cd "$ROOT_DIR"
exec op run "${OP_ARGS[@]}" -- "$@"

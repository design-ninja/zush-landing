# Agent Notes

- GitHub, Vercel, GSC, and live-site checks are networked operations. Run `gh`, GitHub API, `git fetch`, `git push`, `git ls-remote`, `vercel`, and live `curl` checks with sandbox escalation on the first attempt.
- Do not interpret non-escalated sandbox failures from `gh auth status`, `gh api`, Vercel CLI, or GitHub remotes as broken credentials. Re-run with network escalation before diagnosing auth.
- `gh` is configured for `github.com` through macOS keyring and `gh auth setup-git --hostname github.com`; GitHub CLI and HTTPS Git operations should use that credential path.
- Deployments are managed by Vercel and processed automatically from `main`.
- When SEO changes may require manual Search Console reindexing, always provide the user with direct live URLs for every changed page.
- GSC access is read-only. The Environment profile supplies `GSC_TOKEN_JSON` directly to the repo-local client. Legacy explicit file consumers may still use `GSC_TOKEN_FILE` until migrated. `scripts/gsc-mcp` serves its catalog without secrets; on the first tool call its backend reads variables from the `Zush MCP` 1Password Environment mounted at `.secrets/mcp.env` (existing shared `../zush-app/.secrets/mcp.env` is used only when the local mount is absent) (override with `ZUSH_MCP_ENV_FILE`); it does not run `op` at startup. Never commit OAuth tokens or client secrets.

- Local secret profiles are defined in `scripts/environment-profiles.json` and read from 1Password FIFO mounts in `.secrets/`, with existing shared `../zush-app/.secrets/` mounts used only when the local mount is absent. Explicit `ZUSH_PRODUCTION_ENV_FILE`, `ZUSH_SANDBOX_ENV_FILE`, and `ZUSH_MCP_ENV_FILE` paths take precedence. A separate App checkout is not required. The `--env-file .env.1password*` arguments select profiles; do not replace them with `op run`. See README for mount setup.

- MCP discovery must not read 1Password. Keep `scripts/*-mcp` launchers on `lazy-mcp.mjs`; only `*-mcp-backend` launchers load Environments. Regenerate `scripts/mcp-catalogs/` without credentials after backend upgrades and run `scripts/tests/lazy-mcp.test.mjs`. Never cache resolved secrets alongside the catalogs.

## Production releases verified locally

- Run checks appropriate to the changes locally before pushing. Use `[skip ci]` in the release commit message when those checks have passed; do not disable or re-enable workflows for a release.
- Vercel publishes `main` independently of GitHub Actions. Wait for the exact pushed commit to reach production READY and verify the live site.
- After every successful production publication, run `pnpm seo:indexnow:deployed` locally. It checks that local HEAD is deployed, finds the previous successful production commit, and submits only changed URLs. Use `--dry-run` to review the selection.
- IndexNow Actions is a manual fallback only (`workflow_dispatch`). Do not restore its `deployment_status` trigger: GitHub ignores `[skip ci]` for that event. Do not dispatch it unless the user authorizes running Actions.

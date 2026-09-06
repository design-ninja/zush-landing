# Agent Notes

- GitHub, Vercel, GSC, and live-site checks are networked operations. Run `gh`, GitHub API, `git fetch`, `git push`, `git ls-remote`, `vercel`, and live `curl` checks with sandbox escalation on the first attempt.
- Do not interpret non-escalated sandbox failures from `gh auth status`, `gh api`, Vercel CLI, or GitHub remotes as broken credentials. Re-run with network escalation before diagnosing auth.
- `gh` is configured for `github.com` through macOS keyring and `gh auth setup-git --hostname github.com`; GitHub CLI and HTTPS Git operations should use that credential path.
- Deployments are managed by Vercel and processed automatically from `main`.
- When SEO changes may require manual Search Console reindexing, always provide the user with direct live URLs for every changed page.
- GSC access is read-only. The Environment profile supplies `GSC_TOKEN_JSON` directly to the repo-local client. Legacy explicit file consumers may still use `GSC_TOKEN_FILE` until migrated. `scripts/gsc-mcp` reads its variables from the `Zush MCP` 1Password Environment mounted at `../zush-app/.secrets/mcp.env` (override with `ZUSH_MCP_ENV_FILE`); it does not run `op` at startup. Never commit OAuth tokens or client secrets.

- Local secret profiles are defined in `scripts/environment-profiles.json` and read from the shared 1Password FIFO mounts in `../zush-app/.secrets/`. The `--env-file .env.1password*` arguments select profiles; do not replace them with `op run`. See README for mount setup.

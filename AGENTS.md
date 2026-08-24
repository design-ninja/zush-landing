# Agent Notes

- GitHub, Vercel, GSC, and live-site checks are networked operations. Run `gh`, GitHub API, `git fetch`, `git push`, `git ls-remote`, `vercel`, and live `curl` checks with sandbox escalation on the first attempt.
- Do not interpret non-escalated sandbox failures from `gh auth status`, `gh api`, Vercel CLI, or GitHub remotes as broken credentials. Re-run with network escalation before diagnosing auth.
- `gh` is configured for `github.com` through macOS keyring and `gh auth setup-git --hostname github.com`; GitHub CLI and HTTPS Git operations should use that credential path.
- Deployments are managed by Vercel and processed automatically from `main`.
- When SEO changes may require manual Search Console reindexing, always provide the user with direct live URLs for every changed page.
- GSC access is read-only. The repo-local client defaults to `~/.config/google-search-console/zushapp-token.json`; override it with `GSC_TOKEN_FILE` when needed. `scripts/gsc-mcp` uses `.env.1password.gsc` when present and otherwise uses the current environment. Never commit OAuth tokens or client secrets.

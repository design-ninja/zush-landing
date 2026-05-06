# Agent Notes

- GitHub, Vercel, GSC, and live-site checks are networked operations. Run `gh`, GitHub API, `git fetch`, `git push`, `git ls-remote`, `vercel`, and live `curl` checks with sandbox escalation on the first attempt.
- Do not interpret non-escalated sandbox failures from `gh auth status`, `gh api`, Vercel CLI, or GitHub remotes as broken credentials. Re-run with network escalation before diagnosing auth.
- `gh` is configured for `github.com` through macOS keyring and `gh auth setup-git --hostname github.com`; GitHub CLI and HTTPS Git operations should use that credential path.

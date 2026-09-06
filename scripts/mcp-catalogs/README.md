# MCP discovery metadata

Generated with `node scripts/update-mcp-catalogs.mjs` from the installed servers,
without real credentials or API tool calls. These JSON files contain schemas and
descriptions only. `--check` verifies them against the installed versions.

- Paddle: `@paddle/paddle-mcp` 0.1.6, production, non-destructive filter (70 tools).
  Source: https://github.com/PaddleHQ/paddle-mcp-server (Apache-2.0).
- Google Search Console: repository-local `scripts/gsc_mcp_server.py` (3 tools).
- Google Ads: installed Google Ads MCP / FastMCP server, including its resource
  metadata (3 tools). Source: https://github.com/googleads/google-ads-mcp (Apache-2.0).

Regenerate and review these files when upgrading the corresponding backend.
The authenticated backend still enforces its own tool filter and API permissions.

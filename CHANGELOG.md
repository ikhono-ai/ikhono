# Changelog

All notable changes to iKhono will be documented in this file.

## [0.2.6] - 2026-04-03

### Added
- Streamable HTTP transport — connect to `https://ikhono.io/mcp` directly, no npm install needed
- `--proactive` flag for `ikh setup` — installs an always-on rule that checks iKhono for relevant skills on every task


## [0.2.0] - 2026-04-01

### Added
- GitHub SSO for `ikh login` — opens browser for OAuth, auto-links accounts by email
- Landing page at ikhono.io (React + Vite + Tailwind, served by API on Railway)
- `ikh setup` support for Claude Desktop and Gemini CLI

## [0.1.6] - 2026-03-31

### Added
- `ikh setup --platform <platform>` command for global one-time MCP + slash command installation
- `--auto-approve` flag (Claude only) to auto-allow iKhono MCP tools without permission prompts
- Supported platforms: claude, cursor, windsurf, copilot, codex, claude-desktop, gemini

### Fixed
- Default API URL now points to production (`https://ikhono.io`) in CLI, MCP server, and seed data
- `ikh update` now installs the exact version instead of `@latest` to avoid stale pnpm cache
- Update notification banner no longer shows after `ikh update` completes
- MCP server migrated from deprecated `server.tool()` to `server.registerTool()` API
- Added `-y` flag to `npx` in MCP config snippets for non-interactive installs

## [0.1.3] - 2026-03-30

### Changed
- MCP search returns formatted text previews (name, rating, uses, pins) instead of raw JSON
- Default search limit reduced from 5 to 3 for more focused results

### Fixed
- Rate and pin endpoints now return clear 401 error instead of 500 when user session is invalid

## [0.1.2] - 2026-03-30

### Added
- CLI auto-update: `ikh update` to manually update, `ikh auto-update on/off` to toggle
- Background update notification on every CLI run (24h cache, non-blocking)

## [0.1.0] - 2026-03-28

### Added
- MCP server (`@ikhono/mcp`) with 6 tools: search, get, pin, unpin, list pinned, rate
- CLI (`@ikhono/cli`) with commands: login, whoami, skill init, skill publish, skill delete, stats
- Multi-platform support: Claude Code, Cursor, Windsurf, GitHub Copilot, OpenAI Codex
- Skill format: `skill.yaml` + `SKILL.md`
- Built-in skills: skill-creator, skill-optimizer, skill-rater, cli-reference
- Search by query, category, platform, and author
- Pin/unpin favorite skills
- Rate skills (1-5 stars with optional review)

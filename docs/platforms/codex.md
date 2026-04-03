# OpenAI Codex Setup

## Quick Setup

Codex uses environment variables for MCP configuration. Set the iKhono MCP server in your environment:

```bash
export IKHONO_API_URL="https://ikhono.io"
```

Then run Codex with the iKhono MCP server available.

## Streamable HTTP (zero install)

If Codex supports Streamable HTTP MCP transport, you can connect directly to `https://ikhono.io/mcp` without running a local subprocess. Search and load-skill work without auth. For pins and ratings, the stdio setup with `~/.ikhono/config.json` is recommended.

## Scaffolding a Skill for Codex

```bash
ikh skill init my-skill --platform codex
```

This creates:
- `skill.yaml` — skill metadata
- `SKILL.md` — skill instructions
- `AGENTS.md` — iKhono instructions in Codex agent format

> **Note:** Codex does not use a JSON config file for MCP servers. Configuration is environment-based.

## With Authentication

```bash
export IKHONO_API_TOKEN="sk_your_token_here"
```

Get your token by running:
```bash
npm install -g @ikhono/cli
ikh login              # opens browser for GitHub SSO
cat ~/.ikhono/config.json
```

> **Alternative:** `ikh login --email you@example.com --password yourpassword`

## Usage

Once configured, Codex agents can use iKhono tools:

- Search for skills by query or category
- Load skill instructions into the agent context
- Pin and rate skills

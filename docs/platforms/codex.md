# OpenAI Codex Setup

## Quick Setup

Codex uses environment variables for MCP configuration. Set the iKhono MCP server in your environment:

```bash
export IKHONO_API_URL="https://api.ikhono.dev"
```

Then run Codex with the iKhono MCP server available.

## Scaffolding a Skill for Codex

```bash
npx @ikhono/cli skill init my-skill --platform codex
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
npx @ikhono/cli login --email you@example.com --password yourpassword
cat ~/.ikhono/config.json
```

## Usage

Once configured, Codex agents can use iKhono tools:

- Search for skills by query or category
- Load skill instructions into the agent context
- Pin and rate skills

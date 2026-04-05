# Windsurf Setup

## Quick Setup

Add to `.windsurf/mcp.json` in your project root (create the file if it doesn't exist):

```json
{
  "mcpServers": {
    "ikhono": {
      "command": "npx",
      "args": ["-y", "@ikhono/mcp"]
    }
  }
}
```

Restart Windsurf to load the MCP server.

## Streamable HTTP (zero install)

If your Windsurf version supports Streamable HTTP MCP transport, you can connect directly without npx. Add to `.windsurf/mcp.json`:

```json
{
  "mcpServers": {
    "ikhono": {
      "url": "https://ikhono.io/mcp"
    }
  }
}
```

Search and load-skill work without auth. For pins and ratings, the stdio setup with `~/.ikhono/config.json` is recommended.

## With Authentication

```json
{
  "mcpServers": {
    "ikhono": {
      "command": "npx",
      "args": ["-y", "@ikhono/mcp"],
      "env": {
        "IKHONO_API_TOKEN": "sk_your_token_here"
      }
    }
  }
}
```

Get your token by running:
```bash
npm install -g @ikhono/cli
ikh login              # opens browser for GitHub SSO (or: ikh login --google)
cat ~/.ikhono/config.json
```

> **Alternatives:** `ikh login --google` (Google sign-in) or `ikh login --email you@example.com --password yourpassword`

## Global Setup

For all projects, add to `~/.codeium/windsurf/mcp_config.json` (Windsurf's global MCP config path).

## Scaffolding a Skill for Windsurf

```bash
ikh skill init my-skill --platform windsurf
```

This creates:
- `skill.yaml` — skill metadata
- `SKILL.md` — skill instructions
- `.windsurf/rules/ikhono.md` — iKhono instructions with trigger/globs frontmatter
- `.windsurf/mcp.json` — MCP server config (merged if file exists)

## Usage

Once connected, Windsurf's Cascade AI will have access to iKhono tools:

- *"Search iKhono for a documentation skill"*
- *"Load @carol/api-docs"*
- *"Pin that skill"*

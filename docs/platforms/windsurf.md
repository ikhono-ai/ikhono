# Windsurf Setup

## Quick Setup

Add to `.windsurf/mcp.json` in your project root (create the file if it doesn't exist):

```json
{
  "mcpServers": {
    "ikhono": {
      "command": "npx",
      "args": ["@ikhono/mcp"]
    }
  }
}
```

Restart Windsurf to load the MCP server.

## With Authentication

```json
{
  "mcpServers": {
    "ikhono": {
      "command": "npx",
      "args": ["@ikhono/mcp"],
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
ikh login --email you@example.com --password yourpassword
cat ~/.ikhono/config.json
```

## Global Setup

For all projects, add to `~/.windsurf/mcp.json`.

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

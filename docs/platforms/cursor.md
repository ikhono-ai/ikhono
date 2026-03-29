# Cursor Setup

## Quick Setup

Add to `.cursor/mcp.json` in your project root (create the file if it doesn't exist):

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

Restart Cursor to load the MCP server.

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

For all projects, add to `~/.cursor/mcp.json`.

## Scaffolding a Skill for Cursor

```bash
ikh skill init my-skill --platform cursor
```

This creates:
- `skill.yaml` — skill metadata
- `SKILL.md` — skill instructions
- `.cursor/rules/ikhono.mdc` — iKhono instructions in Cursor rule format (with frontmatter: description, alwaysApply, globs)
- `.cursor/mcp.json` — MCP server config (merged if file exists)

## Usage

Once connected, Cursor's AI agent will have access to iKhono tools. Use them in Cursor's chat or composer:

- *"Search iKhono for a refactoring skill"*
- *"Load @bob/clean-code"*
- *"Pin that skill"*

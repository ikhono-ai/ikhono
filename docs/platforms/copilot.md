# GitHub Copilot Setup

## Quick Setup

Add to `.vscode/mcp.json` in your project root (create the file if it doesn't exist):

```json
{
  "servers": {
    "ikhono": {
      "command": "npx",
      "args": ["@ikhono/mcp"]
    }
  }
}
```

> **Note:** Copilot uses `"servers"` (not `"mcpServers"`) as the key name.

Restart VS Code to load the MCP server.

## With Authentication

```json
{
  "servers": {
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
npx @ikhono/cli login --email you@example.com --password yourpassword
cat ~/.ikhono/config.json
```

## Global Setup

For all projects, add to `~/.vscode/mcp.json`.

## Scaffolding a Skill for Copilot

```bash
npx @ikhono/cli skill init my-skill --platform copilot
```

This creates:
- `skill.yaml` — skill metadata
- `SKILL.md` — skill instructions
- `.github/instructions/ikhono.instructions.md` — iKhono instructions with `applyTo` frontmatter
- `.vscode/mcp.json` — MCP server config (merged if file exists)

## Usage

Once connected, GitHub Copilot will have access to iKhono tools in VS Code's chat panel:

- *"Search iKhono for a testing skill"*
- *"Load @dave/unit-tester"*
- *"Pin that skill"*

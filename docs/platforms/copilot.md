# GitHub Copilot Setup

## Quick Setup

Add to `.vscode/mcp.json` in your project root (create the file if it doesn't exist):

```json
{
  "servers": {
    "ikhono": {
      "command": "npx",
      "args": ["-y", "@ikhono/mcp"]
    }
  }
}
```

> **Note:** Copilot uses `"servers"` (not `"mcpServers"`) as the key name.

Restart VS Code to load the MCP server.

## Streamable HTTP (zero install)

If your VS Code version supports Streamable HTTP MCP transport, you can connect directly without npx. Add to `.vscode/mcp.json`:

```json
{
  "servers": {
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
  "servers": {
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
ikh login              # opens browser for GitHub SSO
cat ~/.ikhono/config.json
```

> **Alternative:** `ikh login --email you@example.com --password yourpassword`

## Global Setup

For all projects, add to `~/.vscode/mcp.json`.

## Scaffolding a Skill for Copilot

```bash
ikh skill init my-skill --platform copilot
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

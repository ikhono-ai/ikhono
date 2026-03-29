# Claude Code Setup

## Quick Setup

```bash
claude mcp add ikhono -- npx @ikhono/mcp
```

Done. iKhono is now available in all your Claude Code sessions.

## Manual Setup

Add to `.claude/settings.json` (project-level) or `~/.claude/settings.json` (global):

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

## With Authentication

To use personalized features (pins, ratings, publishing), add your API token:

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

## Scaffolding a Skill for Claude Code

```bash
ikh skill init my-skill --platform claude
```

This creates:
- `skill.yaml` — skill metadata
- `SKILL.md` — skill instructions
- `CLAUDE.md` — iKhono development instructions
- `.claude/settings.json` — MCP server config (merged if file exists)

## Usage

Once connected, Claude will automatically have access to iKhono tools. You can:

- Ask Claude to search for skills: *"Search iKhono for a test writing skill"*
- Load a skill: *"Load @alice/test-writer"*
- Pin favorites: *"Pin that skill"*
- Rate skills: *"Rate it 5 stars"*

Claude will also proactively suggest skills when it detects a task that could benefit from specialized expertise.

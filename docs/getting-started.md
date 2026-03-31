# Getting Started

Get iKhono running in 5 minutes. By the end, your AI agent will have access to the entire skill registry.

## Step 1: Add the MCP Server

The fastest way is using the CLI setup command:

```bash
npm install -g @ikhono/cli
ikh setup --platform claude
```

This installs the MCP server config and a `/skill` slash command globally. Available platforms: `claude`, `cursor`, `windsurf`, `copilot`, `codex`, `claude-desktop`, `gemini`.

**Or manually:**

**Claude Code:**
```bash
claude mcp add ikhono -- npx -y @ikhono/mcp
```

**Cursor:** Add to `.cursor/mcp.json`:
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

**Other platforms:** See [platform setup guides](platforms/).

## Step 2: Search for a Skill

Ask your AI agent:

> "Search iKhono for a code review skill"

The agent will use `ikhono_skill_search` to find matching skills and show you the results:

```
Found 3 skills:
1. @alice/security-reviewer (4.8/5) - Reviews code for OWASP Top 10 vulnerabilities
2. @bob/pr-reviewer (4.5/5) - Review pull requests for quality, bugs, and best practices
3. @carol/code-quality (4.2/5) - Check code against clean code principles
```

## Step 3: Load a Skill

> "Load the security-reviewer skill"

The agent calls `ikhono_skill_get` and the skill's instructions are injected into the conversation. Now the agent has specialized expertise for that task.

## Step 4: Pin Your Favorites

> "Pin the security-reviewer skill"

Pinned skills are saved to your account. You can list them anytime:

> "Show my pinned iKhono skills"

## Step 5: Rate Skills You've Used

> "Rate the security-reviewer skill 5 stars — it caught a real SQL injection vulnerability"

Ratings help the community discover the best skills.

## What's Next?

- **Create your own skill**: See [Creating Skills](creating-skills.md)
- **Browse skill ideas**: See [Skill Ideas](../community/SKILL_IDEAS.md)
- **Learn the format**: See [Skill Spec](skill-spec.md)

## MCP Tools Reference

These are the tools available to your AI agent once the MCP server is connected:

| Tool | Description |
|------|-------------|
| `ikhono_skill_search` | Search skills by query, category, or author |
| `ikhono_skill_get` | Load a skill's full instructions by slug |
| `ikhono_skill_pin` | Pin a skill to your favorites |
| `ikhono_skill_unpin` | Remove a skill from favorites |
| `ikhono_skill_list_pinned` | List all your pinned skills |
| `ikhono_skill_rate` | Rate a skill (1-5 stars) with optional review |

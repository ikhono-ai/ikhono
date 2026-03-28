# iKhono — The npm for AI Skills

Publish, discover, and use AI agent skills across all platforms. Connect the MCP server once and every skill on the registry becomes instantly available — no local installation needed.

## Why iKhono?

AI coding agents are powerful but generic. **Skills** give them specialized expertise — security review, test writing, API design — crafted by the community.

- **Use a skill**: Connect the MCP server and search for what you need
- **Create a skill**: Write a SKILL.md, publish with one command
- **Share a skill**: Your skills work on Claude, Cursor, Windsurf, Copilot, and Codex

## Quick Start

### 1. Add the MCP Server

**Claude Code:**
```bash
claude mcp add ikhono -- npx @ikhono/mcp
```

**Cursor / Windsurf / Copilot:** See [platform setup guides](docs/platforms/).

### 2. Use Skills

Once connected, your AI agent can search and load skills automatically. Just ask:

> "Search iKhono for a code review skill"

Or the agent will suggest skills when it detects a relevant task.

### 3. Explore

| Action | What Happens |
|--------|-------------|
| **Search** | `ikhono_search` finds skills by query, category, or author |
| **Load** | `ikhono_get_skill` loads full instructions into your AI agent |
| **Pin** | `ikhono_pin` saves favorites for quick access |
| **Rate** | `ikhono_rate` helps the community find the best skills |

## How It Works

```
You  -->  AI Agent  -->  iKhono MCP Server  -->  iKhono Registry
                              |
                    search, load, pin, rate
                              |
                    Skills loaded on-demand
                    into your AI agent
```

The MCP server is a **thin proxy** — it connects your AI agent to the iKhono registry. When you (or your agent) search for a skill, the instructions are fetched and injected into the conversation. No files downloaded, no local setup.

## Supported Platforms

| Platform | Setup Guide | Status |
|----------|-------------|--------|
| [Claude Code](docs/platforms/claude-code.md) | `.claude/settings.json` | Supported |
| [Cursor](docs/platforms/cursor.md) | `.cursor/mcp.json` | Supported |
| [Windsurf](docs/platforms/windsurf.md) | `.windsurf/mcp.json` | Supported |
| [GitHub Copilot](docs/platforms/copilot.md) | `.vscode/mcp.json` | Supported |
| [OpenAI Codex](docs/platforms/codex.md) | Environment variables | Supported |

## For Skill Creators

Have expertise to share? Publish a skill in minutes:

```bash
# Install the CLI
npx @ikhono/cli login --email you@example.com --password yourpassword

# Scaffold a new skill
npx @ikhono/cli skill init my-skill

# Edit skill.yaml and SKILL.md, then publish
npx @ikhono/cli skill publish --changelog "Initial release"
```

Your skill is now available to everyone on the registry as `@your-username/my-skill`.

### Resources

- [Creating Skills Guide](docs/creating-skills.md) — Full walkthrough
- [Skill Format Spec](docs/skill-spec.md) — skill.yaml and SKILL.md reference
- [CLI Reference](docs/cli-reference.md) — All commands and options
- [Example Skills](examples/) — Skills you can reference and fork

## Documentation

| Doc | Description |
|-----|-------------|
| [Getting Started](docs/getting-started.md) | 5-minute setup and first skill |
| [How It Works](docs/how-it-works.md) | Architecture and concepts |
| [Creating Skills](docs/creating-skills.md) | Authoring and publishing guide |
| [Skill Spec](docs/skill-spec.md) | Format reference |
| [CLI Reference](docs/cli-reference.md) | Command-line tool docs |
| [Platform Guides](docs/platforms/) | Per-platform setup instructions |

## Community

- [Skill Ideas](community/SKILL_IDEAS.md) — Ideas for skills you can build
- [Showcase](community/SHOWCASE.md) — Featured skills and creators
- [Contributing](CONTRIBUTING.md) — How to contribute skills

## FAQ

**Do I need to install each skill separately?**
No. The MCP server gives you access to the entire registry. Skills are loaded on-demand when you or your AI agent requests them.

**Does it work offline?**
No. The MCP server fetches skills from the iKhono registry. You need an internet connection.

**Is it free?**
Yes. Publishing and using skills is free.

**Can I use private skills?**
Not yet. All published skills are public. Private/team skills are on the roadmap.

**What platforms are supported?**
Any AI tool that supports the Model Context Protocol (MCP). We have setup guides for Claude Code, Cursor, Windsurf, GitHub Copilot, and OpenAI Codex.

## License

Documentation and examples in this repository are licensed under [MIT](LICENSE).

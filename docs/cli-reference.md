# CLI Reference

The iKhono CLI (`ikh`) is the tool for skill creators to scaffold, publish, and manage skills.

## Installation

```bash
npm install -g @ikhono/cli
ikh <command>
```

## Commands

### ikh setup

Set up iKhono globally for your AI platform. This is the recommended first command for new users — it installs the MCP server and a `/skill` slash command so iKhono is available in every project.

```bash
# Default setup
ikh setup --platform claude

# Auto-approve iKhono MCP tools (no permission prompts, Claude only)
ikh setup --platform claude --auto-approve

# Install proactive skill-check rule (auto-searches iKhono on every task)
ikh setup --platform claude --proactive

# Combine flags
ikh setup --platform claude --auto-approve --proactive
```

| Option | Required | Description |
|--------|----------|-------------|
| `--platform <platform>` | Yes | AI platform to configure (claude, cursor, windsurf, copilot, codex, claude-desktop, gemini) |
| `--auto-approve` | No | Auto-allow iKhono MCP tools without permission prompts (Claude only) |
| `--proactive` | No | Install always-on rule that checks iKhono for relevant skills on every task |

**What gets installed:**
- MCP server config in the platform's global config path
- A `/skill` slash command (Claude) or rules file (other platforms) with MCP tool routing and CLI reference
- With `--auto-approve` (Claude only): adds `mcp__ikhono__*` to permissions.allow
- With `--proactive`: adds an always-on rule file that makes the AI automatically search iKhono for relevant skills before starting any task. Not supported on Claude Desktop (no rule file mechanism)

Safe to run multiple times — existing configs are merged, not overwritten.

### ikh login

Authenticate with the iKhono API. Saves credentials to `~/.ikhono/config.json`.

```bash
ikh login
```

Opens your browser for GitHub SSO.

| Option | Required | Description |
|--------|----------|-------------|
| `--email <email>` | No | Login with email instead of GitHub |
| `--password <password>` | No | Password (required with --email) |
| `--api-url <url>` | No | Override the API URL |

### ikh whoami

Show the currently logged-in username. Verifies the token against the API.

```bash
ikh whoami
```

No options. Requires prior login.

### ikh skill init [name]

Scaffold a new skill project with `skill.yaml`, `SKILL.md`, and platform-specific files.

```bash
# Create in a new directory
ikh skill init my-skill-name

# Create in current directory
ikh skill init

# Scaffold for a specific platform
ikh skill init my-skill --platform cursor
```

| Option | Default | Description |
|--------|---------|-------------|
| `--platform <platform>` | `claude` | AI platform to scaffold for |

Available platforms: `claude`, `cursor`, `windsurf`, `copilot`, `codex`

Each platform generates the appropriate config files with the iKhono MCP server pre-configured. If a config file already exists, it merges the iKhono config into it.

### ikh skill publish

Publish a skill (or new version) to the iKhono registry.

```bash
# Publish from current directory
ikh skill publish --changelog "Initial release"

# Publish from a specific directory
ikh skill publish --dir ./my-skill --changelog "Fix typos"
```

| Option | Description |
|--------|-------------|
| `--dir <path>` | Skill directory (default: current directory) |
| `--changelog <text>` | Changelog message for this version |

Requires `skill.yaml` and `SKILL.md` in the directory. Requires prior login.

### ikh skill delete \<slug\>

Delete a skill from iKhono. Performs a **soft delete** — hidden from search but retained for 7 days.

```bash
# With confirmation prompt
ikh skill delete @username/skill-name

# Skip confirmation
ikh skill delete @username/skill-name --yes
```

| Option | Description |
|--------|-------------|
| `--yes` | Skip the confirmation prompt |

Requires prior login. You can only delete skills you own. To restore a deleted skill, re-publish it within 7 days.

### ikh stats [slug]

View usage stats for your skills.

```bash
# Stats for all your skills (table view)
ikh stats

# Stats for a specific skill
ikh stats @username/skill-name
```

Shows: rating, total uses, pin count, version, and categories. Requires prior login.

### ikh update

Update the iKhono CLI to the latest version.

```bash
ikh update
```

Checks npm for a newer version and installs it if available. No options.

### ikh auto-update [on|off]

Toggle automatic CLI updates. When enabled, the CLI checks for a newer version before each command and automatically installs it if available.

```bash
# Check current setting
ikh auto-update

# Enable
ikh auto-update on

# Disable
ikh auto-update off
```

## Configuration

CLI config is stored at `~/.ikhono/config.json`:

```json
{
  "apiUrl": "https://ikhono.io",
  "token": "sk_...",
  "username": "your-username",
  "autoUpdate": true
}
```

Set automatically by `ikh login`. The MCP server also reads this file as a token fallback.

## Common Workflows

### First-time setup

```bash
ikh login    # opens browser for GitHub SSO

# Set up iKhono globally (MCP server + slash command)
ikh setup --platform claude

# Create and publish a skill
ikh skill init my-skill --platform claude
# Edit skill.yaml and SKILL.md
ikh skill publish --changelog "Initial release"
```

### Update an existing skill

```bash
# Bump version in skill.yaml, edit SKILL.md
ikh skill publish --changelog "Add error handling section"
```

### Check your skills

```bash
ikh whoami
ikh stats
```

### Delete and restore

```bash
# Delete
ikh skill delete @username/my-skill

# Restore (within 7 days) — re-publish from the skill directory
ikh skill publish --changelog "Restored skill"
```

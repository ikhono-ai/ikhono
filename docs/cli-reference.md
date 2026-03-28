# CLI Reference

The iKhono CLI (`ikh`) is the tool for skill creators to scaffold, publish, and manage skills.

## Installation

```bash
npx @ikhono/cli <command>
```

Or install globally:

```bash
npm install -g @ikhono/cli
ikh <command>
```

## Commands

### ikh login

Authenticate with the iKhono API. Saves credentials to `~/.ikhono/config.json`.

```bash
ikh login --email you@example.com --password yourpassword
```

| Option | Required | Description |
|--------|----------|-------------|
| `--email <email>` | Yes | Your email address |
| `--password <password>` | Yes | Your password |
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

## Configuration

CLI config is stored at `~/.ikhono/config.json`:

```json
{
  "apiUrl": "https://api.ikhono.dev",
  "token": "sk_...",
  "username": "your-username"
}
```

Set automatically by `ikh login`. The MCP server also reads this file as a token fallback.

## Common Workflows

### First-time setup

```bash
ikh login --email you@example.com --password yourpassword
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

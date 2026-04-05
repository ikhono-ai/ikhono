# Creating Skills

A complete guide to creating, publishing, and maintaining iKhono skills.

## What is a Skill?

A skill is a pair of files that teach an AI agent how to perform a specific task:
- **`skill.yaml`** — metadata (name, version, description, triggers, categories, platforms)
- **`SKILL.md`** — the actual instructions the AI agent follows (the brain of the skill)

Skills are published under a slug like `@username/skill-name` and can be discovered via the MCP server or API.

## Quick Start

```bash
# 1. Install the CLI
npm install -g @ikhono/cli

# 2. Login
ikh login              # opens browser for GitHub SSO (or: ikh login --google)

# 3. Scaffold a new skill
ikh skill init my-skill

# 4. Edit skill.yaml and SKILL.md in the my-skill/ directory

# 5. Publish
cd my-skill
ikh skill publish --changelog "Initial release"
```

Your skill is now live at `@your-username/my-skill`.

## Step-by-Step

### 1. Scaffold

```bash
ikh skill init my-skill-name
```

This creates a directory with `skill.yaml` and `SKILL.md` templates.

You can also scaffold platform-specific files:

```bash
ikh skill init my-skill --platform claude    # + CLAUDE.md + .claude/settings.json
ikh skill init my-skill --platform cursor    # + .cursor/rules/ + .cursor/mcp.json
ikh skill init my-skill --platform windsurf  # + .windsurf/rules/ + .windsurf/mcp.json
ikh skill init my-skill --platform copilot   # + .github/instructions/ + .vscode/mcp.json
ikh skill init my-skill --platform codex     # + AGENTS.md
```

### 2. Edit skill.yaml

```yaml
name: "my-skill-name"          # lowercase alphanumeric + hyphens, no spaces
version: "1.0.0"               # semver format (major.minor.patch)
description: "What this skill does in one sentence"
author: "@your-username"
license: MIT

triggers:                       # phrases that should activate this skill
  - "do the thing"
  - "help me with X"

categories:                     # at least one category for discoverability
  - testing
  - code-quality

platforms:                      # where this skill can run
  - claude
  - cursor
  - mcp
```

**Validation rules:**
- `name`: lowercase alphanumeric + hyphens, 1-100 characters
- `version`: must be valid semver (e.g., 1.0.0)
- `description`: 1-500 characters
- `triggers`: at least 1 trigger phrase
- `categories`: at least 1 category
- `platforms`: valid values are `claude`, `cursor`, `windsurf`, `copilot`, `codex`, `mcp`

### 3. Write SKILL.md

This is the core of your skill — the instructions the AI will follow. Structure it clearly:

```markdown
You are an expert at [domain].

## Process
1. [First step the AI should take]
2. [Second step]
3. [Third step]

## Rules
- [Constraint or guardrail]
- [Quality standard]

## Output Format
[Describe exactly what the output should look like]
```

**Tips for great SKILL.md:**
- Be specific and actionable — vague instructions produce vague results
- Use numbered steps for the process (order matters)
- Include rules/constraints to prevent common mistakes
- Define the output format so results are consistent
- Keep it focused — one skill should do one thing well
- Test your instructions by pasting them as a system prompt

### 4. Publish

```bash
ikh skill publish --changelog "Initial release"
```

**Pre-publish checklist:**
1. `skill.yaml` passes validation (all required fields, valid format)
2. `SKILL.md` exists and is non-empty
3. Name is descriptive and not already taken
4. Triggers are specific enough to match user intent
5. At least one category is set
6. Version is correct (1.0.0 for first release, bumped for updates)

## Versioning & Updates

### Semver Rules
- **Patch** (1.0.0 -> 1.0.1): Bug fixes, typo corrections, minor wording improvements
- **Minor** (1.0.0 -> 1.1.0): New sections added, new capabilities, backwards-compatible improvements
- **Major** (1.0.0 -> 2.0.0): Complete restructure, changed output format, removed features, breaking changes

### Updating an Existing Skill
1. Bump the `version` in `skill.yaml`
2. Make your changes to `SKILL.md` and/or `skill.yaml`
3. Run `ikh skill publish --changelog "description of changes"`

### Writing Good Changelogs
A changelog should answer: what changed, why, and does the user need to do anything?

**Good:** "Add edge case handling for empty inputs", "BREAKING: Changed output format from list to table"

**Bad:** "Updates", "Fixed stuff", "v2"

## Template Variables

SKILL.md supports `{{config.key}}` template variables that users can customize:

```yaml
# In skill.yaml
config:
  severity_threshold:
    type: string
    values: [low, medium, high, critical]
    default: medium
```

```markdown
<!-- In SKILL.md -->
Only report issues at {{config.severity_threshold}} severity or above.
```

## Complete Example

### skill.yaml

```yaml
name: "pr-reviewer"
version: "1.0.0"
description: "Review pull requests for code quality, bugs, and best practices"
author: "@alice"
license: MIT
triggers:
  - "review this PR"
  - "code review"
categories:
  - code-review
  - quality
platforms:
  - claude
  - mcp
```

### SKILL.md

```markdown
You are a senior engineer reviewing a pull request.

## Process
1. Read every changed file in the PR
2. Check for bugs, logic errors, and edge cases
3. Evaluate naming, readability, and code structure
4. Look for missing tests or error handling
5. Check for security issues (injection, auth, data exposure)

## Rules
- Be constructive — suggest fixes, not just problems
- Prioritize issues by severity (critical > major > minor > nit)
- Do not nitpick formatting if a linter/formatter is configured
- Praise good patterns when you see them

## Output Format
For each finding:
- **Severity**: Critical / Major / Minor / Nit
- **File:Line**: path/to/file.ts:42
- **Issue**: What is wrong
- **Suggestion**: How to fix it
```

## Quality Rubric

Great skills score well across these dimensions:

| Dimension | What to aim for |
|-----------|----------------|
| **Specificity** | Every instruction is concrete and actionable |
| **Structure** | Clear sections, numbered steps, logical flow |
| **Output Format** | Precisely defined with fields and examples |
| **Guardrails** | Rules that prevent common mistakes |
| **Focus** | Single responsibility — does one thing well |

**Tip:** Load `@ikhono/skill-optimizer` to get an automated review and improved version of your SKILL.md.

## Common Mistakes

- **Vague triggers**: "help" — be specific to your domain
- **Vague instructions**: "do a good job" — give concrete steps
- **Missing categories**: makes your skill hard to discover
- **Not bumping version**: always bump before re-publishing
- **Too many responsibilities**: a skill that reviews, refactors, tests, AND documents

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Not logged in | Run `ikh login` first |
| 400 Invalid skill.yaml | Schema validation failed | Check name format, version, required fields |
| 409 Version exists | Version number already published | Bump the version in skill.yaml |
| 403 Forbidden | You don't own this skill slug | Check the name — someone else may have published it |

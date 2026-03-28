# Skill Format Specification

A skill consists of two files: `skill.yaml` (metadata) and `SKILL.md` (instructions).

## skill.yaml

### Required Fields

| Field | Type | Rules | Example |
|-------|------|-------|---------|
| `name` | string | Lowercase alphanumeric + hyphens, 1-100 chars | `"security-reviewer"` |
| `version` | string | Valid semver | `"1.0.0"` |
| `description` | string | 1-500 chars | `"Reviews code for OWASP Top 10"` |
| `author` | string | `@username` format | `"@alice"` |
| `triggers` | string[] | At least 1 | `["security review", "check vulnerabilities"]` |
| `categories` | string[] | At least 1 | `["security", "code-review"]` |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `license` | string | `"MIT"` | License identifier |
| `platforms` | string[] | `["claude", "mcp"]` | Supported platforms |
| `config` | object | — | User-configurable template variables |

### Platforms

Valid platform values:

| Value | Platform |
|-------|----------|
| `claude` | Claude Code |
| `cursor` | Cursor |
| `windsurf` | Windsurf |
| `copilot` | GitHub Copilot |
| `codex` | OpenAI Codex |
| `openai` | OpenAI (generic) |
| `mcp` | Any MCP-compatible client |

### Config

Define configurable variables that users can override:

```yaml
config:
  severity_threshold:
    type: string
    values: [low, medium, high, critical]
    default: medium
  max_findings:
    type: string
    default: "10"
```

Each config entry supports:
- `type`: always `"string"`
- `values` (optional): allowed values (enum)
- `default` (optional): default value

### Full Example

```yaml
name: "security-reviewer"
version: "1.2.0"
description: "Reviews code for OWASP Top 10 vulnerabilities"
author: "@alice"
license: MIT
triggers:
  - "security review"
  - "check for vulnerabilities"
  - "OWASP review"
categories:
  - security
  - code-review
platforms:
  - claude
  - cursor
  - mcp
config:
  severity_threshold:
    type: string
    values: [low, medium, high, critical]
    default: medium
```

## SKILL.md

### Purpose

The SKILL.md file contains the instructions that are loaded into the AI agent at runtime. This is the "brain" of your skill — everything the agent needs to know to perform the task.

### Recommended Structure

```markdown
You are an expert at [specific domain].

## Process
1. [First step]
2. [Second step]
3. [Third step]

## Rules
- [Constraint or guardrail]
- [Quality standard]

## Output Format
[Describe the expected output structure]
```

### Sections

| Section | Purpose | Required? |
|---------|---------|-----------|
| Role statement | First line — tells the AI what expert it's playing | Recommended |
| Process | Numbered steps the AI follows | Recommended |
| Rules | Constraints, guardrails, things to avoid | Recommended |
| Output Format | What the output should look like | Recommended |

You can add additional sections as needed (e.g., Examples, Edge Cases, References).

### Template Variables

Use `{{config.key}}` to reference values from the `config` section of `skill.yaml`:

```markdown
Only report issues at {{config.severity_threshold}} severity or above.
Limit findings to {{config.max_findings}} items.
```

These are replaced at runtime with the configured (or default) values.

### Size Limits

- SKILL.md must be non-empty
- No hard size limit, but keep it focused — very long instructions can dilute the AI's attention

## Slug Format

Skills are published under slugs with the format `@username/skill-name`:

- `@alice/security-reviewer`
- `@bob/test-writer`
- `@ikhono/skill-creator`

The username comes from your account. The skill name comes from the `name` field in `skill.yaml`.

## Versioning

Skills use [semantic versioning](https://semver.org/):

- **Patch** (1.0.1): Bug fixes, typo corrections
- **Minor** (1.1.0): New capabilities, backwards-compatible
- **Major** (2.0.0): Breaking changes, restructured output

Each published version is immutable. To update, bump the version and publish again.

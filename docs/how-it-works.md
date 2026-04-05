# How It Works

## Overview

iKhono is a **skill registry** with an **MCP server** that connects AI agents to community-created expertise. Skills are fetched on-demand — nothing is installed locally.

## Architecture

```
+-----------+      +------------------+      +------------------+
|           |      |                  |      |                  |
|  You /    | <--> |   AI Agent       | <--> |  iKhono MCP      |
|  Your IDE |      |  (Claude, etc.)  |      |  Server          |
|           |      |                  |      |  (@ikhono/mcp)   |
+-----------+      +------------------+      +--------+---------+
                                                      |
                                                      | HTTP
                                                      |
                                             +--------+---------+
                                             |                  |
                                             |  iKhono Registry |
                                             |  (API + Database)|
                                             |                  |
                                             +------------------+
```

## The Flow

### 1. You Connect the MCP Server (Once)

You add the iKhono MCP server to your AI tool's configuration. This is a one-time setup.

There are two ways to connect:
- **stdio** — the MCP server runs locally as a subprocess via `npx @ikhono/mcp`
- **Streamable HTTP** — connect directly to `https://ikhono.io/mcp` with no local install

### 2. You Ask for Help

You ask your AI agent to do something — review code, write tests, generate docs. The agent recognizes this could benefit from specialized expertise.

### 3. The Agent Searches the Registry

The agent calls `ikhono_skill_search` with a query like "security review". The MCP server forwards this to the iKhono API, which returns matching skills ranked by relevance, rating, and usage.

### 4. The Agent Loads a Skill

The agent calls `ikhono_skill_get` with a skill's slug (e.g., `@alice/security-reviewer`). The full SKILL.md content is returned — detailed instructions that tell the agent exactly how to perform the task.

### 5. The Agent Follows the Instructions

The skill's instructions are now part of the conversation context. The agent follows them to complete your task with specialized expertise it didn't have before.

## Key Concepts

### Skills

A skill is a pair of files:
- **`skill.yaml`** — metadata (name, version, description, triggers, categories, platforms)
- **`SKILL.md`** — the actual instructions the AI agent follows

Skills are published under slugs like `@username/skill-name`.

### MCP (Model Context Protocol)

MCP is an open standard for connecting AI agents to external tools and data. The iKhono MCP server exposes 6 tools that any MCP-compatible AI agent can use.

### The Registry

The iKhono registry is the central database of all published skills. It handles:
- Skill storage and versioning
- Search and discovery
- User accounts and authentication
- Ratings and pins
- Usage tracking

### Pins

Pin skills you use frequently. Pinned skills are saved to your account and can be listed anytime, making it easy to reload your go-to tools.

### Ratings

Rate skills after using them (1-5 stars, optional review). Ratings help the community discover the best skills and give feedback to creators.

## What Runs Where

| Component | Runs | Purpose |
|-----------|------|---------|
| MCP server (stdio) | Your machine (subprocess) | Thin proxy between AI agent and registry |
| MCP server (HTTP) | iKhono servers (`ikhono.io/mcp`) | Same tools, no local install needed |
| AI agent | Your machine / cloud | Uses MCP tools to interact with iKhono |
| Registry API | iKhono servers | Stores and serves skills |
| CLI (`ikh`) | Your machine | For skill creators to publish and manage skills |
| Web UI | iKhono servers (`ikhono.io`) | Browse skills, view author profiles, publish/edit from browser |

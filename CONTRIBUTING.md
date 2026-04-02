# Contributing to iKhono

Thanks for your interest in contributing to iKhono! The best way to contribute is by **creating and publishing skills** that help the community.

## Creating a Skill

1. **Install the CLI**: `npm install -g @ikhono/cli`
2. **Login**: `ikh login` (opens browser for GitHub SSO)
3. **Scaffold**: `ikh skill init my-skill`
4. **Write**: Edit `skill.yaml` (metadata) and `SKILL.md` (instructions)
5. **Publish**: `ikh skill publish --changelog "Initial release"`

See the [Creating Skills Guide](docs/creating-skills.md) for a full walkthrough.

## What Makes a Great Skill?

- **Focused**: Does one thing well (not a kitchen sink)
- **Specific**: Concrete, actionable instructions (not "be thorough")
- **Structured**: Clear sections — Role, Process, Rules, Output Format
- **Tested**: Try your instructions as a system prompt before publishing

See [example skills](examples/) for reference.

## Improving Documentation

Found a typo, unclear instruction, or missing info? Open an issue or PR on this repo.

## Testing on Other Platforms

We currently test iKhono on **Claude Code**. We'd love help testing on other platforms:

- [Cursor](docs/platforms/cursor.md)
- [Windsurf](docs/platforms/windsurf.md)
- [GitHub Copilot](docs/platforms/copilot.md)
- [OpenAI Codex](docs/platforms/codex.md)

If you use any of these, try connecting the MCP server and report what works, what breaks, or what feels off. Open an issue with the platform name and steps to reproduce.

## Reporting Issues

- **Skill issues**: If a skill has incorrect or harmful instructions, open an issue with the skill slug
- **Platform issues**: If the MCP server or CLI has bugs, open an issue describing the problem, your platform, and steps to reproduce

## Suggesting Skill Ideas

Check [community/SKILL_IDEAS.md](community/SKILL_IDEAS.md) for ideas, or add your own by opening a PR.

## Community Guidelines

- Be respectful and constructive
- Don't publish skills with harmful, misleading, or malicious instructions
- Don't squat on skill names — use names that reflect what your skill does
- Give credit when your skill builds on someone else's work
- Rate skills honestly — it helps everyone find the best tools

## Getting Featured

High-quality skills with good ratings may be featured in our [Showcase](community/SHOWCASE.md). To improve your chances:

- Write clear, specific instructions
- Include meaningful triggers and categories
- Maintain your skill — respond to feedback and publish updates
- Score 4+/5 on the [quality rubric](docs/creating-skills.md#quality-rubric)

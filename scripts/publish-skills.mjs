#!/usr/bin/env node

/**
 * Publish all skills from a directory to the iKhono registry.
 *
 * Scans a folder for subdirectories containing skill.yaml + SKILL.md,
 * then publishes each one via the iKhono API.
 *
 * Usage:
 *   node scripts/publish-skills.mjs                          # publishes everything in examples/
 *   node scripts/publish-skills.mjs --dir ./my-skills        # custom skills directory
 *   node scripts/publish-skills.mjs --changelog "Bug fixes"  # set changelog for all
 *   node scripts/publish-skills.mjs --dry-run                # preview without publishing
 *
 * Auth:
 *   Reads token from ~/.ikhono/config.json (set via `ikh login`).
 *   Override with --token <token> or IKH_TOKEN env var.
 *
 * API:
 *   Defaults to https://ikhono.io. Override with --api-url or IKH_API_URL env var.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { existsSync } from 'node:fs';

// --- CLI args ---

const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) return undefined;
  return args[idx + 1];
}

function hasFlag(name) {
  return args.includes(`--${name}`);
}

if (hasFlag('help') || hasFlag('h')) {
  console.log(`Usage: node scripts/publish-skills.mjs [options]

Options:
  --dir <path>        Skills directory (default: examples/ next to this script)
  --changelog <text>  Changelog message for all skills
  --token <token>     API token (default: from ~/.ikhono/config.json)
  --api-url <url>     API base URL (default: from config or https://ikhono.io)
  --dry-run           Preview what would be published without making API calls
  --help              Show this help message
`);
  process.exit(0);
}

const DRY_RUN = hasFlag('dry-run');
const CHANGELOG = getArg('changelog') || '';
const SKILLS_DIR = resolve(getArg('dir') || join(import.meta.dirname, '..', 'examples'));

// --- Config ---

function loadConfig() {
  const configPath = join(homedir(), '.ikhono', 'config.json');
  if (!existsSync(configPath)) return {};
  try {
    const raw = JSON.parse(readFileSync(configPath, 'utf-8'));
    return raw;
  } catch {
    return {};
  }
}

// Need sync readFile for config — import separately
import { readFileSync } from 'node:fs';

const config = loadConfig();
const TOKEN = getArg('token') || process.env.IKH_TOKEN || config.token;
const API_URL = getArg('api-url') || process.env.IKH_API_URL || config.apiUrl || 'https://ikhono.io';

if (!TOKEN && !DRY_RUN) {
  console.error('No auth token found. Run `ikh login` first, or pass --token <token>');
  process.exit(1);
}

// --- YAML parser (same as CLI) ---

function parseSimpleYaml(yaml) {
  const result = {};
  let currentKey = '';
  let currentArray = null;

  for (const line of yaml.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- ') && currentArray !== null) {
      currentArray.push(trimmed.slice(2).replace(/^["']|["']$/g, ''));
      result[currentKey] = currentArray;
      continue;
    }

    if (currentArray !== null) {
      currentArray = null;
    }

    const match = trimmed.match(/^(\w+):\s*(.*)?$/);
    if (match) {
      const [, key, value] = match;
      if (!value || value === '') {
        currentKey = key;
        currentArray = [];
      } else {
        result[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  return result;
}

// --- Publish ---

async function publishSkill(skillDir, name) {
  const yamlPath = join(skillDir, 'skill.yaml');
  const mdPath = join(skillDir, 'SKILL.md');

  let yamlText, content;
  try {
    yamlText = await readFile(yamlPath, 'utf-8');
    content = await readFile(mdPath, 'utf-8');
  } catch {
    console.log(`  skip: ${name}/ — missing skill.yaml or SKILL.md`);
    return { status: 'skipped', name };
  }

  const parsed = parseSimpleYaml(yamlText);

  if (!parsed.name || !parsed.description) {
    console.log(`  skip: ${name}/ — skill.yaml missing name or description`);
    return { status: 'skipped', name };
  }

  if (DRY_RUN) {
    console.log(`  would publish: ${parsed.name} v${parsed.version || '1.0.0'} — ${parsed.description}`);
    return { status: 'dry-run', name: parsed.name };
  }

  const body = {
    skillYaml: JSON.stringify(parsed),
    content: content.trim(),
    ...(CHANGELOG && { changelog: CHANGELOG }),
  };

  try {
    const res = await fetch(`${API_URL}/api/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      if (res.status === 409) {
        console.log(`  skip: ${parsed.name} v${parsed.version || '1.0.0'} — version already exists`);
        return { status: 'skipped', name: parsed.name };
      }
      console.log(`  fail: ${parsed.name} — ${JSON.stringify(err.error)}`);
      return { status: 'failed', name: parsed.name, error: err.error };
    }

    const { data } = await res.json();
    console.log(`  published: ${data.slug} v${data.version} — ${data.message}`);
    return { status: 'published', name: data.slug, version: data.version };
  } catch (err) {
    console.log(`  fail: ${parsed.name} — ${err.message}`);
    return { status: 'failed', name: parsed.name, error: err.message };
  }
}

async function main() {
  console.log(`Skills dir: ${SKILLS_DIR}`);
  console.log(`API:        ${API_URL}`);
  console.log(`Mode:       ${DRY_RUN ? 'dry-run' : 'publish'}\n`);

  let entries;
  try {
    entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  } catch {
    console.error(`Cannot read directory: ${SKILLS_DIR}`);
    process.exit(1);
  }

  const dirs = entries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));

  const results = [];

  if (dirs.length === 0) {
    // No subdirectories — check if the dir itself is a skill
    const hasYaml = entries.some((e) => e.name === 'skill.yaml');
    const hasMd = entries.some((e) => e.name === 'SKILL.md');
    if (hasYaml && hasMd) {
      console.log('Found single skill in directory\n');
      results.push(await publishSkill(SKILLS_DIR, SKILLS_DIR.split('/').pop()));
    } else {
      console.log('No skill directories found and no skill.yaml + SKILL.md in this directory.');
      process.exit(0);
    }
  } else {
    console.log(`Found ${dirs.length} skill(s)\n`);
    for (const entry of dirs) {
      results.push(await publishSkill(join(SKILLS_DIR, entry.name), entry.name));
    }
  }

  // Summary
  const published = results.filter((r) => r.status === 'published').length;
  const failed = results.filter((r) => r.status === 'failed').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;
  const dryRun = results.filter((r) => r.status === 'dry-run').length;

  console.log(`\nDone: ${published} published, ${failed} failed, ${skipped} skipped${dryRun ? `, ${dryRun} dry-run` : ''}`);

  if (failed > 0) process.exit(1);
}

main();

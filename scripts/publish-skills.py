#!/usr/bin/env python3

"""
Publish all skills from a directory to the iKhono registry.

Scans a folder for subdirectories containing skill.yaml + SKILL.md,
then publishes each one via the iKhono API.

Usage:
  python scripts/publish-skills.py                          # publishes everything in examples/
  python scripts/publish-skills.py --dir ./my-skills        # custom skills directory
  python scripts/publish-skills.py --changelog "Bug fixes"  # set changelog for all
  python scripts/publish-skills.py --dry-run                # preview without publishing

Auth:
  Reads token from ~/.ikhono/config.json (set via `ikh login`).
  Override with --token <token> or IKH_TOKEN env var.

API:
  Defaults to https://ikhono.io. Override with --api-url or IKH_API_URL env var.
"""

import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.error
from pathlib import Path


def load_config():
    config_path = Path.home() / ".ikhono" / "config.json"
    if not config_path.exists():
        return {}
    try:
        return json.loads(config_path.read_text())
    except (json.JSONDecodeError, OSError):
        return {}


def parse_simple_yaml(text):
    """Minimal YAML parser for flat key-value pairs and string arrays."""
    result = {}
    current_key = ""
    current_array = None

    for line in text.splitlines():
        trimmed = line.strip()
        if not trimmed or trimmed.startswith("#"):
            continue

        if trimmed.startswith("- ") and current_array is not None:
            value = trimmed[2:].strip().strip("\"'")
            current_array.append(value)
            result[current_key] = current_array
            continue

        if current_array is not None:
            current_array = None

        match = re.match(r"^(\w+):\s*(.*)?$", trimmed)
        if match:
            key, value = match.group(1), match.group(2) or ""
            if not value:
                current_key = key
                current_array = []
            else:
                result[key] = value.strip("\"'")

    return result


def publish_skill(skill_dir, name, api_url, token, changelog, dry_run):
    yaml_path = skill_dir / "skill.yaml"
    md_path = skill_dir / "SKILL.md"

    if not yaml_path.exists() or not md_path.exists():
        print(f"  skip: {name}/ — missing skill.yaml or SKILL.md")
        return "skipped"

    parsed = parse_simple_yaml(yaml_path.read_text())
    content = md_path.read_text().strip()

    if not parsed.get("name") or not parsed.get("description"):
        print(f"  skip: {name}/ — skill.yaml missing name or description")
        return "skipped"

    version = parsed.get("version", "1.0.0")

    if dry_run:
        print(f"  would publish: {parsed['name']} v{version} — {parsed['description']}")
        return "dry-run"

    body = {
        "skillYaml": json.dumps(parsed),
        "content": content,
    }
    if changelog:
        body["changelog"] = changelog

    data = json.dumps(body).encode()
    req = urllib.request.Request(
        f"{api_url}/api/skills",
        data=data,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
            "User-Agent": "ikhono-publish-skills/1.0",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as res:
            result = json.loads(res.read())["data"]
            print(f"  published: {result['slug']} v{result['version']} — {result['message']}")
            return "published"
    except urllib.error.HTTPError as e:
        if e.code == 409:
            print(f"  skip: {parsed['name']} v{version} — version already exists")
            return "skipped"
        try:
            err = json.loads(e.read())
            print(f"  fail: {parsed['name']} — {json.dumps(err.get('error', e.reason))}")
        except Exception:
            print(f"  fail: {parsed['name']} — {e.reason}")
        return "failed"
    except Exception as e:
        print(f"  fail: {parsed['name']} — {e}")
        return "failed"


def main():
    parser = argparse.ArgumentParser(description="Publish skills to the iKhono registry")
    parser.add_argument("--dir", help="Skills directory (default: examples/ next to this script)")
    parser.add_argument("--changelog", default="", help="Changelog message for all skills")
    parser.add_argument("--token", help="API token (default: from ~/.ikhono/config.json)")
    parser.add_argument("--api-url", help="API base URL (default: from config or https://ikhono.io)")
    parser.add_argument("--dry-run", action="store_true", help="Preview without publishing")
    args = parser.parse_args()

    config = load_config()
    token = args.token or os.environ.get("IKH_TOKEN") or config.get("token")
    api_url = args.api_url or os.environ.get("IKH_API_URL") or config.get("apiUrl") or "https://ikhono.io"
    api_url = api_url.rstrip("/")

    if not token and not args.dry_run:
        print("No auth token found. Run `ikh login` first, or pass --token <token>", file=sys.stderr)
        sys.exit(1)

    script_dir = Path(__file__).resolve().parent
    skills_dir = Path(args.dir).resolve() if args.dir else script_dir.parent / "examples"

    print(f"Skills dir: {skills_dir}")
    print(f"API:        {api_url}")
    print(f"Mode:       {'dry-run' if args.dry_run else 'publish'}\n")

    if not skills_dir.is_dir():
        print(f"Cannot read directory: {skills_dir}", file=sys.stderr)
        sys.exit(1)

    dirs = sorted([d for d in skills_dir.iterdir() if d.is_dir()])
    results = []

    if not dirs:
        # No subdirectories — check if the dir itself is a skill
        if (skills_dir / "skill.yaml").exists() and (skills_dir / "SKILL.md").exists():
            print("Found single skill in directory\n")
            results.append(publish_skill(skills_dir, skills_dir.name, api_url, token, args.changelog, args.dry_run))
        else:
            print("No skill directories found and no skill.yaml + SKILL.md in this directory.")
            sys.exit(0)
    else:
        print(f"Found {len(dirs)} skill(s)\n")
        for d in dirs:
            results.append(publish_skill(d, d.name, api_url, token, args.changelog, args.dry_run))

    # Summary
    published = results.count("published")
    failed = results.count("failed")
    skipped = results.count("skipped")
    dry_run = results.count("dry-run")

    summary = f"\nDone: {published} published, {failed} failed, {skipped} skipped"
    if dry_run:
        summary += f", {dry_run} dry-run"
    print(summary)

    if failed > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()

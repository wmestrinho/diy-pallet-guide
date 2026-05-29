# DIY Pallet Project Guide

A practical, open guide to building things from reclaimed pallets — sourcing, safety, tools, the step-by-step process, and a full worked example.

A guide by **Absolutely Plausible**. Licensed [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Status

`v0.2.0 beta` — initial guide. Not yet deployed to a public domain (see `CLAUDE.md`).

## Local development

```bash
pip install -r requirements.txt
mkdocs serve
```

Open `http://localhost:8000`.

## Structure

- `docs/index.md` — Start here
- `docs/start-a-project-checklist.md` — Quick pre-build checklist
- `docs/basics.md` — Sourcing, safety, tools, wood prep
- `docs/process.md` — The 9-step process
- `docs/dj-pallet-table.md` — Worked example
- `docs/worked-example-template.md` — Standard template for future worked examples

---

## AI Agent Handoff

Canonical local path:
- `/Users/wmestrinho/Workspace/Projects/diy-pallet-guide`

Legacy local path:
- `/Users/wmestrinho/.openclaw/workspace/projects/diy-pallet-guide`

Before editing:
- Read `AGENTS.md`.
- Check `git status --short --branch`.
- Preserve any project-specific instructions in `CLAUDE.md`.

Deployment notes:
- MkDocs static site. Build with `mkdocs build`; deploy according to repo/Cloudflare Pages settings.

Version rule:
- Current baseline version: `v0.2.0 beta`
- Keep version source documented.
- Web UIs must visibly display the version.

Validation:
- Run `python3 scripts/validate_agent_baseline.py`.
- Also run project-specific tests/builds when present.


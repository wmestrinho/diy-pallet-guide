# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What This Repo Is

A **public-facing** (planned) DIY guide to building things from reclaimed pallets. Created by Absolutely Plausible as a free, shareable resource. Static MkDocs Material site.

Intended to become a public resource — so it follows the AP SEO guidelines (good titles, meta descriptions, front-matter on every page).

## Commands

```bash
pip install -r requirements.txt
mkdocs serve   # local dev
mkdocs build   # build to site/
```

## Content

- `docs/index.md` — Start Here
- `docs/basics.md` — Sourcing, safety (HT vs MB pallets), tools, wood prep
- `docs/process.md` — The 9-step process, with a flow graph
- `docs/dj-pallet-table.md` — Worked example: the DJ Pallet Table mapped to the process

Photos in `docs/assets/` — all 33 from the DJ Pallet Table build (migrated from ap-team-workspace, May 2026).

## Conventions

- Every page has YAML front-matter with `title` and `description` (SEO)
- Graphs via `pymdownx.superfences` custom_fences (mermaid) — used only where a
  graph genuinely clarifies (the safety decision flow, the process flow)
- Warm Absolutely Plausible palette + Share Tech Mono
- Licensed CC BY-NC 4.0

## Versioning

- `VERSION` file at repo root; keep `copyright` in `mkdocs.yml` in sync
- Current: `v0.1.0 beta`

## Pending

- [x] Decide a public domain / subdomain; update `site_url` in `mkdocs.yml` → `https://diy.recyclopedia.cc/` (custom domain; `diy-pallet-guide.pages.dev` is the underlying Pages URL)
- [x] Cloudflare Pages project + deploy → project `diy-pallet-guide`, account `Wmestrinho@live.com`
- [ ] Add the DJ Pallet Table final install photos when the build completes
- [ ] Consider adding more worked examples as AP completes more pallet builds

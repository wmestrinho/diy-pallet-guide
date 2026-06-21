# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What This Repo Is

A **public** product landing page for a DIY pallet-furniture guide, by Absolutely Plausible. The site sells a $17 PDF (Gumroad); the page itself is plain hand-written HTML + CSS — no framework, no build step. The repo is **public on GitHub**, so the paid PDF is never committed.

> MkDocs was retired in v0.4.0. The old `mkdocs.yml`, `overrides/`, `requirements.txt`, and the last built `site/` are archived under `internal/` for reference only — not served, not maintained.

## Stack

- `index.html` + `style.css` at repo root — the landing page Cloudflare Pages serves directly (no build command, output dir `/`).
- `docs/*.md` — the guide content. Still the **source of truth** for the PDF; no longer published as a website.
- `internal/pdf-build/` — tooling that regenerates `guide.pdf` from `docs/*.md`. Run `bash internal/pdf-build/build.sh` (needs python-markdown, npx/mermaid-cli, sips, Chrome, ghostscript). Output `guide.pdf` is gitignored — it lives only locally + on Gumroad (`gumroad.com/l/ajfnh`).

## Content

- `docs/index.md` — Start Here · `docs/basics.md` — sourcing, safety (HT vs MB), tools, prep
- `docs/process.md` — the 9-step process (mermaid flow) · `docs/dj-pallet-table.md` — worked example
- `docs/start-a-project-checklist.md` — Quick Start Checklist
- Photos in `docs/assets/` — all 33 from the DJ Pallet Table build

## Conventions

- `index.html` carries the SEO + OG meta; `docs/*.md` keep YAML front-matter (`title`/`description`) as PDF metadata
- Mermaid diagrams pre-rendered to PNG for the PDF (`internal/pdf-build/*.png`)
- Absolutely Plausible palette (`#3f7d9c` / `#1e2238` / `#6a4f9e`) + Share Tech Mono
- Licensed CC BY-NC 4.0

## Versioning

- `VERSION` file at repo root. Current: `v0.4.0`

## Pending

- [ ] **Cloudflare Pages: remove the `mkdocs build` command, set output dir `/`** — the live site still serves the old MkDocs build; the landing page won't go live until this changes (dashboard task)
- [ ] Upload `guide.pdf` to the Gumroad product + finalize its description
- [ ] Add the DJ Pallet Table final install photos after the June 29 install (web grid + regenerate PDF)
- [ ] Consider adding more worked examples as AP completes more pallet builds

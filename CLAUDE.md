# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What This Repo Is

A **public** product site for a DIY pallet-furniture guide, by Absolutely Plausible. Two hand-written HTML pages (no framework, no build step):

1. **`index.html`** — landing page that sells the $17 PDF (Gumroad). The PDF is the **reusable method only**: sourcing, safety, tools, the 9-step process, the Quick Start Checklist.
2. **`dj-pallet-table.html`** — a **free** standalone case study: the DJ Pallet Table build, start to finish, mapped to the 9-step process. It's the proof that drives the sale, styled after Gumroad's product-page UI/UX recolored to the AP palette. **Not part of the PDF.**

The repo is **public on GitHub**, so the paid PDF is never committed.

> MkDocs was retired in v0.4.0. The old `mkdocs.yml`, `overrides/`, `requirements.txt`, and the last built `site/` are archived under `internal/` for reference only — not served, not maintained.

## Stack

- `index.html` + `dj-pallet-table.html` + `style.css` at repo root — the two pages Cloudflare Pages serves directly (no build command, output dir `/`).
- `docs/*.md` — the guide content. **Source of truth for the PDF**, and now cleanly mirrors it (4 files = the 4 PDF sections). Not published as a website. Kept render-ready so the method can later be published as **subscriber-gated web pages** (see Pending).
- `internal/pdf-build/` — tooling that regenerates `guide.pdf` from `docs/*.md`. Run `bash internal/pdf-build/build.sh` (needs python-markdown, npx/mermaid-cli, Chrome, ghostscript). Output `guide.pdf` is gitignored — it lives only locally + on Gumroad (`gumroad.com/l/ajfnh`).

## Content

- **PDF (paid):** `docs/index.md` — Start Here · `docs/basics.md` — sourcing, safety (HT vs MB), tools, prep · `docs/process.md` — the 9-step process (mermaid flow) · `docs/start-a-project-checklist.md` — Quick Start Checklist
- **Web (free):** `dj-pallet-table.html` — the DJ Pallet Table worked example (33 photos, 8-milestone timeline). Its archived markdown source is `internal/dj-pallet-table.md` (no longer in `docs/`, since it's no longer in the PDF).
- Photos in `docs/assets/` — all 33 from the DJ Pallet Table build; used by both `index.html` and `dj-pallet-table.html`.

## Conventions

- `index.html` and `dj-pallet-table.html` each carry their own SEO + OG meta; `docs/*.md` keep YAML front-matter (`title`/`description`) as PDF metadata
- Mermaid diagrams pre-rendered to PNG for the PDF (`internal/pdf-build/*.png`)
- Absolutely Plausible palette (`#3f7d9c` / `#1e2238` / `#6a4f9e` / `#eef0f2`) + Share Tech Mono
- `dj-pallet-table.html` uses Gumroad's product-page UI/UX (flat brutalist: hard navy borders, offset drop-shadows, press-on-hover buttons) recolored to the AP palette — all scoped under `body.gr` in `style.css`
- Licensed CC BY-NC 4.0

## Versioning

- `VERSION` file at repo root. Current: `v0.5.0` (v0.5.0 split the DJ Pallet Table out of the PDF into its own free web page)

## Pending

- [ ] **Cloudflare Pages: remove the `mkdocs build` command, set output dir `/`** — the live site still serves the old MkDocs build; the new pages won't go live until this changes (dashboard task)
- [ ] Upload `guide.pdf` to the Gumroad product + finalize its description (the PDF is now the method only — no DJ chapter)
- [ ] **`index.html` proof-line page count** — recompute after the next PDF rebuild and back-fill if you want a hard page count (currently described, not numbered)
- [ ] Add the DJ Pallet Table install photos + build video after the June 29 install — drop into the `install-slot` placeholder in `dj-pallet-table.html` and mark the timeline's Install step `done`
- [ ] **Future: subscriber-gated web guide** — publish `docs/*.md` as web pages behind the planned monthly subscription (kept render-ready; no gate built yet)
- [ ] Consider adding more worked examples as AP completes more pallet builds

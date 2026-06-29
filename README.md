# DIY Pallet Project Guide

A practical, open guide to building things from reclaimed pallets — sourcing, safety, tools, and the repeatable 9-step process — sold as a $17 PDF, with a free worked-example case study online.

A project by **Absolutely Plausible**. Licensed [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Status

`v0.5.0` — live at <https://diy.recyclopedia.cc/> (Cloudflare Pages). See `CLAUDE.md` for pending items.

## What's here

Two hand-written HTML pages, served directly by Cloudflare Pages (no build step, output dir `/`):

- **`index.html`** — landing page that sells the $17 PDF (Gumroad).
- **`dj-pallet-table.html`** — free standalone case study: the DJ Pallet Table build, start to finish. Gumroad-style UI/UX recolored to the AP palette.
- **`style.css`** — shared styles for both pages.

The **paid PDF** (the reusable method only) is built from `docs/*.md`:

- `docs/index.md` — Start here
- `docs/basics.md` — Sourcing, safety (HT vs MB), tools, wood prep
- `docs/process.md` — The 9-step process
- `docs/start-a-project-checklist.md` — Quick pre-build checklist

`docs/` cleanly mirrors the PDF. The DJ Pallet Table worked example is **not** in the PDF — it lives at `dj-pallet-table.html`, with its archived markdown source at `internal/dj-pallet-table.md`.

## Local preview

No build step — open the pages directly:

```bash
open index.html          # or dj-pallet-table.html
```

## Rebuilding the PDF

```bash
bash internal/pdf-build/build.sh
```

Needs python3 + python-markdown, npx (mermaid-cli), Google Chrome (headless print), and ghostscript. Output `guide.pdf` is **gitignored** — the repo is public, so the paid PDF lives only locally + on Gumroad (`gumroad.com/l/ajfnh`).

## Internal / archived

- `internal/dj-pallet-table.md` — archived markdown source of the web case study
- `internal/pdf-build/` — PDF build tooling + pre-rendered diagrams
- `internal/worked-example-template.md`, `internal/project-scope-template.md` — authoring templates
- `internal/mkdocs.yml`, `internal/overrides/`, `internal/requirements.txt` — retired MkDocs setup (reference only, not served)

---

## AI Agent Handoff

Canonical local path: `/Users/wmestrinho/Workspace/Projects/diy-pallet-guide`

Before editing:
- Read `CLAUDE.md` (project instructions) and `AGENTS.md`.
- Check `git status --short --branch`.

Conventions:
- Plain hand-written HTML + CSS. No framework, no build step for the site.
- Absolutely Plausible palette (`#3f7d9c` / `#1e2238` / `#6a4f9e` / `#eef0f2`) + Share Tech Mono.
- The paid PDF is never committed (gitignored).

Version rule:
- Current baseline: `v0.5.0` (source: `VERSION` at repo root).
- Bump on structural/content changes; keep `CLAUDE.md` and this README in sync.

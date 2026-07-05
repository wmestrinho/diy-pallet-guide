# DIY Pallet Project Guide

A practical, interactive course for building with reclaimed pallets: six free modules, five knowledge checks, saved progress, a Quick Start Checklist, and a real worked example. A printable $17 PDF is available separately.

A project by **Absolutely Plausible**. Licensed [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Status

`v0.7.0` — live at <https://diy.recyclopedia.cc/> (Cloudflare Pages). See `CLAUDE.md` for pending items.

## Deployment

Cloudflare Pages serves the repository root with no build command. Pushes to
`main` deploy automatically. The Pages output directory is `/`.

## Validation

```sh
node --check course.js
node --check docs/assets/pallet-quizzes.js
python internal/scripts/validate_agent_baseline.py
```

## What's here

Two hand-written HTML pages, served directly by Cloudflare Pages (no build step, output dir `/`):

- **`index.html`** — interactive six-module course and the $17 printable-guide offer.
- **`course.js`** — saved progress, checklist state, mobile navigation, and interactive quizzes.
- **`dj-pallet-table.html`** — free standalone case study: the DJ Pallet Table build, start to finish. Gumroad-style UI/UX recolored to the AP palette.
- **`style.css`** — shared LBG warm theme and responsive styles for both pages.

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
- LBG warm editorial theme: Newsreader + Hanken Grotesk, with Share Tech Mono reserved for labels.
- The paid PDF is never committed (gitignored).

Version rule:
- Current baseline: `v0.7.0` (source: `VERSION` at repo root).
- Bump on structural/content changes; keep `CLAUDE.md` and this README in sync.

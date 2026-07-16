# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What This Repo Is

A **public** interactive pallet-building course and product site by Absolutely Plausible. Two hand-written HTML pages (no framework, no build step):

1. **`index.html`** — free six-module course with saved progress, five knowledge checks, a Quick Start Checklist, real build photos, and the $17 printable PDF offer.
2. **`dj-pallet-table.html`** — a **free** standalone case study: the DJ Pallet Table build, start to finish, mapped to the 9-step process. It's the proof that drives the sale, styled after Gumroad's product-page UI/UX recolored to the AP palette. **Not part of the PDF.**

The repo is **public on GitHub**, so the paid PDF is never committed.

> MkDocs was retired in v0.4.0. The old `mkdocs.yml`, `overrides/`, `requirements.txt`, and the last built `site/` are archived under `internal/` for reference only — not served, not maintained.

## Stack

- `index.html` + `course.js` + `dj-pallet-table.html` + `style.css` at repo root — the pages Cloudflare Pages serves directly (no build command, output dir `/`).
- `docs/assets/pallet-quizzes.js` — question data for the five interactive knowledge checks.
- `docs/*.md` — the guide content. **Source of truth for the PDF**, and now cleanly mirrors it (4 files = the 4 PDF sections). Not published as a website. Kept render-ready so the method can later be published as **subscriber-gated web pages** (see Pending).
- `internal/pdf-build/` — tooling that regenerates `guide.pdf` from `docs/*.md`. Run `bash internal/pdf-build/build.sh` (needs python-markdown, npx/mermaid-cli, Chrome, ghostscript). Output `guide.pdf` is gitignored — it lives only locally + on Gumroad (`gumroad.com/l/ajfnh`).

## Content

- **PDF (paid):** `docs/index.md` — Start Here · `docs/basics.md` — sourcing, safety (HT vs MB), tools, prep · `docs/process.md` — the 9-step process (mermaid flow) · `docs/start-a-project-checklist.md` — Quick Start Checklist
- **Web (free):** `dj-pallet-table.html` — the DJ Pallet Table worked example (33 photos on a five-phase timeline: Source + Inspect / The Frame / Surface + Joinery / Finish + The Cutout / Install; each card shows a visible `✎` lesson strip). Its archived markdown source is `internal/dj-pallet-table.md` (no longer in `docs/`, since it's no longer in the PDF).
- Photos in `docs/assets/` — all 33 from the DJ Pallet Table build; used by both `index.html` and `dj-pallet-table.html`.

## Conventions

- `index.html` and `dj-pallet-table.html` each carry their own SEO + OG meta; `docs/*.md` keep YAML front-matter (`title`/`description`) as PDF metadata
- Mermaid diagrams pre-rendered to PNG for the PDF (`internal/pdf-build/*.png`)
- LBG warm editorial theme: oat paper, lettuce green, beet, grapefruit, Newsreader display type, Hanken Grotesk body type, and Share Tech Mono labels.
- `dj-pallet-table.html` uses Gumroad's product-page UI/UX (flat brutalist: hard navy borders, offset drop-shadows, press-on-hover buttons) recolored to the AP palette — all scoped under `body.gr` in `style.css`
- Licensed CC BY-NC 4.0

## Versioning

- `VERSION` file at repo root. Current: `v0.8.0`. Update the footer `<p class="footer-version">` in the same commit.

## Pending

- [ ] Upload `guide.pdf` to the Gumroad product + finalize its description (the PDF is now the method only — no DJ chapter)
- [ ] **`index.html` proof-line page count** — recompute after the next PDF rebuild and back-fill if you want a hard page count (currently described, not numbered)
- [ ] Add the DJ Pallet Table install photos + build video (media exists, not yet uploaded) — drop photos into `docs/assets/`, run `ap-ops/scripts/sync_assets.py`, then fill the `INSTALL MEDIA SLOT` comment in `dj-pallet-table.html` with a `.vtl-media` grid; host the video on YouTube/Stream (never commit video files — public repo)
- [ ] Decide where the 7 community-event photos (`docs/assets/img-0380.jpg`, `img-6579`–`6588`: pallet canvas frames, mural painting, DIY pallet sign) belong — they are NOT DJ-table install photos
- [ ] **Future: subscriber-gated web guide** — publish `docs/*.md` as web pages behind the planned monthly subscription (kept render-ready; no gate built yet)
- [ ] Consider adding more worked examples as AP completes more pallet builds

# AGENTS.md — diy-pallet-guide

Canonical path
- `C:/Users/wmest/Projects/diy-pallet-guide` on Windows
- `/Users/wmestrinho/Workspace/Projects/diy-pallet-guide`

Legacy path
- `/Users/wmestrinho/.openclaw/workspace/projects/diy-pallet-guide`
- Treat the legacy path as deprecated after migration. Do not start new work there unless Luiz explicitly says the migration is paused or reversed.

Project purpose
- See `README.md` for project-specific purpose and usage.

Required baseline for AI agents
- Read this file before editing.
- Check `git status --short --branch` before editing, committing, rebasing, or pushing.
- Preserve project-specific instructions in `CLAUDE.md` if present.
- Keep deployment notes current in `README.md`.
- Keep a visible version rule for web UIs.
- Run validation before commit.

Pit Board — owner decisions (read at session start)
- Every question only Luiz can answer lives on the workspace-wide **AP Ops Pit
  Board** (ops.absolutelyplausible.com → Pit Board). Read this repo's items
  before planning work:
  `node ../ap-ops/scripts/pitboard.mjs read --answered --repo diy-pallet-guide`
  (Seat 1 reads D1 directly; Seats 2–3 use the seat's Access service token —
  `ap-ops/docs/SATELLITE-OFFICE.md` § Board access).
- Act only on what he chose. Close what you finish, in the same commit as the
  work: `node ../ap-ops/scripts/pitboard.mjs close <key> "<what actually happened>"`.
- File new questions there (`pitboard.mjs file <item.json>`, `"repo": "diy-pallet-guide"`),
  never in chat. Never invent an answer he has not given.
- Rules: `ap-ops/docs/PITBOARD.md`.

Version rule
- Versioning, CHANGELOG, LICENSE, and CI conventions: [`ap-ops/docs/PROJECT-RULES.md`](https://github.com/wmestrinho/ap-ops/blob/main/docs/PROJECT-RULES.md) — canonical for every AP repo.

Deployment
- Static HTML/CSS/JS site. Cloudflare Pages serves the repository root with no build command.

Validation
- Run: `python internal/scripts/validate_agent_baseline.py`
- Also run any project-specific test/build/validation commands documented in `README.md`, `CLAUDE.md`, package scripts, or CI workflows.

Coordination warning
- Multiple AI agents may be working across this workspace. Do not run destructive git commands, delete files, rebase, or force-push without checking status and coordinating with Luiz.

Marketing audit (2026-09-29)
- 2026-09-29 — Seat 2 marketing audit: `docs/marketing/MARKETING-AUDIT-2026-09-29.md`
  (19 findings, MKT-01…MKT-19, re-check commands in §5).
- Next agent, Tier 1 (just do, in priority order): MKT-01 restore the paid-PDF block in
  `.gitignore` (P0), MKT-03 add `404.html`, MKT-10 image weight on the DJ page, MKT-11/12/13
  meta + JSON-LD + extensionless URLs, MKT-19. MKT-04 (stop serving internals) waits on
  the host decision in MKT-02.
- Waiting on Luiz (Tier 2/3): MKT-02 why production is stuck at v0.8.1 (Cloudflare
  dashboard), MKT-05 Gumroad listing rewrite, MKT-06 canonical home across the three
  domains, MKT-07 paid-offer differentiation, MKT-08/14/17 public copy and visuals,
  MKT-09/15/16/18 tracking, brand, email capture, Pinterest/YouTube.
- Note: under the current Pages deploy, repo `.md` files (including this one and the
  audit) are publicly served; see MKT-04.

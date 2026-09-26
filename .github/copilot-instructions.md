# Copilot instructions — DIY Pallet Guide

Authoritative agent guidance for this repo lives in [`CLAUDE.md`](../CLAUDE.md).
This file mirrors the key rules so Copilot's inline help stays aligned.

## What this repo is
A public-facing DIY guide to building things from reclaimed pallets, by
Absolutely Plausible. Static HTML/CSS landing page deployed to Cloudflare Pages at
`diy.recyclopedia.cc` (Pages project `diy-pallet-guide`).

## Rules that matter
- **Version:** `VERSION` file is the single source of truth (currently `v0.4.0`).
- **SEO:** it's a public resource — keep good titles, meta descriptions, and
  page metadata.
- **Brand:** warm Absolutely Plausible palette + Share Tech Mono.
- Content licensed **CC BY-NC 4.0** — preserve attribution.

## Paired sources of truth — never auto-edit without review
- `VERSION` ↔ any visible version string.

## Division of labor
Copilot: inline completions, HTML/CSS boilerplate, in-editor explanations.
Leave deploys and structural/content decisions to Claude Code.

## Commits
Convention: `type(scope): subject` with version where relevant (e.g.
`feat: … (v0.4.0)`).

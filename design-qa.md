# Design QA — DIY Recyclopedia course

## Evidence

- Source visual truth: `docs/assets/DIY Pallet Course.dc.html`
- Source capture: `qa-source-course-html.png`
- Implementation capture: `qa-implementation-desktop.png`
- Mobile capture: `qa-implementation-mobile-390.png`
- Side-by-side comparison: `qa-comparison.png`
- Desktop viewport: 1440 × 1000
- Mobile viewport: 390 CSS px wide
- State: course landing, zero progress, Module 01 open, quizzes ready

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: Newsreader, Hanken Grotesk, and Share Tech Mono match the
  source roles and maintain the same editorial hierarchy.
- Spacing and layout rhythm: hero, progress, safety notice, module stack, radii,
  and responsive spacing match the supplied composition.
- Colors and visual tokens: oat, lettuce, beet, grapefruit, ink, and divider
  colors match the supplied theme.
- Image quality and asset fidelity: the implementation uses the real,
  high-resolution DJ Pallet Table photograph supplied in the repository. This is
  an intentional improvement over the unavailable mockup image path.
- Copy and content: course framing, module count, safety rule, progress language,
  and knowledge-check structure follow the supplied design.
- Interactions: Chrome verification passed for quiz answer feedback and persistent
  module-progress updates.

## Focused Comparison

The 390px mobile capture was used as the focused comparison for hero wrapping,
navigation, pills, card inset, and safety-callout legibility. No clipping or
horizontal overflow remains.

## Patches Made During QA

- Reduced and rewrapped the mobile display heading.
- Constrained mobile navigation and context-strip spacing.
- Added explicit horizontal-overflow protection.

## Follow-up Polish

The production page intentionally adds persistent navigation and a real project
photo; these differences support the live product and are accepted.

final result: passed

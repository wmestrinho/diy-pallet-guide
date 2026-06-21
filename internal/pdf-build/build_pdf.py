#!/usr/bin/env python3
"""Assemble the 5 guide markdown files into one print-ready HTML for PDF export.

One-time / regenerable build step. Source of truth stays in docs/*.md.
Run, then print to PDF with headless Chrome (see build.sh).
"""
import re
import pathlib
import markdown

ROOT = pathlib.Path(__file__).resolve().parents[2]          # repo root
DOCS = ROOT / "docs"
BUILD = ROOT / "internal" / "pdf-build"
ASSETS = (BUILD / "img").as_uri()        # compressed copies (see build.sh)
DIAG = BUILD.as_uri()

# order matters — this is the reading order of the PDF
FILES = ["index", "basics", "process", "dj-pallet-table", "start-a-project-checklist"]

FRONTMATTER = re.compile(r"^---\n.*?\n---\n", re.DOTALL)
HEAD_ANCHOR = re.compile(r"\s*\{\s*#[^}]+\}")               # strip { #anchor }
MD_LINK = re.compile(r"\[([^\]]+)\]\([^)]*\.md[^)]*\)")     # de-link internal links
MERMAID = re.compile(r"```mermaid\n.*?\n```", re.DOTALL)


def preprocess(name: str, text: str) -> str:
    text = FRONTMATTER.sub("", text, count=1)
    text = HEAD_ANCHOR.sub("", text)
    text = MD_LINK.sub(r"\1", text)                         # keep label, drop link
    # swap the mermaid fence for the pre-rendered diagram
    if name == "basics":
        text = MERMAID.sub(
            f'<img class="diagram" src="{DIAG}/safety-flow.png" '
            f'alt="Pallet safety decision flow">', text)
    elif name == "process":
        text = MERMAID.sub(
            f'<img class="diagram diagram--wide" src="{DIAG}/process-flow.png" '
            f'alt="The 9-step process flow">', text)
    # absolute image paths
    text = text.replace("](assets/", f"]({ASSETS}/")
    text = text.replace('src="assets/', f'src="{ASSETS}/')
    return text


md = markdown.Markdown(extensions=[
    "tables", "admonition", "attr_list", "md_in_html",
    "sane_lists", "fenced_code",
])

sections = []
for name in FILES:
    raw = (DOCS / f"{name}.md").read_text(encoding="utf-8")
    html = md.convert(preprocess(name, raw))
    md.reset()
    sections.append(f'<section class="doc doc--{name}">\n{html}\n</section>')

body = "\n".join(sections)

COVER = """
<section class="cover">
  <div class="cover-wordmark">Absolutely Plausible</div>
  <h1 class="cover-title">Build Real Things<br>from Pallet Wood</h1>
  <p class="cover-sub">A practical field guide to sourcing, prepping,<br>
     and building furniture from reclaimed pallets.</p>
  <p class="cover-tag">Zero-waste &middot; 100% upcycled &middot; No filler</p>
  <div class="cover-meta">
    The 9-step process &middot; Safety decision flow &middot; Quick Start Checklist<br>
    Full worked example &mdash; the DJ Pallet Table &middot; 33 photos
  </div>
  <div class="cover-foot">diy.recyclopedia.cc &middot; CC BY-NC 4.0</div>
</section>
"""

CSS = """
@page { size: Letter; margin: 18mm 16mm; }
* { box-sizing: border-box; }
body {
  font-family: 'Share Tech Mono', ui-monospace, 'JetBrains Mono', monospace;
  color: #1e2238; background: #fff; line-height: 1.5;
  font-size: 10.5pt; margin: 0;
}
a { color: #3f7d9c; text-decoration: none; }
h1, h2, h3 { color: #4b5fa8; font-weight: 700; line-height: 1.25; }
h1 { font-size: 19pt; border-bottom: 2px solid #3f7d9c; padding-bottom: .3em; margin: 0 0 .7em; }
h2 { font-size: 13.5pt; margin: 1.4em 0 .5em; }
h3 { font-size: 11.5pt; color: #6a4f9e; margin: 1.1em 0 .4em; }
p { margin: .55em 0; }
ul, ol { margin: .5em 0 .7em; padding-left: 1.3em; }
li { margin: .25em 0; }
blockquote { border-left: 3px solid #3f7d9c; margin: 1em 0; padding: .2em 0 .2em 1em;
  color: #3a3f5c; font-style: normal; background: #f5f6f9; }
code { background: #f0f2f6; color: #6a4f9e; padding: .08em .35em; border-radius: 3px; font-size: .92em; }
hr { border: none; border-top: 1px solid #d3d8e0; margin: 1.6em 0; }

table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 9.5pt; }
th, td { border: 1px solid #c4ccd6; padding: .4em .55em; text-align: left; vertical-align: top; }
th { background: #eef0f2; color: #1e2238; }

img.diagram { display: block; max-width: 78%; margin: 1.2em auto; }
img.diagram--wide { max-width: 100%; }

.photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin: 1em 0; }
.photo-grid p { display: contents; margin: 0; }
.photo-grid img { width: 100%; height: 115px; object-fit: cover; display: block; border-radius: 3px; }

.step-badge { display: inline-block; background: #3f7d9c; color: #fff; width: 1.7em; height: 1.7em;
  line-height: 1.7em; text-align: center; border-radius: 50%; font-weight: 700; margin: 0 .15em .3em 0; }

.build-timeline { display: flex; flex-wrap: wrap; gap: 6px; margin: 1.2em 0 1.6em; }
.tl-step { flex: 1 1 70px; text-align: center; border-top: 2px solid #3f7d9c; padding-top: .4em; }
.tl-step.pending { border-top-style: dashed; opacity: .65; }
.tl-label { font-size: 8.5pt; font-weight: 700; }
.tl-date { font-size: 7.5pt; color: #4b5fa8; }

.admonition { border: 1px solid #c4ccd6; border-left: 4px solid #3f7d9c; background: #f5f6f9;
  padding: .6em .9em; margin: 1.1em 0; border-radius: 3px; }
.admonition.danger { border-left-color: #b5402f; background: #fbf0ee; }
.admonition.tip { border-left-color: #3f7d9c; }
.admonition-title { font-weight: 700; margin: 0 0 .3em; color: #1e2238; }
.admonition.danger .admonition-title { color: #b5402f; }
.admonition p:last-child { margin-bottom: 0; }

/* cover */
.cover { height: 248mm; display: flex; flex-direction: column; justify-content: center;
  text-align: center; page-break-after: always; }
.cover-wordmark { letter-spacing: .22em; text-transform: uppercase; font-size: 11pt;
  color: #3f7d9c; margin-bottom: 2.2em; }
.cover-title { font-size: 34pt; border: none; color: #1e2238; line-height: 1.15; margin: 0; }
.cover-sub { font-size: 12.5pt; color: #4b5fa8; margin: 1.4em 0 .6em; }
.cover-tag { font-size: 10.5pt; color: #6a4f9e; letter-spacing: .04em; }
.cover-meta { font-size: 9.5pt; color: #3a3f5c; margin-top: 3.5em; line-height: 1.9; }
.cover-foot { font-size: 9pt; color: #8a90a3; margin-top: 3.2em; }

.doc { page-break-before: always; }
.doc--index { page-break-before: avoid; }
h2, h3 { page-break-after: avoid; }
table, .photo-grid, img.diagram, .admonition { page-break-inside: avoid; }
"""

OUT = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>Build Real Things from Pallet Wood</title>
<style>{CSS}</style></head>
<body>
{COVER}
{body}
</body></html>"""

(BUILD / "guide-print.html").write_text(OUT, encoding="utf-8")
print("wrote", BUILD / "guide-print.html", f"({len(OUT)} bytes)")

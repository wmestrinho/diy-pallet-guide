#!/usr/bin/env bash
# Regenerate guide.pdf from docs/*.md — the $17 Gumroad product.
# One-time/launch tooling. Output (guide.pdf) is gitignored: the repo is PUBLIC,
# so the paid PDF must never be committed. It lives only locally + on Gumroad.
#
# Requirements: python3 + python-markdown, npx (mermaid-cli), macOS sips,
#               Google Chrome (headless print), ghostscript (gs).
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(cd ../.. && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

echo "1/4  rendering mermaid diagrams -> PNG"
npx -y @mermaid-js/mermaid-cli -i safety-flow.mmd  -o safety-flow.png  -c mermaid-config.json -b white -s 2
npx -y @mermaid-js/mermaid-cli -i process-flow.mmd -o process-flow.png -c mermaid-config.json -b white -s 2

echo "2/4  compressing the 33 build photos for print"
mkdir -p img
for f in "$ROOT"/docs/assets/IMG_*.jpg; do
  sips -Z 1100 -s format jpeg -s formatOptions 60 "$f" --out "img/$(basename "$f")" >/dev/null
done

echo "3/4  assembling print HTML"
python3 build_pdf.py

echo "4/4  printing to PDF + compressing (ghostscript /ebook, 150dpi)"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 \
  --print-to-pdf="$ROOT/guide-raw.pdf" "file://$PWD/guide-print.html" 2>/dev/null
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
  -dDetectDuplicateImages=true -dColorImageResolution=150 -dGrayImageResolution=150 \
  -sOutputFile="$ROOT/guide.pdf" "$ROOT/guide-raw.pdf"
rm -f "$ROOT/guide-raw.pdf"

echo "done -> $ROOT/guide.pdf"
ls -lh "$ROOT/guide.pdf" | awk '{print "    "$5}'

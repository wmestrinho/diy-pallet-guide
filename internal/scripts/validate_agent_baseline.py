#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
errors = []
GUMROAD_URL = "https://absolutelyplausible.gumroad.com/l/ajfnh"
PUBLIC_HTML = [
    "index.html",
    "dj-pallet-table.html",
    "privacy.html",
    "terms.html",
]

def require(path, label):
    if not path.exists():
        errors.append(f"Missing {label}: {path.relative_to(ROOT)}")

require(ROOT / "README.md", "README")
if not (ROOT / "AGENTS.md").exists() and not (ROOT / "CLAUDE.md").exists():
    errors.append("Missing AI-agent instructions: AGENTS.md or CLAUDE.md")
require(ROOT / "VERSION", "VERSION")

if (ROOT / "VERSION").exists():
    version = (ROOT / "VERSION").read_text(errors="replace").strip().splitlines()[0].strip()
    if not re.fullmatch(r"v\d+\.\d+\.\d+(?: (?:alpha|beta|rc))?", version):
        errors.append(f"VERSION has invalid format: {version!r}")
else:
    version = None

readme = ROOT / "README.md"
if readme.exists():
    txt = readme.read_text(errors="replace")
    for phrase in ["Deployment", "Version", "Validation"]:
        if phrase.lower() not in txt.lower():
            errors.append(f"README.md missing {phrase} notes")

for rel in PUBLIC_HTML:
    html_path = ROOT / rel
    if not html_path.exists():
        errors.append(f"Missing public HTML page: {rel}")
        continue
    html = html_path.read_text(errors="replace")

    if version and version not in html:
        errors.append(f"{rel} does not display VERSION {version}")

    if "buy.stripe.com/test_" in html:
        errors.append(f"{rel} still contains a test Stripe Payment Link")

for offer_path in [ROOT / "index.html", ROOT / "dj-pallet-table.html"]:
    if offer_path.exists():
        html = offer_path.read_text(errors="replace")
        if GUMROAD_URL not in html:
            errors.append(f"{offer_path.name} missing Gumroad purchase URL")

if errors:
    print("AGENT BASELINE VALIDATION FAILED")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("AGENT BASELINE VALIDATION OK")

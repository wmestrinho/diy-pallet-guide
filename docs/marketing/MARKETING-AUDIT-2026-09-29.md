# Marketing audit: diy.recyclopedia.cc (2026-09-29)

Auditor: Seat 2 agent (`lenovo-thinkpad-x260`). Scope: the public product site
https://diy.recyclopedia.cc, the public Gumroad listing it sells through, and public
search results. Everything here comes from public pages and this public repo.
The audit was read-only against production: no forms submitted, no purchase, no sign-up.

> **Deploy exposure note.** Right now Cloudflare Pages serves the *whole repository
> root*: `/docs/*.md`, `/CLAUDE.md`, `/AGENTS.md` and `/internal/*` all return 200 on
> the live site (see MKT-04). Pages has no ignore file, so this document could not be
> excluded without changing the site. It will be reachable at
> `/docs/marketing/MARKETING-AUDIT-2026-09-29.md` once `main` deploys again, the same
> way the other docs are reachable today. It holds no private data, and the repo is
> public on GitHub anyway. Fixing MKT-04 hides it along with every other internal file.

---

## 1. Summary

The free six-module course clearly explains what it teaches, and the safety-first
tone (HT vs MB) is credible and consistent. The paid product has two problems. The
first is the storefront. The Gumroad listing contradicts the site on price ("$7.99
pay-what-you-want"), on contents (it says the DJ build is inside the PDF), and on
license ("free to share"). It has no cover image, empty community placeholders and
zero ratings. The second is plumbing. Production is two releases behind `main`, so
the v0.8.2/0.8.3 SEO work (robots.txt, sitemap, image renames) never shipped. Every
unknown URL returns the homepage with a 200 status. The paid PDF's `.gitignore`
guard was removed on `main`. The domain does not appear in search at all, while
free copies of the same guide on recyclopedia.cc and lettucebeetgrapefruit.org do
show up, and those copies have no buy button. There is no conversion measurement
and no email capture.

**Top 5 priorities**
1. **MKT-01 (P0):** restore the paid-PDF lines in `.gitignore` before someone commits the product by accident.
2. **MKT-02 (P0):** find out why production stopped deploying (live is v0.8.1, `main` is 0.8.3) and fix the pipeline.
3. **MKT-05 (P1):** rewrite the Gumroad listing (price, contents, license, cover, refund policy, placeholders).
4. **MKT-06 (P1):** pick one canonical home for the pallet guide across the three domains, add canonicals, and put a buy link on the copies.
5. **MKT-03 / MKT-04 (P1):** add a real 404 and stop serving repo internals (including the PDF's markdown source).

## 2. Scorecard

| Area | Grade | Reason |
|---|---|---|
| Positioning & messaging | C | The free course reads clearly. The paid PDF has no stated reason to exist beyond "printable", and three brands compete in the first screen. |
| Conversion paths | D | One buy CTA on the home page, placed at the very bottom. No preview, testimonials or guarantee near the CTA. The Gumroad page contradicts the site. |
| On-page SEO | C- | Titles, descriptions, H1 and alt text are good. No canonical, structured data or favicon. Descriptions are too long. `.html` URLs redirect. |
| Technical SEO | F | robots.txt and sitemap.xml return the homepage HTML. Soft 404s everywhere. Production is stale. Repo internals are served. |
| Performance | D | The DJ page loads about 7.6 MB of eager, unsized JPEGs. |
| Measurement | F | Only the Cloudflare page-view beacon. No CTA or outbound tracking, no UTM links. |
| Search presence | F | `site:diy.recyclopedia.cc` returns nothing. Brand searches surface the LBG copy instead. |
| Social / Pinterest / video | F | No presence, although the niche is Pinterest-heavy and the photos are portrait and pin-ready. |
| Legal & trust | C | Privacy and terms pages exist and are clear, but the privacy notice says "no analytics" while an analytics beacon runs. The refund promise is not reflected on Gumroad. |

## 3. Findings

Checked on 2026-09-29 with `curl -sL -A "Mozilla/5.0"` unless stated otherwise.
"Live" means https://diy.recyclopedia.cc. File and line references are to `origin/main` @ `cdd7514`.

### MKT-01 — Paid-PDF `.gitignore` guard removed on `main` · P0 · Tier 1
- **Evidence:** `git diff 4ddf00a cdd7514 -- .gitignore` shows that merge PR #1
  (`cloudflare/workers-autoconfig`, 2026-09-26) replaced the block
  "The paid product — repo is PUBLIC, never commit the PDF" (`guide.pdf`,
  `guide-raw.pdf`, `docs/assets/DIY Pallet Guide.pdf`, `docs/assets/DIY Pallet Course.pdf`,
  `docs/assets/*.dc.html`, `docs/assets/*.zip`, `qa-*.png`, `qa-comparison.html`, PDF build
  artifacts) with wrangler entries. In the shared checkout, `git status --short` now
  lists `docs/assets/DIY Pallet Guide.pdf` and `qa-*.png` as untracked (addable)
  instead of ignored. The live site still serves the older `.gitignore` that has the guard (`/.gitignore`, 633 bytes).
- **Why it matters:** the repo is public. One `git add -A` publishes the $17 product for free.
- **Fix:** restore the removed block and keep the new wrangler lines. `.gitignore` is not
  `.md`, so the CI version check needs a patch bump plus the footer update on all 4 pages.

### MKT-02 — Production is stale; deploy pipeline appears stalled · P0 · Tier 3 (dashboard), Tier 1 (config)
- **Evidence:** the live footer shows `v0.8.1` and `curl .../VERSION` returns `v0.8.1`, while
  `main` VERSION is `0.8.3` (released 2026-09-05). The v0.8.2 work is not live:
  `/robots.txt` and `/sitemap.xml` return `text/html` (the homepage), and
  `/docs/assets/dj-pallet-table-finished.jpg` returns the homepage HTML. The live HTML
  carries an injected "Cloudflare Pages Analytics" comment, so Pages serves the domain.
  `wrangler.jsonc` (added by PR #1) sets `assets.directory: "site"`, but `site/` is
  gitignored and does not exist. A Worker named `diy-pallet-guide` exists in the
  account but has not been modified since June (read-only Cloudflare API list).
  README and AGENTS.md still say "Pages serves the repository root … pushes to `main` deploy automatically".
- **Why it matters:** every SEO or copy fix merged to `main` is invisible to customers
  and search engines until deploys resume.
- **Fix:** Luiz, or an agent with dashboard access, checks the Pages project
  `diy-pallet-guide` deployment log and production branch. Then either (a) keep Pages
  and delete or repair `wrangler.jsonc`, or (b) move to Workers static assets with
  `assets.directory: "."` and a root `.assetsignore` (the pattern `ap-ops` uses), and
  move the custom domain. Update README and AGENTS.md "Deployment" to match.

### MKT-03 — Soft 404s; robots.txt, sitemap.xml and favicon return the homepage · P1 · Tier 1
- **Evidence:** `/does-not-exist-xyz`, `/favicon.ico`, `/robots.txt`, `/sitemap.xml`,
  `/LICENSE` and `/guide.pdf` all return **200 text/html, 22,267 bytes** (the homepage).
  Pages falls back to the SPA homepage because the repo has no `404.html`.
- **Why it matters:** Google treats this as soft-404 noise, crawlers cannot find the
  sitemap, and broken inbound links look like working pages.
- **Fix:** add `404.html` (Pages then returns a real 404). Confirm robots.txt and sitemap.xml return `text/plain` and `application/xml` after MKT-02.

### MKT-04 — Repo internals and the PDF's markdown source are publicly served · P1 · Tier 1 (after MKT-02 decision)
- **Evidence (all 200):** `/CLAUDE.md`, `/AGENTS.md`, `/README.md`, `/design-qa.md`,
  `/.github/copilot-instructions.md`, `/.gitignore`, `/CNAME`, `/internal/mkdocs.yml`,
  `/internal/dj-pallet-table.md`, `/internal/pdf-build/build.sh`, and
  `/docs/index.md`, `/docs/basics.md`, `/docs/process.md`,
  `/docs/start-a-project-checklist.md` (these four are the full source of the paid PDF).
  `qa-*.png`, `qa-comparison.html` and the `.dc.html`/`.pdf`/`.zip` design exports are
  **not** served (they return the homepage fallback) because they were never committed.
- **Why it matters:** the paid PDF's text is one URL away on the product's own domain.
  Agent notes and the build tooling are indexable. (It is also on public GitHub, but
  the product domain should not hand it out.)
- **Fix:** with option (b) in MKT-02, add a root `.assetsignore` covering `*.md`, `internal/`,
  `docs/*.md`, `docs/marketing/`, `docs/stylesheets/`, `.github/`, `.gitignore`, `CNAME`,
  `VERSION`, `wrangler.jsonc`, `LICENSE`, `qa-*`. With Pages, move public files into a
  `public/` output directory instead. Pages cannot ignore files in the root output directory.

### MKT-05 — Gumroad listing contradicts the site and is unfinished · P1 · Tier 3
- **Evidence:** public page https://absolutelyplausible.gumroad.com/l/ajfnh (200). The
  description says "Pay what feels right. $7.99 is the bottom line", but the product
  JSON has `price_cents: 1700` and `pwyw.suggested_price_cents: 1700`, and the site says $17.
  The description also says "Full worked example: the DJ Pallet Table … 33 photos", but
  CLAUDE.md states the DJ example is **not** in the PDF. It contains empty placeholders
  ("Whatsapp Community: Discord Server: Clubhouse: Instagram:"), a pasted keyword list
  ("DIY, pallet furniture, woodworking, … free"), and "CC BY-NC 4.0 — free to read and
  share", which conflicts with the site terms ("don't re-sell, re-post, or share the
  file publicly"). `main_cover_id`, `thumbnail_url`, `summary` and `refund_policy` are all
  null. `og:image` is Gumroad's generic image. `ratings.count` is 0.
- **Why it matters:** this is the last page before payment. Price confusion and
  contradictory contents stop buyers, and shares of the Gumroad link show a Gumroad logo instead of the table.
- **Fix:** Luiz edits the listing. Set one price, state what is and is not inside, add a
  cover (the finished-table photo) and a thumbnail, fill "summary" / "what you get",
  set the refund policy to match the 14-day promise in `terms.html`, remove the
  placeholders and keyword stuffing, and align the license line with the terms.

### MKT-06 — Not indexed; duplicate guide on two other domains with no path to purchase · P1 · Tier 3 (decision) + Tier 1 (canonicals)
- **Evidence:** WebSearch `site:diy.recyclopedia.cc` found no results. `"DIY Recyclopedia" pallet`
  returns `https://lettucebeetgrapefruit.org/diy/pallet-guide/` as the top hit. The same
  guide is live at `https://recyclopedia.cc/diy/pallet-guide/` and
  `https://recyclopedia.cc/diy/dj-pallet-table/` (both in recyclopedia.cc's sitemap) and at
  `https://lettucebeetgrapefruit.org/diy/pallet-guide/` and `/diy/dj-pallet-table/`.
  None of these copies has a `<link rel="canonical">`, a Gumroad link, or a link to
  diy.recyclopedia.cc. diy.recyclopedia.cc has no canonical either.
- **Why it matters:** search engines pick one copy (currently LBG), and that copy
  cannot sell. The product site gets no organic traffic.
- **Fix:** Luiz decides which URL is canonical for "pallet guide". Then add
  `rel=canonical` on every copy pointing to it, add the $17 CTA on the non-canonical
  copies (those live in the recyclopedia / LBG repos), and submit the sitemap in
  Google Search Console and Bing Webmaster Tools (account access, Tier 3).

### MKT-07 — Weak case for paying; single late CTA; no proof near the offer · P1 · Tier 3 (positioning) + Tier 2 (copy/layout)
- **Evidence:** home page (live): the offer card says "Take the sourcing rules, safety
  decisions, nine-step method, and Quick Start Checklist into the workshop" — the same
  six things the free course teaches above it. The only buy CTA on the home page is at
  `index.html:328`, after all 6 modules and the showcase. The hero CTA is
  "Start with Module 01". There are no sample pages, table of contents, page count,
  testimonials or build-photo reviews. The 14-day refund appears only on `/terms`.
- **Why it matters:** visitors get everything free and see no reason to pay $17. Those
  who would pay for convenience only reach the button at the end of a long page.
- **Fix (Luiz):** give the PDF a clear premium difference (for example, printable cut
  lists or 1–3 project plans, a shop-wall safety poster, or a checklist PDF). The
  Etsy competitors sell *projects*, not *method*. **Fix (Tier 2):** add a compact offer
  strip after Module 02 and at course completion (100% progress state), show 2–3 PDF
  page previews, and put "14-day no-questions refund" next to every buy button.

### MKT-08 — Privacy notice says "no analytics" while an analytics beacon runs · P1 · Tier 2
- **Evidence:** all four live pages load `static.cloudflareinsights.com/beacon.min.js`
  (Cloudflare Web Analytics, auto-injected by Pages). `privacy.html:7` and `:30` say
  "No accounts, no analytics, no cookies" and "It's two static pages" (there are four).
- **Why it matters:** a factual inaccuracy in a legal notice hurts trust. The beacon
  is cookieless, so no consent banner is needed, but it must be disclosed.
- **Fix:** reword it: "privacy-friendly, cookieless page-view counts via Cloudflare Web
  Analytics; no personal profiles", and correct the page count. Alternatively turn the beacon off.

### MKT-09 — No conversion measurement · P1 · Tier 3 (accounts) + Tier 1 (link tagging)
- **Evidence:** all three buy links point to the bare
  `https://absolutelyplausible.gumroad.com/l/ajfnh` (`index.html:328`,
  `dj-pallet-table.html:51`, `:333`). There are no UTM or per-CTA parameters and no
  click events. Cloudflare Web Analytics gives page views only.
- **Why it matters:** there is no way to tell which page or button sells, or whether
  the DJ case study works as "the proof that drives the sale".
- **Fix:** tag each CTA distinctly (for example `?utm_source=diy.recyclopedia.cc&utm_medium=site&utm_content=home-offer`)
  and read the results in Gumroad's analytics. Optionally use Gumroad's overlay
  checkout. Luiz chooses whether to add a privacy-friendly event tool (then update MKT-08 copy).

### MKT-10 — DJ page ships about 7.6 MB of eager, unsized images · P1 · Tier 1
- **Evidence:** live `/dj-pallet-table` has 12 `<img>` tags with no `loading`, no `width` or
  `height`, and no `srcset` (`dj-pallet-table.html:35`, `:82` …). The 11 unique JPEGs total
  7,581,330 bytes (450 KB–1 MB each). The home hero `IMG_4963.jpg` is 645 KB and eager
  (acceptable for LCP, but oversized). Home thumbnails are lazy (good).
- **Why it matters:** the page is slow on mobile data and shifts its layout as images
  load. Pallet DIY traffic is mostly mobile (Pinterest).
- **Fix:** export 800 px and 1600 px WebP/AVIF versions, add `width`/`height`,
  `loading="lazy"` below the fold, `decoding="async"` and `srcset`. Target under 1.5 MB per page view.

### MKT-11 — Meta hygiene gaps · P2 · Tier 1
- **Evidence (live):** no `<link rel="canonical">` on any page. No `<link rel="icon">`.
  No `twitter:title`/`twitter:description`. Privacy and terms have no `og:image` and **no `<h1>`**
  (h1 count 0). Meta description lengths are 179 (home) and 189 (DJ) characters, over the
  150–160 rule in `ap-ops/docs/PROJECT-RULES.md` §7.
- **Fix:** add canonical, favicon, and twitter title/description to all 4 pages, an H1 on privacy/terms, and trim the descriptions.

### MKT-12 — No structured data · P2 · Tier 1
- **Evidence:** no `application/ld+json` on any live page.
- **Fix:** add `Course` (free, 6 modules) on home, `Product` + `Offer` (price 17 USD,
  `url` Gumroad) for the guide, and `Article`/`HowTo` on the DJ page. Validate with Google's Rich Results Test.

### MKT-13 — `.html` URLs everywhere, but the site serves extensionless · P2 · Tier 1
- **Evidence:** `/dj-pallet-table.html`, `/privacy.html` and `/terms.html` return **308** to
  extensionless URLs. `sitemap.xml`, `og:url` (`dj-pallet-table.html:11`,
  `privacy.html:9`, `terms.html:9`) and internal `href`s all use `.html`.
- **Fix:** use extensionless URLs in the sitemap, og:url, canonicals and internal links (or match whatever the final host serves after MKT-02).

### MKT-14 — Outdated and contradictory build copy · P2 · Tier 2
- **Evidence:** `dj-pallet-table.html:57` Status says "Near-final — cutout confirmed, final
  cut + install pending", while Phase 5 on the same page says "Installed · Jun 29".
  The pill "33 photos archived" (`:44`) sits on a page showing 12. `:301` says
  "Install-night photos and the full build video land here next." The home showcase
  still frames the table as "Near-final".
- **Fix:** update the status to "Installed Jun 29, 2026". Either show the install
  photos and video or drop the promise. Reword the photo pill.

### MKT-15 — Three brands in the first screen; name collision · P2 · Tier 3
- **Evidence:** home top strip "Lettuce Beet Grapefruit Academy · Track 1: Citizen Science
  & Action / Project module · hands-on capstone" (`index.html:25`), then the "DIY
  Recyclopedia" wordmark, then "A guide by Absolutely Plausible". The title tag says
  "DIY Recyclopedia", while the DJ page title says "Absolutely Plausible". Search for the
  brand also surfaces the unrelated `recyclopedia.wordpress.com`.
- **Fix:** Luiz picks the buyer-facing brand for this product and the order of the
  sub-brands. Make the title suffix consistent across pages.

### MKT-16 — No email capture or lead magnet · P2 · Tier 3
- **Evidence:** no form or newsletter on any page. The privacy notice explicitly promises
  buyers will not be added to a list.
- **Fix:** offer the Quick Start Checklist (or safety one-pager) as a free printable in
  exchange for an email address. This needs an email service account and a privacy-copy update (Luiz).

### MKT-17 — Social share image is portrait · P2 · Tier 2
- **Evidence:** `og:image` = `IMG_4963.jpg` 1200×1600 (portrait, 645 KB) with
  `twitter:card=summary_large_image`, which expects about 1.91:1. On `main` it is renamed to `dj-pallet-table-finished.jpg` but has the same shape.
- **Fix:** make a 1200×630 card (finished-table photo + "Build Real Things from Pallet Wood" + "$17 guide / free course"). Keep a 1000×1500 version for Pinterest.

### MKT-18 — No Pinterest / YouTube / Reddit presence · P2 · Tier 3
- **Evidence:** pallet-DIY search results are dominated by Pinterest boards and
  1001pallets. There are no social links for the product, and the build video mentioned in CLAUDE.md "Pending" is not published.
- **Fix:** Luiz decides on a Pinterest business account. Pin the 33 portrait build
  photos with process captions linking to the DJ page. Put the build video on YouTube
  with a description link. Reddit (r/palletprojects, r/woodworking) needs a genuine build post, not ads.

### MKT-19 — Internal authoring note in public page source · P3 · Tier 1
- **Evidence:** `dj-pallet-table.html:303` HTML comment "INSTALL MEDIA SLOT — … run ap-ops/scripts/sync_assets.py …" (visible in view-source).
- **Fix:** replace it with a neutral comment, or remove it when the install media is added.

### Competitor snapshot (brief)
- **1001pallets.com** has free printable PDF plans, thousands of project pages, and a
  pallet-safety article that ranks for the "is my pallet safe" query. It is better at
  project volume and SEO depth.
- **Etsy pallet ebooks** (for example "DIY Pallet Projects PDF: 18 build guides, 152 pages",
  "Wood Pallet Wonders", 4.8★) sell *projects* with page counts and reviews in the listing. They are better at concrete deliverables and social proof.
- **Skyhorse, "The Essential Guide to Wood Pallet Projects"** is a print book with a publisher's authority.
- **Our edge:** a documented real build plus a strict safety method. That is
  differentiated, but it is not yet shown as a premium deliverable (MKT-07).

## 4. Checklist

### Tier 1 — agent can ship (verifiable)
- [ ] MKT-01 Restore the paid-PDF / design-export / QA-capture block in `.gitignore` (patch bump + footers).
- [ ] MKT-02 (config half) After Luiz confirms the host, repair or remove `wrangler.jsonc` and fix the README/AGENTS "Deployment" text.
- [ ] MKT-03 Add `404.html`; confirm robots.txt and sitemap.xml return the right content types.
- [ ] MKT-04 Stop serving internals (`.assetsignore` for Workers, or a `public/` output directory for Pages).
- [ ] MKT-10 Compress and resize images, add width/height/lazy/srcset on the DJ page.
- [ ] MKT-11 Canonical, favicon, twitter title/description, H1 on privacy/terms, trim meta descriptions.
- [ ] MKT-12 JSON-LD: Course, Product/Offer, Article/HowTo.
- [ ] MKT-13 Extensionless URLs in the sitemap, og:url and internal links.
- [ ] MKT-09 (tagging half) UTM/per-CTA Gumroad links once Luiz approves.
- [ ] MKT-06 (canonical half) `rel=canonical` on this site once Luiz picks the canonical home.
- [ ] MKT-19 Remove the internal authoring comment.

### Tier 2 — public copy / visual → branch + Luiz review
- [ ] MKT-07 Offer strip after Module 02 and at 100% progress, PDF previews, refund line next to each CTA.
- [ ] MKT-08 Privacy notice: disclose Cloudflare Web Analytics, fix the "two static pages" line.
- [ ] MKT-14 DJ page status, photo count and install-media promise.
- [ ] MKT-17 1200×630 social card (+ Pinterest variant).

### Tier 3 — Luiz only
- [ ] MKT-02 Check the Pages/Worker deployment in the Cloudflare dashboard and choose the host.
- [ ] MKT-05 Rewrite the Gumroad listing: price, contents, license, cover, summary, refund policy, placeholders.
- [ ] MKT-06 Pick the canonical home across diy.recyclopedia.cc / recyclopedia.cc/diy / lettucebeetgrapefruit.org/diy. Set up Search Console and Bing.
- [ ] MKT-07 Decide what makes the $17 PDF worth paying for over the free course.
- [ ] MKT-09 Choose a conversion-tracking approach.
- [ ] MKT-15 Buyer-facing brand and sub-brand order.
- [ ] MKT-16 Email capture and lead magnet (email service account).
- [ ] MKT-18 Pinterest / YouTube / Reddit presence.

## 5. Method & re-check commands

Run from Git Bash. `B=https://diy.recyclopedia.cc`; `UA="Mozilla/5.0"`.

```bash
B=https://diy.recyclopedia.cc; UA="Mozilla/5.0"

# MKT-01  guard present? (expect the paid-PDF lines)
git show origin/main:.gitignore | grep -n "guide.pdf\|DIY Pallet Guide.pdf" || echo "MISSING"
git check-ignore -v "docs/assets/DIY Pallet Guide.pdf" || echo "NOT IGNORED"

# MKT-02  live version vs main
curl -s $B/VERSION; echo; git show origin/main:VERSION
curl -s -A "$UA" $B/ | grep -o "Cloudflare Pages Analytics" | head -1
git show origin/main:wrangler.jsonc | grep -A1 '"assets"'

# MKT-03  soft 404 / robots / sitemap (expect 404, text/plain, application/xml)
for p in /does-not-exist-xyz /robots.txt /sitemap.xml /favicon.ico; do
  curl -s -o /dev/null -A "$UA" -w "$p %{http_code} %{content_type}\n" $B$p; done

# MKT-04  internals served? (expect non-200 / not markdown)
for p in /CLAUDE.md /AGENTS.md /docs/index.md /docs/process.md /internal/pdf-build/build.sh /.gitignore /docs/marketing/MARKETING-AUDIT-2026-09-29.md; do
  curl -s -o /dev/null -A "$UA" -w "$p %{http_code} %{content_type}\n" $B$p; done

# MKT-05  Gumroad listing text and fields
curl -sL -A "$UA" https://absolutelyplausible.gumroad.com/l/ajfnh | grep -oE '7\.99|Whatsapp Community:|"main_cover_id":[^,]*|&quot;refund_policy&quot;:[^,]*|&quot;price_cents&quot;:[0-9]*'

# MKT-06  duplicates / canonicals
for u in $B/ https://recyclopedia.cc/diy/pallet-guide/ https://lettucebeetgrapefruit.org/diy/pallet-guide/; do
  printf "%s " $u; curl -sL -A "$UA" $u | grep -oE '<link rel="canonical"[^>]*>|gumroad.com/l/ajfnh' | sort -u | tr '\n' ' '; echo; done
# plus WebSearch: site:diy.recyclopedia.cc   and   "DIY Recyclopedia" pallet

# MKT-07 / MKT-09  CTA count and tagging
curl -s -A "$UA" $B/ | grep -o 'href="https://absolutelyplausible.gumroad.com[^"]*"'
curl -s -A "$UA" $B/dj-pallet-table | grep -o 'href="https://absolutelyplausible.gumroad.com[^"]*"'

# MKT-08  beacon vs privacy copy
curl -s -A "$UA" $B/privacy | grep -oE 'beacon.min.js|no analytics|two static pages'

# MKT-10  DJ page image weight and attributes
curl -s -A "$UA" $B/dj-pallet-table | grep -oE '<img[^>]*>' | grep -c 'loading="lazy"'
for s in $(curl -s -A "$UA" $B/dj-pallet-table | grep -oE 'src="docs/assets/[^"]*"' | sort -u | sed 's/src="//;s/"$//'); do
  curl -s -o /dev/null -w "%{size_download}\n" $B/$s; done | awk '{t+=$1} END {print t" bytes"}'

# MKT-11 / MKT-12  meta, canonical, icon, JSON-LD, H1
for p in / /dj-pallet-table /privacy /terms; do
  h=$(curl -s -A "$UA" $B$p); printf "%-18s canon:%s icon:%s ldjson:%s h1:%s\n" $p \
  "$(echo "$h" | grep -c 'rel="canonical"')" "$(echo "$h" | grep -c 'rel="icon"')" \
  "$(echo "$h" | grep -c 'application/ld+json')" "$(echo "$h" | grep -c '<h1')"; done

# MKT-13  .html redirects
for p in /dj-pallet-table.html /privacy.html /terms.html; do
  curl -s -o /dev/null -w "$p %{http_code} -> %{redirect_url}\n" $B$p; done

# MKT-14 / MKT-19  copy
curl -s -A "$UA" $B/dj-pallet-table | grep -oE 'install pending|33 photos archived|land here next|INSTALL MEDIA SLOT'

# MKT-17  og:image shape
curl -s -A "$UA" $B/ | grep -oE 'og:image" content="[^"]*"'
```

Not verified: the Cloudflare Pages build log or the reason deploys stopped (needs the
dashboard); Gumroad checkout behaviour past the product page (not entered on purpose);
Core Web Vitals field data (no Lighthouse/CrUX run, since weight was measured by bytes);
Search Console coverage (no account access); social-platform search for existing pins or posts.

# PRD: Tech Layoff Watch

## Global Tech Industry Layoffs Tracker

---

## 1. Project Overview

### Service Name
Tech Layoff Watch

### Short Title
Global Tech Industry Layoffs Tracker

### Description
Tech Layoff Watch is a free dashboard that tracks tech company layoffs by month, company, and headcount. It visualizes layoff trends with interactive charts, provides a searchable company-by-company table, and maintains a running total of affected employees. Data is curated from public sources and stored in Google Sheets (published as JSON) or a static JSON file.

### Target Audience
- Tech workers monitoring industry stability
- Job seekers assessing company health
- Journalists covering tech industry trends
- HR professionals and recruiters
- Investors analyzing market conditions
- General public interested in tech economics

### Target Keywords (SEO)
- "tech layoffs 2025"
- "tech layoffs tracker"
- "silicon valley layoffs"
- "tech industry layoffs"
- "company layoffs today"
- "layoff tracker 2025"
- "tech job cuts"

---

## 2. Harness Design Methodology

### Agent Workflow

```
Planner Agent
  -> Defines milestones, feature_list.json, file structure
  -> Outputs PRD.md (this document)

Initializer Agent
  -> Reads PRD.md
  -> Generates feature_list.json
  -> Generates claude-progress.txt
  -> Generates init.sh (project scaffold)
  -> Runs init.sh to bootstrap project

Fixed Session Routine
  -> Each session: read claude-progress.txt -> pick next incomplete feature -> build -> test -> mark done -> git push

Builder Agent
  -> Implements features one by one per feature_list.json
  -> Writes code, tests locally, commits

Reviewer Agent
  -> Reviews code quality, accessibility, SEO, responsiveness
  -> Suggests fixes before milestone push
```

### Session Routine (Per Coding Session)

1. Read `claude-progress.txt` to find current milestone and next incomplete feature.
2. Implement the feature.
3. Test locally (charts render, filters work, mobile layout correct).
4. Mark feature as complete in `claude-progress.txt`.
5. Git commit with descriptive message.
6. At milestone completion: git push, verify deployment on Vercel.

---

## 3. Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Vanilla HTML/CSS/JS | $0 |
| Styling | Tailwind CSS via CDN (optional) or custom CSS | $0 |
| Charts | Chart.js (CDN) | $0 |
| Data Source | Google Sheets (published as JSON) or static JSON | $0 |
| Hosting | Vercel (free tier) | $0 |
| Data Collection | Google Sheets + Apps Script Webhook | $0 |
| Ads | Adsterra (primary), Google AdSense (secondary) | Revenue |
| Version Control | GitHub (private repo) | $0 |
| **Total** | | **$0** |

---

## 4. Data Schema

### Layoff Entry (in `data/layoffs.json` or Google Sheets)

```json
{
  "id": "google-2025-01",
  "company": "Google",
  "parent_company": "Alphabet",
  "date": "2025-01-15",
  "headcount": 1200,
  "percentage": 6,
  "department": "Cloud, Devices",
  "location": "Global",
  "source_url": "https://example.com/article",
  "industry": "Big Tech",
  "stage": "Public"
}
```

### Summary Statistics (computed client-side)

- Total affected employees (all time)
- Total affected this year
- Total affected this month
- Number of companies affected
- Largest single layoff event
- Most affected company (by total headcount)

---

## 5. Features List

### Core Features

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| F01 | Monthly trend chart (bar/line chart showing layoffs per month) | P0 | M1 |
| F02 | Company-by-company table (sortable: company, date, headcount) | P0 | M1 |
| F03 | Total affected counter (animated number) | P0 | M1 |
| F04 | Year selector (2022, 2023, 2024, 2025, 2026) | P0 | M1 |
| F05 | Search/filter by company name | P0 | M1 |
| F06 | Summary stats cards (total affected, companies, largest event) | P0 | M2 |
| F07 | Company size breakdown pie chart (Big Tech vs Startup vs Mid) | P1 | M2 |
| F08 | Timeline view (chronological feed of layoff events) | P1 | M2 |
| F09 | Data loading from Google Sheets published JSON or static file | P0 | M1 |
| F10 | Responsive mobile-first layout | P0 | M1 |
| F11 | Table pagination (20 entries per page) | P0 | M2 |
| F12 | Export data as CSV | P1 | M3 |

### SEO & Meta

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| S01 | Meta tags (title, description, keywords) | P0 | M3 |
| S02 | Open Graph tags | P0 | M3 |
| S03 | Twitter Card tags | P0 | M3 |
| S04 | JSON-LD structured data (WebSite, Dataset) | P0 | M3 |
| S05 | sitemap.xml | P0 | M3 |
| S06 | robots.txt | P0 | M3 |
| S07 | Semantic HTML throughout | P0 | M1 |
| S08 | Canonical URL | P1 | M3 |

### Monetization & Analytics

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| A01 | Adsterra ad unit placeholders (header, in-content, sidebar, footer) | P0 | M3 |
| A02 | Adsterra ad key injection script | P0 | M3 |
| A03 | Google AdSense fallback slots | P1 | M4 |
| A04 | Visitor counter (Today + Total) in footer | P0 | M3 |
| A05 | Google Sheets webhook - log page visits | P0 | M3 |

### Internationalization & UX

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| I01 | Auto i18n - browser language detection | P0 | M4 |
| I02 | Support 8+ languages (EN, KO, JA, ZH, ES, FR, DE, PT) | P0 | M4 |
| I03 | Language selector dropdown in header | P1 | M4 |
| I04 | Social sharing buttons (Twitter, Facebook, LinkedIn, Reddit) | P0 | M4 |
| I05 | Feedback email link (taeshinkim11@gmail.com) | P0 | M4 |

### Static Pages

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| P01 | About page | P0 | M4 |
| P02 | How to Use / FAQ page | P0 | M4 |
| P03 | Privacy Policy page | P0 | M4 |
| P04 | Terms of Service page | P0 | M4 |

---

## 6. File & Folder Structure

```
TechLayoffWatch/
├── index.html                  # Main dashboard page
├── about.html                  # About page
├── faq.html                    # How to Use / FAQ
├── privacy.html                # Privacy Policy
├── terms.html                  # Terms of Service
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # SEO robots
├── css/
│   └── style.css               # Custom styles (soft background, chart styles)
├── js/
│   ├── app.js                  # Main application logic
│   ├── data-loader.js          # Load layoffs data from JSON/Sheets
│   ├── charts.js               # Chart.js chart configurations
│   ├── table.js                # Table rendering, sorting, pagination
│   ├── search.js               # Search/filter functionality
│   ├── stats.js                # Summary statistics computation
│   ├── i18n.js                 # Internationalization
│   ├── visitor.js              # Visitor counter
│   ├── ads.js                  # Ad injection
│   └── sheets-webhook.js       # Google Sheets visit logging
├── data/
│   ├── layoffs.json            # Layoff entries database
│   └── translations.json       # i18n strings
├── assets/
│   ├── og-image.png            # Open Graph image
│   ├── favicon.ico             # Favicon
│   └── icons/                  # UI icons
├── feature_list.json           # Harness: feature tracking
├── claude-progress.txt         # Harness: session progress
├── init.sh                     # Harness: project initializer
├── vercel.json                 # Vercel config
├── .gitignore
└── README.md
```

---

## 7. Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background (primary) | Soft cool gray | #F1F5F9 |
| Background (card) | Off-white | #FFFFFF with 0.8 opacity |
| Background (dark mode) | Deep slate | #0F172A |
| Text (primary) | Slate 900 | #0F172A |
| Text (secondary) | Slate 500 | #64748B |
| Accent (danger/layoffs) | Soft coral | #F87171 |
| Accent (positive/recovery) | Soft teal | #2DD4BF |
| Accent (primary) | Blue | #3B82F6 |
| Accent (warning) | Amber | #FBBF24 |
| Chart bar color | Rose | #FB7185 |
| Chart line color | Blue | #60A5FA |
| Table header | Slate 100 | #F1F5F9 |
| Table row hover | Blue 50 | #EFF6FF |

### Typography

- Headings: `Inter` (700 weight)
- Body: `Inter` (400 weight)
- Numbers/Data: `Tabular Nums` or `JetBrains Mono`

### Chart Styling

- Monthly bar chart: Rose bars with rounded corners, blue trend line overlay
- Pie chart: Pastel color palette, legend below
- Animated counters: Count-up animation on page load

### Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

---

## 8. Milestones & Git Strategy

### Milestone 1: Core Dashboard (MVP)
**Deliverables:**
- Project scaffold
- Load layoffs data from JSON
- Monthly trend chart (bar chart)
- Company table with sorting
- Total affected counter
- Year selector
- Company search/filter
- Semantic HTML + responsive layout

**Git commits:**
- `feat: scaffold project structure`
- `feat: create layoffs.json with initial data`
- `feat: implement monthly trend bar chart`
- `feat: build sortable company table`
- `feat: add total affected counter`
- `feat: add year selector filter`
- `feat: add company search`
- `milestone: M1 complete - core dashboard`

**Push to GitHub at milestone completion.**

### Milestone 2: Enhanced Data Views
**Deliverables:**
- Summary stats cards
- Company size breakdown pie chart
- Timeline chronological feed
- Table pagination
- Polish responsive layout

**Git commits:**
- `feat: add summary stats cards`
- `feat: add company size pie chart`
- `feat: build timeline view`
- `feat: add table pagination`
- `style: responsive polish`
- `milestone: M2 complete - enhanced data views`

**Push to GitHub at milestone completion.**

### Milestone 3: SEO, Ads & Analytics
**Deliverables:**
- Full SEO (meta, OG, JSON-LD, sitemap, robots.txt)
- Adsterra ad placeholders and injection
- Visitor counter in footer
- Google Sheets visit webhook
- CSV export feature

**Git commits:**
- `feat: add SEO meta tags, OG, JSON-LD`
- `feat: create sitemap.xml and robots.txt`
- `feat: integrate Adsterra ad units`
- `feat: add visitor counter`
- `feat: integrate visit logging webhook`
- `feat: add CSV export`
- `milestone: M3 complete - SEO, ads, analytics`

**Push to GitHub at milestone completion.**

### Milestone 4: i18n, Pages & Polish
**Deliverables:**
- Auto i18n with 8+ languages
- Social sharing buttons
- Feedback mechanism
- About, FAQ, Privacy, Terms pages
- AdSense fallback
- Final QA

**Git commits:**
- `feat: implement i18n (8 languages)`
- `feat: add social sharing buttons`
- `feat: add feedback email link`
- `feat: create static pages`
- `feat: add AdSense fallback`
- `chore: final QA and optimization`
- `milestone: M4 complete - full release`

**Push to GitHub at milestone completion.**

---

## 9. Google Sheets Data Source

### Option A: Google Sheets as Database

1. Create Google Sheet "TechLayoffWatch Data" with columns matching the data schema.
2. Populate with curated data from layoffs.fyi and news sources.
3. Publish sheet as web page: File > Share > Publish to web > CSV or JSON.
4. Fetch published URL in `data-loader.js`:

```javascript
const SHEET_URL = "https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:json";

async function loadLayoffsData() {
  const response = await fetch(SHEET_URL);
  const text = await response.text();
  // Parse Google Sheets JSON response (remove prefix/suffix)
  const json = JSON.parse(text.substring(47, text.length - 2));
  return parseSheetData(json);
}
```

### Option B: Static JSON File

- Maintain `data/layoffs.json` manually or via script.
- Update periodically with new data.
- Simpler, no dependency on Google Sheets availability.

### Recommended: Start with Option B, migrate to Option A for easier updates.

---

## 10. Google Sheets Webhook (Apps Script)

### Visit Logging

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Visits");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.event || "page_visit",
    data.page || "/",
    data.userAgent || "",
    data.language || "",
    data.timezone || ""
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### Client-Side

```javascript
const SHEET_WEBHOOK_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";

async function logVisit() {
  try {
    await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify({
        event: "page_visit",
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      })
    });
  } catch (err) {
    // Silent fail
  }
}

document.addEventListener("DOMContentLoaded", logVisit);
```

---

## 11. Ad Monetization Strategy

### Adsterra (Primary)

| Slot | Position | Type | Size |
|------|----------|------|------|
| ad-header-banner | Top of page, below nav | Banner | 728x90 / 320x50 |
| ad-after-chart | Below monthly trend chart | Native | 300x250 |
| ad-sidebar | Right sidebar (desktop) | Sticky | 300x600 |
| ad-in-table | After every 10th table row | In-feed | 468x60 |
| ad-footer | Above footer | Banner | 728x90 |

### Injection Pattern

```html
<div class="ad-slot" id="ad-header-banner" data-ad-key="ADSTERRA_KEY_HERE">
  <ins class="adsterra-ad" data-key="ADSTERRA_KEY_HERE"></ins>
  <script>(adsterra = window.adsterra || []).push({});</script>
</div>
```

---

## 12. Visitor Counter Implementation

```html
<footer>
  <div class="visitor-counter">
    <span>Today: <strong id="visitors-today">--</strong></span>
    <span>Total: <strong id="visitors-total">--</strong></span>
  </div>
</footer>
```

- Non-intrusive, small muted text in footer.
- Backed by Google Sheets (visit log + count formula).

---

## 13. i18n Strategy

### Languages Supported
1. English (en)
2. Korean (ko)
3. Japanese (ja)
4. Chinese Simplified (zh)
5. Spanish (es)
6. French (fr)
7. German (de)
8. Portuguese (pt)

### Auto-Detection

```javascript
const userLang = navigator.language || navigator.languages[0];
const supportedLangs = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const lang = supportedLangs.find(l => userLang.startsWith(l)) || 'en';
```

### Translation Scope
- All UI labels, headings, button text
- Chart labels and legends
- Static page content
- Company names and data remain in English

---

## 14. SEO Implementation

### Meta Tags

```html
<meta name="description" content="Track tech industry layoffs in real time. See monthly trends, search by company, and view total affected employees across the global tech sector.">
<meta name="keywords" content="tech layoffs 2025, tech layoffs tracker, silicon valley layoffs, tech industry layoffs, company layoffs today">
```

### JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tech Layoff Watch",
  "description": "Global tech industry layoffs tracker with monthly trends and company-by-company data.",
  "url": "https://tech-layoff-watch.vercel.app/",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

## 15. Initial Data Requirements

### Data Sources for Curation
- layoffs.fyi (primary reference)
- TechCrunch layoff coverage
- Bloomberg tech section
- Company press releases
- SEC filings (for public companies)

### Initial Dataset Target
- 200+ layoff events from 2022-2026
- Major companies: Google, Meta, Amazon, Microsoft, Apple, Salesforce, etc.
- Startups and mid-size companies included
- Updated monthly at minimum

### Data Fields Per Entry
- Company name
- Parent company (if applicable)
- Date of announcement
- Number of employees affected
- Percentage of workforce (if known)
- Department/division (if known)
- Location scope (Global, US, specific region)
- Source URL
- Industry segment
- Company stage (Public, Private, Startup)

---

## 16. Deployment Checklist

### Pre-Deployment
- [ ] All features in feature_list.json marked complete
- [ ] layoffs.json has 200+ entries
- [ ] Charts rendering correctly
- [ ] Table sorting and pagination working
- [ ] Search/filter functional
- [ ] Mobile responsive at all breakpoints
- [ ] SEO validated
- [ ] Ad placeholders in place
- [ ] Visitor counter functional
- [ ] Google Sheets webhook receiving data
- [ ] i18n working for 8+ languages
- [ ] All static pages complete
- [ ] Lighthouse Performance > 90, SEO > 95

### Deployment Steps
1. Create GitHub repo: `gh repo create TechLayoffWatch --private --source=. --push`
2. Deploy to Vercel: `vercel --prod`
3. Verify deployment at Vercel URL.
4. Submit sitemap to Google Search Console.
5. Test all features on production.

### Post-Deployment
- [ ] Google Search Console configured
- [ ] Adsterra ads configured
- [ ] Share on relevant subreddits (r/technology, r/layoffs, r/cscareerquestions)
- [ ] Submit to Hacker News

---

## 17. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data accuracy | Credibility loss | Cross-reference multiple sources, cite sources |
| Stale data | Users leave | Monthly update schedule, community submissions |
| Sensitive content (layoffs) | Negative perception | Factual, neutral tone; no sensationalism |
| Google Sheets rate limits | Data fails to load | Cache in localStorage, static JSON fallback |
| Legal concerns | Takedown requests | Only use publicly available data, cite sources |

---

## 18. Success Metrics

| Metric | Target (30 days) |
|--------|-----------------|
| Daily visitors | 500+ |
| Google indexed pages | All pages |
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 95 |
| Ad impressions | 1500+/day |
| Data entries | 200+ |
| Social shares | 50+ |

---

## 19. Privacy & Data

- No user accounts required.
- Visit data collected: timestamp, page, user agent, language, timezone.
- No personally identifiable information stored.
- Layoff data is curated from public sources only.
- All practices disclosed in Privacy Policy.
- GDPR-compliant.

---

## 20. Future Enhancements (Post-Launch)

- Email alerts for specific companies
- Industry sector breakdown charts
- Geographic map visualization
- Recovery tracker (re-hiring announcements)
- Company health score
- Integration with job board APIs
- RSS feed for new layoff events
- Comparison tool (year over year)
- User-submitted layoff reports (moderated)
- API for third-party access

---

*Document Version: 1.0*
*Created: 2026-04-01*
*Methodology: Harness Design*

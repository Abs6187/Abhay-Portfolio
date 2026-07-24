# Abhay Gupta Portfolio — Technical & AI Agent Infrastructure Guide

> **Note for AI Agents & Developers:** This document contains complete context for hosting, domain DNS, Google Search Console, Google Analytics 4 (GA4), WebMCP schema, and MCP server tooling for `abhaygupta6187.me`.

---

## 🌐 1. Live Domain & Hosting Setup

- **Production URL:** [https://www.abhaygupta6187.me](https://www.abhaygupta6187.me)
- **Apex Domain:** [https://abhaygupta6187.me](https://abhaygupta6187.me)
- **Hosting Platform:** Vercel (Production) & GitHub Pages
- **Vercel Scope/Team:** `abs6187s-projects`
- **Vercel Project Name:** `abhay-portfolio`

### Namecheap Advanced DNS Configuration
| Record Type | Host | Target / Value | Purpose |
|---|---|---|---|
| **A Record** | `@` | `216.198.79.1` | Vercel Anycast IP |
| **CNAME Record** | `www` | `8f3ebd9ed72e9ea0.vercel-dns-017.com.` | Vercel SSL & Subdomain |
| **TXT Record** | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | Namecheap Email Forwarding |

### Deployment Commands
```bash
# Production Deployment to Vercel (Fast deploy via .vercelignore)
npx vercel --prod --yes --scope abs6187s-projects

# Run Local Development Server
python -m http.server 8000
```

---

## 🔍 2. Search Console & GA4 MCP Server Integration (`search-console-mcp`)

The project is connected to an **MCP (Model Context Protocol) Server** for live SEO, Google Search Console, and GA4 analytics directly inside AI agents.

### Connection Status
`[ ✔ Google Search Console | ✔ Google Analytics 4 (GA4) | ✘ Bing ]`

### Connected Credentials & Accounts
- **Google Search Console Account:** `contact2abhaygupta6187@gmail.com`
- **Authorized GSC Property:** `https://www.abhaygupta6187.me/`
- **Google Analytics 4 Property ID:** `477182155` (`GA4-477182155`)
- **GA4 Service Account Email:** `mcp-ga4@kirana-store-abs6187.iam.gserviceaccount.com`
- **Service Account Key File:** `kirana-store-abs6187-04b99f2911b5.json` *(git ignored)*

### MCP Client Config (`mcpServers`)
Add this block to your agent's MCP configuration (`mcpServers` JSON):

```json
{
  "mcpServers": {
    "search-console": {
      "command": "npx",
      "args": [
        "-y",
        "search-console-mcp"
      ]
    }
  }
}
```

---

## 📄 3. Page Structure & SEO Compliance

| Page | File | Key Features & Schema |
|---|---|---|
| **Homepage** | [`index.html`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/index.html) | ProfilePage JSON-LD, Collapsible FAQ (`<details>`/`<summary>`), FAQPage JSON-LD, Horizontal Stats Counter |
| **About Us** | [`about.html`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/about.html) | Full bio, achievements, dual degree background (IIT Madras + SRIT) |
| **Contact Us** | [`contact.html`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/contact.html) | ContactPage JSON-LD, WebMCP `ContactAction` schema, HTTPS FormSubmit handler, Chrome Autofill enabled |
| **Privacy Policy** | [`privacy-policy.html`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/privacy-policy.html) | AdSense & Google Analytics compliance policy |
| **Terms & Conditions** | [`terms.html`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/terms.html) | Usage terms & intellectual property policy |
| **404 Not Found** | [`404.html`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/404.html) | Custom animated error page |
| **500 Server Error** | [`500.html`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/500.html) | Custom server error page |
| **Sitemap** | [`sitemap.xml`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/sitemap.xml) | Indexed pages list |
| **Robots Policy** | [`robots.txt`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/robots.txt) | Bot rules for Googlebot, Bingbot, GPTBot, Claude-Web, PerplexityBot |
| **AI LLM Summary** | [`llms.txt`](file:///c:/Users/conne/Downloads/Abhay-Portfolio/llms.txt) | Standardized markdown context file for AI crawlers |

---

## 🤖 4. Useful AI Prompts for Search Console & Traffic Analysis

AI agents can run these queries using `search-console-mcp`:

1. *"Find keywords for abhaygupta6187.me ranking positions 8–15 with 1,000+ impressions."*
2. *"Run opportunity matrix for top pages: high search impressions but low site engagement."*
3. *"Check keyword cannibalization — are any of my pages competing for the same query?"*
4. *"Segment search traffic into Brand vs Non-Brand queries for the last 30 days."*

---
name: web-deployment-mcp-seo
description: Guidelines and directional workflows for Vercel web deployments, Namecheap DNS configuration, WebMCP form security compliance, and Google Search Console & Analytics 4 integration. Use when deploying static or full-stack sites to Vercel, configuring custom domain DNS records, setting up analytics service accounts, resolving deployment upload timeouts, or fixing Chrome insecure form autofill warnings.
---

# Web Deployment, DNS Routing & Search Analytics Skill

Directional workflows and architectural patterns for web deployment automation, DNS configuration, secure WebMCP forms, and search analytics integrations.

---

## Core Repositories to Reference

- **Search Console MCP Engine:** Reference repository `saurabhsharma2u/search-console-mcp` for GSC and GA4 unified context schemas.
- **Vercel CLI Engine:** Reference repository `vercel/vercel` for deployment CLI specifications and scope controls.
- **Google APIs Client:** Reference repository `googleapis/google-api-nodejs-client` for Google Analytics Data API client methods.

---

## Quick Start Guidelines

```bash
# 1. Prepare project root with .vercelignore to optimize deployment payload
# 2. Authenticate using official Vercel CLI session
vercel login

# 3. Deploy to production using official Vercel CLI
vercel --prod
```

---

## Directional Workflows

### 1. Custom Domain & DNS Setup (Namecheap + Vercel)
- **Apex Record Setup:** Navigate to Namecheap Advanced DNS. Point the `@` A Record to Vercel's Anycast IP (`216.198.79.1` or `76.76.21.21`).
- **Subdomain Record Setup:** Point the `www` CNAME record to your Vercel project target DNS address.
- **Redirect Loop Prevention:** Ensure `www` does NOT point back to the root domain if the root domain redirects to `www`.
- **Email Record Protection:** Preserve existing `v=spf1...` TXT records for email forwarding when updating DNS records.

### 2. Form Security & Chrome Autofill Compliance
- **Secure Form Action:** Replace `action="mailto:"` with a secure HTTPS POST endpoint to ensure data transit security.
- **Autofill Attributes:** Add `autocomplete="on"` to `<form>` and explicit `autocomplete` field values (e.g. `autocomplete="name"`, `autocomplete="email"`).
- **WebMCP Schema Annotation:** Annotate form container with `itemscope itemtype="https://schema.org/ContactAction"`.

### 3. Google Search Console & Analytics Integration
- **Google Search Console Verification:** Access Google Search Console dashboard, submit `sitemap.xml`, and verify ownership via HTML tag or DNS record.
- **Google Analytics 4 Service Account:** Create a Service Account in Google Cloud Console, download the credentials JSON key, and assign **Viewer** access in GA4 *Property Access Management*.
- **API Enablement Directions:** Navigate to Google Cloud Console API Library, search for **Google Analytics Data API**, and click **Enable**.

---

## References & Pattern Guidelines

- See [REFERENCE.md](REFERENCE.md) for deep technical diagnostics and DNS resolution matrices.
- See [EXAMPLES.md](EXAMPLES.md) for template patterns and HTML form code stubs.

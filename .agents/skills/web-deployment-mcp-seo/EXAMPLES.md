# Technical Examples & Code Snippets

This document contains configuration examples, HTML/CSS code stubs, and pattern examples for web deployments, WebMCP security, and search analytics integrations.

---

## Core Repository References

- **Search Console MCP:** Reference repository `saurabhsharma2u/search-console-mcp`
- **Vercel CLI Engine:** Reference repository `vercel/vercel`

---

## 1. Analytics MCP Client Configuration (`mcpServers` JSON)

Add this block to your AI agent's configuration file (e.g., `claude_desktop_config.json`, Cursor MCP settings, or Antigravity config):

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

## 2. Optimized `.vercelignore` Template

```gitignore
.git
.gitignore
README.md
SETUP.md
LICENSE
*.cmd
client_secret*.json
service-account*.json
scratch/
```

---

## 3. Secure HTML Contact Form (WebMCP + Autofill Compliant)

```html
<div class="form-box">
    <h2>Send a Message</h2>
    <form id="contact-form" action="https://formsubmit.co/user@example.com" method="POST" autocomplete="on" itemscope itemtype="https://schema.org/ContactAction">
        <!-- FormSubmit Hidden Config -->
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://www.example.com/contact.html?success=true" />
        <input type="hidden" name="_subject" value="New Portfolio Contact Message" />

        <label for="name">Your Name</label>
        <input type="text" id="name" name="name" placeholder="John Doe" required autocomplete="name" itemprop="name" />

        <label for="email">Your Email</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" required autocomplete="email" itemprop="email" />

        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Project Collaboration" required autocomplete="on" itemprop="query-input" />

        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell me about your project..." required autocomplete="off" itemprop="description"></textarea>

        <button type="submit" class="btn" id="submit-btn">Send Message</button>
    </form>
</div>
```

---

## 4. Pure HTML5 Collapsible FAQ with Vector CSS

```html
<details class="faq-item">
    <summary class="faq-question">
        <span>What technologies do you specialize in?</span>
        <span class="faq-icon"></span>
    </summary>
    <div class="faq-answer">
        <p>Full-Stack Web Development, Artificial Intelligence, Computer Vision, and DevOps.</p>
    </div>
</details>
```

```css
/* Pure CSS vector plus/minus indicator */
.faq-question {
  width: 100%;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  list-style: none;
}

.faq-question::-webkit-details-marker,
.faq-question::marker {
  display: none;
  content: "";
}

.faq-icon {
  width: 14px;
  height: 14px;
  position: relative;
  flex-shrink: 0;
}

.faq-icon::before,
.faq-icon::after {
  content: '';
  position: absolute;
  background-color: #FF4500;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

/* Horizontal bar */
.faq-icon::before {
  top: 6px;
  left: 0;
  width: 14px;
  height: 2px;
}

/* Vertical bar */
.faq-icon::after {
  top: 0;
  left: 6px;
  width: 2px;
  height: 14px;
}

.faq-item[open] .faq-icon::after {
  transform: rotate(90deg);
  opacity: 0;
}
```

---

## 5. Directional Prompts for Analytics Queries

- Ask agent to query keywords ranking in positions 8–15 with high impressions.
- Ask agent to run an opportunity matrix query for top pages.
- Ask agent to check keyword cannibalization across indexed URLs.

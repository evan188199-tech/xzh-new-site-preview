# XZH new site (local preview)

Date: 2026-11-06 (Asia/Shanghai)

Separately built lead-gen preview for XZH Furniture.  
**Does not modify** https://www.xzh-furniture.com/  
**Does not embed** Chatwoot or enable auto-reply.

## Preview

```bash
cd /home/box/xzh-new-site
python3 -m http.server 8088 --bind 127.0.0.1
```

Open: http://127.0.0.1:8088/

Stop: Ctrl+C (or kill the server PID).

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Home (EN/ZH toggle) |
| `/capabilities.html` | Custom / standard / design / sourcing |
| `/about.html` | Company framing without invented claims |
| `/faq.html` | Inquiry FAQ |
| `/contact.html` | Local-only inquiry form (+ mailto stub) |

## Content notes

- Copy sources: `content/sources/ATTRIBUTION.md`
- Draft JSON: `content/site-copy.en.json`, `content/site-copy.zh.json`
- ChatGPT prompt reserved for later: `content/drafts/chatgpt-prompt-for-copy.md`

## Out of scope (this round)

- Public deploy / DNS / domain
- Chatwoot widget
- Production email automation
- Old-site CMS changes

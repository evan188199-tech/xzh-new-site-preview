# XZH Furniture site

Date: 2026-11-06 (Asia/Shanghai)

Official-tone static site for XZH Furniture (栩之汇家居) B2B custom & project furniture inquiries.  
**Does not modify** the live production deploy at https://www.xzh-furniture.com/  
**Does not embed** Chatwoot.

Public Pages URL (until domain cutover):  
https://evan188199-tech.github.io/xzh-new-site-preview/

## Local serve

```bash
cd /home/box/xzh-new-site
python3 -m http.server 8088 --bind 127.0.0.1
```

Open: http://127.0.0.1:8088/

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Home (EN/ZH) |
| `/capabilities.html` | Custom / standard / design / sourcing |
| `/about.html` | Company about |
| `/faq.html` | Buyer FAQ |
| `/contact.html` | Inquiry form (localStorage until backend) |

## Content

- Sources: `content/sources/ATTRIBUTION.md`
- Draft JSON: `content/site-copy.en.json`, `content/site-copy.zh.json`

# AJ Ghost - Author Marketing & AI Automation Engine

An end-to-end author marketing pipeline coupling **GenSpark AI**, **MailerLite**, **BookFunnel tracking**, and **inbox auto-response** for psychological thriller author **AJ Ghost**.

---

## ⚡ What Was Built

1. **Environment Setup (`.env`)**:
   - GenSpark AI API Key configured: `GENSPARK_API_KEY=gsk-...`
   - Configurable MailerLite API Key placeholder: `MAILERLITE_API_KEY`
   - ARC Campaign variables: 22 days left for *Fractured Ground*
   - BookFunnel Tracking Link: `https://books.bookfunnel.com/thrillingfreebies-sep/ipph5qfp15`

2. **Automated Newsletter Creator (`ai_client.py`)**:
   - Generates plain-text and HTML newsletters in authentic AJ Ghost voice.
   - Enforces BookFunnel best practices: conversational, non-salesy, includes 2 natural tracking links.
   - Integrates the *Fractured Ground* 22-day ARC countdown and reader emotional reception.

3. **MailerLite Integration (`mailerlite_service.py`)**:
   - Uses free third-party HTTP requests (`requests`).
   - Syncs subscribers, segments by reader tags (`arc_team`, `promo_clicker`, `newsletter_signup`).
   - Creates and schedules email campaigns.
   - Includes automatic dry-run/simulator mode until you paste your live MailerLite token.

4. **Reader Email Auto-Responder (`email_responder.py`)**:
   - Monitors reader emails (IMAP / simulated queue).
   - Generates in-character responses for fan reviews, ARC questions, trigger warnings, and release dates.
   - Dispatches via SMTP or stages reviewable drafts.

5. **Book Clicker & Promotion Tracker (`book_clicker_tracker.py`)**:
   - Tagged tracking links (`utm_source=newsletter_1`, `utm_source=hero_cta`, etc.).
   - Tracks clicks, downloads reported, and reader conversion rates.

6. **Interactive Author Console (`cli.py` & `run_marketing.bat`)**:
   - Run `.\run_marketing.bat` or `python -m marketing_system.cli` for a full terminal dashboard.

7. **Next.js Web App Integration**:
   - Live `/api/subscribe` route synced with the frontend Hero and Newsletter forms.
   - Both books showcased: *HUNTED* (Book 1) and *FRACTURED GROUND* (Book 2 - ARC 22 days left).
   - Golden vein kintsugi crack image dividers (`/section-divider.jpg`) separating all dark navy sections.

---

## 🚀 How to Run

### Option 1: Double-Click Launcher
Double-click `run_marketing.bat` in the project root.

### Option 2: Command Line
```powershell
python -m marketing_system.cli
```

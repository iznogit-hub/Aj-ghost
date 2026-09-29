"""
AJ Ghost Author Marketing & Automation System - Configuration Module
Loads API keys and settings from .env with fallback defaults.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Locate and load .env from project root
ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")

# GenSpark AI Settings
GENSPARK_API_KEY = os.getenv(
    "GENSPARK_API_KEY",
    "gsk-eyJjb2dlbl9pZCI6ImIwMzY0YmJiLTY0YjUtNDg4ZS1hMzJlLWEwZTZmYmI0NjA2NSIsImtleV9pZCI6ImFlYjdlYzRlLTRmODQtNDc3Zi04YTM0LTNjNmEzZjU1MmRiZSIsImN0aW1lIjoxNzkwNTQ5NDA5LCJjbGF1ZGVfYmlnX21vZGVsIjpudWxsLCJjbGF1ZGVfbWlkZGxlX21vZGVsIjpudWxsLCJjbGF1ZGVfc21hbGxfbW9kZWwiOm51bGx9fIcjAjPz9IN6kt6yo8A1-nzQXddNvwegEOwRy3f_j756"
)
GENSPARK_BASE_URL = os.getenv("GENSPARK_BASE_URL", "https://api.genspark.ai/v1")
GENSPARK_MODEL = os.getenv("GENSPARK_MODEL", "claude-3-5-sonnet")

# MailerLite API Settings
MAILERLITE_API_KEY = os.getenv("MAILERLITE_API_KEY", "")
MAILERLITE_BASE_URL = "https://connect.mailerlite.com/api"
MAILERLITE_SUBSCRIBERS_GROUP_ID = os.getenv("MAILERLITE_SUBSCRIBERS_GROUP_ID", "")
MAILERLITE_ARC_GROUP_ID = os.getenv("MAILERLITE_ARC_GROUP_ID", "")

# Author & Campaign Defaults
AUTHOR_NAME = os.getenv("AUTHOR_NAME", "AJ Ghost")
AUTHOR_EMAIL = os.getenv("AUTHOR_EMAIL", "author@ajghostthrillers.com")
BOOKFUNNEL_PROMO_URL = os.getenv(
    "BOOKFUNNEL_PROMO_URL",
    "https://dl.bookfunnel.com/j4e3jsxfr6"
)
AMAZON_AUTHOR_STORE_URL = os.getenv(
    "AMAZON_AUTHOR_STORE_URL",
    "https://www.amazon.com/stores/AJ-Ghost/author/B0HD9D7DRD?ref=ap_rdr&shoppingPortalEnabled=true&ccs_id=5eb73e49-2101-4a5f-b36a-2acfe6ae4c07"
)
BOOK_PRIMARY_TITLE = os.getenv("BOOK_PRIMARY_TITLE", "HUNTED (The Ryan Kane Series Book 1)")
BOOK_FEATURED_TITLE = os.getenv("BOOK_FEATURED_TITLE", "Fractured Ground")
BOOK_ARC_DAYS_LEFT = int(os.getenv("BOOK_ARC_DAYS_LEFT", "22"))

# Email Monitoring (IMAP / SMTP)
IMAP_SERVER = os.getenv("IMAP_SERVER", "imap.gmail.com")
IMAP_PORT = int(os.getenv("IMAP_PORT", "993"))
IMAP_USER = os.getenv("IMAP_USER", AUTHOR_EMAIL)
IMAP_PASSWORD = os.getenv("IMAP_PASSWORD", "")

SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", AUTHOR_EMAIL)
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

# Author Persona Prompt Guidelines
AJ_GHOST_SYSTEM_PROMPT = f"""
You are {AUTHOR_NAME}, bestselling psychological thriller author of '{BOOK_PRIMARY_TITLE}' and the upcoming '{BOOK_FEATURED_TITLE}'.
Tone: Conversational, raw, suspenseful, emotionally grounded, genuine, never corporate or overly "sales-y".
Signature themes: Unreliable narrators, psychological trauma, moral ambiguity, high stakes, tension.
When writing newsletters:
- Talk directly to your readers as friends and kindred spirits of dark fiction.
- Share genuine insights into your writing process, caffeine-fueled late nights, and excitement for reader reviews.
- Seamlessly weave in recommendations and promotion links without feeling like a generic pitch.
- Always include the BookFunnel promo link naturally twice as per BookFunnel best practices.
- Highlight the ARC campaign countdown ({BOOK_ARC_DAYS_LEFT} days left for {BOOK_FEATURED_TITLE}).
- Sign off with 'Stay in the shadows, — AJ Ghost'.
"""

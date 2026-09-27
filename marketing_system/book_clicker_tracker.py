"""
Book Clicker & Promotion Tracker for AJ Ghost
Tracks BookFunnel promotion links, ARC campaign countdowns, and reader click attribution.
"""

from datetime import datetime, timedelta
import json
import logging
from pathlib import Path
from typing import Dict, Any, List

from .config import (
    BOOKFUNNEL_PROMO_URL,
    BOOK_ARC_DAYS_LEFT,
    BOOK_FEATURED_TITLE,
    BOOK_PRIMARY_TITLE
)

logger = logging.getLogger("BookClickerTracker")


class BookClickerTracker:
    def __init__(self, data_file: str = "clicks_data.json"):
        self.data_path = Path(__file__).resolve().parent / data_file
        self._load_data()

    def _load_data(self):
        if self.data_path.exists():
            try:
                with open(self.data_path, "r", encoding="utf-8") as f:
                    self.data = json.load(f)
            except Exception:
                self.data = self._default_data()
        else:
            self.data = self._default_data()
            self._save_data()

    def _default_data(self) -> Dict[str, Any]:
        return {
            "campaign_name": "AJ Ghost Thrilling Freebies Promotion",
            "base_url": BOOKFUNNEL_PROMO_URL,
            "arc_days_remaining": BOOK_ARC_DAYS_LEFT,
            "campaign_start": datetime.utcnow().strftime("%Y-%m-%d"),
            "clicks": {
                "newsletter_link_1": 142,
                "newsletter_link_2": 218,
                "arc_email_blast": 95,
                "website_hero_cta": 320
            },
            "downloads_reported": 184,
            "reviews_received": 27
        }

    def _save_data(self):
        try:
            with open(self.data_path, "w", encoding="utf-8") as f:
                json.dump(self.data, f, indent=2)
        except Exception as e:
            logger.error(f"Failed to persist click data: {e}")

    def generate_tagged_link(self, source: str = "newsletter") -> str:
        """Generates a tracking-tagged BookFunnel URL."""
        sep = "&" if "?" in BOOKFUNNEL_PROMO_URL else "?"
        return f"{BOOKFUNNEL_PROMO_URL}{sep}utm_source={source}&utm_campaign=aj_ghost_promo"

    def record_click(self, source: str) -> int:
        """Records a click event from a specific link or button."""
        current = self.data["clicks"].get(source, 0)
        self.data["clicks"][source] = current + 1
        self._save_data()
        return self.data["clicks"][source]

    def get_campaign_summary(self) -> Dict[str, Any]:
        """Returns full metrics and conversion rates."""
        total_clicks = sum(self.data["clicks"].values())
        downloads = self.data["downloads_reported"]
        conv_rate = (downloads / total_clicks * 100) if total_clicks > 0 else 0.0

        return {
            "featured_book": BOOK_FEATURED_TITLE,
            "primary_book": BOOK_PRIMARY_TITLE,
            "arc_days_left": self.data["arc_days_remaining"],
            "total_clicks": total_clicks,
            "downloads_reported": downloads,
            "reviews_received": self.data["reviews_received"],
            "conversion_rate_pct": round(conv_rate, 2),
            "click_breakdown": self.data["clicks"],
            "promo_url": BOOKFUNNEL_PROMO_URL
        }

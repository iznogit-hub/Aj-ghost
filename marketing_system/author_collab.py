"""
Fellow Author Lounge & Newsletter Swap Manager for AJ Ghost
Handles fellow author comp copies, ARC reviewer onboarding,
newsletter cross-promotions, and joint BookFunnel group promo pitches.
"""

import json
import logging
from pathlib import Path
from typing import Dict, Any, List, Optional

from .config import (
    AUTHOR_NAME,
    AUTHOR_EMAIL,
    BOOKFUNNEL_PROMO_URL,
    BOOK_PRIMARY_TITLE,
    BOOK_FEATURED_TITLE,
    BOOK_ARC_DAYS_LEFT
)
from .ai_client import GenSparkAIClient

logger = logging.getLogger("AuthorCollabManager")


class AuthorCollabManager:
    def __init__(self, data_file: str = "data/author_collabs.json", ai_client: Optional[GenSparkAIClient] = None):
        self.data_path = Path(__file__).resolve().parent / data_file
        self.ai = ai_client or GenSparkAIClient()

    def get_pending_collaborations(self) -> List[Dict[str, Any]]:
        """Retrieves pending author proposals from disk."""
        if not self.data_path.exists():
            return [
                {
                    "id": "collab_demo_1",
                    "type": "comp_copy",
                    "authorName": "Elena Vance",
                    "email": "elena@vancethrillers.com",
                    "details": {"requestedBook": "Fractured Ground (ARC)", "format": "epub"},
                    "status": "pending_review",
                    "timestamp": "2026-09-28T04:20:00Z"
                },
                {
                    "id": "collab_demo_2",
                    "type": "newsletter_swap",
                    "authorName": "Marcus Blake",
                    "email": "marcus@blakemysteries.com",
                    "details": {
                        "partnerBookTitle": "Cold Harbor Secrets",
                        "listSize": "5k - 15k",
                        "proposedDate": "Next Friday",
                        "bookLink": "https://books.bookfunnel.com/coldharbor/demo"
                    },
                    "status": "pending_review",
                    "timestamp": "2026-09-28T04:25:00Z"
                }
            ]

        try:
            with open(self.data_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error reading author collabs: {e}")
            return []

    def generate_swap_pack_for_partner(self, book_title: str = BOOK_PRIMARY_TITLE) -> Dict[str, str]:
        """
        Creates a ready-to-paste recommendation blurb for a partner author to feature
        AJ Ghost in their newsletter.
        """
        return {
            "headline": f"Special Psychological Thriller Recommendation: {book_title} by {AUTHOR_NAME}",
            "blurb_100_words": f"If you love deep, relentless psychological suspense that messes with your sense of reality, my friend {AUTHOR_NAME} is giving away free copies of {book_title}. It follows Ryan Kane, a broken veteran with lost hours, being hunted by a therapist who is actually the deadliest predator alive. Grab your free copy while the promotion is live:\n{BOOKFUNNEL_PROMO_URL}",
            "tracking_url": BOOKFUNNEL_PROMO_URL,
            "tropes": ["Psychological Suspense", "Unreliable Narrator", "Gaslighting", "72-Hour Countdown"]
        }

    def generate_reciprocal_feature_blurb(self, partner_author: str, partner_book: str, partner_link: str) -> str:
        """
        Generates a conversational recommendation paragraph from AJ Ghost to include
        in AJ Ghost's upcoming newsletter featuring the partner author's book.
        """
        prompt = f"""
Write a conversational, genuine recommendation blurb from author AJ Ghost to include in the AJ Ghost thriller newsletter.
Partner Author: {partner_author}
Partner Book Title: {partner_book}
Link: {partner_link}
Tone: Authentic author-to-author shoutout, fellow lover of dark suspense/mysteries, highly engaging.
Length: 75-100 words.
"""
        res = self.ai._call_api(prompt)
        if res:
            return res

        return f"""Before you go, I want to give a shoutout to my fellow author friend {partner_author}. If you're looking for your next edge-of-your-seat read, check out '{partner_book}'. It has all the relentless pacing and dark secrets that we love around here.

You can grab your copy right here:
{partner_link}
"""

    def generate_author_welcome_comp_email(self, author_name: str, requested_book: str) -> str:
        """
        Generates a personal welcome email from AJ Ghost to a fellow author receiving a comp copy.
        """
        return f"""Hey {author_name},

Thanks for swinging by the author lounge. It's always a pleasure connecting with fellow writers who live in the darker corners of fiction.

As promised, here is your complimentary copy of {requested_book}:
{BOOKFUNNEL_PROMO_URL}

Feel free to dive into the madness of Ryan Kane's world. If you're ever open to doing a newsletter swap or collaborating on a future BookFunnel group promotion, shoot me a reply anytime.

Keep the words flowing,
— AJ Ghost
www.ajghostthrillers.com
"""

"""
MailerLite API Integration for AJ Ghost Marketing System
Handles subscriber management, email list segmentation, and automated campaign delivery.
Works both with live MailerLite API (v2 / v3) and in robust local simulation/dry-run mode.
"""

import json
import logging
from typing import Dict, Any, List, Optional
import requests

from .config import (
    MAILERLITE_API_KEY,
    MAILERLITE_BASE_URL,
    MAILERLITE_SUBSCRIBERS_GROUP_ID,
    MAILERLITE_ARC_GROUP_ID,
    AUTHOR_NAME,
    AUTHOR_EMAIL
)

logger = logging.getLogger("MailerLiteService")


class MailerLiteService:
    def __init__(self, api_key: str = MAILERLITE_API_KEY, base_url: str = MAILERLITE_BASE_URL):
        self.api_key = api_key.strip()
        self.base_url = base_url.rstrip("/")
        self.is_live = bool(self.api_key and not self.api_key.startswith("ml_placeholder"))
        self.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

    def get_subscribers(self, limit: int = 50) -> List[Dict[str, Any]]:
        """Fetch active subscribers from MailerLite."""
        if not self.is_live:
            logger.info("[SIMULATION MODE] Returning simulated subscribers for AJ Ghost's list.")
            return [
                {"id": "sub_1", "email": "sarah.m.reader@gmail.com", "name": "Sarah", "status": "active", "tags": ["arc_team", "fractured_ground"]},
                {"id": "sub_2", "email": "thriller_junkie@yahoo.com", "name": "Marcus", "status": "active", "tags": ["hunted_buyer", "promo_clicker"]},
                {"id": "sub_3", "email": "elena.books@outlook.com", "name": "Elena", "status": "active", "tags": ["bookfunnel_lead"]},
                {"id": "sub_4", "email": "david_suspense@proton.me", "name": "David", "status": "active", "tags": ["arc_team"]}
            ]

        endpoint = f"{self.base_url}/subscribers?limit={limit}"
        try:
            res = requests.get(endpoint, headers=self.headers, timeout=15)
            if res.status_code == 200:
                return res.json().get("data", [])
            else:
                logger.error(f"MailerLite API error: {res.status_code} - {res.text}")
                return []
        except Exception as e:
            logger.error(f"Failed to connect to MailerLite: {e}")
            return []

    def add_subscriber(self, email: str, name: str = "", tags: List[str] = None) -> Dict[str, Any]:
        """Adds or updates a subscriber with tags/group assignment."""
        tags = tags or ["newsletter_signup"]
        payload = {
            "email": email,
            "fields": {"name": name},
            "groups": [MAILERLITE_SUBSCRIBERS_GROUP_ID] if MAILERLITE_SUBSCRIBERS_GROUP_ID else []
        }

        if not self.is_live:
            logger.info(f"[SIMULATION MODE] Successfully registered subscriber: {email} (tags: {tags})")
            return {
                "success": True,
                "mode": "simulation",
                "message": f"Subscriber {email} saved to Inner Circle list with tags {tags}."
            }

        endpoint = f"{self.base_url}/subscribers"
        try:
            res = requests.post(endpoint, headers=self.headers, json=payload, timeout=15)
            if res.status_code in (200, 201):
                logger.info(f"Subscriber {email} successfully synced to MailerLite!")
                return {"success": True, "data": res.json()}
            else:
                logger.error(f"MailerLite create subscriber failed: {res.status_code} - {res.text}")
                return {"success": False, "error": res.text}
        except Exception as e:
            logger.error(f"Network error adding subscriber: {e}")
            return {"success": False, "error": str(e)}

    def create_campaign(
        self,
        name: str,
        subject: str,
        html_content: str,
        plain_content: str,
        group_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Creates a campaign in MailerLite with HTML and Plain Text versions."""
        payload = {
            "name": name,
            "type": "regular",
            "emails": [
                {
                    "subject": subject,
                    "from_name": AUTHOR_NAME,
                    "from": AUTHOR_EMAIL,
                    "content": html_content,
                    "plain_text": plain_content
                }
            ],
            "groups": [group_id or MAILERLITE_SUBSCRIBERS_GROUP_ID] if (group_id or MAILERLITE_SUBSCRIBERS_GROUP_ID) else []
        }

        if not self.is_live:
            logger.info(f"[SIMULATION MODE] Campaign '{name}' created successfully with subject: '{subject}'")
            return {
                "success": True,
                "campaign_id": "cmp_simulated_9823",
                "status": "draft",
                "subject": subject,
                "preview_note": "Ready to send when live API token is provided."
            }

        endpoint = f"{self.base_url}/campaigns"
        try:
            res = requests.post(endpoint, headers=self.headers, json=payload, timeout=20)
            if res.status_code in (200, 201):
                logger.info(f"Campaign '{name}' successfully created in MailerLite!")
                return {"success": True, "data": res.json()}
            else:
                logger.error(f"Failed to create campaign: {res.status_code} - {res.text}")
                return {"success": False, "error": res.text}
        except Exception as e:
            logger.error(f"MailerLite error: {e}")
            return {"success": False, "error": str(e)}

    def send_campaign(self, campaign_id: str) -> Dict[str, Any]:
        """Schedules or triggers immediate delivery of a created campaign."""
        if not self.is_live or campaign_id.startswith("cmp_simulated"):
            logger.info(f"[SIMULATION MODE] Campaign {campaign_id} queued for delivery to subscribers.")
            return {
                "success": True,
                "status": "sent",
                "message": f"Simulated dispatch of campaign {campaign_id} complete!"
            }

        endpoint = f"{self.base_url}/campaigns/{campaign_id}/schedule"
        try:
            res = requests.post(endpoint, headers=self.headers, json={"delivery": "instant"}, timeout=20)
            if res.status_code in (200, 202):
                logger.info(f"Campaign {campaign_id} broadcasted successfully!")
                return {"success": True, "data": res.json()}
            else:
                logger.error(f"Failed to dispatch campaign: {res.status_code} - {res.text}")
                return {"success": False, "error": res.text}
        except Exception as e:
            return {"success": False, "error": str(e)}

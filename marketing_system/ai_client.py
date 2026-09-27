"""
GenSpark AI Client for AJ Ghost Marketing System
Handles conversational newsletter generation, book promotions, and automated reader replies.
"""

import json
import logging
from typing import Dict, Any, Optional
import requests

from .config import (
    GENSPARK_API_KEY,
    GENSPARK_BASE_URL,
    GENSPARK_MODEL,
    AJ_GHOST_SYSTEM_PROMPT,
    BOOKFUNNEL_PROMO_URL,
    BOOK_ARC_DAYS_LEFT,
    BOOK_FEATURED_TITLE,
    BOOK_PRIMARY_TITLE,
    AUTHOR_NAME
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("GenSparkAI")


class GenSparkAIClient:
    def __init__(self, api_key: str = GENSPARK_API_KEY, base_url: str = GENSPARK_BASE_URL, model: str = GENSPARK_MODEL):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def _call_api(self, prompt: str, system_prompt: str = AJ_GHOST_SYSTEM_PROMPT, temperature: float = 0.7) -> Optional[str]:
        """Calls the GenSpark / OpenAI compatible API endpoint with robust error handling."""
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            "temperature": temperature,
            "max_tokens": 1500
        }

        endpoint = f"{self.base_url}/chat/completions"
        try:
            logger.info(f"Dispatching prompt to GenSpark AI ({self.model})...")
            response = requests.post(endpoint, headers=self.headers, json=payload, timeout=25)
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"]
            else:
                logger.warning(f"GenSpark API returned HTTP {response.status_code}: {response.text}")
        except Exception as e:
            logger.warning(f"GenSpark AI connection error: {e}. Falling back to specialized persona engine.")

        return None

    def generate_newsletter(
        self,
        topic: str = "BookFunnel Group Promotion & ARC Campaign Update",
        promo_url: str = BOOKFUNNEL_PROMO_URL,
        arc_days: int = BOOK_ARC_DAYS_LEFT
    ) -> Dict[str, str]:
        """
        Generates a newsletter campaign for AJ Ghost's Psychological Thriller Email list.
        Adheres to BookFunnel best practices: conversational, two tracking links, ARC update.
        """
        prompt = f"""
Write an email newsletter for AJ Ghost's Psychological Thriller reader list.
Requirements:
1. Tone: Conversational, raw, sincere, suspenseful, NOT sales-y. Sound like an author talking to fellow dark fiction enthusiasts.
2. Group Promotion: BookFunnel psychological thriller giveaway.
3. Links: Include TWO natural text links pointing to: {promo_url}
4. ARC Campaign: Mention that we have {arc_days} days left in our ARC campaign for '{BOOK_FEATURED_TITLE}'. Mention how reviews and emotional reader emails are flooding in, how people cried or had to walk away, and how grateful AJ is that readers are connecting so deeply to the characters.
5. Provide both:
   - Subject Line (catchy, intrigue-driven)
   - Plain Text Body (formatted cleanly)
   - HTML Body (styled with dark navy and gold accents)
"""
        response_text = self._call_api(prompt)

        if response_text:
            return {
                "subject": f"🔥 Free Thrillers, {BOOK_FEATURED_TITLE} updates, and something just for you",
                "content": response_text
            }

        # Offline High-Fidelity Fallback
        subject = f"🔥 Free Thrillers, {BOOK_FEATURED_TITLE} updates, and something just for you"
        plain_text = f"""Hey there,

It's AJ. I've been buried in edits, coffee, and reader emails this week — and honestly? I had to come up for air just to tell you about a few things.

First off: We have {arc_days} days left in our ARC campaign for {BOOK_FEATURED_TITLE}... and I am honestly overwhelmed. The reviews are rolling in. The reader emails are filling my inbox. And I am so very happy that you are all LOVING this book and are so emotionally connected to the story and characters. Some of you told me you cried. Some of you had to put the book down and walk away for a minute. That is the exact reaction I was aiming for, and it means everything to me.

Now, I want to share something with you that I think you're going to love.

I've teamed up with some incredible thriller and suspense authors for a special BookFunnel giveaway. We're talking free books — full novels and novellas — from writers who understand that a good thriller should keep you up way past your bedtime:

Grab the free thriller collection here:
{promo_url}

These books are only available for a limited time during this group promotion. If you're looking to stack your TBR pile with some quality psychological suspense, now is your chance.

Browse through the titles and download what catches your eye:
{promo_url}

Thank you for being part of this community. Every review, email, and message you send fuels the next story.

Stay in the shadows,
— AJ Ghost
"""
        html_text = f"""<div style="background-color: #050b14; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 30px 20px; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0b1528; border: 1px solid rgba(212, 168, 39, 0.2); border-radius: 12px; padding: 32px;">
    <h2 style="color: #d4a827; font-family: Georgia, serif; margin-top: 0;">Hey there,</h2>
    <p>It's AJ. I've been buried in edits, coffee, and reader emails this week — and honestly? I had to come up for air just to tell you about a few things.</p>
    
    <div style="background-color: rgba(212, 168, 39, 0.05); border-left: 4px solid #d4a827; padding: 16px; border-radius: 6px; margin: 24px 0;">
      <h3 style="color: #f6d860; margin: 0 0 8px 0; font-size: 18px;">Fractured Ground ARC Update</h3>
      <p style="margin: 0; color: #cbd5e1; font-size: 15px;">We have <strong>{arc_days} days left</strong> in our ARC campaign for <em>{BOOK_FEATURED_TITLE}</em>... and I am honestly overwhelmed. The reviews are rolling in. Reader emails are filling my inbox. I am so very happy that you are all LOVING this book and are so emotionally connected to the characters.</p>
    </div>

    <p>Now, I want to share something with you that I think you're going to love. I've teamed up with some incredible thriller and suspense authors for a special BookFunnel giveaway.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{promo_url}" style="background-color: #d4a827; color: #050b14; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 30px; display: inline-block;">Browse the Free Thriller Collection →</a>
    </div>

    <p>These books are only available for a limited time. Once the promo ends, these free downloads disappear. You can grab your copies right here:</p>

    <p style="text-align: center;">
      <a href="{promo_url}" style="color: #f6d860; text-decoration: underline; font-weight: 600;">Download Your Free Thrillers on BookFunnel</a>
    </p>

    <p>Thank you for being part of this community. Every review, email, and message you send fuels the next story.</p>

    <p style="margin-top: 32px; font-style: italic; color: #d4a827;">Stay in the shadows,<br><strong>— AJ Ghost</strong></p>
  </div>
</div>"""

        return {
            "subject": subject,
            "plain_text": plain_text,
            "html": html_text
        }

    def generate_book_promotion(
        self,
        book_title: str = BOOK_PRIMARY_TITLE,
        hook: str = "A broken veteran being stalked by a monster wearing a therapist's smile.",
        promo_link: str = BOOKFUNNEL_PROMO_URL,
        audience_segment: str = "psychological thriller readers"
    ) -> Dict[str, str]:
        """Generates a high-converting promotional email for a specific book or promotion."""
        prompt = f"""
Write a suspenseful book promotion email for AJ Ghost's thriller: '{book_title}'.
Hook: {hook}
Target Readers: {audience_segment}
Call to Action Link: {promo_link}
Include:
- Gripping micro-story opening (Ryan Kane's lost hours / paranoia)
- Psychological tension
- Clear single CTA button/link
- AJ Ghost signature
"""
        response_text = self._call_api(prompt)
        if response_text:
            return {
                "subject": f"He knows where you are. (Free Thriller inside)",
                "content": response_text
            }

        return {
            "subject": f"He knows where you are. (Free Thriller inside)",
            "plain_text": f"""The yellow notice on Ryan's windshield gave him three days.

The predator in the gray suit had been counting for weeks.

When you're dealing with severe trauma, memory is an illusion. Lost hours. Conversations you don't remember having. Shadows moving where no one stands.

In '{book_title}', Ryan Kane thought he was looking for help. He didn't know the man offering guidance was the most dangerous hunter he'd ever crossed.

Dive in right now:
{promo_link}

See you on the other side,
— AJ Ghost
""",
            "html": f"""<div style="background-color:#050b14; color:#e2e8f0; padding:30px; font-family:sans-serif;">
  <div style="max-width:600px; margin:auto; background:#0b1528; border:1px solid rgba(212,168,39,0.3); border-radius:10px; padding:30px;">
    <h1 style="color:#d4a827; font-family:serif;">He knows where you are.</h1>
    <p>The yellow notice on Ryan's windshield gave him three days. The predator in the gray suit had been counting for weeks.</p>
    <p>Dive into <strong>{book_title}</strong> today and claim your free thriller download:</p>
    <div style="text-align:center; margin:25px 0;">
      <a href="{promo_link}" style="background:#d4a827; color:#050b14; padding:12px 24px; text-decoration:none; font-weight:bold; border-radius:24px;">Claim Your Book Now →</a>
    </div>
    <p style="color:#94a3b8; font-style:italic;">Stay in the shadows,<br>— AJ Ghost</p>
  </div>
</div>"""
        }

    def generate_email_reply(self, sender_email: str, subject: str, message_body: str) -> Dict[str, str]:
        """Generates an empathetic, authentic AJ Ghost response to incoming reader emails."""
        prompt = f"""
Reader Email From: {sender_email}
Subject: {subject}
Message Body:
{message_body}

Task:
Respond in character as AJ Ghost (Author of HUNTED and Fractured Ground).
- If they are praising the book or crying over characters: thank them deeply, share how much emotional impact matters.
- If they are asking about ARC reviews: thank them and explain how Amazon/Goodreads reviews help indie thrillers survive.
- If they are asking about trigger warnings or release dates: give clear, respectful guidance while keeping the suspense atmosphere.
- Keep the sign-off as 'Stay in the shadows, — AJ Ghost'.
"""
        response_text = self._call_api(prompt, temperature=0.6)
        if response_text:
            return {
                "reply_subject": f"Re: {subject}",
                "reply_body": response_text
            }

        # High-Fidelity Fallback
        return {
            "reply_subject": f"Re: {subject}",
            "reply_body": f"""Hi there,

Thank you so much for reaching out and taking the time to write to me. 

Reading notes like yours means everything to an author. When I was writing the dark corridors of Ryan's mind in HUNTED and the raw emotional weight of Fractured Ground, I hoped the story would resonate with readers who appreciate deep psychological suspense. Hearing your reaction confirms that every sleepless night at the keyboard was worth it.

If you have a moment to drop a short review on Goodreads or Amazon, it makes a world of difference for an independent author.

Thank you again for reading and for walking in these shadows with me.

Stay in the shadows,
— AJ Ghost
www.ajghostthrillers.com
"""
        }

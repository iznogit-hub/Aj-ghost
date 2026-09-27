"""
Automated Reader Email Inbound Processor & AI Auto-Responder for AJ Ghost
Listens for incoming reader emails, analyzes reader sentiment/questions,
and crafts authentic, empathetic psychological thriller responses via GenSpark AI.
"""

import imaplib
import smtplib
import email
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from typing import List, Dict, Any, Optional

from .config import (
    IMAP_SERVER,
    IMAP_PORT,
    IMAP_USER,
    IMAP_PASSWORD,
    SMTP_SERVER,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    AUTHOR_NAME,
    AUTHOR_EMAIL
)
from .ai_client import GenSparkAIClient

logger = logging.getLogger("EmailResponder")


class ReaderEmailResponder:
    def __init__(self, ai_client: Optional[GenSparkAIClient] = None):
        self.ai = ai_client or GenSparkAIClient()

    def process_incoming_message(self, sender: str, subject: str, body: str, auto_send: bool = False) -> Dict[str, Any]:
        """
        Analyzes an incoming reader message, generates an authentic AJ Ghost response,
        and either dispatches via SMTP or returns a ready-to-review draft.
        """
        logger.info(f"Processing inbound message from '{sender}' | Subject: '{subject}'")
        
        reply_data = self.ai.generate_email_reply(
            sender_email=sender,
            subject=subject,
            message_body=body
        )

        reply_subject = reply_data["reply_subject"]
        reply_body = reply_data["reply_body"]

        dispatched = False
        if auto_send and SMTP_USER and SMTP_PASSWORD:
            dispatched = self._send_smtp_email(to_email=sender, subject=reply_subject, body=reply_body)

        return {
            "from_reader": sender,
            "original_subject": subject,
            "generated_subject": reply_subject,
            "response_body": reply_body,
            "dispatched": dispatched,
            "status": "sent" if dispatched else "draft_ready_for_review"
        }

    def _send_smtp_email(self, to_email: str, subject: str, body: str) -> bool:
        """Sends the reply via SMTP."""
        try:
            msg = MIMEMultipart()
            msg["From"] = f"{AUTHOR_NAME} <{AUTHOR_EMAIL}>"
            msg["To"] = to_email
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain"))

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=15) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
                logger.info(f"Successfully emailed reader at {to_email}")
                return True
        except Exception as e:
            logger.error(f"Failed to send email via SMTP: {e}")
            return False

    def fetch_unread_imap_emails(self, max_count: int = 5) -> List[Dict[str, str]]:
        """Checks reader mailbox over IMAP for incoming emails."""
        if not IMAP_PASSWORD:
            logger.info("IMAP_PASSWORD not configured. Using simulated inbound reader queue.")
            return [
                {
                    "from": "clarissa.reads@booktok.com",
                    "subject": "Loved Fractured Ground ARC so far!! Question about Ryan",
                    "body": "Hi AJ! I got the Fractured Ground ARC 3 days ago and I am already 70% in. Ryan Kane is such a complex protagonist. I literally cried during the flashback scene in chapter 9. Where should I post my review once I finish?"
                },
                {
                    "from": "thrillseeker99@gmail.com",
                    "subject": "Trigger warning inquiry for HUNTED",
                    "body": "Hey AJ Ghost, looking forward to reading HUNTED this weekend. Does it contain graphic violence or is it purely psychological suspense? Thank you!"
                }
            ]

        messages = []
        try:
            mail = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT)
            mail.login(IMAP_USER, IMAP_PASSWORD)
            mail.select("inbox")

            status, data = mail.search(None, 'UNSEEN')
            mail_ids = data[0].split()

            for mid in mail_ids[-max_count:]:
                _, msg_data = mail.fetch(mid, '(RFC822)')
                for response_part in msg_data:
                    if isinstance(response_part, tuple):
                        msg = email.message_from_bytes(response_part[1])
                        subject = msg["Subject"]
                        sender = msg["From"]
                        body = ""
                        if msg.is_multipart():
                            for part in msg.walk():
                                if part.get_content_type() == "text/plain":
                                    body = part.get_payload(decode=True).decode(errors="ignore")
                                    break
                        else:
                            body = msg.get_payload(decode=True).decode(errors="ignore")

                        messages.append({"from": sender, "subject": subject, "body": body})
            mail.close()
            mail.logout()
        except Exception as e:
            logger.error(f"IMAP retrieval error: {e}")

        return messages

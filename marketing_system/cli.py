"""
AJ Ghost - Systematic Marketing & AI Automation Suite (CLI)
Couples GenSpark AI, BookFunnel promo tracking, MailerLite, and reader auto-responder.
"""

import sys
import os
import json
from pathlib import Path

# Add parent directory to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from marketing_system.ai_client import GenSparkAIClient
from marketing_system.mailerlite_service import MailerLiteService
from marketing_system.email_responder import ReaderEmailResponder
from marketing_system.book_clicker_tracker import BookClickerTracker
from marketing_system.config import (
    AUTHOR_NAME,
    BOOKFUNNEL_PROMO_URL,
    BOOK_ARC_DAYS_LEFT,
    BOOK_FEATURED_TITLE,
    BOOK_PRIMARY_TITLE,
    GENSPARK_API_KEY,
    MAILERLITE_API_KEY
)


def print_banner():
    banner = f"""
=============================================================================
   AJ GHOST - PSYCHOLOGICAL THRILLER MARKETING & AI AUTOMATION ENGINE
=============================================================================
  Author: {AUTHOR_NAME}
  Primary Book: {BOOK_PRIMARY_TITLE}
  Featured ARC Book: {BOOK_FEATURED_TITLE} ({BOOK_ARC_DAYS_LEFT} days left in ARC)
  GenSpark AI: {"[ACTIVE]" if GENSPARK_API_KEY else "[MISSING KEY]"}
  MailerLite: {"[LIVE API]" if MAILERLITE_API_KEY and not MAILERLITE_API_KEY.startswith("ml_") else "[DRY-RUN / SIMULATOR READY]"}
  Promo Link: {BOOKFUNNEL_PROMO_URL}
=============================================================================
"""
    print(banner)


def menu_generate_newsletter(ai: GenSparkAIClient, mailer: MailerLiteService):
    print("\n--- [1] GENERATE NEWSLETTER (GENSPARK AI) ---")
    print(f"Creating conversational newsletter with BookFunnel links & {BOOK_ARC_DAYS_LEFT}-day ARC update...")
    
    result = ai.generate_newsletter(
        topic="BookFunnel Giveaway & Fractured Ground Emotional Reader Reviews",
        promo_url=BOOKFUNNEL_PROMO_URL,
        arc_days=BOOK_ARC_DAYS_LEFT
    )

    print("\n[GENERATED SUBJECT]:")
    print(result.get("subject"))

    print("\n[PREVIEW PLAIN TEXT EMAIL]:")
    print("-" * 60)
    print(result.get("plain_text", result.get("content")))
    print("-" * 60)

    choice = input("\nWould you like to stage this campaign to MailerLite now? (y/n): ").strip().lower()
    if choice == "y":
        campaign = mailer.create_campaign(
            name=f"AJ Ghost Newsletter - ARC {BOOK_ARC_DAYS_LEFT} Days Left",
            subject=result.get("subject"),
            html_content=result.get("html", ""),
            plain_content=result.get("plain_text", result.get("content"))
        )
        print("\n[MAILERLITE STATUS]:", campaign)


def menu_send_book_promotion(ai: GenSparkAIClient, mailer: MailerLiteService):
    print("\n--- [2] SEND TARGETED BOOK PROMOTION ---")
    print(f"Crafting dark thriller promotion for '{BOOK_PRIMARY_TITLE}'...")
    
    promo = ai.generate_book_promotion(
        book_title=BOOK_PRIMARY_TITLE,
        hook="A broken veteran stalked by a monster wearing a therapist's smile.",
        promo_link=BOOKFUNNEL_PROMO_URL
    )

    print("\n[PROMOTION PREVIEW]:")
    print(promo.get("plain_text", promo.get("content")))

    choice = input("\nDispatch targeted blast to active thriller subscribers? (y/n): ").strip().lower()
    if choice == "y":
        campaign = mailer.create_campaign(
            name="AJ Ghost - HUNTED Promo Blast",
            subject=promo.get("subject"),
            html_content=promo.get("html", ""),
            plain_content=promo.get("plain_text", promo.get("content"))
        )
        if campaign.get("success"):
            cid = campaign.get("campaign_id") or campaign.get("data", {}).get("id")
            if cid:
                send_res = mailer.send_campaign(cid)
                print("[DELIVERY RESULT]:", send_res)


def menu_process_reader_inquiries(responder: ReaderEmailResponder):
    print("\n--- [3] PROCESS INCOMING READER EMAILS & AI AUTO-REPLY ---")
    print("Checking inbox for reader emails, ARC questions, and review notes...")

    incoming = responder.fetch_unread_imap_emails(max_count=3)
    if not incoming:
        print("No unread reader messages found.")
        return

    for idx, msg in enumerate(incoming, 1):
        print(f"\n[{idx}] Message from: {msg['from']}")
        print(f"    Subject: {msg['subject']}")
        print(f"    Body: {msg['body']}")

        reply = responder.process_incoming_message(
            sender=msg["from"],
            subject=msg["subject"],
            body=msg["body"],
            auto_send=False
        )

        print("\n    >>> [GENSPARK AI DRAFTED AJ GHOST REPLY]:")
        for line in reply["response_body"].split("\n"):
            print(f"        {line}")
        print("    " + "-" * 50)


def menu_view_tracker(tracker: BookClickerTracker):
    print("\n--- [4] BOOKFUNNEL CLICKER & PROMOTION ANALYTICS ---")
    summary = tracker.get_campaign_summary()
    print(f"Campaign: {summary['featured_book']} ARC & BookFunnel Giveaway")
    print(f"ARC Countdown: {summary['arc_days_left']} Days Left")
    print(f"Total Clicks Recorded: {summary['total_clicks']}")
    print(f"Downloads Reported: {summary['downloads_reported']}")
    print(f"Reviews Received: {summary['reviews_received']}")
    print(f"Conversion Rate: {summary['conversion_rate_pct']}%")
    print("\nClick Sources Breakdown:")
    for src, count in summary["click_breakdown"].items():
        print(f"  • {src}: {count} clicks")


def main():
    ai = GenSparkAIClient()
    mailer = MailerLiteService()
    responder = ReaderEmailResponder(ai_client=ai)
    tracker = BookClickerTracker()

    while True:
        print_banner()
        print("Select an action:")
        print("  1. Generate Newsletter with GenSpark AI (BookFunnel links & 22-day ARC update)")
        print("  2. Create & Send Book Promotion via MailerLite")
        print("  3. Check Reader Inquiries & Generate AI Auto-Replies")
        print("  4. View Book Clicker & ARC Campaign Analytics")
        print("  5. Run Full Diagnostic / Self-Test")
        print("  6. Exit")

        choice = input("\nEnter option (1-6): ").strip()

        if choice == "1":
            menu_generate_newsletter(ai, mailer)
        elif choice == "2":
            menu_send_book_promotion(ai, mailer)
        elif choice == "3":
            menu_process_reader_inquiries(responder)
        elif choice == "4":
            menu_view_tracker(tracker)
        elif choice == "5":
            print("\nRunning system diagnostics...")
            subs = mailer.get_subscribers()
            print(f"Subscribers reachable: {len(subs)}")
            nl = ai.generate_newsletter()
            print(f"Newsletter generation: OK (Subject: '{nl['subject']}')")
            inbox = responder.fetch_unread_imap_emails()
            print(f"Inbox scanner: OK ({len(inbox)} messages handled)")
            stats = tracker.get_campaign_summary()
            print(f"Tracker: OK ({stats['total_clicks']} clicks tracked)")
            print("\nAll systems operational!")
        elif choice == "6":
            print("\nExiting AJ Ghost Marketing Engine. Stay in the shadows.\n")
            break
        else:
            print("Invalid selection. Please choose between 1 and 6.")

        input("\nPress Enter to return to menu...")


if __name__ == "__main__":
    main()

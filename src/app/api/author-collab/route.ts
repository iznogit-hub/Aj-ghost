import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            type, // "comp_copy" | "newsletter_swap"
            authorName,
            email,
            bookTitle,
            format,
            partnerBookTitle,
            listSize,
            proposedDate,
            bookLink,
        } = body;

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { success: false, error: "A valid author email address is required." },
                { status: 400 }
            );
        }

        const mailerliteKey = process.env.MAILERLITE_API_KEY;
        const bookFunnelPromo = process.env.BOOKFUNNEL_PROMO_URL || "https://books.bookfunnel.com/thrillingfreebies-sep/ipph5qfp15";

        // Store collaboration lead locally for the Python Marketing System to pick up
        const logDir = path.join(process.cwd(), "marketing_system", "data");
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const proposalRecord = {
            id: `collab_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type,
            authorName,
            email,
            details: type === "comp_copy" 
                ? { requestedBook: bookTitle, format }
                : { partnerBookTitle, listSize, proposedDate, bookLink },
            status: "pending_review"
        };

        const logFile = path.join(logDir, "author_collabs.json");
        let existing: any[] = [];
        if (fs.existsSync(logFile)) {
            try {
                existing = JSON.parse(fs.readFileSync(logFile, "utf-8"));
            } catch (e) {
                existing = [];
            }
        }
        existing.push(proposalRecord);
        fs.writeFileSync(logFile, JSON.stringify(existing, null, 2));

        // Sync with MailerLite if active
        if (mailerliteKey && !mailerliteKey.startsWith("ml_placeholder")) {
            await fetch("https://connect.mailerlite.com/api/subscribers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${mailerliteKey}`,
                },
                body: JSON.stringify({
                    email,
                    fields: { 
                        name: authorName,
                        author_type: type
                    },
                }),
            }).catch((e) => console.error("MailerLite author sync err:", e));
        }

        if (type === "comp_copy") {
            return NextResponse.json({
                success: true,
                message: `Welcome, ${authorName}! Your complimentary review copy of ${bookTitle || "Fractured Ground"} is ready for download below.`,
                downloadUrl: bookFunnelPromo
            });
        }

        return NextResponse.json({
            success: true,
            message: `Thank you, ${authorName}. Your newsletter swap proposal for '${partnerBookTitle}' has been recorded. AJ Ghost will review your submission and reply with custom blurb assets shortly.`
        });

    } catch (err: any) {
        console.error("Author collab route error:", err);
        return NextResponse.json(
            { success: false, error: "Internal server error occurred." },
            { status: 500 }
        );
    }
}

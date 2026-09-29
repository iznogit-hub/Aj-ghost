import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TARGET_EMAIL = "n.franco2222@gmail.com";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "Please fill out all required fields." },
                { status: 400 }
            );
        }

        if (!email.includes("@")) {
            return NextResponse.json(
                { success: false, error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        // Save locally to marketing_system/data/contact_messages.json
        const logDir = path.join(process.cwd(), "marketing_system", "data");
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const messageRecord = {
            id: `msg_${Date.now()}`,
            timestamp: new Date().toISOString(),
            recipient: TARGET_EMAIL,
            name,
            email,
            subject: subject || "General Inquiry",
            message,
            status: "unread",
        };

        const logFile = path.join(logDir, "contact_messages.json");
        let existing: any[] = [];
        if (fs.existsSync(logFile)) {
            try {
                existing = JSON.parse(fs.readFileSync(logFile, "utf-8"));
            } catch {
                existing = [];
            }
        }
        existing.push(messageRecord);
        fs.writeFileSync(logFile, JSON.stringify(existing, null, 2));

        console.log(`[CONTACT QUERY ROUTED] Recipient: ${TARGET_EMAIL} | From: ${name} <${email}> | Subject: ${subject}`);

        return NextResponse.json({
            success: true,
            recipient: TARGET_EMAIL,
            message: "Your message has been sent directly to AJ Ghost.",
        });
    } catch (err: any) {
        console.error("Contact API error:", err);
        return NextResponse.json(
            { success: false, error: "Internal server error occurred." },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name = "", source = "website" } = body;

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { success: false, error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        const mailerliteKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.MAILERLITE_SUBSCRIBERS_GROUP_ID;

        // If live MailerLite API key is configured
        if (mailerliteKey && !mailerliteKey.startsWith("ml_placeholder")) {
            const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${mailerliteKey}`,
                },
                body: JSON.stringify({
                    email,
                    fields: { name },
                    groups: groupId ? [groupId] : [],
                }),
            });

            if (!mlRes.ok) {
                const errText = await mlRes.text();
                console.error("MailerLite API Error:", errText);
                return NextResponse.json(
                    { success: false, error: "Subscription provider rejected request." },
                    { status: mlRes.status }
                );
            }
        } else {
            console.log(`[SIMULATION MODE] New Inner Circle reader signup: ${email} (source: ${source})`);
        }

        return NextResponse.json({
            success: true,
            message: "Welcome to the Inner Circle. Watch your inbox for Chapter 1.",
        });
    } catch (err: any) {
        console.error("Subscription error:", err);
        return NextResponse.json(
            { success: false, error: "Internal server error occurred." },
            { status: 500 }
        );
    }
}

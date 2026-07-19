import { NextResponse } from "next/server";

// Using a simple in-memory store for rate limiting in this mock
const attemptsMap = new Map<string, number>();

export async function POST(request: Request) {
    try {
        const { code, email } = await request.json();

        if (!code || !email) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const attempts = attemptsMap.get(email) || 0;

        if (attempts >= 3) {
            return NextResponse.json(
                { error: "Account locked after 3 failed attempts." },
                { status: 403 }
            );
        }

        // For testing, accept "123456" as the valid MFA code
        if (code !== "123456") {
            const newAttempts = attempts + 1;
            attemptsMap.set(email, newAttempts);

            if (newAttempts >= 3) {
                return NextResponse.json(
                    { error: "Account locked due to 3 failed attempts." },
                    { status: 403 }
                );
            }

            return NextResponse.json(
                {
                    error: "Invalid code",
                    attemptsLeft: 3 - newAttempts,
                },
                { status: 400 }
            );
        }

        // Success, reset attempts
        attemptsMap.delete(email);

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

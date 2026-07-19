import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Mock secure word generation
        const words = ["AEON", "BANK", "SECURE", "VAULT", "TRUST", "TOKEN"];
        const secureWord =
            words[Math.floor(Math.random() * words.length)] +
            Math.floor(1000 + Math.random() * 9000);

        return NextResponse.json({
            secureWord,
            expiresIn: 60, // seconds
        });
    } catch (e) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

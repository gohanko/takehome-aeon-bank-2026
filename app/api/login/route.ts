import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, passwordHash, secureWord } = await request.json();
        
        if (!email || !passwordHash || !secureWord) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        
        // In a real app we'd validate secure word expiry and check hash against DB
        if (passwordHash.length < 10) {
            return NextResponse.json({ error: "Invalid password format" }, { status: 400 });
        }
        
        let role = "viewer";
        if (email.toLowerCase().includes("maker")) {
            role = "maker";
        }
        
        const token = "mock-jwt-token-" + Date.now();
        
        return NextResponse.json({
            token,
            role
        });
    } catch (e) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

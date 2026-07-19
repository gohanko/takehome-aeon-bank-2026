import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // In a real app we'd verify the token from the header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mockTransactions = [
        { id: "TX1001", date: "2026-07-18", description: "Salary Deposit", amount: 5000.00, type: "credit", status: "completed" },
        { id: "TX1002", date: "2026-07-19", description: "Coffee Shop", amount: 4.50, type: "debit", status: "completed" },
        { id: "TX1003", date: "2026-07-19", description: "Grocery Store", amount: 150.25, type: "debit", status: "completed" },
        { id: "TX1004", date: "2026-07-20", description: "Electric Bill", amount: 85.00, type: "debit", status: "pending" },
        { id: "TX1005", date: "2026-07-21", description: "Online Subscription", amount: 12.99, type: "debit", status: "completed" },
    ];
    
    return NextResponse.json(mockTransactions);
}

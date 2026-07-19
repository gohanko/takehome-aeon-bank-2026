"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { TransactionsPage } from "@/components/pages/transactions-page";

export default function Transactions() {
    const { role, isInitializing } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isInitializing && role === "viewer") {
            router.push("/dashboard/overview");
        }
    }, [role, isInitializing, router]);

    if (isInitializing || role === "viewer") {
        return (
            <div className="flex items-center justify-center p-8 text-gray-500">
                Checking permissions...
            </div>
        );
    }

    return <TransactionsPage />;
}

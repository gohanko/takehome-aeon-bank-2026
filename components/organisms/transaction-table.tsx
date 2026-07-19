"use client";

import * as React from "react";
import { fetchWithAuth } from "@/utilities/api";

type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: "credit" | "debit";
    status: string;
};

export const TransactionTable = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetchWithAuth("/api/transaction-history");
                if (!res.ok) throw new Error("Failed to load transactions");
                const data = await res.json();
                setTransactions(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading)
        return (
            <div className="animate-pulse p-8 text-center text-gray-500">
                Loading transactions...
            </div>
        );
    if (error)
        return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-700 uppercase">
                    <tr>
                        <th className="rounded-tl-lg px-6 py-4">Date</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="rounded-tr-lg px-6 py-4 text-right">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {transactions.map((tx) => (
                        <tr
                            key={tx.id}
                            className="transition-colors hover:bg-gray-50"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                {tx.date}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {tx.description}
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`rounded-full px-2 py-1 text-xs font-medium ${tx.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                                >
                                    {tx.status}
                                </span>
                            </td>
                            <td
                                className={`px-6 py-4 text-right font-medium whitespace-nowrap ${tx.type === "credit" ? "text-green-600" : "text-gray-900"}`}
                            >
                                {tx.type === "credit" ? "+" : "-"}$
                                {tx.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    {transactions.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-6 py-8 text-center text-gray-500"
                            >
                                No transactions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

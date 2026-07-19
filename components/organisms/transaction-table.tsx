"use client";

import * as React from "react";
import { fetchWithAuth } from "@/utils/api";

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

    if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading transactions...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-4 rounded-tl-lg">Date</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right rounded-tr-lg">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">{tx.date}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {tx.status}
                                </span>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-right font-medium ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                                {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    {transactions.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

import * as React from "react";
import { Heading } from "../atoms/heading";
import { TransactionTable } from "../organisms/transaction-table";

export const TransactionsPage = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <Heading level={2} className="text-gray-900">Transaction History</Heading>
                <p className="text-gray-500 mt-1">View and manage your recent transactions.</p>
            </div>
            
            <TransactionTable />
        </div>
    );
};

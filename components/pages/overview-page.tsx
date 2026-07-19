import * as React from "react";
import { Heading } from "../atoms/heading";

export const OverviewPage = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <Heading level={2} className="text-gray-900">Dashboard Overview</Heading>
                <p className="text-gray-500 mt-1">Welcome back to your banking portal.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">$24,562.00</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-medium text-gray-500">Monthly Expenses</h3>
                    <p className="text-3xl font-bold text-red-600 mt-2">$3,240.50</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-medium text-gray-500">Savings</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">$12,450.00</p>
                </div>
            </div>
        </div>
    );
};

import * as React from "react";
import { Heading } from "../atoms/heading";

export const OverviewPage = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
            <div>
                <Heading level={2} className="text-gray-900">
                    Dashboard Overview
                </Heading>
                <p className="mt-1 text-gray-500">
                    Welcome back to your banking portal.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">
                        Total Balance
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        $24,562.00
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">
                        Monthly Expenses
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-red-600">
                        $3,240.50
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">
                        Savings
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                        $12,450.00
                    </p>
                </div>
            </div>
        </div>
    );
};

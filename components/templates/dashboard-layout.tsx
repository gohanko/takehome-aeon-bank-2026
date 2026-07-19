"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useIdleTimeout } from "@/hooks/useIdleTimeout";
import { IdleWarningModal } from "@/components/organisms/idle-warning-modal";
import { Button } from "@/components/atoms/button";

export const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { logout, role, isInitializing, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const [showIdleModal, setShowIdleModal] = React.useState(false);

    const { resetTimers } = useIdleTimeout(
        () => setShowIdleModal(true),
        () => {
            setShowIdleModal(false);
            logout();
        },
        10000,
        30000
    );

    if (isInitializing)
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );

    if (!isAuthenticated) return null;

    const navItems = [
        {
            href: "/dashboard/overview",
            label: "Overview",
            roles: ["maker", "viewer"],
        },
        {
            href: "/dashboard/transactions",
            label: "Transactions",
            roles: ["maker"],
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
            <aside className="flex w-full flex-col border-r border-gray-200 bg-white md:w-64">
                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <span className="text-xl font-bold text-blue-600">
                        AEON Bank
                    </span>
                </div>

                <div className="flex-1 p-4">
                    <div className="mb-6 px-2 text-sm text-gray-500">
                        Logged in as:{" "}
                        <span className="font-semibold text-gray-700 uppercase">
                            {role}
                        </span>
                    </div>

                    <nav className="space-y-1">
                        {navItems
                            .filter((item) => item.roles.includes(role || ""))
                            .map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                        pathname === item.href
                                            ? "bg-blue-50 font-semibold text-blue-700"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                    </nav>
                </div>

                <div className="border-t border-gray-200 p-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
            </aside>

            <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>

            <IdleWarningModal
                isOpen={showIdleModal}
                onContinue={() => {
                    setShowIdleModal(false);
                    resetTimers();
                }}
            />
        </div>
    );
};

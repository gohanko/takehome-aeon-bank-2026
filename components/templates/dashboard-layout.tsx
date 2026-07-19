"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useIdleTimeout } from "@/hooks/useIdleTimeout";
import { IdleWarningModal } from "@/components/organisms/idle-warning-modal";
import { Button } from "@/components/atoms/button";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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

    if (isInitializing) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!isAuthenticated) return null;

    const navItems = [
        { href: "/dashboard/overview", label: "Overview", roles: ["maker", "viewer"] },
        { href: "/dashboard/transactions", label: "Transactions", roles: ["maker"] },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-xl text-blue-600">AEON Bank</span>
                </div>

                <div className="p-4 flex-1">
                    <div className="mb-6 text-sm text-gray-500 px-2">
                        Logged in as: <span className="font-semibold text-gray-700 uppercase">{role}</span>
                    </div>

                    <nav className="space-y-1">
                        {navItems.filter(item => item.roles.includes(role || "")).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href
                                        ? "bg-blue-50 text-blue-700 font-semibold"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-200">
                    <Button variant="outline" className="w-full" onClick={logout}>
                        Logout
                    </Button>
                </div>
            </aside>

            <main className="flex-1 p-6 md:p-8 overflow-auto">
                {children}
            </main>

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

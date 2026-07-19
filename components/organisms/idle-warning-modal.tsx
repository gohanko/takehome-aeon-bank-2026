"use client";

import * as React from "react";
import { Button } from "@/components/atoms/button";
import { Heading } from "@/components/atoms/heading";
import { useAuth } from "@/hooks/useAuth";

interface IdleWarningModalProps {
    isOpen: boolean;
    onContinue: () => void;
}

export const IdleWarningModal = ({
    isOpen,
    onContinue,
}: IdleWarningModalProps) => {
    const { logout } = useAuth();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="animate-in fade-in zoom-in-95 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
                <Heading level={3} className="mb-2 text-gray-900">
                    Session Expiring
                </Heading>
                <p className="mb-6 text-sm text-gray-600">
                    You have been idle for a while. You will be automatically
                    logged out soon to protect your account.
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={logout}>
                        Logout Now
                    </Button>
                    <Button onClick={onContinue}>Continue Session</Button>
                </div>
            </div>
        </div>
    );
};

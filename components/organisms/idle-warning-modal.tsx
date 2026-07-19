"use client";

import * as React from "react";
import { Button } from "../atoms/Button";
import { Heading } from "../atoms/heading";
import { useAuth } from "@/hooks/useAuth";

interface IdleWarningModalProps {
    isOpen: boolean;
    onContinue: () => void;
}

export const IdleWarningModal = ({ isOpen, onContinue }: IdleWarningModalProps) => {
    const { logout } = useAuth();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl animate-in fade-in zoom-in-95">
                <Heading level={3} className="text-gray-900 mb-2">Session Expiring</Heading>
                <p className="text-gray-600 mb-6 text-sm">
                    You have been idle for a while. You will be automatically logged out soon to protect your account.
                </p>
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={logout}>
                        Logout Now
                    </Button>
                    <Button onClick={onContinue}>
                        Continue Session
                    </Button>
                </div>
            </div>
        </div>
    );
};

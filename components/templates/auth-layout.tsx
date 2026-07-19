import * as React from "react";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            {children}
        </div>
    );
};

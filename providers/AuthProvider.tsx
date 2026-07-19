"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export type Role = "maker" | "viewer" | null;

interface AuthContextType {
    token: string | null;
    role: Role;
    login: (token: string, role: Role) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isInitializing: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<Role>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role") as Role;
        if (storedToken) {
            setToken(storedToken);
            setRole(storedRole);
        }
        setIsInitializing(false);
    }, []);

    const login = (newToken: string, newRole: Role) => {
        localStorage.setItem("token", newToken);
        if (newRole) {
            localStorage.setItem("role", newRole);
        }
        setToken(newToken);
        setRole(newRole);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
        router.push("/authentication/login");
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                login,
                logout,
                isAuthenticated: !!token,
                isInitializing,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

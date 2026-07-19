import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Transactions from "../app/dashboard/transactions/page";
import { AuthContext } from "../providers/AuthProvider";

// Mock useRouter
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: mockPush }),
    usePathname: () => "/dashboard/transactions",
}));

describe("Role Guard in Transactions Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("redirects to overview when role is viewer", () => {
        const providerProps = {
            role: "viewer" as any,
            isInitializing: false,
            isAuthenticated: true,
            token: "fake-token",
            login: vi.fn(),
            logout: vi.fn(),
        };

        render(
            <AuthContext.Provider value={providerProps}>
                <Transactions />
            </AuthContext.Provider>
        );

        expect(mockPush).toHaveBeenCalledWith("/dashboard/overview");
        expect(screen.getByText("Checking permissions...")).toBeInTheDocument();
    });

    it("renders transactions page when role is maker", () => {
        const providerProps = {
            role: "maker" as any,
            isInitializing: false,
            isAuthenticated: true,
            token: "fake-token",
            login: vi.fn(),
            logout: vi.fn(),
        };

        render(
            <AuthContext.Provider value={providerProps}>
                <Transactions />
            </AuthContext.Provider>
        );

        expect(screen.getByText("Transaction History")).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });
});

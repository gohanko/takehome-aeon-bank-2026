"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { Heading } from "@/components/atoms/heading";
import { FormField } from "@/components/molecules/form-field";
import { MfaInput } from "@/components/molecules/mfa-input";
import { SecureWordDisplay } from "@/components/molecules/secure-word-display";
import { hashPassword } from "@/utilities/crypto";
import { useAuth } from "@/hooks/useAuth";

type Step = "email" | "password" | "mfa";

export const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();

    const [step, setStep] = React.useState<Step>("email");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [secureWord, setSecureWord] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [mfaError, setMfaError] = React.useState("");

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await fetch("/api/getSecureWord", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");

            setSecureWord(data.secureWord);
            setStep("password");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const passwordHash = await hashPassword(password);
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, passwordHash, secureWord })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");

            login(data.token, data.role);
            setStep("mfa");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMfaComplete = async (code: string) => {
        setMfaError("");
        setIsLoading(true);
        try {
            const res = await fetch("/api/verifyMfa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code })
            });
            const data = await res.json();
            if (!res.ok) {
                if (res.status === 403) {
                    throw new Error(data.error);
                }
                throw new Error(`${data.error}. Attempts left: ${data.attemptsLeft}`);
            }

            router.push("/dashboard/overview");
        } catch (err: any) {
            setMfaError(err.message);
            if (err.message.includes("locked")) {
                setStep("email"); // reset
                setEmail("");
                setPassword("");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleExpire = () => {
        setError("Secure word expired. Please try again.");
        setStep("email");
        setPassword("");
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="mb-8 text-center">
                <Heading level={2}>AEON Bank</Heading>
                <p className="text-gray-500 mt-2 text-sm">Secure Banking Portal</p>
            </div>

            {step === "email" && (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <FormField
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="maker@dummybank.com"
                        required
                        error={error}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Proceeding..." : "Next"}
                    </Button>
                </form>
            )}

            {step === "password" && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <SecureWordDisplay word={secureWord} expiresIn={60} onExpire={handleExpire} />

                    <FormField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        error={error}
                    />
                    <div className="flex gap-3">
                        <Button type="button" variant="outline" className="w-full" onClick={() => setStep("email")}>
                            Back
                        </Button>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>
            )}

            {step === "mfa" && (
                <div className="space-y-6 text-center">
                    <div>
                        <Heading level={4} className="mb-2">Two-Factor Authentication</Heading>
                        <p className="text-sm text-gray-500">
                            Enter the 6-digit code sent to your device. (Mock code: 123456)
                        </p>
                    </div>

                    <MfaInput onComplete={handleMfaComplete} error={mfaError} />

                    {isLoading && <p className="text-sm text-gray-500 mt-4">Verifying...</p>}
                </div>
            )}
        </div>
    );
};

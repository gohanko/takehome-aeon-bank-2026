import * as React from "react";
import { Input } from "../atoms/input";
import { cn } from "@/utilities/cn";

interface MfaInputProps {
    length?: number;
    onComplete: (code: string) => void;
    error?: string;
}

export const MfaInput = ({ length = 6, onComplete, error }: MfaInputProps) => {
    const [code, setCode] = React.useState<string[]>(Array(length).fill(""));
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value;
        if (!/^[0-9]*$/.test(value)) return;

        const newCode = [...code];
        // Only take the last char if they paste or type multiple
        newCode[index] = value.substring(value.length - 1);
        setCode(newCode);

        // Move to next input if filled
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        const fullCode = newCode.join("");
        if (fullCode.length === length) {
            onComplete(fullCode);
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between gap-2">
                {code.map((digit, index) => (
                    <Input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={cn(
                            "h-14 w-12 text-center text-xl sm:h-16 sm:w-14",
                            error && "border-red-500 focus:ring-red-500"
                        )}
                    />
                ))}
            </div>
            {error && (
                <p className="text-center text-sm font-medium text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

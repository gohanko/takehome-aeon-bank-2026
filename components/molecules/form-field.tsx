import * as React from "react";
import { Label } from "../atoms/label";
import { Input, InputProps } from "../atoms/input";
import { cn } from "@/utils/cn";

interface FormFieldProps extends InputProps {
    label: string;
    error?: string;
    containerClassName?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, error, containerClassName, id, className, ...props }, ref) => {
        const inputId = id || React.useId();
        
        return (
            <div className={cn("space-y-2", containerClassName)}>
                <Label htmlFor={inputId} className={error ? "text-red-500" : ""}>
                    {label}
                </Label>
                <Input
                    id={inputId}
                    ref={ref}
                    className={cn(error && "border-red-500 focus:ring-red-500", className)}
                    {...props}
                />
                {error && (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                )}
            </div>
        );
    }
);
FormField.displayName = "FormField";

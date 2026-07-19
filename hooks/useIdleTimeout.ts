"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export function useIdleTimeout(
    onWarning: () => void,
    onTimeout: () => void,
    warningTimeMs: number = 10000,
    logoutTimeMs: number = 30000
) {
    const [isIdle, setIsIdle] = useState(false);
    const warningRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Use refs to keep callbacks fresh without restarting timers
    const onWarningRef = useRef(onWarning);
    const onTimeoutRef = useRef(onTimeout);
    
    useEffect(() => {
        onWarningRef.current = onWarning;
        onTimeoutRef.current = onTimeout;
    }, [onWarning, onTimeout]);

    const resetTimers = useCallback(() => {
        setIsIdle(false);
        if (warningRef.current) clearTimeout(warningRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        warningRef.current = setTimeout(() => {
            setIsIdle(true);
            onWarningRef.current();
        }, warningTimeMs);

        timeoutRef.current = setTimeout(() => {
            onTimeoutRef.current();
        }, logoutTimeMs);
    }, [warningTimeMs, logoutTimeMs]);

    useEffect(() => {
        const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
        
        const handleActivity = () => {
            if (!isIdle) {
                resetTimers();
            }
        };

        events.forEach((event) => window.addEventListener(event, handleActivity));
        
        resetTimers();

        return () => {
            events.forEach((event) => window.removeEventListener(event, handleActivity));
            if (warningRef.current) clearTimeout(warningRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [resetTimers, isIdle]);

    return { isIdle, resetTimers };
}

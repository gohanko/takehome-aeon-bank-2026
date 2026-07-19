import * as React from "react";

export function Countdown({ secondsLeft }: { secondsLeft: number }) {
    return (
        <span className={`font-mono font-bold ${secondsLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`}>
            {secondsLeft}s
        </span>
    );
}

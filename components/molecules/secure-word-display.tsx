import * as React from "react";
import { Countdown } from "../atoms/countdown";

interface SecureWordDisplayProps {
    word: string;
    expiresIn: number; // in seconds
    onExpire: () => void;
}

export const SecureWordDisplay = ({
    word,
    expiresIn,
    onExpire,
}: SecureWordDisplayProps) => {
    const [secondsLeft, setSecondsLeft] = React.useState(expiresIn);

    React.useEffect(() => {
        if (secondsLeft <= 0) {
            onExpire();
            return;
        }

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, onExpire]);

    return (
        <div className="flex flex-col items-center gap-2 rounded-md border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">Your secure word is:</p>
            <p className="text-2xl font-bold tracking-widest text-blue-900">
                {word}
            </p>
            <div className="flex items-center gap-1 text-sm text-blue-700">
                Expires in: <Countdown secondsLeft={secondsLeft} />
            </div>
        </div>
    );
};

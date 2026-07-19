import * as React from "react";
import { cn } from "@/utils/cn";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = ({ className, level = 1, ...props }: HeadingProps) => {
    const Component = `h${level}` as React.ElementType;
    
    const variants = {
        1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        2: "scroll-m-20 text-3xl font-semibold tracking-tight",
        3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        4: "scroll-m-20 text-xl font-semibold tracking-tight",
        5: "scroll-m-20 text-lg font-semibold tracking-tight",
        6: "scroll-m-20 text-base font-semibold tracking-tight",
    };
    
    return <Component className={cn(variants[level], className)} {...props} />;
};

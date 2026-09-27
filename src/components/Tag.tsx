import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Tag = (props: HTMLAttributes<HTMLDivElement>) => {
    const { className, children, ...rest } = props;

    return (
        <div className={twMerge("inline-flex border border-gold-400/30 gap-2 text-gold-300 px-3 py-1 rounded-full uppercase items-center tracking-widest bg-gold-400/5 backdrop-blur-sm", className)} {...rest}>
            <span className="text-gold-400">&#10038;</span>
            <span className="text-sm font-semibold font-mono">{children}</span>
        </div>
    );
};

export default Tag;
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Tag = (props: HTMLAttributes<HTMLDivElement>) => {
    const { className, children, ...rest } = props;

    return (
        <div className={twMerge("inline-flex border border-neutral-300 gap-2 text-neutral-950 px-3 py-1 rounded-full uppercase items-center tracking-widest bg-neutral-100", className)} {...rest}>
            <span className="text-neutral-400">&#10038;</span>
            <span className="text-sm font-semibold font-mono">{children}</span>
        </div>
    );
};

export default Tag;
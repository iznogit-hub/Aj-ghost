import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Avatar = (props: HTMLAttributes<HTMLDivElement>) => {
    const { className, children, ...rest } = props;

    return (
        <div
            className={twMerge(
                "size-20 rounded-full overflow-hidden border-4 border-white/20 p-1 bg-neutral-900 relative",
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Avatar;
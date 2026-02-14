import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Key = (props: HTMLAttributes<HTMLDivElement>) => {
    const { className, children, ...rest } = props;

    return (
        <div
            className={twMerge(
                "size-14 bg-neutral-800 border border-neutral-700 shadow-sm inline-flex justify-center items-center rounded-2xl text-white font-medium text-xl",
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Key;
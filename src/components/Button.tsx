import React, { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const classes = cva("border h-12 rounded-full px-6 font-medium transition duration-300 ease-in-out active:scale-95", {
    variants: {
        variant: {
            primary: "bg-red-600 text-white border-red-600 hover:bg-red-500 hover:border-red-500 shadow-md shadow-red-200",
            secondary: "border-neutral-200 text-neutral-950 bg-white hover:border-red-600 hover:text-red-600 hover:bg-red-50",
        },
        size: {
            default: "h-12",
            sm: "h-10 text-sm px-4",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

const Button = (
    props: {
        variant?: "primary" | "secondary";
        size?: "default" | "sm";
    } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
    const { variant, className, size, ...rest } = props;

    return (
        <button 
            className={twMerge(classes({ variant, size, className }))} 
            {...rest} 
        />
    );
};

export default Button;
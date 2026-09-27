import React, { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const classes = cva("border h-12 rounded-full px-6 font-medium transition duration-300 ease-in-out active:scale-95 cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-gold-400 text-navy-950 border-gold-400 hover:bg-gold-300 hover:border-gold-300 shadow-md shadow-gold-400/20 font-semibold",
            secondary: "border-gold-400/30 text-gold-200 bg-transparent hover:border-gold-400 hover:text-gold-400 hover:bg-gold-400/5",
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
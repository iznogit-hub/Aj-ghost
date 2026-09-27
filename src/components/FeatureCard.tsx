import React from "react";
import { twMerge } from "tailwind-merge";

const FeatureCard = (props: {
    title: string;
    description: string;
    className?: string;
    children?: React.ReactNode;
}) => {
    const { title, description, children, className } = props;

    return (
        <div
            className={twMerge(
                "glass-card p-6 rounded-3xl group hover:border-gold-400/40 transition duration-500",
                className
            )}
        >
            <div className="aspect-video overflow-hidden rounded-xl bg-navy-900/50">{children}</div>
            <div>
                <h3 className="text-3xl font-serif font-medium mt-6 text-white group-hover:text-gold-300 transition duration-300">{title}</h3>
                <p className="text-white/50 mt-2 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

export default FeatureCard;
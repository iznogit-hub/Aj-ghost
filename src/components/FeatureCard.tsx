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
                "bg-white border border-neutral-200 p-6 rounded-3xl group hover:border-neutral-400 hover:shadow-lg transition duration-300",
                className
            )}
        >
            <div className="aspect-video overflow-hidden rounded-xl bg-neutral-50">{children}</div>
            <div>
                <h3 className="text-3xl font-medium mt-6 group-hover:text-neutral-600 transition duration-300">{title}</h3>
                <p className="text-neutral-500 mt-2">{description}</p>
            </div>
        </div>
    );
};

export default FeatureCard;
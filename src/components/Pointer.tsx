import { MousePointer2 } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

const Pointer = (props: { name: string; color?: "red" | "lime" }) => {
    const { name, color = "lime" } = props;

    return (
        <div className="relative">
            <MousePointer2 
                size={25} 
                className={twMerge("mb-1 text-lime-400", color === "red" && "text-red-500")}
            />
            <div
                className={twMerge(
                    "ml-4 absolute top-4 left-0 whitespace-nowrap rounded-full font-bold text-sm bg-lime-400 text-neutral-950 px-2 py-0.5 rounded-tl-none",
                    color === "red" && "bg-red-500 text-white"
                )}
            >
                {name}
            </div>
        </div>
    );
};

export default Pointer;
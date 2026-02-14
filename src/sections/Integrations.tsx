"use client";

import Tag from "@/components/Tag";
import { Zap, ShieldCheck, Smartphone, Gift, Download, Globe } from "lucide-react";

const benefits = [
    {
        title: "Instant Delivery",
        description: "Start reading seconds after checkout. No waiting for shipping.",
        icon: Zap,
    },
    {
        title: "Device Compatible",
        description: "Read on Kindle, iPad, Android, or your web browser seamlessly.",
        icon: Smartphone,
    },
    {
        title: "Secure Checkout",
        description: "Your data is protected by industry-standard 256-bit encryption.",
        icon: ShieldCheck,
    },
    {
        title: "DRM-Free Option",
        description: "Own your files truly. Transfer them between your devices without limits.",
        icon: Download,
    },
    {
        title: "Global Availability",
        description: "Purchase from anywhere in the world in your local currency.",
        icon: Globe,
    },
    {
        title: "Easy Gifting",
        description: "Send a copy to a friend instantly with a personalized note.",
        icon: Gift,
    },
];

export default function Integrations() {
    return (
        <section className="py-24 overflow-hidden bg-white border-t border-neutral-100" id="marketing">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Column: Headline */}
                    <div>
                        <Tag>Why Buy Direct?</Tag>
                        <h2 className="text-6xl font-medium mt-6 tracking-tighter">
                            Pure story. <br />
                            <span className="text-neutral-400">Zero friction.</span>
                        </h2>
                        <p className="text-neutral-500 mt-6 text-xl leading-relaxed">
                            We believe in getting the story into your hands as fast as possible. 
                            Skip the middleman and support independent publishing directly.
                        </p>
                    </div>

                    {/* Right Column: Icon Grid */}
                    <div className="grid sm:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <div 
                                key={index} 
                                className="group p-4 rounded-2xl hover:bg-neutral-50 transition duration-300 border border-transparent hover:border-neutral-100"
                            >
                                <div className="bg-neutral-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neutral-950 group-hover:text-white transition duration-300">
                                    <benefit.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-medium text-neutral-950 mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-neutral-500 leading-normal text-sm">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
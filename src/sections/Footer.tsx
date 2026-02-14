import Image from "next/image";
import siteLogo from "@/assets/images/logo.svg";
import bookCover from "@/assets/images/design-example-1.png"; // Using your cover image

const footerLinks = [
    { href: "#", label: "Contact Author" },
    { href: "#", label: "Media Kit" },
    { href: "#", label: "Newsletter" },
    { href: "#", label: "Privacy Policy" },
];

export default function Footer() {
    return (
        <section className="py-24 border-t border-neutral-200 bg-neutral-50 relative overflow-hidden">
            
            {/* --- BACKGROUND WATERMARK --- */}
            <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none select-none overflow-hidden">
                {/* Rotated and scaled for a dynamic 'desk layout' look */}
                <div className="relative w-[120%] h-[120%] md:w-full md:h-[800px] opacity-[0.03] grayscale rotate-12 translate-y-20">
                    <Image
                        src={bookCover}
                        alt="Hunted Book Cover"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* --- CONTENT --- */}
            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        {/* Inverted for Light Mode */}
                        <Image src={siteLogo} alt="Hunted Logo" className="w-8 invert opacity-80" />
                        <span className="font-bold text-xl tracking-tighter text-neutral-950 font-mono">
                            HUNTED.
                        </span>
                    </div>
                    <div>
                        <nav className="flex gap-6 flex-wrap justify-center">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-neutral-500 text-sm hover:text-red-600 transition duration-300 font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
                
                <div className="mt-8 text-center border-t border-neutral-200/50 pt-8">
                    <p className="text-neutral-400 text-xs">
                        &copy; {new Date().getFullYear()} The Watcher Series. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    );
}
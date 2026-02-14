import Image from "next/image";
import siteLogo from "@/assets/images/logo.svg";

const footerLinks = [
    { href: "#", label: "Contact Author" },
    { href: "#", label: "Media Kit" },
    { href: "#", label: "Newsletter" },
    { href: "#", label: "Privacy Policy" },
];

export default function Footer() {
    return (
        <section className="py-16 border-t border-neutral-200">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                         {/* Invert logo for light mode */}
                        <Image src={siteLogo} alt="Hunted Logo" className="w-8 invert" />
                        <span className="font-bold text-xl tracking-tighter text-neutral-950">HUNTED</span>
                    </div>
                    <div>
                        <nav className="flex gap-6 flex-wrap justify-center">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.label} // CHANGED: used label instead of href to ensure uniqueness
                                    href={link.href}
                                    className="text-neutral-500 text-sm hover:text-neutral-950 transition"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-neutral-400 text-xs">
                        &copy; {new Date().getFullYear()} The Watcher Series. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    );
}
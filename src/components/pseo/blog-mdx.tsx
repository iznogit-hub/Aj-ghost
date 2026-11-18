import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { BookCta } from "@/components/pseo/BookCta";

function Anchor(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
    const href = props.href ?? "";
    const className = "text-gold-300 underline decoration-gold-400/40 underline-offset-4 hover:text-gold-100";
    if (href.startsWith("/")) {
        return <Link href={href} className={className}>{props.children}</Link>;
    }
    return <a {...props} className={className} target="_blank" rel="noopener noreferrer" />;
}

export const blogMdxComponents = {
    BookCta,
    a: Anchor,
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h2 {...props} className="mt-10 font-serif text-3xl text-white" />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h3 {...props} className="mt-8 font-serif text-2xl text-gold-200" />
    ),
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props} className="mt-5 text-[1.05rem] leading-8 text-white/80" />
    ),
    ul: (props: HTMLAttributes<HTMLUListElement>) => (
        <ul {...props} className="mt-5 list-disc space-y-2 pl-5 text-white/80" />
    ),
    ol: (props: HTMLAttributes<HTMLOListElement>) => (
        <ol {...props} className="mt-5 list-decimal space-y-2 pl-5 text-white/80" />
    ),
    blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote {...props} className="mt-6 border-l-2 border-gold-400/50 pl-4 font-serif text-xl italic text-gold-100/90" />
    ),
    strong: (props: HTMLAttributes<HTMLElement>) => (
        <strong {...props} className="font-semibold text-white" />
    ),
};

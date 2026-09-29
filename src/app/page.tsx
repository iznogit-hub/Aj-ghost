import CallToAction from "@/sections/CallToAction";
import Faqs from "@/sections/Faqs";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Integrations from "@/sections/Integrations";
import AuthorCollab from "@/sections/AuthorCollab";
import Introduction from "@/sections/Introduction";
import Reviews from "@/sections/Reviews";
import Navbar from "@/sections/Navbar";
import Newsletter from "@/sections/Newsletter";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
    return (
        <main className="bg-navy-950 min-h-screen text-white selection:bg-gold-400 selection:text-navy-950">
            <Navbar />
            <Hero />
            <SectionDivider subtle />
            <Reviews />
            <Introduction />
            <SectionDivider />
            <Features />
            <SectionDivider subtle />
            <Integrations />
            <SectionDivider />
            <AuthorCollab />
            <SectionDivider subtle />
            <Newsletter />
            <SectionDivider subtle />
            <Faqs />
            <SectionDivider />
            <CallToAction />
            <Footer />
        </main>
    );
}
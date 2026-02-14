import CallToAction from "@/sections/CallToAction"; // "Read Now" scroller
import Faqs from "@/sections/Faqs"; // Genre details
import Features from "@/sections/Features"; // Characters/Tropes
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero"; // The Main Hook
import Integrations from "@/sections/Integrations"; // "Availability" / Where to buy
import Introduction from "@/sections/Introduction"; // The Blurb text reveal
import LogoTicker from "@/sections/LogoTicker"; // Social Proof
import Navbar from "@/sections/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <LogoTicker />
            <Introduction />
            <Features />
            <Integrations />
            <Faqs />
            <CallToAction />
            <Footer />
        </>
    );
}
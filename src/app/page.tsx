import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import StoryScroll from "@/components/sections/StoryScroll";

// Below-fold sections — code-split so the initial bundle stays lean.
const Converter    = dynamic(() => import("@/components/sections/Converter"));
const LiveRates    = dynamic(() => import("@/components/sections/LiveRates"));
const PopularRates = dynamic(() => import("@/components/sections/PopularRates"));
const Services     = dynamic(() => import("@/components/sections/Services"));
const About        = dynamic(() => import("@/components/sections/About"));
const Locations    = dynamic(() => import("@/components/sections/Locations"));
const Blogs        = dynamic(() => import("@/components/sections/Blogs"));
const Reviews      = dynamic(() => import("@/components/sections/ReviewsSection"));
const Gallery      = dynamic(() => import("@/components/sections/GallerySection"));
const FAQSection   = dynamic(() => import("@/components/sections/FAQSection"));
const Contact      = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StoryScroll />
        <Converter />
        <LiveRates />
        <PopularRates />
        <Services />
        <About />
        <Locations />
        <Blogs />
        <Reviews />
        <Gallery />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

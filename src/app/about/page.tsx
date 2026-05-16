import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";

const CEOProfile    = dynamic(() => import("@/components/about/CEOProfile"));
const ValuesSection = dynamic(() => import("@/components/about/ValuesSection"));
const Timeline      = dynamic(() => import("@/components/about/Timeline"));
const AboutCTA      = dynamic(() => import("@/components/about/AboutCTA"));

export const metadata: Metadata = {
  title: "About Us | Faizura Trading — Sixteen Years of Moving Money Right",
  description:
    "Meet the team behind Singapore's most trusted money changer. MAS-licensed since 2008, 50,000+ customers served, S$2B+ exchanged with zero hidden fees.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <CEOProfile />
        <ValuesSection />
        <Timeline />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}

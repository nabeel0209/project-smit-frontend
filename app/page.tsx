// Landing Page Code In This File.

import ForCreators from "./components/creaters/Creaters";
import CTASection from "./components/CtaSection/CtaSection";
import Features from "./components/features/Featuers";
import Hero from "./components/hero/Hero";
import HowItWorks from "./components/how-it-work/How-it-work";
import ForLearnersSection from "./components/learners/Learners";
import SecurityTrust from "./components/securityTrust/Security-trust";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <ForLearnersSection />
      <ForCreators />
      <SecurityTrust />
      <CTASection />
    </main>
  );
}

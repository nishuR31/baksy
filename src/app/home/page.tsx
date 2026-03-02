import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import ContactForm from '@/components/ContactForm';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import PricingSection from './components/PricingSection';

export default function HomePage() {
  return (
    <main className="relative bg-[#0B0F19] min-h-screen">
      <AnimatedBackground />

      <Header />

      <HeroSection />
      <MarqueeSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />

      {/* Contact Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

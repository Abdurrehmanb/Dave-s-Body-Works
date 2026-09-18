import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { EstimateCalculator } from './components/EstimateCalculator';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { InsuranceRentalBanner } from './components/InsuranceRentalBanner';
import { LocationHoursSection } from './components/LocationHoursSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { EstimateModal } from './components/EstimateModal';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { Phone, Camera } from 'lucide-react';
import { SHOP_INFO } from './data';

export default function App() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<{
    damageAreas?: string[];
    severity?: string;
    estimatedMin?: number;
    estimatedMax?: number;
    vehicleType?: string;
    serviceName?: string;
    repairTier?: string;
  } | null>(null);

  const handleOpenEstimateModal = () => {
    setModalInitialData(null);
    setIsEstimateModalOpen(true);
  };

  const handleOpenEstimateWithData = (data: {
    damageAreas: string[];
    severity: 'minor' | 'moderate' | 'severe';
    estimatedMin: number;
    estimatedMax: number;
    vehicleType: string;
    repairTier: string;
  }) => {
    setModalInitialData({
      damageAreas: data.damageAreas,
      severity: data.severity,
      estimatedMin: data.estimatedMin,
      estimatedMax: data.estimatedMax,
      vehicleType: data.vehicleType,
      serviceName: `${data.vehicleType.toUpperCase()} Body & Panel Repair (${data.repairTier === 'oem' ? 'OEM' : 'Smart Repair'})`
    });
    setIsEstimateModalOpen(true);
  };

  const handleSelectService = (serviceName: string) => {
    setModalInitialData({
      serviceName
    });
    setIsEstimateModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-600 selection:text-white pb-16 sm:pb-0 w-full max-w-full overflow-x-hidden">
      {/* Sticky Top Navigation */}
      <Navbar 
        onOpenEstimateModal={handleOpenEstimateModal}
        onScrollToSection={scrollToSection}
      />

      <main>
        {/* Hero Section */}
        <Hero 
          onOpenEstimateModal={handleOpenEstimateModal}
          onScrollToSection={scrollToSection}
        />

        {/* Credibility & Trust Badges */}
        <TrustBadges />

        {/* Interactive Estimate Calculator */}
        <EstimateCalculator 
          onOpenEstimateModalWithData={handleOpenEstimateWithData}
        />

        {/* Services Showcase */}
        <ServicesSection 
          onSelectService={handleSelectService}
        />

        {/* Real Customer Reviews Showcase (4.7 Stars, 54 Reviews) */}
        <ReviewsSection />

        {/* Insurance Claims & Rental Car Assistance */}
        <InsuranceRentalBanner 
          onOpenEstimateModal={handleOpenEstimateModal}
        />

        {/* Location & Operating Hours */}
        <LocationHoursSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer 
        onScrollToSection={scrollToSection}
        onOpenEstimateModal={handleOpenEstimateModal}
      />

      {/* Floating Messaging Widget (WhatsApp + Facebook Messenger) */}
      <FloatingChatWidget />

      {/* Free Estimate & Photo Upload Modal */}
      <EstimateModal
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        initialData={modalInitialData}
      />

      {/* Persistent Mobile Bottom Action Bar (visible on mobile screens < 640px) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0b1a30]/95 backdrop-blur-md border-t border-slate-800 p-2.5 sm:hidden flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${SHOP_INFO.phone}`}
          className="flex-1 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 active:scale-98 transition-transform"
        >
          <Phone className="w-4 h-4 text-red-500 fill-red-500" />
          <span>Call Shop</span>
        </a>

        <button
          onClick={handleOpenEstimateModal}
          className="flex-1 py-3 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30 active:scale-98 transition-transform cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Free Estimate</span>
        </button>
      </div>
    </div>
  );
}

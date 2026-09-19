import React from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Calculator, 
  Camera, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SHOP_INFO } from '../data';
import { BrandLogo } from './BrandLogo';
import heroBgImg from '../assets/images/hero_autobody_shop_1789725816930.jpg';

interface HeroProps {
  onOpenEstimateModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimateModal, onScrollToSection }) => {
  return (
    <section id="hero" className="relative bg-[#0b1a30] text-slate-100 overflow-hidden pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-slate-800">
      {/* Real High-Resolution Auto Body Facility Background (Replaces artificial AI block grid) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={heroBgImg}
          alt="Dave's Body Works collision repair facility in Las Vegas"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.32] contrast-[1.12]"
          referrerPolicy="no-referrer"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Luxury Deep Navy & Crimson Atmospheric Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a30] via-[#0b1a30]/90 to-[#0b1a30]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a30] via-transparent to-black/50" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Column */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/25 border border-red-500/50 text-red-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Las Vegas Family-Owned · 40+ Yrs</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.7 Star Rating (54 Google Reviews)</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Honest Auto Body &amp; Collision Repair on{' '}
                <span className="text-red-500 underline decoration-red-500/40 decoration-4 underline-offset-4">Spring Mountain</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal">
                From bumper replacement and computerized paint matching to complete accident reconstruction. 
                At Dave's Body Works, you receive honest repair options, written lifetime warranties, and 
                direct insurance claim handling with zero dealer markups.
              </p>
            </div>

            {/* Feature Pillars in Brand Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/85 backdrop-blur-sm border border-slate-700/80 shadow-xs hover:border-red-500/50 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-xs font-bold text-slate-100">100% Free Estimates</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/85 backdrop-blur-sm border border-slate-700/80 shadow-xs hover:border-red-500/50 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-xs font-bold text-slate-100">Rental Car Assistance</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/85 backdrop-blur-sm border border-slate-700/80 shadow-xs hover:border-red-500/50 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-xs font-bold text-slate-100">Direct Insurance Billing</span>
              </div>
            </div>

            {/* Primary Action Buttons (Responsive & Snappy) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={onOpenEstimateModal}
                className="w-full sm:w-auto px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm md:text-base shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider min-h-[48px]"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                <span>Upload Photos for Free Estimate</span>
              </button>

              <button
                onClick={() => onScrollToSection('calculator')}
                className="w-full sm:w-auto px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-[#152c50]/90 hover:bg-[#1c3866] active:scale-[0.99] text-white font-bold text-xs sm:text-sm md:text-base border border-blue-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <span>Calculate Cost Range</span>
              </button>

              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="w-full sm:w-auto px-4 py-3.5 sm:py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 active:scale-[0.99] text-slate-100 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-red-400 fill-red-400 shrink-0" />
                <span>(702) 871-0556</span>
              </a>
            </div>

            {/* Location & Quick Contact Indicator */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span>{SHOP_INFO.address}, Las Vegas, NV 89102</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon – Fri: 8:00 AM – 5:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Official Badge & Verified Customer Proof */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-[#0f223f]/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700 shadow-2xl space-y-5">
              {/* Header with Logo Badge */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-3">
                  <BrandLogo variant="iconOnly" size="sm" theme="dark" />
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      Dave's Body Works
                    </h3>
                    <p className="text-[11px] text-slate-400">Las Vegas Google Verified Shop</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-black text-white ml-1">4.7</span>
                </div>
              </div>

              {/* Verified Customer Quotes */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/50 space-y-1.5">
                  <p className="text-slate-200 italic font-medium leading-relaxed">
                    "This place is amazing for the price and quality work that they have done."
                  </p>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="font-bold text-white">Gerson Mendez Guerra</span>
                    <span className="text-red-400 font-semibold">Bumper &amp; Headlight</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/50 space-y-1.5">
                  <p className="text-slate-200 italic font-medium leading-relaxed">
                    "They also gave me a choice of a slap-dash job, or a good-looking well done job."
                  </p>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="font-bold text-white">Michael T.</span>
                    <span className="text-amber-400 font-semibold">Quarter Panel Blending</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/50 space-y-1.5">
                  <p className="text-slate-200 italic font-medium leading-relaxed">
                    "The inspector popped the piece back in and said it was fixed."
                  </p>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="font-bold text-white">Elena Rostova</span>
                    <span className="text-emerald-400 font-semibold">Free Honest Inspection</span>
                  </div>
                </div>
              </div>

              {/* Quick Drive-In Prompt */}
              <div className="bg-red-600/15 rounded-xl p-3.5 border border-red-500/30 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">Need an in-person visual estimate?</div>
                  <div className="text-[11px] text-slate-300">Drive in anytime 8 AM - 5 PM (No appointment needed)</div>
                </div>
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow-xs flex items-center gap-1 shrink-0"
                >
                  <span>Directions</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

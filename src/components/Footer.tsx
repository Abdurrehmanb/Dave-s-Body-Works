import React from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  Mail,
  Calculator
} from 'lucide-react';
import { SHOP_INFO } from '../data';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenEstimateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenEstimateModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#061120] text-slate-300 pt-14 sm:pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Official Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={scrollToTop} 
              className="text-left focus:outline-none cursor-pointer"
              title="Return to top"
            >
              <BrandLogo variant="horizontal" theme="dark" size="md" showTagline={true} showRating={false} />
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Family owned and trusted by Las Vegas drivers since 1980 for honest diagnostics, certified bumper replacement, precision color matching, and complete insurance claim handling.
            </p>

            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-[#0b1a30] border border-slate-800 text-xs text-slate-300 shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-white">4.7 Stars</span>
              <span className="text-slate-500">·</span>
              <span>54 Verified Google Reviews</span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500">
              Services &amp; Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('calculator')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Repair Estimate Cost Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Bumper Repair &amp; Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Complete Collision Reconstruction
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Headlight Change &amp; Restoration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('insurance')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Insurance &amp; Rental Car Assistance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('reviews')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Read 54 Customer Reviews (4.7★)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500">
              Shop Location &amp; Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  {SHOP_INFO.address}<br />
                  {SHOP_INFO.cityStateZip}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${SHOP_INFO.phone}`} className="text-white hover:text-red-400 font-bold">
                  {SHOP_INFO.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${SHOP_INFO.email}`} className="text-white hover:text-red-400">
                  {SHOP_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Mon – Fri: 8:00 AM – 5:00 PM</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`https://${SHOP_INFO.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {SHOP_INFO.website}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Action (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500">
              Get Started
            </h4>
            <button
              onClick={onOpenEstimateModal}
              className="w-full py-3 px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors text-center uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Free Estimate</span>
            </button>
            <a
              href={SHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 px-3 bg-[#0b1a30] hover:bg-[#152c50] text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors text-center"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Dave's Body Works. All rights reserved. 3480 W Spring Mountain Rd, Las Vegas, NV 89102.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>NRS 690B.016 Compliant</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#0b1a30] hover:bg-[#152c50] text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

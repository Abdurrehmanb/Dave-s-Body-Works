import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Menu, 
  X, 
  ShieldCheck, 
  Calculator,
  ChevronRight,
  Mail
} from 'lucide-react';
import { SHOP_INFO } from '../data';
import { BrandLogo } from './BrandLogo';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  onOpenEstimateModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimateModal, onScrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Check if currently open according to Las Vegas (PST) business hours: Mon-Fri 8am-5pm
  useEffect(() => {
    const checkOpenStatus = () => {
      try {
        const now = new Date();
        const lvTimeStr = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
        const lvDate = new Date(lvTimeStr);
        const day = lvDate.getDay(); // 0 is Sunday, 6 is Saturday
        const hour = lvDate.getHours();

        if (day >= 1 && day <= 5 && hour >= 8 && hour < 17) {
          setIsOpenNow(true);
        } else {
          setIsOpenNow(false);
        }
      } catch {
        setIsOpenNow(true);
      }
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Estimate Calculator', id: 'calculator' },
    { label: '4.7★ Reviews', id: 'reviews' },
    { label: 'Insurance & Rental', id: 'insurance' },
    { label: 'Location & Hours', id: 'location' },
    { label: 'FAQ', id: 'faq' }
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Official Brand Banner */}
      <div className="bg-[#0b1a30] text-slate-200 text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center flex-wrap justify-center sm:justify-start gap-2.5 sm:gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.7 Rating (54 Google Reviews)</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>3480 W Spring Mountain Rd, Las Vegas</span>
            </span>
            <span className="hidden lg:inline-block text-slate-600">|</span>
            <div className="inline-flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-slate-300 font-medium">
                {isOpenNow ? 'Open Now · Closes 5:00 PM' : 'Closed · Opens 8:00 AM'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a 
              href={`mailto:${SHOP_INFO.email}`}
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>{SHOP_INFO.email}</span>
            </a>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <a 
              href={`tel:${SHOP_INFO.phone}`}
              className="inline-flex items-center gap-1 font-bold text-white hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>{SHOP_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Official Transparent Brand Logo */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="text-left focus:outline-none cursor-pointer py-1"
            title="Dave's Body Works Home"
          >
            <BrandLogo variant="horizontal" size="md" theme="light" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer py-1 tracking-tight"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs: Phone & Free Estimate */}
          <div className="hidden sm:flex items-center gap-2.5">
            <PWAInstallButton variant="nav" />

            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="px-3 py-2 text-xs font-bold text-[#0b1a30] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>(702) 871-0556</span>
            </a>

            <button
              onClick={onOpenEstimateModal}
              className="px-4 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Free Estimate</span>
            </button>
          </div>

          {/* Mobile Menu & Quick Phone Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="p-2 text-white bg-red-600 rounded-lg flex items-center justify-center sm:hidden"
              title="Call Shop"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenEstimateModal}
              className="px-2.5 py-1.5 text-xs font-bold text-white bg-red-600 rounded-lg sm:hidden"
            >
              Estimate
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Responsive for Mobile & Tablets) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full text-left px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-red-600 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="w-full py-3 px-4 text-center font-bold text-sm text-white bg-[#0b1a30] hover:bg-[#152c50] rounded-xl flex items-center justify-center gap-2 shadow-xs"
            >
              <Phone className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Call Official Number: (702) 871-0556</span>
            </a>
            <a
              href={`mailto:${SHOP_INFO.email}`}
              className="w-full py-2.5 px-4 text-center font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-600" />
              <span>Email: {SHOP_INFO.email}</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEstimateModal();
              }}
              className="w-full py-3 px-4 text-center font-bold text-sm text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Request Free Estimate</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

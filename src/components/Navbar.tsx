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
    { label: 'Services', shortLabel: 'Services', id: 'services' },
    { label: 'Estimate Calculator', shortLabel: 'Calculator', id: 'calculator' },
    { label: '4.7★ Reviews', shortLabel: 'Reviews', id: 'reviews' },
    { label: 'Insurance & Rental', shortLabel: 'Insurance', id: 'insurance' },
    { label: 'Location & Hours', shortLabel: 'Hours & Location', id: 'location' },
    { label: 'FAQ', shortLabel: 'FAQ', id: 'faq' }
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-xs w-full max-w-full overflow-x-clip">
      {/* Top Official Brand Banner */}
      <div className="bg-[#0b1a30] text-slate-200 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left info items */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3.5 text-[11px] sm:text-xs min-w-0">
            <span className="inline-flex items-center gap-1 font-bold text-amber-400 shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">4.7 Rating (54 Google Reviews)</span>
              <span className="sm:hidden">4.7★ (54 Reviews)</span>
            </span>

            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>3480 W Spring Mountain Rd, Las Vegas</span>
            </span>

            <span className="hidden sm:inline-block text-slate-600">|</span>
            <div className="inline-flex items-center gap-1.5 shrink-0">
              <span className={`w-2 h-2 rounded-full shrink-0 ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-slate-300 font-medium text-[10px] sm:text-xs">
                {isOpenNow ? 'Open Now · Closes 5 PM' : 'Closed · Opens 8 AM'}
              </span>
            </div>
          </div>

          {/* Right contact items */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs shrink-0">
            <a 
              href={`mailto:${SHOP_INFO.email}`}
              className="hidden lg:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>{SHOP_INFO.email}</span>
            </a>
            <span className="hidden lg:inline-block text-slate-600">|</span>
            <a 
              href={`tel:${SHOP_INFO.phone}`}
              className="inline-flex items-center gap-1 font-bold text-white hover:text-amber-400 transition-colors text-[11px] sm:text-xs"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 fill-red-500 shrink-0" />
              <span>{SHOP_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-4 xl:px-6 w-full">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18 gap-1.5 sm:gap-2 min-w-0">
          {/* Official Transparent Brand Logo - Compact Size */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="text-left focus:outline-none cursor-pointer py-1 min-w-0 shrink"
            title="Dave's Body Works Home"
          >
            <BrandLogo variant="horizontal" size="sm" theme="light" showTagline={false} showRating={false} compact={true} />
          </button>

          {/* Desktop Nav Links (Visible on LG and above) */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-5.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer py-1 tracking-tight whitespace-nowrap"
              >
                <span className="hidden xl:inline">{link.label}</span>
                <span className="xl:hidden">{link.shortLabel}</span>
              </button>
            ))}
          </nav>

          {/* Desktop Action CTAs (Visible on LG and above) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            <div className="hidden 2xl:block">
              <PWAInstallButton variant="nav" />
            </div>

            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="px-2.5 xl:px-3 py-2 text-xs font-bold text-[#0b1a30] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 border border-slate-200 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-red-600 fill-red-600 shrink-0" />
              <span>(702) 871-0556</span>
            </a>

            <button
              onClick={onOpenEstimateModal}
              className="px-3 xl:px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider whitespace-nowrap shrink-0"
            >
              <Calculator className="w-4 h-4 text-white shrink-0" />
              <span>Free Estimate</span>
            </button>
          </div>

          {/* Tablet Action CTAs + Hamburger (Visible on SM to MD: 640px to 1023px) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2 shrink-0">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="px-2.5 py-2 text-xs font-bold text-[#0b1a30] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 border border-slate-200 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>(702) 871-0556</span>
            </a>

            <button
              onClick={onOpenEstimateModal}
              className="px-3 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-xs flex items-center gap-1 cursor-pointer uppercase tracking-wider whitespace-nowrap"
            >
              <Calculator className="w-3.5 h-3.5 text-white" />
              <span>Estimate</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Action CTAs + Hamburger (Visible on < 640px) */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <button
              onClick={onOpenEstimateModal}
              className="h-8.5 px-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-xs flex items-center gap-1 cursor-pointer uppercase tracking-wider whitespace-nowrap shrink-0"
            >
              <Calculator className="w-3.5 h-3.5 text-white" />
              <span>Estimate</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus:outline-none cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto w-full max-w-full">
          {/* Navigation Links */}
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

          {/* Quick Actions & PWA Install in Drawer */}
          <div className="pt-3 border-t border-slate-200 space-y-2.5">
            <PWAInstallButton variant="menu" />

            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="w-full py-3 px-4 text-center font-bold text-sm text-white bg-[#0b1a30] hover:bg-[#152c50] rounded-xl flex items-center justify-center gap-2 shadow-xs"
            >
              <Phone className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Call Official Number: (702) 871-0556</span>
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

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 px-1 flex-wrap gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>3480 W Spring Mountain Rd</span>
              </span>
              <span className="font-semibold text-slate-700">Mon-Fri: 8am-5pm</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

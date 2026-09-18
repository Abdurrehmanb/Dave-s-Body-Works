import React from 'react';
import { 
  BadgeCheck, 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Car
} from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Award,
      title: 'Certified Technicians',
      subtitle: 'I-CAR & ASE trained specialists',
      highlight: 'Gold Standard'
    },
    {
      icon: ShieldCheck,
      title: 'Insurance Approved',
      subtitle: 'Direct billing with all major carriers',
      highlight: 'NRS 690B.016'
    },
    {
      icon: HeartHandshake,
      title: 'Family Owned & Local',
      subtitle: 'Serving Las Vegas since 1980',
      highlight: '40+ Years'
    },
    {
      icon: CheckCircle2,
      title: 'Lifetime Warranty',
      subtitle: 'Written warranty on paint & body',
      highlight: '100% Guaranteed'
    },
    {
      icon: Sparkles,
      title: 'Honest Upfront Quotes',
      subtitle: 'Free estimates with zero hidden fees',
      highlight: 'No Surprise Costs'
    }
  ];

  return (
    <section 
      id="trust-badges" 
      aria-label="Trust & Certifications"
      className="relative z-20 -mt-2 sm:-mt-4 bg-[#081426] border-y border-slate-800/80 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className={`group relative bg-[#0e213d]/80 hover:bg-[#132c52] border border-slate-700/60 hover:border-red-500/60 rounded-xl p-3.5 sm:p-4 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-red-600/10 hover:-translate-y-0.5 ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                {/* Top Badge Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-600/20 text-red-400 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0 shadow-xs">
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <span className="text-[10px] font-extrabold text-amber-400/90 group-hover:text-amber-300 uppercase tracking-wider bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                    {badge.highlight}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-red-400 transition-colors tracking-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-snug">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

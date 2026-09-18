import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Car, 
  Paintbrush, 
  Wrench, 
  SunMedium, 
  FileCheck, 
  CheckCircle2, 
  Clock, 
  Shield, 
  ArrowRight,
  Sparkles,
  Phone
} from 'lucide-react';
import { SERVICES_LIST, SHOP_INFO } from '../data';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Car':
        return <Car className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Paintbrush':
        return <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Full-Spectrum Auto Body Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1a30] tracking-tight">
              Certified Craftsmanship, Fair Pricing
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Whether you need a quick headlight swap, bumper clip repair, or complete unibody collision reconstruction, our Las Vegas technicians treat your vehicle like family.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-4 py-3 rounded-xl border border-slate-200 shrink-0">
            <Shield className="w-4 h-4 text-red-600 shrink-0" />
            <span>Written Lifetime Workmanship Warranty On Paint &amp; Body</span>
          </div>
        </div>

        {/* Interactive Before & After Collision Repair Comparison Showcase */}
        <BeforeAfterSlider onRequestEstimate={onSelectService} />

        {/* Sub-heading for Detailed Services */}
        <div className="mb-6 mt-12 flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0b1a30] tracking-tight">
              Full Range Collision &amp; Body Shop Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Select any repair specialization below for free instant itemized quote
            </p>
          </div>
        </div>

        {/* Services Grid (Responsive: 1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES_LIST.map((service) => {
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -7, scale: 1.018 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => onSelectService(service.title)}
                className="group relative bg-white hover:bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 hover:border-red-500/80 shadow-xs hover:shadow-xl hover:shadow-[#0b1a30]/10 transition-colors duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Brand Color Header Stripe (Navy to Red gradient on hover) */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#0b1a30] group-hover:via-red-600 group-hover:to-red-500 transition-all duration-300" />

                <div className="space-y-4">
                  {/* Top Bar with Icon and Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0b1a30] text-white flex items-center justify-center group-hover:bg-red-600 group-hover:shadow-md group-hover:shadow-red-600/30 group-hover:scale-105 group-hover:-rotate-1 transition-all duration-300 shrink-0">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80 group-hover:bg-red-50 group-hover:text-red-700 group-hover:border-red-200 transition-colors duration-300">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-[#0b1a30] group-hover:text-red-600 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Common Tasks Checklist */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {service.commonJobs.slice(0, 3).map((job, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span className="line-clamp-1 font-medium">{job}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors duration-200" />
                    <span>{service.averageTurnaround}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:text-red-700 transition-colors py-1">
                    <span>Request Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Dave's Highlight Banner */}
        <div className="mt-10 sm:mt-12 bg-[#0b1a30] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-1.5 md:pr-6">
              <h4 className="text-sm font-extrabold text-red-400">Honest Diagnostic Policy</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If a broken bumper clip or loose trim can be fixed simply by popping it back in, we do it and tell you honestly. No phantom repairs or dishonest upsells.
              </p>
            </div>
            <div className="space-y-1.5 md:px-6 pt-4 md:pt-0">
              <h4 className="text-sm font-extrabold text-red-400">Spectrophotometer Paint Blend</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nevada desert sun causes natural oxidation. We photograph and calibrate your paint's actual current shade for an undetectable factory blend.
              </p>
            </div>
            <div className="space-y-1.5 md:pl-6 pt-4 md:pt-0">
              <h4 className="text-sm font-extrabold text-red-400">Enterprise / Hertz Coordination</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Drop off your damaged car and drive away in your replacement rental seamlessly. Direct insurance billing for authorized claims.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

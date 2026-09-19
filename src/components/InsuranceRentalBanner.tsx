import React from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Car, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { SHOP_INFO } from '../data';

interface InsuranceRentalBannerProps {
  onOpenEstimateModal: () => void;
}

export const InsuranceRentalBanner: React.FC<InsuranceRentalBannerProps> = ({ onOpenEstimateModal }) => {
  const insuranceCompanies = [
    'State Farm', 'Geico', 'Progressive', 'Allstate', 
    'AAA', 'USAA', 'Farmers', 'Travelers', 'Liberty Mutual', 'Mercury'
  ];

  return (
    <section id="insurance" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Top Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nevada Law NRS 690B.016 Protected</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1a30] tracking-tight">
            Insurance Claims &amp; On-Site Rental Assistance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Insurance adjusters often try to steer policyholders to mega-chain shops that cut corners. 
            By Nevada state law, you have the absolute legal right to choose where your vehicle is repaired. 
            We advocate for your vehicle to ensure 100% OEM safety standards.
          </p>
        </div>

        {/* 2-Column Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Insurance Claims Concierge */}
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-8 border border-slate-200 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0b1a30] text-white flex items-center justify-center shrink-0 shadow-xs">
                <FileCheck2 className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0b1a30]">Direct Insurer Billing &amp; Advocacy</h3>
                <p className="text-xs text-slate-500">We do the legwork with adjusters so you don't have to</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span><strong>No Paperwork Headaches:</strong> Provide us your claim number and insurer name; we handle supplemental photo filings, labor approvals, and direct billing.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span><strong>Deductible Guidance:</strong> Clear explanations of comprehensive vs collision deductibles and how to minimize out-of-pocket costs.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span><strong>Full Repair Audit:</strong> We never let insurers force substandard imitation parts that compromise your vehicle's safety or trade-in value.</span>
              </div>
            </div>

            {/* Carrier Logos / Badges */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                We work directly with all carriers:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {insuranceCompanies.map((carrier) => (
                  <span
                    key={carrier}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
                  >
                    {carrier}
                  </span>
                ))}
                <span className="px-2.5 py-1 rounded-md bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                  + All Others
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Rental Car Assistance */}
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-8 border border-slate-200 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0b1a30]">On-Site Rental Car Coordination</h3>
                <p className="text-xs text-slate-500">Enterprise &amp; Hertz delivery right at our shop</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span><strong>Drop &amp; Drive Convenience:</strong> Drop off your car at 3480 W Spring Mountain Rd and pick up your rental vehicle without running around town.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span><strong>Direct Insurance Billing:</strong> If your policy includes rental coverage or the other party was at fault, rental fees are billed directly to the insurer.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span><strong>Seamless Return:</strong> When your car is pristine and ready, return the rental keys directly to Dave's Body Works front desk.</span>
              </div>
            </div>

            {/* Rental CTA Banner */}
            <div className="pt-4 border-t border-slate-200 bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <span className="text-xs font-bold text-[#0b1a30]">Need a car while in the shop?</span>
                <p className="text-[11px] text-slate-500">Let us reserve it before your drop-off date.</p>
              </div>
              <button
                onClick={onOpenEstimateModal}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 uppercase tracking-wider cursor-pointer text-center"
              >
                <span>Request with Rental</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3-Step Process Ribbon */}
        <div className="bg-[#0b1a30] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="max-w-xl mb-6">
            <h3 className="text-base font-black text-white">How Simple It Is When You Choose Dave's:</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                1
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">Free Photo or In-Person Estimate</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Upload damage photos online or drive to our Spring Mountain location for an itemized estimate.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                2
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">We Deal With Insurance &amp; Rental</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We submit all photos, negotiate supplements, and hand you keys to your rental car.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                3
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">Drive Away Restored with Warranty</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your car is returned clean, structurally sound, color-matched, with our written lifetime warranty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

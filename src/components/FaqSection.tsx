import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Mail } from 'lucide-react';
import { FAQS, SHOP_INFO } from '../data';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1a30] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about repairs, estimates, insurance laws, and rentals in Las Vegas.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#0b1a30]">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-red-50 text-red-600 border-red-200' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box with Phone & Email */}
        <div className="mt-10 sm:mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-[#0b1a30]">
            Still have a question about your vehicle?
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Dave and our technicians are always ready to answer any questions about repair options, parts availability, or insurance claims.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Call (702) 871-0556</span>
            </a>
            <a
              href={`mailto:${SHOP_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold transition-colors"
            >
              <Mail className="w-4 h-4 text-red-600" />
              <span>Email Dave Directly</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

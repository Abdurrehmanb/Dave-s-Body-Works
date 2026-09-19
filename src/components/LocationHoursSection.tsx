import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink,
  Compass,
  Mail
} from 'lucide-react';
import { SHOP_INFO } from '../data';

export const LocationHoursSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="location" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Central Las Vegas Location</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1a30] tracking-tight">
            Visit Dave's Body Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Conveniently situated on Spring Mountain Road between Interstate 15 and Chinatown. 
            Easy pull-in parking with dedicated staging bays for fast visual inspections and estimates.
          </p>
        </div>

        {/* Location & Schedule Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Details & Operating Hours */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              {/* Address Highlight */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-red-100 text-red-600 shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0b1a30]">Shop Address</h3>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">
                        {SHOP_INFO.address}
                      </p>
                      <p className="text-xs text-slate-500">
                        {SHOP_INFO.cityStateZip}, United States
                      </p>
                      <p className="text-xs text-red-600 mt-1 font-bold">
                        {SHOP_INFO.crossStreets}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(SHOP_INFO.fullAddress, 'address')}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Copy full address"
                  >
                    {copiedField === 'address' ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <Check className="w-4 h-4" /> Copied!
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Plus Code Badge */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Compass className="w-4 h-4 text-slate-400" />
                    <span>Google Plus Code: <strong className="text-slate-900 font-mono">{SHOP_INFO.plusCode}</strong></span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(SHOP_INFO.plusCode, 'plusCode')}
                    className="text-red-600 hover:text-red-700 text-[11px] font-bold underline cursor-pointer"
                  >
                    {copiedField === 'plusCode' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Direct Contact Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-3 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 fill-red-600" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Phone Direct</div>
                    <div className="text-xs font-black text-[#0b1a30]">{SHOP_INFO.displayPhone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SHOP_INFO.email}`}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-3 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0b1a30] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Official Email</div>
                    <div className="text-xs font-bold text-[#0b1a30] truncate max-w-[150px]">{SHOP_INFO.email}</div>
                  </div>
                </a>
              </div>

              {/* Schedule / Hours Breakdown */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#0b1a30] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span>Business Operating Hours</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Open · Closes 5 PM
                  </span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {SHOP_INFO.hours.map((h, i) => (
                    <div key={i} className="py-2 flex items-center justify-between">
                      <span className="font-semibold text-slate-700">{h.day}</span>
                      <span className="text-[#0b1a30] font-bold">
                        {h.close === 'Closed' ? (
                          <span className="text-slate-400 font-normal">{h.open}</span>
                        ) : (
                          `${h.open} – ${h.close}`
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] py-3.5 px-4 bg-[#0b1a30] hover:bg-[#152c50] active:bg-[#071322] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Open Turn-by-Turn GPS</span>
                </a>

                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="min-h-[44px] py-3.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 fill-white shrink-0" />
                  <span>Call Front Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Google Map & Directions Guide */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              {/* Google Map Top Header Action Bar */}
              <div className="bg-[#0b1a30] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white">Dave's Body Works</h4>
                    <p className="text-[11px] text-slate-300">3480 W Spring Mountain Rd Suite 4&amp;5</p>
                  </div>
                </div>

                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-xs shrink-0"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Interactive Google Map */}
              <div className="relative w-full h-72 sm:h-84 md:h-96 bg-slate-100">
                <iframe
                  title="Dave's Body Works Google Map Location"
                  src="https://maps.google.com/maps?q=Dave%27s%20Body%20Works%2C%203480%20W%20Spring%20Mountain%20Rd%2C%20Las%20Vegas%2C%20NV%2089102&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Subtle corner badge linking directions */}
                <div className="absolute bottom-3 left-3 bg-[#0b1a30]/90 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-lg border border-slate-700 shadow-lg hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Spring Mountain Rd &amp; Polaris Ave · West of I-15 Exit 39</span>
                </div>
              </div>

              {/* Landmark Guidance */}
              <div className="p-5 sm:p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Getting Here in Las Vegas
                </h4>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      1
                    </span>
                    <span><strong>From The Strip / I-15:</strong> Take Exit 39 for Spring Mountain Rd. Head west approximately 0.4 miles. Our shop complex is on the right-hand (north) side.</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      2
                    </span>
                    <span><strong>From Chinatown / Valley View:</strong> Head east on Spring Mountain Rd towards Polaris Ave. Suites 4 &amp; 5 are located with drive-in bay access.</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      3
                    </span>
                    <span><strong>Towing or Flatbed Delivery:</strong> If your vehicle is disabled or arriving via flatbed tow truck, our back lot accommodates direct roll-off delivery.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

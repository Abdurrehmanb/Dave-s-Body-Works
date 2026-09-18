import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Phone, 
  Clock, 
  ExternalLink, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SHOP_INFO } from '../data';

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  // Gentle callout notification after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/17028710556?text=${encodeURIComponent(
    "Hi Dave's Body Works! I'm reaching out from your website for an auto body repair estimate or question."
  )}`;

  // Facebook Messenger direct link & Facebook page
  const messengerUrl = `https://www.facebook.com/people/Daves-Body-Works/100063683260938/`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0b1a30] text-white p-4 sm:p-5 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close chat menu"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/logo-official.png"
                    alt="Dave's Body Works Logo"
                    className="w-11 h-11 object-contain drop-shadow-md rounded-lg bg-white/5 p-0.5"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0b1a30] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                    Chat with Dave's Body Works
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-0.5">
                    <span className="text-emerald-400 font-bold">Online</span>
                    <span>·</span>
                    <span>Fast answers &amp; photo estimates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 space-y-3 bg-slate-50/70">
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with Dave &amp; our Las Vegas shop team. Send damage photos for quick appraisal or ask any repair question:
              </p>

              {/* Option 1: WhatsApp Chat */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group w-full p-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-between gap-3 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    {/* Official WhatsApp SVG */}
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.074-2.002-.469-1.666-.693-2.73-2.39-2.813-2.501-.082-.111-.673-.895-.673-1.708 0-.814.425-1.213.577-1.378.143-.157.312-.198.416-.198.104 0 .208.001.298.006.096.005.224-.036.35.267.13.313.447 1.092.485 1.172.039.08.065.174.013.279-.052.104-.078.17-.156.26-.078.092-.164.205-.234.275-.078.079-.16.165-.069.321.091.156.406.669.871 1.083.599.533 1.104.698 1.26.776.156.078.247.065.338-.039.091-.104.39-.456.494-.612.104-.156.208-.13.351-.078.143.052.909.429 1.065.507.156.078.26.117.299.182.039.065.039.378-.105.783zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.393C8.423 21.492 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.158-.517-4.404-1.396l-.316-.222-2.956.827.842-2.883-.243-.332C3.992 14.887 3.4 13.486 3.4 12c0-4.742 3.858-8.6 8.6-8.6 4.743 0 8.6 3.858 8.6 8.6 0 4.742-3.857 8.6-8.6 8.6z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black tracking-wide uppercase">WhatsApp Chat</div>
                    <div className="text-[11px] text-white/90">Direct with Dave: (702) 871-0556</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Option 2: Facebook Messenger */}
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group w-full p-3.5 rounded-xl bg-[#0084FF] hover:bg-[#0073e6] text-white flex items-center justify-between gap-3 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    {/* Official Messenger SVG */}
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.455 5.503 3.736 7.159V22l3.435-1.886c.905.251 1.864.387 2.829.387 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.006 12.441l-2.548-2.718-4.97 2.718 5.467-5.805 2.613 2.718 4.905-2.718-5.467 5.805z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black tracking-wide uppercase">Facebook Messenger</div>
                    <div className="text-[11px] text-white/90">Official Dave's Body Works Page</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct Phone Call Fallback */}
              <div className="pt-2 border-t border-slate-200 text-center">
                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-red-600 transition-colors py-1"
                >
                  <Phone className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  <span>Prefer calling? {SHOP_INFO.displayPhone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <div className="relative flex items-center gap-2">
        {/* Helper teaser badge when closed */}
        <AnimatePresence>
          {!isOpen && hasPrompted && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-slate-800 text-xs font-bold shadow-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Questions? Message Dave</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-3.5 rounded-full font-black text-xs sm:text-sm shadow-xl transition-all cursor-pointer ${
            isOpen
              ? 'bg-[#0b1a30] text-white'
              : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 hover:shadow-red-600/30'
          }`}
          aria-label={isOpen ? "Close messaging options" : "Open messaging options"}
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5" />
              <span>Close</span>
            </>
          ) : (
            <>
              <div className="relative">
                <MessageSquare className="w-5 h-5 fill-white text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
              </div>
              <span className="tracking-wide">Message Us</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

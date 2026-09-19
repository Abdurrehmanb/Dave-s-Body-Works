import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Camera, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import bumperBeforeImg from '../assets/images/bumper_damage_before_1789725836731.jpg';
import bumperAfterImg from '../assets/images/bumper_repair_after_1789725855312.jpg';
import doorBeforeImg from '../assets/images/door_dent_before_1789725873109.jpg';
import doorAfterImg from '../assets/images/door_repair_after_1789725893777.jpg';

interface RepairCase {
  id: string;
  title: string;
  vehicle: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  damageSummary: string;
  repairHighlights: string[];
  turnaroundTime: string;
  customerSavings: string;
  serviceCategory: string;
}

const REPAIR_CASES: RepairCase[] = [
  {
    id: 'case-bumper',
    title: 'Front Bumper & Headlamp Collision Restoration',
    vehicle: 'Sedan (Charcoal Metallic)',
    category: 'Bumper & Panel Alignment',
    beforeImg: bumperBeforeImg,
    afterImg: bumperAfterImg,
    damageSummary: 'Crushed driver-side bumper cover, broken retaining tabs, misaligned fender seam, and fractured headlight assembly.',
    repairHighlights: [
      'Precision frame measurement & core support alignment',
      'Spectrophotometer computerized paint code calibration',
      'New OEM bracket mounting & clip recalibration',
      'Multi-stage clearcoat baked in climate-controlled booth'
    ],
    turnaroundTime: '2.5 Business Days',
    customerSavings: 'Saved $780 vs Dealer Quote',
    serviceCategory: 'Bumper Repair & Replacement'
  },
  {
    id: 'case-door',
    title: 'Passenger Door Crease & Deep Scratch Refinish',
    vehicle: 'Luxury Sedan (Midnight Navy)',
    category: 'Dent & Paint Refinishing',
    beforeImg: doorBeforeImg,
    afterImg: doorAfterImg,
    damageSummary: 'Severe door panel crease with gouged paint and underlying primer exposure from parking structure pillar collision.',
    repairHighlights: [
      'Metal massage & precision panel recontouring',
      'Undetectable factory-matched pearl coat blending',
      'Preserved factory structural acoustic seals',
      'Written lifetime non-peel clearcoat guarantee'
    ],
    turnaroundTime: '2 Business Days',
    customerSavings: 'Direct Insurance Claim Settled',
    serviceCategory: 'Precision Paint Matching & Scratch Refinishing'
  }
];

interface BeforeAfterSliderProps {
  onRequestEstimate?: (serviceName: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onRequestEstimate }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = REPAIR_CASES[activeCaseIndex];

  // Track container width accurately for responsive clipping without distortion
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(() => {
      updateWidth();
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Calculate percentage from clientX
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(Math.round(newPercentage * 10) / 10);
  }, []);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full bg-[#0b1a30] text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-10 border border-slate-700 shadow-2xl overflow-hidden my-8 sm:my-14">
      {/* Header with Luxury Brand Accent */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 sm:mb-8 border-b border-slate-800 pb-5 sm:pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>Interactive Transformation Proof</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
            Real Collision Repairs, <span className="text-red-500">Showroom Results</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Drag or swipe the slider across the vehicle to inspect before-and-after work executed by Dave's Body Works technicians right here on Spring Mountain Road.
          </p>
        </div>

        {/* Case Switcher Tabs (Responsive grid on mobile, flex on desktop) */}
        <div className="w-full sm:w-auto grid grid-cols-2 gap-1.5 p-1 sm:p-1.5 bg-slate-900/95 rounded-2xl border border-slate-700/80 shrink-0">
          {REPAIR_CASES.map((repairCase, idx) => {
            const isSelected = activeCaseIndex === idx;
            return (
              <button
                key={repairCase.id}
                type="button"
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`py-2 px-2 sm:px-4 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] sm:text-xs font-black uppercase text-red-200 sm:text-inherit">
                  Case #{idx + 1}
                </span>
                <span className="truncate max-w-[130px] sm:max-w-none">
                  {idx === 0 ? 'Bumper Repair' : 'Dent & Scratch'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Comparison Slider (Left) & Itemized Case Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Slider Interactive Container */}
        <div className="lg:col-span-7">
          <div
            id="before-after-stage"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none border border-slate-700 bg-slate-900 group touch-none"
          >
            {/* Base Image (AFTER - full width) */}
            <img
              src={activeCase.afterImg}
              alt={`${activeCase.title} - After repair`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
            />

            {/* Clipped Top Image (BEFORE) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeCase.beforeImg}
                alt={`${activeCase.title} - Before repair`}
                className="absolute top-0 left-0 max-w-none h-full object-cover"
                style={{
                  width: containerWidth > 0 ? `${containerWidth}px` : (containerRef.current?.clientWidth ? `${containerRef.current.clientWidth}px` : '100%')
                }}
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Vertical Slider Line */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* White Hairline with Glow */}
              <div className="absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

              {/* Center Drag Handle Badge */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#0b1a30] shadow-2xl border-2 border-red-600 flex items-center justify-center pointer-events-auto cursor-ew-resize transition-transform hover:scale-110 active:scale-95">
                <div className="flex items-center text-red-600 font-black">
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 -mr-1" />
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -ml-1" />
                </div>
              </div>
            </div>

            {/* Badges on the image */}
            <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-red-600/90 backdrop-blur-md text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Before</span>
                <span className="hidden sm:inline">· Collision</span>
              </span>
            </div>

            <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-emerald-600/90 backdrop-blur-md text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-md">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
                <span>After</span>
                <span className="hidden sm:inline">· Restored</span>
              </span>
            </div>

            {/* Instruction tooltip at bottom */}
            <div className="absolute bottom-2.5 sm:bottom-3 inset-x-0 flex justify-center pointer-events-none px-2">
              <div className="bg-black/80 backdrop-blur-md text-slate-200 text-[9.5px] sm:text-[11px] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg max-w-[92%] truncate">
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 rotate-180 shrink-0" />
                <span className="truncate">Drag slider or tap to compare</span>
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 shrink-0" />
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons for Easy Comparison (Responsive 3-column equal grid) */}
          <div className="mt-3.5 space-y-2">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
              <button
                type="button"
                onClick={() => setSliderPosition(100)}
                className={`min-h-[40px] py-2 px-1.5 sm:px-2 rounded-xl border text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                  sliderPosition === 100 
                    ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30' 
                    : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>100% Before</span>
              </button>

              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className={`min-h-[40px] py-2 px-1.5 sm:px-2 rounded-xl border text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                  sliderPosition === 50 
                    ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30' 
                    : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>50 / 50 Split</span>
              </button>

              <button
                type="button"
                onClick={() => setSliderPosition(0)}
                className={`min-h-[40px] py-2 px-1.5 sm:px-2 rounded-xl border text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                  sliderPosition === 0 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                    : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>100% After</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Swipe or drag slider handle</span>
              <span>Split: <strong className="text-white font-mono">{Math.round(sliderPosition)}%</strong></span>
            </div>
          </div>
        </div>

        {/* Case Details Card (Right Column) */}
        <div className="lg:col-span-5 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Badge & Title */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeCase.vehicle}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  {activeCase.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeCase.damageSummary}
                </p>
              </div>

              {/* Repair Highlights */}
              <div className="bg-[#0f223f] rounded-xl p-3.5 sm:p-4 border border-slate-700/80 space-y-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-red-400">
                  Precision Shop Procedures:
                </div>
                <div className="space-y-1.5">
                  {activeCase.repairHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics Pill Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400">Turnaround</div>
                    <div className="font-bold text-white text-xs">{activeCase.turnaroundTime}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400">Warranty / Value</div>
                    <div className="font-bold text-white text-[11px] line-clamp-1">{activeCase.customerSavings}</div>
                  </div>
                </div>
              </div>

              {/* Request Estimate Action for this specific service */}
              <div className="pt-1 sm:pt-2">
                <button
                  onClick={() => onRequestEstimate && onRequestEstimate(activeCase.serviceCategory)}
                  className="w-full min-h-[44px] py-3.5 px-3 sm:px-4 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-center"
                >
                  <Camera className="w-4 h-4 shrink-0" />
                  <span className="truncate sm:whitespace-normal">Upload Photos For Same Repair</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Written lifetime warranty on all collision paint and panel fits.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

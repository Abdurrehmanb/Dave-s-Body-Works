import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Car, 
  Truck, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Camera, 
  Check, 
  AlertCircle,
  ArrowRight,
  Info,
  Phone
} from 'lucide-react';
import { DAMAGE_AREAS, SHOP_INFO } from '../data';

interface EstimateCalculatorProps {
  onOpenEstimateModalWithData: (data: {
    damageAreas: string[];
    severity: 'minor' | 'moderate' | 'severe';
    estimatedMin: number;
    estimatedMax: number;
    vehicleType: string;
    repairTier: string;
  }) => void;
}

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({ 
  onOpenEstimateModalWithData 
}) => {
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'truck' | 'luxury'>('sedan');
  const [selectedDamageIds, setSelectedDamageIds] = useState<string[]>(['front-bumper']);
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'severe'>('moderate');
  const [repairTier, setRepairTier] = useState<'smart' | 'oem'>('oem');

  // Multiplier for vehicle type
  const vehicleMultipliers = {
    sedan: 1.0,
    suv: 1.15,
    truck: 1.25,
    luxury: 1.35
  };

  // Multipliers for severity
  const severityMultipliers = {
    minor: 0.65,
    moderate: 1.0,
    severe: 1.6
  };

  // Multiplier for repair tier
  const tierMultipliers = {
    smart: 0.8, // Budget-conscious repair / plastic weld / high-grade certified
    oem: 1.0    // Brand new OEM parts / showroom factory blending
  };

  const calculation = useMemo(() => {
    if (selectedDamageIds.length === 0) {
      return { min: 0, max: 0, daysMin: 1, daysMax: 2 };
    }

    let rawMin = 0;
    let rawMax = 0;

    selectedDamageIds.forEach((id) => {
      const area = DAMAGE_AREAS.find((d) => d.id === id);
      if (area) {
        rawMin += area.baseMin;
        rawMax += area.baseMax;
      }
    });

    const vMult = vehicleMultipliers[vehicleType];
    const sMult = severityMultipliers[severity];
    const tMult = tierMultipliers[repairTier];

    // Multi-panel discount (labor overlap for paint prep & masking)
    const panelDiscount = selectedDamageIds.length > 1 ? 0.9 : 1.0;

    const finalMin = Math.round((rawMin * vMult * sMult * tMult * panelDiscount) / 10) * 10;
    const finalMax = Math.round((rawMax * vMult * sMult * tMult * panelDiscount) / 10) * 10;

    // Estimate turnaround days
    let daysMin = 1;
    let daysMax = 3;
    if (severity === 'minor') {
      daysMin = 1;
      daysMax = 2;
    } else if (severity === 'moderate') {
      daysMin = selectedDamageIds.length > 2 ? 3 : 2;
      daysMax = selectedDamageIds.length > 2 ? 5 : 3;
    } else {
      daysMin = 4;
      daysMax = 7;
    }

    return { min: finalMin, max: finalMax, daysMin, daysMax };
  }, [selectedDamageIds, vehicleType, severity, repairTier]);

  const toggleDamageArea = (id: string) => {
    setSelectedDamageIds((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleProceed = () => {
    onOpenEstimateModalWithData({
      damageAreas: selectedDamageIds,
      severity,
      estimatedMin: calculation.min,
      estimatedMax: calculation.max,
      vehicleType,
      repairTier
    });
  };

  return (
    <section id="calculator" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-red-600" />
            <span>Interactive Repair Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1a30] tracking-tight">
            Transparent Pricing Before You Step In
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your vehicle and damaged panels to calculate an instant cost range. 
            Dave's Body Works gives you honest repair choices with zero pressure.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-7">
            {/* Step 1: Vehicle Type */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-[#0b1a30] flex items-center justify-between">
                <span>1. Vehicle Category</span>
                <span className="text-[11px] font-normal text-slate-500">Affects panel dimensions &amp; paint volume</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {[
                  { id: 'sedan', label: 'Sedan / Coupe', icon: Car },
                  { id: 'suv', label: 'SUV / Crossover', icon: Car },
                  { id: 'truck', label: 'Pickup / Van', icon: Truck },
                  { id: 'luxury', label: 'Luxury / EV', icon: Sparkles },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = vehicleType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setVehicleType(item.id as any)}
                      className={`min-h-[64px] sm:min-h-[72px] p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-[#0b1a30] font-bold ring-2 ring-red-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                      <span className="text-[11px] sm:text-xs leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Damaged Areas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-[#0b1a30]">
                  2. Select Damaged Section(s)
                </label>
                <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-md">
                  {selectedDamageIds.length} selected
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Tap all panels needing repair. Multiple panels receive combined booth-prep savings.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DAMAGE_AREAS.map((area) => {
                  const isChecked = selectedDamageIds.includes(area.id);
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleDamageArea(area.id)}
                      className={`px-3.5 py-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'border-[#0b1a30] bg-[#0b1a30] text-white shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{area.name}</div>
                        <div className={`text-[11px] ${isChecked ? 'text-slate-300' : 'text-slate-500'}`}>
                          Base: ${area.baseMin} - ${area.baseMax}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'border-slate-300 bg-white text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Damage Severity */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-[#0b1a30]">
                3. Damage Severity Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {[
                  {
                    id: 'minor',
                    title: 'Minor',
                    desc: 'Scratches, popped clips, small door dings, bumper scuffs.'
                  },
                  {
                    id: 'moderate',
                    title: 'Moderate',
                    desc: 'Dented metal, cracked plastic, deep scratch requiring repaint.'
                  },
                  {
                    id: 'severe',
                    title: 'Heavy / Collision',
                    desc: 'Impact collision, structural bend, multiple broken components.'
                  }
                ].map((s) => {
                  const isSelected = severity === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSeverity(s.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-red-600 bg-red-50/60 ring-2 ring-red-500/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#0b1a30]' : 'text-slate-700'}`}>
                          {s.title}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-red-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {s.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Repair Philosophy / Customer Choice */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-[#0b1a30] flex items-center gap-2">
                  <span>4. Repair Philosophy</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    Dave's Honest Choice
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRepairTier('smart')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    repairTier === 'smart'
                      ? 'border-red-600 bg-red-50/60 ring-2 ring-red-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs text-[#0b1a30]">
                    <span>Budget-Friendly Smart Repair</span>
                    {repairTier === 'smart' && <Check className="w-4 h-4 text-red-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Repair &amp; plastic-weld existing bumper or high-grade certified replacement. Saves up to 20%.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRepairTier('oem')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    repairTier === 'oem'
                      ? 'border-red-600 bg-red-50/60 ring-2 ring-red-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs text-[#0b1a30]">
                    <span>OEM Factory Showroom Finish</span>
                    {repairTier === 'oem' && <Check className="w-4 h-4 text-red-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Brand new OEM dealer parts, computer spectrophotometer match, and written lifetime paint warranty.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Result Card Column (Sticky on Desktop) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-[#0b1a30] text-white rounded-2xl p-6 sm:p-7 border border-slate-700 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-red-400 font-extrabold">
                    Itemized Cost Projection
                  </span>
                  <h3 className="text-lg font-bold text-white">Visual Repair Estimate</h3>
                </div>
                <div className="p-2.5 rounded-xl bg-red-600 text-white">
                  <Calculator className="w-5 h-5" />
                </div>
              </div>

              {selectedDamageIds.length === 0 ? (
                <div className="text-center py-8 text-slate-400 space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-sm">Please select at least one damaged area to calculate pricing.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Big Price Range Display */}
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      ${calculation.min.toLocaleString()} – ${calculation.max.toLocaleString()}
                    </div>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Includes labor, paint refinishing, clearcoat &amp; lifetime warranty</span>
                    </p>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="bg-[#0f223f] rounded-xl p-4 space-y-2.5 text-xs border border-slate-700">
                    <div className="flex justify-between text-slate-300">
                      <span>Vehicle:</span>
                      <span className="font-bold text-white capitalize">{vehicleType}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Panels Selected:</span>
                      <span className="font-bold text-white">{selectedDamageIds.length} areas</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Damage Severity:</span>
                      <span className="font-bold text-white capitalize">{severity}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Turnaround Time:</span>
                      <span className="font-bold text-amber-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Approx. {calculation.daysMin} - {calculation.daysMax} business days</span>
                      </span>
                    </div>
                  </div>

                  {/* Insurance Notice */}
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-[11px] text-slate-300 space-y-1">
                    <div className="font-bold text-red-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Filing through Insurance?</span>
                    </div>
                    <p className="text-slate-400">
                      Your out-of-pocket cost is typically limited to your deductible ($250, $500, or $1,000), or $0 if not at fault. We bill insurers directly.
                    </p>
                  </div>

                  {/* Action CTAs */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      onClick={handleProceed}
                      className="w-full min-h-[48px] py-3.5 sm:py-4 px-3 sm:px-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-center"
                    >
                      <Camera className="w-4 h-4 shrink-0" />
                      <span className="truncate sm:whitespace-normal">Lock In &amp; Upload Damage Photos</span>
                      <ArrowRight className="w-4 h-4 shrink-0 ml-0.5" />
                    </button>

                    <div className="text-center pt-1">
                      <span className="text-xs text-slate-300">
                        Prefer to talk? Call Dave directly at{' '}
                        <a href={`tel:${SHOP_INFO.phone}`} className="text-red-400 hover:text-white underline font-bold">
                          {SHOP_INFO.displayPhone}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Location Note */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-3 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 font-bold">
                ✓
              </div>
              <p>
                <strong>No obligation.</strong> Free visual inspection right at {SHOP_INFO.address}, Las Vegas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

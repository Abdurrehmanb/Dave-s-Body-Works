import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  CheckCircle2, 
  Car, 
  Phone, 
  ShieldCheck, 
  FileText, 
  Trash2,
  AlertCircle,
  Clock,
  Mail,
  MessageSquare,
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SHOP_INFO, generateEstimateEmailBody, generateEstimateSmsBody } from '../data';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    damageAreas?: string[];
    severity?: string;
    estimatedMin?: number;
    estimatedMax?: number;
    vehicleType?: string;
    serviceName?: string;
    repairTier?: string;
  } | null;
}

export const EstimateModal: React.FC<EstimateModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData 
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(
    initialData?.serviceName || 'Bumper Replacement & Collision Repair'
  );
  const [insuranceStatus, setInsuranceStatus] = useState<'insurance' | 'out_of_pocket' | 'not_sure'>('insurance');
  const [needsRentalCar, setNeedsRentalCar] = useState(false);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<{ id: string; name: string; size: string; preview: string }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => {
        const previewUrl = URL.createObjectURL(file);
        return {
          id: Math.random().toString(36).substring(7),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          preview: previewUrl
        };
      });
      setPhotos((prev) => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const estimatePayload = {
    customerName: fullName || 'Valued Customer',
    phone: phone || 'Not provided',
    vehicleYearMakeModel: `${vehicleYear} ${vehicleMake} ${vehicleModel}`.trim() || 'Vehicle Not Specified',
    damageNotes: notes || (initialData?.serviceName ? `Service: ${initialData.serviceName}` : 'Estimate requested via web portal'),
    preferredContact: email ? `Email: ${email}, Phone: ${phone}` : phone || 'Phone',
    insuranceClaim: insuranceStatus === 'insurance',
    insuranceCompany: insuranceStatus === 'insurance' ? 'Insurer to be verified' : undefined,
    needsRental: needsRentalCar,
    estimatedMin: initialData?.estimatedMin,
    estimatedMax: initialData?.estimatedMax,
    damageAreas: initialData?.damageAreas,
    severity: initialData?.severity
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `DBW-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const currentRefCode = confirmationCode || 'PENDING';
  const emailBody = generateEstimateEmailBody(estimatePayload);
  const emailSubject = encodeURIComponent(`Estimate Request [${currentRefCode}] - ${estimatePayload.vehicleYearMakeModel} - ${estimatePayload.customerName}`);
  const mailtoLink = `mailto:${SHOP_INFO.email}?subject=${emailSubject}&body=${emailBody}`;

  const smsBody = generateEstimateSmsBody({
    customerName: fullName || 'Valued Customer',
    vehicleYearMakeModel: `${vehicleYear} ${vehicleMake} ${vehicleModel}`.trim() || 'my car',
    damageNotes: notes || (initialData?.serviceName ? `Need repair for ${initialData.serviceName}` : 'Please contact me for repair estimate')
  });
  const smsLink = `sms:${SHOP_INFO.smsPhone}?body=${smsBody}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar with Brand Identity */}
        <div className="bg-[#0b1a30] text-white px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-official.png" 
              alt="Dave's Body Works Official Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-white">
                  Dave's Body Works Estimate
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white uppercase tracking-wider">
                  100% Free
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Connected directly with Dave: (702) 871-0556 · {SHOP_INFO.email}
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen with direct Email/SMS dispatch */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-[#0b1a30]">
                Estimate Request Registered!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#0b1a30]">{fullName || 'Neighbor'}</strong>. 
                Your estimate file is prepared for Dave and our Spring Mountain shop estimators.
              </p>
            </div>

            {/* Reference Badge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block text-left max-w-md w-full shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Estimate Reference
                </span>
                <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
              <div className="text-xl font-mono font-black text-[#0b1a30] mt-1">
                {confirmationCode}
              </div>
              <div className="text-xs text-slate-600 mt-2 border-t border-slate-200 pt-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                <span>Shop review turnaround: Within 1 business hour</span>
              </div>
            </div>

            {/* Direct Connect Actions to Business Official Channels */}
            <div className="space-y-3 max-w-md mx-auto text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Connect Directly with Shop Office:
              </div>

              {/* 1-Click Send Email */}
              <a
                href={mailtoLink}
                className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Send Details via Official Email</div>
                    <div className="text-[11px] text-slate-400">{SHOP_INFO.email}</div>
                  </div>
                </div>
                <Send className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* 1-Click Send SMS */}
              <a
                href={smsLink}
                className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Text Dave via SMS</div>
                    <div className="text-[11px] text-slate-400">{SHOP_INFO.displayPhone}</div>
                  </div>
                </div>
                <Send className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* 1-Click Call */}
              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="w-full p-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                    <Phone className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white uppercase tracking-wider">Call Front Desk Now</div>
                    <div className="text-[11px] text-red-100">{SHOP_INFO.displayPhone}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white" />
              </a>
            </div>

            {/* Quick Walk-in Note */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 text-left space-y-1 max-w-md mx-auto">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Need it inspected in-person today?</span>
              </div>
              <p className="text-[11px] text-amber-900">
                No appointment required for visual estimates. Drive into our shop at{' '}
                <strong>{SHOP_INFO.address}</strong> between 8:00 AM and 5:00 PM.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5 max-h-[82vh] overflow-y-auto">
            {/* If initial calculation data exists, display summary banner */}
            {initialData && initialData.estimatedMin && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#0b1a30]">Calculator Projection:</span>
                  <div className="text-red-700 font-bold text-sm">
                    ${initialData.estimatedMin.toLocaleString()} – ${initialData.estimatedMax?.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {initialData.damageAreas?.length} section(s) · {initialData.vehicleType || 'Vehicle'}
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-red-600 text-white px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Estimate Attached
                </span>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                <span>1. Contact Information</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Robert Johnson"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (for SMS/Call) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(702) 555-0123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600">
                2. Vehicle Details
              </h4>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    placeholder="2022"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Make *
                  </label>
                  <input
                    type="text"
                    required
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    placeholder="Toyota"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Model *
                  </label>
                  <input
                    type="text"
                    required
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="Camry"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Claim Type & Rental */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600">
                3. Claim Type &amp; Rental Car
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'insurance', label: 'Insurance Claim' },
                  { id: 'out_of_pocket', label: 'Self-Pay / Cash' },
                  { id: 'not_sure', label: 'Not Sure Yet' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setInsuranceStatus(t.id as any)}
                    className={`min-h-[42px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center text-center ${
                      insuranceStatus === t.id
                        ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Rental Car Checkbox */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsRentalCar}
                  onChange={(e) => setNeedsRentalCar(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600"
                />
                <span className="text-xs text-slate-700">
                  <strong>Need Rental Car Assistance?</strong> Coordinate on-site Enterprise / Hertz replacement vehicle.
                </span>
              </label>
            </div>

            {/* Photo Upload Zone */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-red-600">
                  4. Attach Damage Photos (Optional)
                </label>
                <span className="text-[11px] text-slate-500">PNG, JPG up to 10MB</span>
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-red-500 rounded-2xl p-5 sm:p-6 text-center bg-slate-50 hover:bg-red-50/20 cursor-pointer transition-all space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-700">
                  <Camera className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Tap to upload damage photos
                </div>
                <p className="text-[11px] text-slate-500">
                  Add 1 close-up of the scratch/dent and 1 wide shot of the whole panel.
                </p>
              </div>

              {/* Thumbnail Gallery */}
              {photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video shadow-2xs">
                      <img
                        src={photo.preview}
                        alt="Damage preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-1 right-1 p-1 bg-slate-900/80 text-white rounded-md hover:bg-red-600 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes / Description */}
            <div className="space-y-1 pt-2">
              <label className="block text-xs font-bold text-slate-700">
                Additional Notes / Questions for Dave
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us what happened, any insurance claim details, or preferred times..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-red-500 text-slate-900"
              />
            </div>

            {/* Direct Official Contact Guarantee */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct submission to <strong>davesbodyworkslv@gmail.com</strong></span>
              </div>
              <a href={`tel:${SHOP_INFO.phone}`} className="text-red-600 font-bold hover:underline">
                {SHOP_INFO.displayPhone}
              </a>
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500">
                🔒 Free estimate with zero repair obligation.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-1/2 sm:w-auto px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-extrabold shadow-md transition-all cursor-pointer uppercase tracking-wider"
                >
                  Submit Estimate
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

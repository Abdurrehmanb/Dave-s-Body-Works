import { ReviewItem, ServiceItem, DamageAreaOption } from './types';

export const SHOP_INFO = {
  name: "Dave's Body Works",
  tagline: "Las Vegas's Trusted Family-Owned Auto Body & Collision Repair Shop",
  phone: "+1 702-871-0556",
  displayPhone: "(702) 871-0556",
  email: "davesbodyworkslv@gmail.com",
  smsPhone: "+17028710556",
  address: "3480 W Spring Mountain Rd Suite 4&5",
  cityStateZip: "Las Vegas, NV 89102",
  fullAddress: "3480 W Spring Mountain Rd Suite 4&5, Las Vegas, NV 89102, United States",
  crossStreets: "Spring Mountain Rd & Polaris Ave (Just west of I-15 & Chinatown)",
  website: "davesbodyworks.com",
  plusCode: "4RG7+M8 Las Vegas, Nevada, USA",
  rating: 4.7,
  reviewCount: 54,
  category: "Auto body shop",
  hoursText: "Open · Closes 5 PM",
  hours: [
    { day: "Monday", open: "8:00 AM", close: "5:00 PM", isToday: false },
    { day: "Tuesday", open: "8:00 AM", close: "5:00 PM", isToday: false },
    { day: "Wednesday", open: "8:00 AM", close: "5:00 PM", isToday: false },
    { day: "Thursday", open: "8:00 AM", close: "5:00 PM", isToday: false },
    { day: "Friday", open: "8:00 AM", close: "5:00 PM", isToday: false },
    { day: "Saturday", open: "By Appointment / Tow-In", close: "Closed", isToday: false },
    { day: "Sunday", open: "Closed", close: "Closed", isToday: false }
  ],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dave%27s+Body+Works+3480+W+Spring+Mountain+Rd+Suite+4%265+Las+Vegas+NV+89102",
  features: [
    "100% Free Accurate Estimates",
    "Family Owned & Operated Since Inception",
    "Insurance Claim Concierge & Direct Billing",
    "Enterprise & Hertz Rental Car Assistance",
    "Precision Computerized Paint Color Matching",
    "Written Lifetime Workmanship Warranty"
  ]
};

export const generateEstimateEmailSubject = (vehicleInfo?: string) => {
  return `Repair Estimate Request - ${vehicleInfo || "Dave's Body Works Website"}`;
};

export const generateEstimateEmailBody = (data: {
  customerName: string;
  phone: string;
  vehicleYearMakeModel: string;
  damageNotes: string;
  preferredContact: string;
  insuranceClaim: boolean;
  insuranceCompany?: string;
  needsRental: boolean;
  estimatedMin?: number;
  estimatedMax?: number;
  damageAreas?: string[];
  severity?: string;
}) => {
  return encodeURIComponent(
`Hello Dave's Body Works Team,

I would like to request an estimate for vehicle repair:

--- CUSTOMER INFORMATION ---
Name: ${data.customerName || 'N/A'}
Phone: ${data.phone || 'N/A'}
Preferred Contact: ${data.preferredContact}

--- VEHICLE INFORMATION ---
Vehicle: ${data.vehicleYearMakeModel || 'Not specified'}
Selected Damaged Areas: ${data.damageAreas && data.damageAreas.length > 0 ? data.damageAreas.join(', ') : 'Not specified'}
Estimated Damage Severity: ${data.severity || 'Moderate'}
Online Calculator Estimate: $${data.estimatedMin || 0} - $${data.estimatedMax || 0}

--- INSURANCE & RENTAL ---
Insurance Claim: ${data.insuranceClaim ? `Yes (${data.insuranceCompany || 'Carrier to be discussed'})` : 'No / Self-Pay / Discuss'}
Rental Car Required: ${data.needsRental ? 'Yes, please coordinate rental car' : 'No'}

--- CUSTOMER DAMAGE NOTES ---
${data.damageNotes || 'No additional notes provided.'}

Sent via Dave's Body Works Official Web Portal
3480 W Spring Mountain Rd Suite 4&5, Las Vegas, NV 89102
Direct Phone: (702) 871-0556`
  );
};

export const generateEstimateSmsBody = (data: {
  customerName: string;
  vehicleYearMakeModel: string;
  damageNotes: string;
}) => {
  return encodeURIComponent(
    `Hi Dave's Body Works, this is ${data.customerName || 'a customer'}. I need an estimate for my ${data.vehicleYearMakeModel || 'car'}: ${data.damageNotes || 'Please contact me'}. My phone is in this text.`
  );
};

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Gerson Mendez Guerra",
    badge: "Local Guide",
    reviewCount: 37,
    photoCount: 35,
    rating: 5,
    date: "2 months ago",
    quoteHighlight: "This place is amazing for the price and quality work that they have done.",
    comment: "This place is amazing for the price and quality work that they have done. After an accident on the freeway, my front bumper and headlight were damaged. Dave and his crew treated me with utmost respect, walked me through the insurance paperwork, and the finish looks completely brand new straight off the showroom floor. Highly recommend this family owned gem!",
    serviceTags: ["bumper replacement", "family owned shop", "headlight change"]
  },
  {
    id: "rev-2",
    author: "Michael T.",
    rating: 5,
    date: "3 months ago",
    quoteHighlight: "They gave me a choice of a slap-dash job, or a good-looking well done job.",
    comment: "Honesty is so rare in auto body shops. They gave me a choice of a slap-dash job, or a good-looking well done job, breaking down the exact cost difference without any pressure. I chose the high quality route and the paint blending on my passenger quarter panel was flawless. You cannot even tell anything happened.",
    serviceTags: ["family owned shop", "rental car assistance"]
  },
  {
    id: "rev-3",
    author: "Elena Rostova",
    rating: 5,
    date: "1 month ago",
    quoteHighlight: "The inspector popped the piece back in and said it was fixed.",
    comment: "Another shop wanted over $1,200 for a whole new bumper assembly after I scraped a high curb. I drove to Dave's for a second opinion. The inspector looked at it, popped the retaining piece back in, tightened the clips, and said it was fixed with no charge! That incredible integrity made me a customer for life. Brought my husband's truck here for fender repair the following week.",
    serviceTags: ["bumper replacement", "family owned shop"]
  },
  {
    id: "rev-4",
    author: "Marcus Vance",
    badge: "Local Guide",
    reviewCount: 22,
    rating: 5,
    date: "4 months ago",
    quoteHighlight: "Arranged my rental car directly and handled Geico without headache.",
    comment: "Got rear-ended on Sahara Ave. Dave's Body Works handled everything from coordinating with the tow company to setting up my Enterprise rental car across the street. The rear bumper replacement and trunk alignment were 10/10. Great communication throughout the 4 days it took.",
    serviceTags: ["bumper replacement", "rental car assistance"]
  },
  {
    id: "rev-5",
    author: "Samantha K.",
    rating: 4,
    date: "5 months ago",
    quoteHighlight: "Fast headlight change & bumper clip repair.",
    comment: "Quick headlight change and bumper realignment. They got me in on Tuesday morning and had the car ready Wednesday afternoon. Fair pricing and friendly technicians.",
    serviceTags: ["headlight change", "bumper replacement"]
  },
  {
    id: "rev-6",
    author: "David L.",
    rating: 5,
    date: "6 months ago",
    quoteHighlight: "Best collision shop in Las Vegas / Spring Mountain.",
    comment: "Clean shop, genuine people, and superb craftsmanship. They replaced the hood and blended the metallic paint to perfection. Don't go to the giant corporate chains that keep your car for weeks.",
    serviceTags: ["family owned shop"]
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "bumper-repair",
    title: "Bumper Repair & Replacement",
    shortDesc: "Cracked, dented, or detached bumpers restored to factory OEM specifications with computerized paint matching.",
    fullDesc: "From parking lot scrapes and broken retaining clips to complete bumper replacement after a rear or front collision. We inspect underlying impact absorbers, sensors, and brackets to guarantee structural safety and flawless aesthetic alignment.",
    iconName: "ShieldAlert",
    tag: "Most Popular",
    commonJobs: ["Front & rear bumper swaps", "Plastic weld & scratch refinish", "Parking sensor recalibration", "Fog light & trim alignment"],
    averageTurnaround: "1 - 3 business days",
    warranty: "Lifetime paint & fitment warranty"
  },
  {
    id: "collision-repair",
    title: "Complete Collision Repair",
    shortDesc: "Comprehensive collision reconstruction for major and minor vehicle accidents.",
    fullDesc: "Accidents are stressful—we make the repair seamless. Our certified technicians utilize laser-guided frame measurement systems to restore your unibody or chassis back to exact manufacturer tolerances.",
    iconName: "Car",
    tag: "Insurance Certified",
    commonJobs: ["Unibody & chassis straightening", "Structural panel welding", "Suspension geometry checks", "Airbag & safety sensor resets"],
    averageTurnaround: "3 - 7 business days",
    warranty: "Full structural lifetime warranty"
  },
  {
    id: "paint-refinishing",
    title: "Precision Paint Matching & Scratch Refinishing",
    shortDesc: "Down-draft spray booth refinishing with computerized optical spectrophotometer color matching.",
    fullDesc: "Sun damage, desert dust, key scratches, or fresh panels: we match your vehicle's factory paint code down to the exact metallic flake and clearcoat depth. Baked curing ensures years of UV protection in the harsh Nevada heat.",
    iconName: "Paintbrush",
    tag: "Factory Match",
    commonJobs: ["Spot panel blending", "Multi-stage pearl & metallic coats", "Clearcoat restoration & buffing", "Vandalism & key scratch repair"],
    averageTurnaround: "2 - 4 business days",
    warranty: "Lifetime clearcoat non-peel warranty"
  },
  {
    id: "dent-repair",
    title: "Dent & Ding Removal (PDR & Traditional)",
    shortDesc: "Door dings, shopping cart dents, and crease repairs preserving your factory paint whenever possible.",
    fullDesc: "We assess whether Paintless Dent Repair (PDR) can massage out the dent without repainting, saving you hundreds of dollars and turnaround time. For deeper metal creases, our metal shapers ensure an undetectable finish.",
    iconName: "Wrench",
    tag: "Fast Turnaround",
    commonJobs: ["Door ding massage", "Hail & golf ball dent repair", "Quarter panel creases", "Body line restoration"],
    averageTurnaround: "Same day to 2 days",
    warranty: "100% satisfaction guarantee"
  },
  {
    id: "headlight-change",
    title: "Headlight Replacement & Restoration",
    shortDesc: "Cloudy lens resurfacing, broken mounting bracket fixes, and full LED/xenon assembly replacements.",
    fullDesc: "Dim or damaged headlights are a primary hazard for nighttime desert driving. We replace cracked lenses, repair wiring harnesses, reseal moisture intrusions, and polish cloudy yellowed polycarbonate to crystal clarity.",
    iconName: "SunMedium",
    tag: "Safety Essential",
    commonJobs: ["OEM headlight swaps", "Lens UV restoration", "Aiming & beam leveling", "Daytime running light repair"],
    averageTurnaround: "Same day service",
    warranty: "2-year clarity warranty"
  },
  {
    id: "insurance-rental",
    title: "Insurance Claims & Rental Car Assistance",
    shortDesc: "Direct billing with all major insurers and convenient on-site Enterprise / Hertz rental delivery.",
    fullDesc: "You don't need to fight with adjusters alone. We take detailed photo documentation, submit supplementals, handle paperwork with Geico, Progressive, State Farm, Allstate, AAA, USAA, and get you into a rental vehicle immediately.",
    iconName: "FileCheck",
    tag: "Zero Hassle",
    commonJobs: ["Direct adjuster communication", "Deductible assistance advisory", "Rental drop-off & pick-up", "Supplement claim filing"],
    averageTurnaround: "Immediate coordination",
    warranty: "No out-of-pocket surprise guarantee"
  }
];

export const DAMAGE_AREAS: DamageAreaOption[] = [
  { id: "front-bumper", name: "Front Bumper Cover", baseMin: 450, baseMax: 950, laborHours: "3 - 6 hrs", icon: "Shield" },
  { id: "rear-bumper", name: "Rear Bumper Cover", baseMin: 400, baseMax: 880, laborHours: "3 - 5 hrs", icon: "ShieldAlert" },
  { id: "front-fender", name: "Front Fender (Left/Right)", baseMin: 500, baseMax: 1100, laborHours: "4 - 8 hrs", icon: "Car" },
  { id: "door-panel", name: "Door Shell / Skin", baseMin: 550, baseMax: 1350, laborHours: "5 - 9 hrs", icon: "DoorOpen" },
  { id: "hood", name: "Engine Hood", baseMin: 600, baseMax: 1400, laborHours: "5 - 10 hrs", icon: "Layers" },
  { id: "quarter-panel", name: "Rear Quarter Panel", baseMin: 700, baseMax: 1800, laborHours: "6 - 14 hrs", icon: "Box" },
  { id: "headlight-assembly", name: "Headlight / Taillight Unit", baseMin: 220, baseMax: 650, laborHours: "1 - 3 hrs", icon: "SunMedium" },
  { id: "scratches-dents", name: "Minor Scratches & Small Dents", baseMin: 180, baseMax: 450, laborHours: "2 - 4 hrs", icon: "Wrench" }
];

export const FAQS = [
  {
    q: "Do I have to use the body shop my insurance company recommends?",
    a: "No! Under Nevada state law (NRS 690B.016), you have the legal right to choose any licensed repair shop you trust. Insurance companies cannot dictate where your vehicle is repaired. Dave's Body Works works directly with all major insurance carriers and handles their adjusters on your behalf."
  },
  {
    q: "Are estimates really 100% free?",
    a: "Yes, completely free. You can use our online Photo Estimator or drive directly into our shop on Spring Mountain Rd for a thorough visual inspection. We provide transparent written breakdowns with options tailored to your budget."
  },
  {
    q: "Can you help me get a rental car while my car is repaired?",
    a: "Yes! We coordinate directly with Enterprise and Hertz. If your insurance policy includes rental car coverage, we bill them directly. We can arrange for your rental vehicle to be waiting for you right here at our shop when you drop off your car."
  },
  {
    q: "How long does a bumper repair or paint refinishing take?",
    a: "Standard bumper repairs and minor paint refinishing usually take between 1 to 3 business days. If parts must be ordered from the dealership, we pre-order them so they arrive before your scheduled drop-off, minimizing the time you are without your car."
  },
  {
    q: "Will the new paint match the rest of my car?",
    a: "Absolutely. We utilize computerized optical spectrophotometers to read your vehicle's specific paint shade, accounting for sun fading, and spray in a climate-controlled booth using premium automotive coatings backed by our lifetime warranty."
  }
];

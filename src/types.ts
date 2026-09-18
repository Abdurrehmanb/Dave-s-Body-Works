export interface ReviewItem {
  id: string;
  author: string;
  badge?: string;
  reviewCount?: number;
  photoCount?: number;
  rating: number;
  date: string;
  quoteHighlight?: string;
  comment: string;
  serviceTags: string[];
  ownerResponse?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tag: string;
  commonJobs: string[];
  averageTurnaround: string;
  warranty: string;
}

export interface DamageAreaOption {
  id: string;
  name: string;
  baseMin: number;
  baseMax: number;
  laborHours: string;
  icon: string;
}

export interface EstimateRequest {
  fullName: string;
  phone: string;
  email: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vin?: string;
  damageAreas: string[];
  severity: 'minor' | 'moderate' | 'severe';
  insuranceClaim: 'yes' | 'no' | 'not_sure';
  insuranceCompany?: string;
  needsRentalCar: boolean;
  notes: string;
  photos: { name: string; size: number; previewUrl?: string }[];
  preferredDate?: string;
}

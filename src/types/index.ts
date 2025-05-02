export interface Promo {
  id: string;
  title: string;
  description: string;
  bank: string;
  category: string;
  image?: string;
  validUntil: string;
  featured?: boolean;
  isNew?: boolean;
  externalLink?: string;
  termsAndConditions?: string;
}

export interface PromoFilters {
  searchTerm: string;
  bank: string | null;
  category: string | null;
}
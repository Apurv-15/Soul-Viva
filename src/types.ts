/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface KeyIngredient {
  name: string;
  role: string;
  source: string;
  description: string;
}

export interface SensoryProfile {
  hydration: number; // 0 - 100
  purity: number; // 0 - 100
  latherDensity: number; // 0 - 100
  longevity: number; // 0 - 100
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  weight: string; // e.g. "120g / 4.2 oz"
  pHLevel: string; // e.g. "5.5 (Skin Optimal)"
  skinType: string;
  scentNotes: ScentNotes;
  keyIngredients: KeyIngredient[];
  sensoryProfile: SensoryProfile;
  image: string; // floating soap bar image
  bgImage: string; // high res setting photograph
  accentClass: string; // hex colour or Tailwind colour
  bloomShadowClass: string; // e.g. "shadow-[0_0_50px_rgba(253,186,116,0.35)]" or similar
  themeColor: string; // e.g. hex
  badge: string;
}

export interface CartItem {
  id: string; // combination of productId and packaging
  product: Product;
  quantity: number;
  selectedPackaging: 'signature' | 'wooden' | 'minimum';
  packSize: 1 | 3 | 6; // single bar, pack of 3, custom ritual box
  price: number;
}

export interface BrandCommitment {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name
}

export interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  interestIn: string; // custom request size, hospitality partnership, custom gift set, etc.
  quantityNeeded: string;
}

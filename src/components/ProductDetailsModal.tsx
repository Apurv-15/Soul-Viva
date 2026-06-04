/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { X, Heart } from 'lucide-react';

const dropletPattern = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" opacity="0.08"><defs><radialGradient id="drop" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.9"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="80%" stop-color="%23000000" stop-opacity="0.08"/><stop offset="100%" stop-color="%23000000" stop-opacity="0.25"/></radialGradient></defs><circle cx="30" cy="40" r="10" fill="url(%23drop)"/><circle cx="80" cy="120" r="7" fill="url(%23drop)"/><circle cx="150" cy="60" r="14" fill="url(%23drop)"/><circle cx="110" cy="160" r="9" fill="url(%23drop)"/><circle cx="50" cy="180" r="5" fill="url(%23drop)"/><circle cx="180" cy="20" r="6" fill="url(%23drop)"/><circle cx="20" cy="100" r="8" fill="url(%23drop)"/><circle cx="160" cy="130" r="10" fill="url(%23drop)"/></svg>`;

interface ProductTheme {
  topBanner: string;
  bottomBanner: string;
  ean: string;
  textColor: string;
  subtextColor: string;
}

const PRODUCT_THEMES: Record<string, ProductTheme> = {
  'sea-minerals-menthol': {
    topBanner: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200',
    bottomBanner: '/Sea Minerals/bottom_banner.png',
    ean: '8908030764058',
    textColor: 'text-sky-900',
    subtextColor: 'text-sky-700',
  },
  'waterlily-pear': {
    topBanner: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200',
    bottomBanner: '/Waterlily and Pear/bottom_banner.png',
    ean: '8908030764003',
    textColor: 'text-emerald-950',
    subtextColor: 'text-emerald-800',
  },
  'cherry-blossom-strawberry': {
    topBanner: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=1200',
    bottomBanner: '/Strawberry/bottom_banner.png',
    ean: '8908030764034',
    textColor: 'text-rose-955',
    subtextColor: 'text-rose-800',
  },
  'lavender-currant': {
    topBanner: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=1200',
    bottomBanner: '/Black Currant/bottom_banner.png',
    ean: '8908030764041',
    textColor: 'text-purple-900',
    subtextColor: 'text-purple-700',
  },
  'mandarin-peach': {
    topBanner: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=1200',
    bottomBanner: '/Mandarin/bottom_banner.png',
    ean: '8908030764027',
    textColor: 'text-orange-950',
    subtextColor: 'text-orange-800',
  },
  'shea-honey': {
    topBanner: 'https://images.unsplash.com/photo-1589733901241-5e8a40070c10?auto=format&fit=crop&q=80&w=1200',
    bottomBanner: '/Shea and butter/bottom_banner.png',
    ean: '8908030764010',
    textColor: 'text-amber-950',
    subtextColor: 'text-amber-800',
  },
};

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
  onInquire: () => void;
}

export default function ProductDetailsModal({ product, onClose, onProductSelect, onInquire }: ProductDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  
  const theme = PRODUCT_THEMES[product.id] || {
    topBanner: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200',
    bottomBanner: '/Sea Minerals/bottom_banner.png',
    ean: '8908030764010',
    textColor: 'text-neutral-900',
    subtextColor: 'text-neutral-600',
  };
  
  // Auto scroll row states
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Reset active image index when product changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [product]);

  // Smooth slow crawling scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      if (!isHovered && el) {
        const delta = (time - lastTime) / 1000;
        // ~35px per second slow drift rate
        el.scrollLeft += delta * 35;
        
        // Wrap around at the end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, product]);
  
  // Accordion active state
  const [openAccordion, setOpenAccordion] = useState<'info' | 'benefits' | 'ingredients' | null>('info');

  // Multi-thumbnail list generated dynamically based on product context
  const getThumbnails = () => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }

    const defaultHand = "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600";
    
    const textures: Record<string, string> = {
      'sea-minerals-menthol': 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600',
      'waterlily-pear': 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600',
      'cherry-blossom-strawberry': 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=600',
      'lavender-currant': 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=600',
      'mandarin-peach': 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600',
      'shea-honey': 'https://images.unsplash.com/photo-1589733901241-5e8a40070c10?auto=format&fit=crop&q=80&w=600',
    };

    const hands: Record<string, string> = {
      'sea-minerals-menthol': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
      'waterlily-pear': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
      'cherry-blossom-strawberry': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
      'lavender-currant': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
      'mandarin-peach': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
      'shea-honey': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
    };

    return [
      product.bgImage, // Thumbnail 1: Context Setting
      product.image,   // Thumbnail 2: Transparent soap bar detail
      textures[product.id] || product.bgImage, // Thumbnail 3: Sensorial texture zoom
      hands[product.id] || defaultHand, // Thumbnail 4: Luxury application
    ];
  };

  const thumbnails = getThumbnails();

  const toggleAccordion = (tab: 'info' | 'benefits' | 'ingredients') => {
    setOpenAccordion(openAccordion === tab ? null : tab);
  };

  // Scent list styling helper
  const renderScentBubbles = (notes: string[]) => {
    return (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {notes.map((note, index) => (
          <span key={index} className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] tracking-wide font-light border border-neutral-200/40">
            {note}
          </span>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-[#FAF9F5] text-brand-dark overflow-y-auto flex flex-col justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Header Navigation Bar (Matches Mock Layout exactly) */}
      <header className="sticky top-0 z-30 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-neutral-200/50 h-20 flex items-center justify-between px-6 md:px-20">
        <div className="hidden lg:flex items-center gap-8 font-sans text-[11px] tracking-[0.25em] text-neutral-500 uppercase select-none">
          <span className="hover:text-black cursor-pointer transition-colors">Collections</span>
          <span className="hover:text-black cursor-pointer transition-colors">Products</span>
          <span className="hover:text-black cursor-pointer transition-colors">Brand</span>
          <span className="hover:text-black cursor-pointer transition-colors">Journal</span>
        </div>

        <div className="font-sans text-[20px] tracking-[0.3em] font-light text-black pl-[0.3em] select-none">
          SOUL VIVA
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsFavorited(!isFavorited)}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-red-500 transition-colors p-2 text-xs font-sans tracking-widest cursor-pointer uppercase"
          >
            <Heart className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-red-500 text-red-500 scale-110' : 'text-neutral-500'}`} />
            <span className="hidden md:inline">Favorites</span>
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-neutral-800 hover:text-black transition-colors font-sans text-xs uppercase tracking-widest p-2 rounded-full hover:bg-neutral-100/60 cursor-pointer"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Ambient environmental background image with gradient fade-away */}
      <div className="absolute inset-x-0 top-20 h-[500px] pointer-events-none overflow-hidden z-0 select-none">
        <img src={theme.topBanner} alt="" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F5]/70 to-[#FAF9F5]" />
      </div>

      {/* Main Grid Content Container (Directly on page, full-screen, no card wrapper overlay) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 pt-[220px] pb-24 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* COLUMN A: Vertical list of interactive Thumbnails (Matches mockup) */}
          <div className="lg:col-span-1 flex lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-thin">
            {thumbnails.map((thumbUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all duration-300 p-1 flex items-center justify-center cursor-pointer ${
                  activeImageIndex === idx 
                    ? 'border-neutral-900 shadow-sm scale-95' 
                    : 'border-neutral-200/50 hover:border-neutral-400/80 hover:scale-102'
                }`}
              >
                <img 
                  src={thumbUrl} 
                  alt={`Product view thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))}
          </div>

          {/* COLUMN B: Large Main Interactive Showcase Image */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-square w-full rounded-[24px] md:rounded-[36px] overflow-hidden bg-neutral-100/60 border border-neutral-200/30 p-8 md:p-12 flex items-center justify-center shadow-inner">
              {/* Premium abstract dynamic color glow based on product accent class */}
              <div className={`absolute inset-0 opacity-40 bg-gradient-to-tr ${product.accentClass}`} />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center relative z-10"
                >
                  {product.id === 'lavender-currant' && !product.images && (activeImageIndex === 0 || activeImageIndex === 2) ? (
                    <video
                      src="/Sun_rises_over_lavender_field_202605271434.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-md"
                    />
                  ) : (
                    <img
                      src={thumbnails[activeImageIndex]}
                      alt={`${product.name} large view`}
                      className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-md"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Floater crystal bar indicator in bottom right */}
              {product.id === 'crystal-clarity' && (
                <div className="absolute bottom-4 right-4 z-20 glass px-3 py-1.5 rounded-full border border-white/60 text-[9px] tracking-widest font-semibold uppercase text-neutral-500 shadow-sm pointer-events-none">
                  Crystalline solid form
                </div>
              )}
            </div>
          </div>

          {/* COLUMN C: Premium Product Details & Controls Panel */}
          <div className="lg:col-span-5 order-3 space-y-8 text-left">
            
            {/* Category / Subtitle */}
            <div className="space-y-2">
              <span className="font-sans text-[11px] tracking-[0.25em] font-semibold text-[#8C8A85] uppercase block select-none">
                {(() => {
                  const categories: Record<string, string> = {
                    'sea-minerals-menthol': 'Cleansers',
                    'waterlily-pear': 'Moisturizers',
                    'cherry-blossom-strawberry': 'Lotions',
                    'lavender-currant': 'Lotions',
                    'mandarin-peach': 'Cleansers',
                    'shea-honey': 'Moisturizers',
                  };
                  return categories[product.id] || 'Cleansers';
                })()}
              </span>
              <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 pt-1">
                <span className="font-sans text-xs text-neutral-500 font-medium bg-neutral-100/80 px-3 py-1.5 rounded border border-neutral-200/50 uppercase tracking-widest font-semibold">
                  Standard weight: {product.weight}
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-neutral-200/60" />

            {/* Description text */}
            <p className="font-sans text-sm md:text-base text-neutral-600 font-normal leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Ingredient bullets matching user mockup */}
            <ul className="space-y-2.5 pt-1 text-neutral-600 font-medium text-sm md:text-base">
              {product.keyIngredients.map((ing, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-base leading-none text-neutral-400">•</span>
                  <span>
                    <strong className="font-bold text-neutral-800">{ing.name}</strong> — {ing.description}
                  </span>
                </li>
              ))}
            </ul>

            <div className="w-full h-[1px] bg-neutral-200/60" />

            {/* Catalog specifications */}
            <div className="space-y-4">
              <span className="font-sans text-xs tracking-widest text-neutral-400 font-bold uppercase block">
                Formulation Specifications
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/40 p-5 rounded-xl border border-neutral-200 text-left">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider block font-semibold">Available Casing</span>
                  <span className="font-sans text-sm md:text-base text-neutral-800 font-semibold block mt-1">Frosted Glassmorphic Box</span>
                  <span className="font-sans text-xs text-neutral-500 block font-normal mt-0.5">Recyclable Slow Craft Pulp</span>
                </div>
                <div className="bg-white/40 p-5 rounded-xl border border-neutral-200 text-left">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider block font-semibold">Standard Weight</span>
                  <span className="font-sans text-sm md:text-base text-neutral-800 font-semibold block mt-1">{product.weight.split('/')[0]}</span>
                  <span className="font-sans text-xs text-neutral-500 block font-normal mt-0.5">Custom B2B batches available</span>
                </div>
              </div>
            </div>

            {/* Primary Catalog Inquiry Action */}
            <div className="pt-4">
              <button
                onClick={onInquire}
                className="w-full h-[56px] bg-black text-white hover:bg-neutral-800 font-sans text-sm tracking-[0.2em] rounded-xl uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 font-bold"
              >
                Inquire About Formulation
              </button>
            </div>

            {/* 3. Information & Ingredients Sections */}
            <div className="space-y-8">
              
              {/* Section: Claims Badges */}
              {product.claims && product.claims.length > 0 && (
                <div className="border-b border-neutral-200/50 pb-6">
                  <span className="font-sans text-xs tracking-widest text-neutral-400 font-bold uppercase block mb-3.5">
                    Product Claims
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.claims.map((claim, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-150/40 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                        ✓ {claim}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 1: Information */}
              <div className="border-b border-neutral-200/50 pb-6">
                <h3 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800 mb-4">
                  Technical Details
                </h3>
                <div className="font-sans text-sm text-neutral-600 font-normal leading-relaxed space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>Category:</strong> {product.productCategory || 'Glycerin Based transparent gel bathing bar'}</p>
                    <p><strong>Skin Type:</strong> {product.skinType}</p>
                    <p><strong>Case Configuration:</strong> {product.caseConfiguration}</p>
                    <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
                    <p><strong>Country of Origin:</strong> {product.countryOfOrigin} — Manufactured in Maharashtra</p>
                    <p><strong>pH Level:</strong> pH {product.pHLevel}</p>
                  </div>
                  <p className="pt-2"><strong>Packaging:</strong> {product.packaging}</p>
                </div>
              </div>

              {/* Section 2: Ingredients */}
              <div className="border-b border-neutral-200/50 pb-6">
                <h3 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800 mb-4">
                  Ingredients
                </h3>
                <div className="space-y-5">
                  {/* Botanical Ingredients List */}
                  <div className="space-y-3">
                    <span className="font-sans text-xs tracking-wider text-neutral-400 font-bold uppercase block">Key Biocompounds</span>
                    <div className="divide-y divide-neutral-250 bg-white/40 border border-neutral-200 rounded-xl overflow-hidden">
                      {product.keyIngredients.map((ing, idx) => (
                        <div key={idx} className="p-4 text-left">
                          <div className="flex justify-between items-baseline">
                            <span className="font-sans text-sm md:text-base font-semibold text-neutral-800">{ing.name}</span>
                            <span className="font-sans text-xs text-neutral-500 tracking-wider uppercase font-semibold">{ing.source}</span>
                          </div>
                          <p className="font-sans text-xs md:text-sm text-neutral-600 font-normal mt-1 leading-relaxed">{ing.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fragrance pyramid breakdown */}
                  <div className="space-y-3">
                    <span className="font-sans text-xs tracking-wider text-neutral-400 font-bold uppercase block">Aromatic Fragrance Pyramid</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-[#FAF9F5] border border-neutral-200 p-3.5 rounded-lg text-left">
                        <span className="text-xs text-neutral-400 font-bold uppercase block tracking-wider">Top Notes</span>
                        {renderScentBubbles(product.scentNotes.top)}
                      </div>
                      <div className="bg-[#FAF9F5] border border-neutral-200 p-3.5 rounded-lg text-left">
                        <span className="text-xs text-neutral-400 font-bold uppercase block tracking-wider">Heart Notes</span>
                        {renderScentBubbles(product.scentNotes.heart)}
                      </div>
                      <div className="bg-[#FAF9F5] border border-neutral-200 p-3.5 rounded-lg text-left">
                        <span className="text-xs text-neutral-400 font-bold uppercase block tracking-wider">Base Notes</span>
                        {renderScentBubbles(product.scentNotes.base)}
                      </div>
                    </div>
                  </div>

                  {/* INCI Ingredients List */}
                  {product.inciIngredients && (
                    <div className="space-y-3 pt-2">
                      <span className="font-sans text-xs tracking-wider text-neutral-400 font-bold uppercase block">Full INCI Listing</span>
                      <p className="font-sans text-xs text-neutral-500 leading-relaxed bg-[#FAF9F5] border border-neutral-200 rounded-xl p-4">
                        {product.inciIngredients}
                        <span className="block mt-2.5 text-[10px] text-neutral-400 italic">
                          Ingredients listed in descending order of concentration per INCI convention. Full safety data sheet and certificate of analysis available to qualified trade buyers on request.
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Card Footer matching user mockup */}
            <div className="flex justify-between items-center pt-6 border-t border-neutral-200/50 text-xs md:text-sm font-sans tracking-widest text-neutral-400 font-bold uppercase">
              <span>Net weight: {product.weight}</span>
              <span>EAN: {product.eanBarcode || theme.ean}</span>
            </div>

          </div>
        </div>
      </div>

        {/* 3. Discover Our Collection (Horizontal scrolling grid) */}
        <div className="w-full border-t border-neutral-200/50 py-16 mt-16 text-left">
          <div className="space-y-2 mb-8">
            <span className="font-sans text-[10px] tracking-[0.25em] font-semibold text-neutral-400 uppercase block">
              Formulation Sanctuary
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-neutral-900 leading-tight">
              Our Ritual Collection
            </h2>
          </div>
          
          {/* Horizontal scrolling row with high-end auto-crawl effect */}
          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar -mx-6 px-6 md:-mx-0 md:px-0 select-none"
          >
            {PRODUCTS.filter(p => p.id !== product.id).map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  onProductSelect(item);
                  document.querySelector('.fixed')?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-3xl border border-neutral-200/40 p-5 hover:border-neutral-400/60 transition-all duration-300 cursor-pointer group"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-100/50 flex items-center justify-center">
                  <div className={`absolute inset-0 opacity-30 bg-gradient-to-tr ${item.accentClass}`} />
                  <img 
                    src={item.bgImage} 
                    alt={item.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="mt-4 space-y-1">
                  <span className="text-[9px] tracking-wider text-neutral-400 uppercase font-semibold block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-sans text-base text-neutral-800 font-medium group-hover:text-black transition-colors block truncate">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs text-neutral-500 font-light line-clamp-1">
                    {item.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

    </motion.div>
  );
}


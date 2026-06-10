/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { X, Heart, Play } from 'lucide-react';

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

import Header from './Header';

interface IngredientCard3DProps {
  name: string;
  description: string;
  source: string;
}

function IngredientCard3D({ name, description, source }: IngredientCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Proportional rotation calculation (max 15 degrees tilt)
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 15;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 rounded-2xl transition-all duration-300 ease-out cursor-pointer h-full bg-white/70 backdrop-blur-md border border-neutral-200/60 shadow-sm hover:shadow-xl hover:border-neutral-400/30"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` 
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
      }}
    >
      {/* Gloss overlay reflection */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-neutral-100/30 to-white/40 pointer-events-none" 
        style={{ transform: 'translateZ(10px)' }}
      />
      
      <div className="relative z-10 flex flex-col justify-between h-full" style={{ transform: 'translateZ(30px)' }}>
        <div className="space-y-2">
          <div className="flex justify-between items-baseline gap-2">
            <h4 className="font-sans text-base md:text-lg font-bold text-neutral-800 tracking-tight leading-tight">
              {name}
            </h4>
            <span className="font-sans text-[9px] text-neutral-400 uppercase tracking-widest font-semibold px-2 py-0.5 bg-neutral-100/85 rounded border border-neutral-200/30 whitespace-nowrap">
              {source || 'Bio-compound'}
            </span>
          </div>
          <p className="font-sans text-xs md:text-sm text-neutral-600 font-normal leading-relaxed mt-2">
            {description}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100">
          <span className="text-[10px] text-neutral-400 font-semibold tracking-wider uppercase">Active Botanical</span>
          <div className={`w-2 h-2 rounded-full transition-transform duration-500 bg-neutral-400 ${isHovered ? 'scale-125 bg-black' : ''}`} />
        </div>
      </div>
    </div>
  );
}

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
  onInquire: () => void;
  setScreen?: (screen: 'home' | 'range' | 'craft' | 'story' | 'inquire' | 'admin') => void;
}

export default function ProductDetailsModal({ product, onClose, onProductSelect, onInquire, setScreen }: ProductDetailsModalProps) {
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

  interface ProductMedia {
    type: 'image' | 'video';
    url: string;
  }

  const getMediaList = (): ProductMedia[] => {
    const list: ProductMedia[] = [];
    if (product.video) {
      list.push({ type: 'video', url: product.video });
    }
    const imgs = getThumbnails();
    imgs.forEach(url => {
      list.push({ type: 'image', url });
    });
    return list;
  };

  const mediaList = getMediaList();

  const toggleAccordion = (tab: 'info' | 'benefits' | 'ingredients') => {
    setOpenAccordion(openAccordion === tab ? null : tab);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-[#FAF9F5] text-brand-dark overflow-y-auto flex flex-col justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Header Navigation Bar */}
      <Header
        currentScreen="range"
        setScreen={(screen) => {
          onClose();
          if (setScreen) {
            setScreen(screen);
          }
        }}
        onOpenInquiry={() => {
          onClose();
          if (setScreen) {
            setScreen('inquire');
          }
        }}
        onOpenSearch={() => {}}
      />

      {/* Ambient environmental background image or video with gradient fade-away (Only displayed for Strawberry variant) */}
      {product.id === 'cherry-blossom-strawberry' && (
        <div className="absolute inset-x-0 top-20 h-[45vh] md:h-[50vh] pointer-events-none overflow-hidden z-0 select-none">
          {product.video ? (
            <video
              src={product.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center opacity-95"
            />
          ) : (
            <img src={theme.topBanner} alt="" className="w-full h-full object-cover object-center opacity-95" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF9F5] to-95%" />
        </div>
      )}

      {/* Main Grid Content Container (Directly on page, full-screen, no card wrapper overlay) */}
      <div className={`relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 pb-24 flex-1 ${
        product.id === 'cherry-blossom-strawberry' 
          ? 'pt-[35vh] md:pt-[40vh]' 
          : 'pt-28 md:pt-32'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column Wrapper: Groups thumbnails and main image into a sticky element on desktop */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 grid grid-cols-1 lg:grid-cols-7 gap-4 items-start order-1 lg:order-1 w-full">
            {/* COLUMN A: Vertical list of interactive Thumbnails (Matches mockup) */}
            <div className="lg:col-span-1 flex lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-thin">
              {mediaList.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all duration-300 p-1 flex items-center justify-center cursor-pointer relative ${
                    activeImageIndex === idx 
                      ? 'border-neutral-900 shadow-sm scale-95' 
                      : 'border-neutral-200/50 hover:border-neutral-400/80 hover:scale-102'
                  }`}
                >
                  {media.type === 'video' ? (
                    <div className="w-full h-full relative">
                      <video 
                        src={media.url} 
                        muted 
                        className="w-full h-full object-cover rounded-lg opacity-80" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 rounded-lg">
                        <Play className="w-5 h-5 text-white drop-shadow-md" fill="white" />
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={media.url} 
                      alt={`Product view thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* COLUMN B: Large Main Interactive Showcase Image/Video */}
            <div className="lg:col-span-6 order-1 lg:order-2 w-full">
              <div className={`relative w-full rounded-[24px] md:rounded-[36px] overflow-hidden bg-neutral-100/60 border border-neutral-200/30 flex items-center justify-center shadow-inner transition-all duration-300 ${
                mediaList[activeImageIndex]?.type === 'video' 
                  ? 'aspect-[3/2] p-0' 
                  : 'aspect-square p-8 md:p-12'
              }`}>
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
                    {mediaList[activeImageIndex]?.type === 'video' ? (
                      <video
                        src={mediaList[activeImageIndex].url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-md"
                      />
                    ) : (
                      <img
                        src={mediaList[activeImageIndex]?.url}
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
          </div>

          {/* COLUMN C: Premium Product Details & Controls Panel */}
          <div className="lg:col-span-5 order-2 lg:order-2 space-y-8 text-left">
            
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
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
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
                Enquire for Demo
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
                <ul className="space-y-3 font-sans text-sm text-neutral-600 font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Category:</strong> {product.productCategory || 'Glycerin Based transparent gel bathing bar'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Skin Type:</strong> {product.skinType}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Case Configuration:</strong> {product.caseConfiguration}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Shelf Life:</strong> {product.shelfLife}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Country of Origin:</strong> {product.countryOfOrigin} — Manufactured in Maharashtra
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">pH Level:</strong> pH {product.pHLevel}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Packaging:</strong> {product.packaging}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Top Notes:</strong> {product.scentNotes.top.join(', ')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Heart Notes:</strong> {product.scentNotes.heart.join(', ')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-[2px] bg-neutral-400 mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-neutral-800">Base Notes:</strong> {product.scentNotes.base.join(', ')}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 2: Ingredients */}
              <div className="border-b border-neutral-200/50 pb-6">
                <h3 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800 mb-4">
                  Ingredients
                </h3>
                <div className="space-y-5">
                  {/* Botanical Ingredients List: Rendered in 3D interactive grid cards */}
                  <div className="space-y-3">
                    <span className="font-sans text-xs tracking-wider text-neutral-400 font-bold uppercase block">Key Biocompounds</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.keyIngredients.map((ing, idx) => (
                        <IngredientCard3D
                          key={idx}
                          name={ing.name}
                          description={ing.description}
                          source={ing.source}
                        />
                      ))}
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
      <div className="w-full border-t border-neutral-200/50 py-16 mt-16 text-left px-6 md:px-20 relative z-10">
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

      {/* 4. Botanical Bottom Banner Decoration */}
      {theme.bottomBanner && (
        <div className="w-full mt-auto pointer-events-none select-none overflow-hidden h-[120px] md:h-[180px] relative z-10 flex items-end">
          <img 
            src={theme.bottomBanner} 
            alt="" 
            className="w-full object-contain object-bottom max-h-full"
          />
        </div>
      )}

    </motion.div>
  );
}


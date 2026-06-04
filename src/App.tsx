/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Droplet,
  ShieldCheck,
  Award,
  BookOpen,
  Mail,
  ArrowUpRight,
  ChevronRight,
  Filter,
  ArrowRight,
  Check,
  Layers,
  Star,
  Recycle,
  Leaf,
  Shield
} from 'lucide-react';

import { Product } from './types';
import { PRODUCTS, COMMITMENTS } from './data';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import SearchModal from './components/SearchModal';
import InquiryModal from './components/InquiryModal';
import TheCraftVisualizer from './components/TheCraftVisualizer';
import OurStorySection from './components/OurStorySection';
import Carousel from './components/Carousel';
import InquiryPage from './components/InquiryPage';
import AdminDashboard from './components/AdminDashboard';
import StorytellerModal from './components/StorytellerModal';
import CosmeticBox3D from './components/CosmeticBox3D';
import GradualBlur from './components/GradualBlur';

const HOTSPOTS = [
  {
    id: 1,
    title: "Waterlily & Pear",
    description: "Formulated with fresh pressed pears and organic waterlily distillates to awaken natural radiance.",
    x: "75%",
    y: "42%",
    productId: "waterlily-pear"
  },
  {
    id: 2,
    title: "Deep Hydration",
    description: "Packed with clinical grade plant-based glycerin to pull in moisture and protect the lipid barrier.",
    x: "64%",
    y: "62%",
    productId: "shea-honey"
  },
  {
    id: 3,
    title: "Physiological pH 5.5",
    description: "Balanced precisely to match the skin's acidic mantle, preserving natural microbiota.",
    x: "54%",
    y: "28%",
    productId: "sea-minerals-menthol"
  }
];

export default function App() {
  // Screens state
  const [loading, setLoading] = useState(true);
  const [currentScreen, setScreen] = useState<'home' | 'range' | 'craft' | 'story' | 'inquire' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [storyProduct, setStoryProduct] = useState<Product | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Cleansers' | 'Lotions' | 'Moisturizers'>('Cleansers');

  const productCategoryMap = useMemo(() => ({
    'sea-minerals-menthol': 'Cleansers',
    'waterlily-pear': 'Moisturizers',
    'cherry-blossom-strawberry': 'Lotions',
    'lavender-currant': 'Lotions',
    'mandarin-peach': 'Cleansers',
    'shea-honey': 'Moisturizers'
  } as const), []);

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState('');

  // Sync URL Hash with Navigation State
  useEffect(() => {
    if (loading) return; // Wait for loader to finish

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const productId = hash.replace('#product-', '');
        const prod = PRODUCTS.find(p => p.id === productId);
        if (prod) {
          setSelectedProduct(prod);
        } else {
          setSelectedProduct(null);
        }
      } else {
        setSelectedProduct(null);
        const screen = hash.replace('#', '') as any;
        if (['home', 'range', 'craft', 'story', 'inquire', 'admin'].includes(screen)) {
          setScreen(screen);
        } else if (!hash) {
          setScreen('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial sync
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [loading]);

  // Sync state changes back to Hash to keep URL updated (enables browser back/forward)
  useEffect(() => {
    if (loading) return;

    if (selectedProduct) {
      if (window.location.hash !== `#product-${selectedProduct.id}`) {
        window.location.hash = `product-${selectedProduct.id}`;
      }
    } else {
      if (window.location.hash !== `#${currentScreen}`) {
        window.location.hash = currentScreen;
      }
    }
  }, [currentScreen, selectedProduct, loading]);

  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Bag drawer states
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Catalog filter state (inside the "range" screen)
  const [filterSkinType, setFilterSkinType] = useState<string>('all');
  const [filterScent, setFilterScent] = useState<string>('all');

  // Catalog filtering computations
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (filterSkinType !== 'all') {
      result = result.filter(p => p.skinType.toLowerCase().includes(filterSkinType.toLowerCase()));
    }
    if (filterScent !== 'all') {
      result = result.filter(p => {
        const fullNotes = [...p.scentNotes.top, ...p.scentNotes.heart, ...p.scentNotes.base].join(' ').toLowerCase();
        return fullNotes.includes(filterScent.toLowerCase());
      });
    }

    return result;
  }, [filterSkinType, filterScent]);

  const allAvailableScents = useMemo(() => {
    const list = new Set<string>();
    PRODUCTS.forEach((p) => {
      p.scentNotes.top.forEach((n) => list.add(n.split(' ')[0])); // general short representations: "Peach", "Mandarin", "Honey"
      p.scentNotes.heart.forEach((n) => list.add(n.split(' ')[0]));
    });
    return Array.from(list);
  }, []);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark antialiased font-sans flex flex-col justify-between selection:bg-brand-dark selection:text-white">

      {/* Superb animated luxury Loader */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onLoadingComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Persistent Glassy Header */}
      {!loading && (
        <>
          <Header
            currentScreen={currentScreen}
            setScreen={setScreen}
            onOpenInquiry={() => setInquiryOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
          />
          <GradualBlur position="bottom" height="8.5rem" strength={2.0} />
        </>
      )}

      {/* Dynamic Content Frame */}
      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >

              {/* SCREEN 1: Home dashboard */}
              {currentScreen === 'home' && (
                <div className="space-y-0">

                  {/* HERO AREA: Poetic display layout */}
                  <section id="hero-section" className="relative min-h-[95vh] h-[95vh] md:h-screen w-full flex items-center justify-start overflow-hidden bg-black">
                    {/* Background Video */}
                    <div className="absolute inset-0 z-0">
                      <video
                        src="/Video/heropage_video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-85"
                      />
                      {/* Luxurious soft ambient overlay matching premium aesthetics */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10 md:to-transparent" />
                    </div>

                    <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full pt-10 md:pt-20">
                      {/* Left title area */}
                      <div className="md:col-span-6 flex flex-col justify-center max-w-xl text-left space-y-6 md:space-y-8">
                        <span className="font-sans text-[11px] tracking-[0.4em] text-white/90 font-bold uppercase block">
                          SOUL VIVA
                        </span>

                        <h1 className="font-serif text-[56px] sm:text-[76px] md:text-[88px] lg:text-[100px] font-light leading-[0.95] tracking-tight text-white">
                          <span className="italic block font-serif text-neutral-100">Feel Fresh.</span>
                          <span className="block font-serif tracking-wide text-white">Feel Alive.</span>
                        </h1>

                        <p className="font-sans text-base md:text-lg text-white/90 font-light max-w-md leading-relaxed tracking-wide">
                          Where Skin Care meets sensory indulgence.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                          <button
                            onClick={() => {
                              setScreen('range');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="bg-white hover:bg-neutral-100 text-brand-dark px-8 py-4 font-sans text-xs tracking-widest rounded-full uppercase transition-all duration-300 shadow-sm active:scale-98 cursor-pointer font-bold"
                          >
                            Explore Collection
                          </button>
                          <button
                            onClick={() => {
                              setScreen('craft');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="glass-pill border border-white/30 text-white px-8 py-4 font-sans text-xs tracking-widest rounded-full uppercase transition-all duration-300 hover:bg-white/20 active:scale-98 cursor-pointer font-bold"
                          >
                            Our Process
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Right-aligned next arrow slider like in reference screenshot */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-25 hidden md:block">
                      <button
                        onClick={() => {
                          setScreen('range');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border border-white/25 transition-all duration-300 cursor-pointer active:scale-95"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </section>


                  {/* CAROUSEL RANGE: Discover fragrance line up */}
                  {/*
                  <Carousel
                    products={PRODUCTS.filter((p) => p.id !== 'crystal-clarity')}
                    onSelectProduct={setSelectedProduct}
                  />
                  */}

                  {/* COMPLETE RITUAL RANGE (CATALOG GRID SECTION) */}
                  <section id="catalog-section" className="py-24 bg-[#F5F2EB]/50 min-h-[90vh]">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-16">

                      {/* Header Title in large font */}
                      <div className="text-center max-w-4xl mx-auto py-4">
                        <h2 className="font-serif text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-normal leading-tight text-[#2D3A2F] tracking-tight">
                          Our Collection
                        </h2>
                      </div>

                      {/* Catalog core grid showing all soaps */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PRODUCTS.map((p) => (
                          <ProductCard
                            key={p.id}
                            product={p}
                            onSelect={setSelectedProduct}
                          />
                        ))}
                      </div>

                    </div>
                  </section>

                  {/* EDITORIAL STORY: WHY YOUR SKIN DESERVES THE BEST */}
                  <section className="py-24 bg-[#F9F7F2] border-t border-[#E5DEC1]/30">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-16">

                      {/* Header Title with review rating */}
                      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-[#E5DEC1]/55 pb-10">
                        <div className="space-y-4 max-w-2xl">
                          <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[64px] font-normal leading-[1.08] text-[#2D3A2F] tracking-tight text-left">
                            Why Your Skin <br />
                            <span className="italic">Deserves the Best</span>
                          </h2>
                        </div>

                        {/* Reviews block */}
                        <div className="flex flex-col items-start md:items-end gap-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400 stroke-[1]" />
                            ))}
                          </div>
                          <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-neutral-400">
                            4.7 (1,109 reviews)
                          </span>
                          {/* Overlapping small circular models review stickers */}
                          <div className="flex items-center -space-x-2 mt-1">
                            <img
                              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              alt="Reviewer 1"
                            />
                            <img
                              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80"
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              alt="Reviewer 2"
                            />
                            <img
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              alt="Reviewer 3"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content Grid Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Left column large card with skin model and floating card */}
                        <div className="lg:col-span-6 relative rounded-[32px] overflow-hidden min-h-[500px] shadow-sm flex items-end">
                          <img
                            src="https://images.unsplash.com/photo-1552046122-03184de85e08?w=900&auto=format&fit=crop&q=80"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            alt="Skincare face beauty close-up"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                          {/* Floating Proven Card */}
                          <div className="relative z-10 glass m-6 sm:m-8 p-6 rounded-[24px] max-w-sm border border-white/60 shadow-xl backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#2D3A2F]/10 flex items-center justify-center text-[#2D3A2F]">
                                <Shield className="w-4 h-4 stroke-[2]" />
                              </div>
                              <span className="font-sans text-xs tracking-widest font-bold text-[#2D3A2F] uppercase">
                                Proven
                              </span>
                            </div>
                            <h3 className="font-serif text-2xl font-light text-[#2D3A2F] leading-tight mb-2 text-left">
                              Proven <br />
                              <span className="italic">Effectiveness</span>
                            </h3>
                            <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed text-left">
                              Every product is carefully crafted to meet the highest quality standards.
                            </p>
                          </div>
                        </div>

                        {/* Right column with stack of two unique cards */}
                        <div className="lg:col-span-6 flex flex-col gap-6">
                          
                          {/* Top Card: Eco-Friendly Packaging (Warm Grey/Beige) */}
                          <div className="bg-[#ECEAE4] rounded-[32px] p-8 flex flex-col sm:flex-row justify-between items-center relative overflow-hidden flex-1 shadow-sm min-h-[240px]">
                            <div className="space-y-4 max-w-sm z-10 text-left">
                              <div className="w-10 h-10 rounded-full bg-[#2D3A2F]/5 flex items-center justify-center text-[#2D3A2F]">
                                <Recycle className="w-5 h-5 stroke-[1.5]" />
                              </div>
                              <h3 className="font-serif text-3xl font-light text-[#2D3A2F] leading-tight">
                                Eco-Friendly <br />
                                <span className="italic">Packaging</span>
                              </h3>
                              <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed max-w-[280px]">
                                Eco-friendly materials designed to care for the planet as much as your skin.
                              </p>
                            </div>

                            {/* Dropper product mockup centered on right side */}
                            <div className="relative w-44 h-44 sm:h-full flex items-center justify-center z-10">
                              <img
                                src="https://images.unsplash.com/photo-1608248597481-496100c80836?w=350&auto=format&fit=crop&q=80"
                                className="w-auto h-48 object-contain drop-shadow-lg filter brightness-105"
                                alt="Eco dropper bottle"
                              />
                            </div>
                          </div>

                          {/* Bottom Card: 100% Natural (Forest Green) */}
                          <div className="bg-[#2D3A2F] text-white rounded-[32px] p-8 flex flex-col sm:flex-row gap-8 justify-between items-center flex-1 shadow-sm min-h-[240px]">
                            {/* Left part: leaf closeup cutout */}
                            <div className="relative w-40 h-40 rounded-full overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 p-2">
                              <img
                                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300&auto=format&fit=crop&q=80"
                                className="w-full h-full object-cover rounded-full"
                                alt="Leaf detail"
                              />
                            </div>

                            {/* Right part: copy and dynamic specs list */}
                            <div className="space-y-4 flex-1 text-left z-10">
                              <h3 className="font-serif text-3xl font-light text-white leading-tight">
                                100% Natural <br />
                                <span className="italic text-emerald-200/90">100% You</span>
                              </h3>
                              
                              <ul className="space-y-2.5 pt-2">
                                <li className="flex items-center gap-2.5 font-sans text-xs text-neutral-200 font-light">
                                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 text-[10px]">🧪</span>
                                  No Harsh Chemicals
                                </li>
                                <li className="flex items-center gap-2.5 font-sans text-xs text-neutral-200 font-light">
                                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 text-[10px]">🌿</span>
                                  Plant-Based Goodness
                                </li>
                                <li className="flex items-center gap-2.5 font-sans text-xs text-neutral-200 font-light">
                                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 text-[10px]">👥</span>
                                  Ethically Sourced
                                </li>
                              </ul>
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>
                  </section>



                  {/* INTEGRATED HERITAGE TIMELINE */}
                  <div className="border-t border-stone-200/40">
                    <OurStorySection />
                  </div>

                  {/* INTEGRATED AESTHETIC INQUIRY FORM */}
                  <div className="border-t border-stone-200/40 bg-[#FAF5EE]/30 py-8">
                    <InquiryPage onBackToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
                  </div>

                </div>
              )}

              {/* SCREEN 2: Catalog Range Grid */}
              {currentScreen === 'range' && (
                <section id="catalog-section" className="py-24 bg-[#F5F2EB]/50 min-h-[90vh]">
                  <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-16">

                    {/* Header Title in large font */}
                    <div className="text-center max-w-4xl mx-auto py-4">
                      <h2 className="font-serif text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-normal leading-tight text-[#2D3A2F] tracking-tight">
                        Our Collection
                      </h2>
                    </div>

                    {/* Catalog core grid showing all soaps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {PRODUCTS.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          onSelect={setSelectedProduct}
                        />
                      ))}
                    </div>

                  </div>
                </section>
              )}

              {/* SCREEN 3: The Craft lab visualization */}
              {currentScreen === 'craft' && (
                <TheCraftVisualizer />
              )}

              {/* SCREEN 4: Our Story timelines */}
              {currentScreen === 'story' && (
                <OurStorySection />
              )}

              {/* SCREEN 5: Dedicated B2B Inquiry Apple Form Page */}
              {currentScreen === 'inquire' && (
                <InquiryPage onBackToHome={() => {
                  setScreen('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} />
              )}

              {/* SCREEN 6: Admin Dashboard page */}
              {currentScreen === 'admin' && (
                <AdminDashboard onBackToHome={() => {
                  setScreen('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} />
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* EXPANDED INTERACTIVE DRAWERS */}
      <AnimatePresence>
        {/* Storyteller Immersive Experience Modal */}
        {storyProduct && (
          <StorytellerModal
            product={storyProduct}
            onClose={() => setStoryProduct(null)}
            onInquire={() => {
              setStoryProduct(null);
              setScreen('inquire');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Product Details Drawer panel */}
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onProductSelect={setSelectedProduct}
            onInquire={() => {
              setSelectedProduct(null);
              setScreen('inquire');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Search Input catalog popup */}
        {searchOpen && (
          <SearchModal
            onClose={() => setSearchOpen(false)}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {/* Inquiry customized consultation drawer */}
        {inquiryOpen && (
          <InquiryModal
            onClose={() => setInquiryOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* METICULOUS FOOTER DESIGN (Mockup Matching Redesign) */}
      {!loading && (
        <footer className="bg-[#F5F2EB] text-[#1C1B1B] pt-16 pb-10 px-6 md:px-20 select-none">
          <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-between gap-12">

            {/* Giant Brand Logo Text */}
            <div className="w-full text-center py-6">
              <h2 className="font-sans font-extrabold text-[12vw] tracking-tighter leading-none text-[#1C1B1B] m-0 select-none uppercase">
                SOUL VIVA
              </h2>
            </div>

            {/* Mandatory Footer Information Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-[#E5DEC1]/60 pt-10 text-neutral-800 font-sans text-sm md:text-[15px]">
              {/* Column 1: Contact & Address */}
              <div className="space-y-4 text-left">
                <h4 className="font-bold uppercase tracking-wider text-neutral-800 text-[11px] md:text-[13px]">Corporate Office</h4>
                <p className="leading-relaxed font-normal text-neutral-700">
                  Belleaves Private Limited<br />
                  D 9, Ground Floor, Sector 3,<br />
                  Noida, Uttar Pradesh 201301, India
                </p>
                <div className="pt-1.5 space-y-1.5 text-neutral-700 font-normal">
                  <p>
                    Email: <a href="mailto:reach.us@soulviva.in" className="hover:text-black transition-colors font-semibold border-b-2 border-neutral-300 hover:border-black">reach.us@soulviva.in</a>
                  </p>
                  <p>
                    Tel: <a href="tel:+919773778579" className="hover:text-black transition-colors font-semibold">+91 97737 78579</a>
                  </p>
                  <p>
                    Web: <a href="https://www.soulviva.in" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-semibold border-b-2 border-neutral-300 hover:border-black">www.soulviva.in</a>
                  </p>
                </div>
              </div>

              {/* Column 2: Brand Credentials */}
              <div className="space-y-4 text-left">
                <h4 className="font-bold uppercase tracking-wider text-neutral-800 text-[11px] md:text-[13px]">Registrations & Certifications</h4>
                <ul className="grid grid-cols-1 gap-2.5 text-neutral-700 font-normal">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-500"></span>
                    IEC Registered
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-500"></span>
                    GS1 India Barcodes Registered
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-500"></span>
                    Udyam MSME Registered
                  </li>
                  <li className="flex items-center gap-2 font-medium text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    Dermatologically Tested
                  </li>
                </ul>
              </div>

              {/* Column 3: Legal & Origins */}
              <div className="space-y-4 text-left">
                <h4 className="font-bold uppercase tracking-wider text-neutral-800 text-[11px] md:text-[13px]">Origin & Trademarks</h4>
                <p className="leading-relaxed font-normal text-neutral-700">
                  Soul Viva is a brand of Belleaves Private Limited.
                </p>
                <p className="leading-relaxed font-normal text-neutral-700">
                  Soul Viva is a registered trademark of Belleaves Pvt. Ltd.
                </p>
                <p className="leading-relaxed font-normal text-neutral-700">
                  Manufactured in India. All rights reserved.
                </p>
              </div>
            </div>

            {/* Bottom Row bar */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#E5DEC1]/60 pt-8 text-neutral-600 font-sans text-xs md:text-sm">

              {/* Left links (Capsules matching image) */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Legal', 'T&Cs', 'Safety', 'Cookies', 'Support', 'Admin Portal'].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      if (link === 'Support') {
                        window.location.hash = 'inquire';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (link === 'Admin Portal') {
                        window.location.hash = 'admin';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        alert(`${link} documentation is detailed inside our B2B formulation handbook.`);
                      }
                    }}
                    className="border-2 border-[#DCD5C5] hover:border-black text-neutral-700 hover:text-black rounded-full px-5 py-2 text-[10px] md:text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer bg-white/20 hover:bg-white/60"
                  >
                    {link}
                  </button>
                ))}
              </div>

              {/* Center Copyright & Back to Top */}
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-[10px] md:text-xs tracking-wider uppercase font-semibold text-neutral-500 text-center">
                  &copy; 2026 Belleaves Private Limited.
                </span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-[10px] md:text-xs tracking-widest uppercase text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 transition-colors cursor-pointer border-b border-transparent hover:border-purple-800 pb-0.5"
                >
                  Back to top ↑
                </button>
              </div>

              {/* Right Authorized Badge (Matches image color exactly) */}
              <div className="flex items-center gap-2.5 text-[10px] md:text-xs tracking-wider">
                <span className="font-sans text-[10px] uppercase font-bold text-neutral-400">AUTHORIZED BY</span>
                <span className="bg-[#EAD9EC] border border-[#DCBFDE]/50 text-[#6B2E76] px-4 py-2 rounded font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold shadow-xs">
                  SOUL VIVA OPS
                </span>
              </div>

            </div>

          </div>
        </footer>
      )}

    </div>
  );
}

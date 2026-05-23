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
  Layers
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
import StorytellerModal from './components/StorytellerModal';

export default function App() {
  // Screens state
  const [loading, setLoading] = useState(true);
  const [currentScreen, setScreen] = useState<'home' | 'range' | 'craft' | 'story' | 'inquire'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [storyProduct, setStoryProduct] = useState<Product | null>(null);

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState('');
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
        <Header
          currentScreen={currentScreen}
          setScreen={setScreen}
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />
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
                  <section id="hero-section" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                    {/* Floating ambient canvas glows */}
                    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                      <div className="absolute top-[20%] left-[15%] w-[45vw] h-[45vw] bg-sky-100/35 rounded-full blur-3xl mix-blend-multiply animate-slow-pan" />
                      <div className="absolute bottom-[20%] right-[15%] w-[35vw] h-[35vw] bg-teal-50/40 rounded-full blur-3xl mix-blend-multiply animate-slow-pan" style={{ animationDelay: '3s' }} />
                    </div>

                    <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      
                      {/* Left title area */}
                      <div className="flex flex-col justify-center max-w-xl text-left space-y-6 md:space-y-8 order-2 md:order-1 pt-10 md:pt-0">
                        <span className="font-sans text-[10px] tracking-[0.3em] text-neutral-400 font-bold uppercase block">
                          The Art of Cleansing
                        </span>
                        
                        <h1 className="font-sans text-[42px] md:text-[76px] font-light leading-none tracking-tight text-neutral-900 pr-5">
                          Pure Clarity.<br />Absolute Indulgence.
                        </h1>

                        <p className="font-sans text-sm md:text-base text-neutral-500 font-light max-w-md leading-relaxed">
                          Experience the sensorial luxury of a perfectly transparent gel bar. Formulated to mimic the clarity of water while delivering profound skin-identical hydration.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                          <button
                            onClick={() => {
                              setScreen('range');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="bg-brand-dark hover:bg-neutral-800 text-white px-8 py-4 font-sans text-xs tracking-widest rounded-full uppercase transition-all duration-300 shadow-sm active:scale-98 cursor-pointer"
                          >
                            Explore Collection
                          </button>
                          <button
                            onClick={() => {
                              setScreen('craft');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="glass border border-neutral-200 text-brand-dark px-8 py-4 font-sans text-xs tracking-widest rounded-full uppercase transition-all duration-300 hover:bg-white active:scale-98 cursor-pointer"
                          >
                            Our Process
                          </button>
                        </div>
                      </div>

                      {/* Right 3D Visual Frame */}
                      <div className="order-1 md:order-2 relative h-[450px] md:h-[650px] flex items-center justify-center">
                        <div className="relative w-full h-full max-w-md mx-auto animate-float flex items-center justify-center">
                          {/* Main 3D model placeholder render provided as hotlink */}
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgLtfqgmWlshLIfTTyZkhoAuDw8CsmWZYPgzsJt4TdSQqcvfnSGQldGjeKvXN5FHKFmges0x3gEl7NL1sWQz2pwUupDs4pPHAgM056N-HyAy6pHoTeJQkHdMI93XfVo9teySungi2v6GcwstJK_NVt1wL3i7LUKi5GEm_5E9T-oOr9iORt6A0uSPLcBmBIYzY3ig4cWqt3T4WajhH9_6zYz_ZEgvMPogd7RHAVusvcINLGRdcSWAyORY24zYQO8LSLCxA04Mc2MCM"
                            alt="Transparent crystalline bar"
                            className="w-80 h-80 md:w-full md:h-full object-contain drop-shadow-[0_25px_60px_rgba(56,189,248,0.25)] select-none opacity-90 pointer-events-none rounded-3xl"
                            style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                          />
                          {/* Liquid glass light reflections ring shadow */}
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-sky-200/25 rounded-full blur-xl pointer-events-none" />
                        </div>
                      </div>

                    </div>
                  </section>

                  {/* CAROUSEL RANGE: Discover fragrance line up */}
                  <Carousel
                    products={PRODUCTS.filter((p) => p.id !== 'crystal-clarity')}
                    onSelectProduct={setStoryProduct}
                  />

                  {/* FORMULATED ASYMMETRIC STORY SECTION */}
                  <section className="py-24 bg-brand-light">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      
                      <div className="lg:col-span-12 xl:col-span-5 lg:col-start-1 space-y-6 order-2 lg:order-1">
                        <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase block">
                          Formulation Standards
                        </span>
                        <h2 className="font-sans text-3xl md:text-5xl font-light tracking-tight text-neutral-900 leading-none">
                          Formulated <br />for Purity.
                        </h2>
                        <p className="font-sans text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-md">
                          Our unique high-viscosity gel structure is designed to cleanse gently while drawing moisture deeply into the skin, leaving a lasting, serene sensation.
                        </p>
                        
                        <div className="pt-4">
                          <button
                            onClick={() => {
                              setScreen('craft');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-brand-dark uppercase tracking-widest border-b border-brand-dark/25 pb-1 hover:border-brand-dark transition-all duration-300 cursor-pointer"
                          >
                            Read the Science <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>

                      {/* Ripple visual macro circle */}
                      <div className="lg:col-span-12 xl:col-span-6 lg:col-start-7 order-1 lg:order-2 relative flex items-center justify-center">
                        <div className="aspect-square w-full max-w-lg bg-white/40 border border-neutral-100/50 rounded-full p-4 overflow-hidden relative mix-blend-multiply flex items-center justify-center shadow-inner">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9dD0QuaWEX2tN8_NKp5Xg1pqqWPg2AIkbqFJT03E3zWRzzuV4i98UY-1j-LnDOpnrTXFfu4dpL1ywAAgDYR9VTUhF7UgMNJVq0iLAqNpwJ_ZqyjcncEfikTH64PH4s86b0qdJs2z6PjHiyDCnTzvc_HtEuRwcJH6Q2TESeaBVM4mFFVbDsTl3M_-mbnYHShHK-CBM3_XwWjFbMDPT2_CyyboeenIwwxv6m2ECiEtQuXZGkOyyb7FQMh6FlnSUBciKofLf1KT-tEg"
                            alt="Macro ripple water"
                            className="w-full h-full object-cover opacity-80 rounded-full"
                          />
                        </div>

                        {/* Overlapping glass card on left */}
                        <div className="absolute bottom-[8%] left-[-10px] md:left-[-30px] lg:left-0 z-20 glass p-6 rounded-2xl max-w-[240px] shadow-lg border border-white/60">
                          <Droplet className="w-5 h-5 text-neutral-500 mb-2.5 stroke-[1.5]" />
                          <h4 className="font-sans text-sm font-semibold text-neutral-800 mb-1">
                            Deep Hydration
                          </h4>
                          <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                            Infused with natural triple-purified glycerin to lock in trans-epidermal moisture.
                          </p>
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
                <section id="catalog-section" className="py-16 bg-neutral-50/40 min-h-[80vh]">
                  <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-12">
                    
                    {/* Header display */}
                    <div className="text-center max-w-xl mx-auto space-y-3">
                      <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase block select-none">
                        THE EXPERIENTIAL VAULT
                      </span>
                      <h2 className="font-sans text-3xl md:text-4xl font-light tracking-tight text-neutral-900 leading-none">
                        Complete Ritual Range
                      </h2>
                      <div className="w-16 h-[1px] bg-brand-dark/15 mx-auto" />
                      <p className="font-sans text-xs text-neutral-500 leading-relaxed font-light">
                        Browse our micro-batch hand-poured transparency formula line. Complete with premium organic extracts and customizable wellness housing.
                      </p>
                    </div>

                    {/* Filter toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/70 backdrop-blur-md p-4 px-6 rounded-2xl border border-neutral-100 shadow-sm">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
                        <span className="text-neutral-400 font-medium flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-semibold select-none">
                          <Filter className="w-3.5 h-3.5" /> Filters
                        </span>
                        
                        {/* Skin Type selector */}
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-400 font-light">Skin:</span>
                          <select
                            value={filterSkinType}
                            onChange={(e) => setFilterSkinType(e.target.value)}
                            className="bg-transparent border-neutral-200/60 font-medium text-neutral-600 rounded-lg py-1 px-2 hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-brand-dark focus:border-brand-dark"
                          >
                            <option value="all">All Skins</option>
                            <option value="sensitive">Sensitive</option>
                            <option value="dry">Dry / Dehydrated</option>
                            <option value="combination">Combination</option>
                          </select>
                        </div>

                        {/* Scent note search filter */}
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-400 font-light">Scent Accent:</span>
                          <select
                            value={filterScent}
                            onChange={(e) => setFilterScent(e.target.value)}
                            className="bg-transparent border-neutral-200/60 font-medium text-neutral-600 rounded-lg py-1 px-2 hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-brand-dark focus:border-brand-dark"
                          >
                            <option value="all">Any Scent</option>
                            {allAvailableScents.map((scent) => (
                              <option key={scent} value={scent}>{scent}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Catalog core grid */}
                    {filteredProducts.length === 0 ? (
                      <div className="py-20 text-center space-y-3 bg-white/40 rounded-3xl border border-dashed border-neutral-200">
                        <span className="font-sans text-neutral-400 block text-xs">No Formulations Match Your Current Filter Selection.</span>
                        <button
                          onClick={() => {
                            setFilterSkinType('all');
                            setFilterScent('all');
                          }}
                          className="bg-brand-dark text-white font-sans text-[10px] tracking-widest uppercase px-5 py-2 rounded-full cursor-pointer"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((p) => (
                          <ProductCard
                            key={p.id}
                            product={p}
                            onSelect={setSelectedProduct}
                          />
                        ))}
                      </div>
                    )}

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

      {/* METICULOUS FOOTER DESIGN */}
      {!loading && (
        <footer className="bg-black text-white py-16 px-6 md:px-20 border-t border-neutral-800">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm leading-relaxed">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <span className="font-sans text-xs tracking-[0.3em] font-bold text-white/90 uppercase block select-none">
                SOUL VIVA
              </span>
              <p className="font-sans text-xs text-neutral-400 font-light max-w-xs leading-relaxed">
                Experience the sensorial luxury of a perfectly transparent gel bar. Formulated to mimic the clarity of water while delivering profound hydration.
              </p>
              <div className="font-sans text-[11px] text-neutral-500 font-light tracking-wide pt-2">
                &copy; 2026 SOUL VIVA. All Pure Rights Reserved.
              </div>
            </div>

            {/* Column 2: Clinical Commitments list */}
            <div className="space-y-4">
              <span className="font-sans text-xs tracking-widest font-bold text-white/90 uppercase block select-none">
                OUR COMMITMENTS
              </span>
              <ul className="space-y-2 text-xs font-sans text-neutral-400 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Dermatologically Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>100% Cruelty Free & Vegan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <span>Zero Parabens or Silicones</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>Ethically harvested distillates</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Site map layout */}
            <div className="space-y-4">
              <span className="font-sans text-xs tracking-widest font-bold text-white/90 uppercase block select-none">
                NAVIGATION
              </span>
              <div className="flex flex-col gap-2.5 font-sans text-xs text-neutral-400 font-light">
                <button
                  onClick={() => { setScreen('range'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  Explore Collection <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </button>
                <button
                  onClick={() => { setScreen('craft'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  Spectroscopic Science <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </button>
                <button
                  onClick={() => { setScreen('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  Heritage & Timeline <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </button>
                <button
                  onClick={() => { setScreen('inquire'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  Hospitality B2B Inquire <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </button>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-4">
              <span className="font-sans text-xs tracking-widest font-bold text-white/90 uppercase block select-none">
                SANCTUARY NEWSLETTER
              </span>
              <p className="font-sans text-xs text-neutral-400 font-light font-light">
                Join our sanctuary for exclusive capsule releases, clinical formulations and slow craft diaries.
              </p>
              
              {newsletterSubscribed ? (
                <div className="h-11 flex items-center gap-2.5 text-[11px] font-sans text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-900/40 px-4 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sanctuary access activated. welcome.</span>
                </div>
              ) : (
                <div className="flex border-b border-neutral-700 pb-2 focus-within:border-white transition-colors pt-2 h-11 items-center">
                  <input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className="bg-transparent border-none outline-none focus:ring-0 w-full font-sans text-xs text-white placeholder:text-neutral-500 pr-2"
                  />
                  <button
                    onClick={() => {
                      if (newsEmail.trim()) {
                        setNewsletterSubscribed(true);
                      }
                    }}
                    className="text-white hover:opacity-80 cursor-pointer p-1 rounded-full hover:bg-neutral-800"
                    aria-label="Subscribe"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </footer>
      )}

    </div>
  );
}

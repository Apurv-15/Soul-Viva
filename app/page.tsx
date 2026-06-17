"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
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
  Leaf,
  ChevronDown,
  Instagram
} from 'lucide-react';

import { Product } from '../src/types';
import { PRODUCTS } from '../src/data';
import LoadingScreen from '../src/components/LoadingScreen';
import Header from '../src/components/Header';
import ProductCard from '../src/components/ProductCard';
import ProductDetailsModal from '../src/components/ProductDetailsModal';
import SearchModal from '../src/components/SearchModal';
import InquiryModal from '../src/components/InquiryModal';
import TheCraftVisualizer from '../src/components/TheCraftVisualizer';
import OurStorySection from '../src/components/OurStorySection';
import BrandIntro from '../src/components/BrandIntro';
import InquiryPage from '../src/components/InquiryPage';
import StorytellerModal from '../src/components/StorytellerModal';
import GradualBlur from '../src/components/GradualBlur';
import AdminDashboard from '../src/components/AdminDashboard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function App() {
  // Screens state
  const [loading, setLoading] = useState(true);
  const [currentScreen, setScreen] = useState<'home' | 'range' | 'craft' | 'story' | 'inquire' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [storyProduct, setStoryProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  // Hero section ref and motion values
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 15 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(ySpring, y => -y * 0.15);
  const rotateY = useTransform(xSpring, x => x * 0.15);

  const scale = useMotionValue(1.0);
  const brightness = useMotionValue(1.0);

  const scaleSpring = useSpring(scale, springConfig);
  const brightnessSpring = useSpring(brightness, springConfig);
  const filterString = useTransform(brightnessSpring, b => `brightness(${b})`);

  // Base image subtle transforms (creates deep parallax depth separation)
  const baseTranslateX = useTransform(xSpring, x => x * 0.25);
  const baseTranslateY = useTransform(ySpring, y => y * 0.25);
  const baseRotateX = useTransform(ySpring, y => -y * 0.05);
  const baseRotateY = useTransform(xSpring, x => x * 0.05);
  const baseScale = useTransform(scaleSpring, s => 1 + (s - 1) * 0.3);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate relative mouse position from center (-0.5 to 0.5)
    const relativeX = (event.clientX - rect.left) / width - 0.5;
    const relativeY = (event.clientY - rect.top) / height - 0.5;

    // Multiply by 40 to get ±20px range
    mouseX.set(relativeX * 40);
    mouseY.set(relativeY * 40);

    scale.set(1.02);
    brightness.set(1.05);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1.0);
    brightness.set(1.0);
  };

  // Initialize GSAP ScrollSmoother
  useEffect(() => {
    if (loading) return;

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      smoother.kill();
    };
  }, [loading, currentScreen]);

  // Restore scroll position when closing modal and refresh ScrollTrigger
  const lastScrollPos = useRef(0);
  const hashSynced = useRef(false);
  
  useEffect(() => {
    if (selectedProduct) {
      lastScrollPos.current = window.scrollY;
      window.scrollTo(0, 0);
    } else {
      const timer = setTimeout(() => {
        window.scrollTo(0, lastScrollPos.current);
      }, 80);
      return () => clearTimeout(timer);
    }
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(refreshTimer);
  }, [selectedProduct]);

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
      hashSynced.current = true;
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial sync
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [loading]);

  // Sync state changes back to Hash to keep URL updated (enables browser back/forward)
  useEffect(() => {
    if (loading || !hashSynced.current) return;

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
            setScreen={(screen) => {
              setSelectedProduct(null);
              setScreen(screen);
            }}
            onOpenInquiry={() => setInquiryOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
          />
          <GradualBlur position="bottom" height="8.5rem" strength={2.0} />
        </>
      )}

      {/* GSAP ScrollSmoother wrappers */}
      <div id="smooth-wrapper" className="w-full flex-1 flex flex-col">
        <div id="smooth-content" className="w-full flex-1 flex flex-col">
          <div data-lag="0.5" className={selectedProduct ? "hidden" : "w-full flex-1 flex flex-col"}>
            {/* Dynamic Content Frame */}
            <main className={`flex-1 ${currentScreen === 'home' ? '' : 'pt-20'}`}>
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
                  <section 
                    id="hero-section" 
                    ref={heroRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative min-h-[95vh] h-[95vh] md:h-screen w-full flex items-center justify-start overflow-hidden bg-[#F5F2EB]"
                    style={{ perspective: 1200 }}
                  >
                    {/* Background Images with 3D Parallax Hover Effect */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                      {/* Base Image (subtle movement) */}
                      <motion.img
                        src="/Hero_page/base.jpeg"
                        alt="Soul Viva Hero Base"
                        className="w-full h-full object-cover"
                        style={{
                          x: baseTranslateX,
                          y: baseTranslateY,
                          rotateX: baseRotateX,
                          rotateY: baseRotateY,
                          scale: baseScale,
                        }}
                      />
                      {/* Floating Overlay (moves with mouse + keyframe float) */}
                      <div className="absolute inset-0 w-full h-full animate-hero-float">
                        <motion.img
                          src="/Hero_page/hover.png"
                          alt="Soul Viva Hero Overlay"
                          className="w-full h-full object-cover origin-center"
                          style={{
                            x: xSpring,
                            y: ySpring,
                            rotateX,
                            rotateY,
                            scale: scaleSpring,
                            filter: filterString,
                          }}
                        />
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

                    {/* Scroll Down Indicator */}
                    <div 
                      onClick={() => {
                        const catalog = document.getElementById('catalog-section');
                        if (catalog) {
                          catalog.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group bg-[#F5F2EB]/50 hover:bg-[#F5F2EB]/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#E5DEC1]/50 shadow-md transition-all duration-300 active:scale-95"
                    >
                      <span className="text-[10px] tracking-[0.25em] text-[#2D3A2F] uppercase font-sans font-bold transition-colors duration-300">Scroll Down</span>
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className="text-[#2D3A2F]"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </section>

                  {/* BRAND INTRODUCTION SECTION */}
                  <BrandIntro />

                  {/* COMPLETE RITUAL RANGE (CATALOG GRID SECTION) */}
                  <section id="catalog-section" className="pt-2 pb-12 md:pt-4 md:pb-16 bg-[#F5F2EB]/50">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-8">

                      {/* Header Title in large font */}
                      <div className="text-center max-w-4xl mx-auto py-4">
                        <h2 className="font-serif text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-normal leading-tight text-[#2D3A2F] tracking-tight">
                          Our Collection
                        </h2>
                      </div>

                      {/* Catalog core grid showing all soaps */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

                </div>
              )}

              {/* SCREEN 2: Catalog Range Grid */}
              {currentScreen === 'range' && (
                <section id="catalog-section" className="pt-2 pb-12 md:pt-4 md:pb-16 bg-[#F5F2EB]/50">
                  <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-8">

                    {/* Header Title in large font */}
                    <div className="text-center max-w-4xl mx-auto py-4">
                      <h2 className="font-serif text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-normal leading-tight text-[#2D3A2F] tracking-tight">
                        Our Collection
                      </h2>
                    </div>

                    {/* Catalog core grid showing all soaps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

              {/* SCREEN 4: About Us section */}
              {currentScreen === 'story' && (
                <div className="space-y-0">
                  <BrandIntro />
                  <OurStorySection />
                </div>
              )}

              {/* SCREEN 5: Dedicated B2B Contact Us Apple Form Page */}
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

      {/* METICULOUS FOOTER DESIGN (Mockup Matching Redesign) */}
      {!loading && (
        <footer className="bg-[#F5F2EB] text-[#1C1B1B] pt-16 pb-10 px-6 md:px-20 select-none">
          <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-between gap-12">

            {/* Giant Brand Logo Text */}
            <div className="w-full text-center py-6">
              <h2 className="m-0 select-none text-[12vw] leading-none text-[#1C1B1B]">
                <span className="font-serif font-normal tracking-tight uppercase">SOUL</span>
                <span className="font-sans font-light tracking-wide uppercase ml-[0.25em]">VIVA</span>
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
                {['Support', 'Admin Portal'].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      if (link === 'Support') {
                        window.location.hash = 'inquire';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (link === 'Admin Portal') {
                        window.location.hash = 'admin';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="border-2 border-[#DCD5C5] hover:border-black text-neutral-700 hover:text-black rounded-full px-5 py-2 text-[10px] md:text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer bg-white/20 hover:bg-white/60"
                  >
                    {link}
                  </button>
                ))}
              </div>

              {/* Center Copyright & Back to Top */}
              <div className="flex flex-col items-center justify-center gap-2 md:ml-auto">
                <a 
                  href="https://www.instagram.com/soulvivaskin/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-[#E1306C] transition-colors mb-1"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                </a>
                <span className="text-[10px] md:text-xs tracking-wider uppercase font-semibold text-neutral-500 text-center">
                  &copy; 2026 Belleaves Private Limited.
                </span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-[10px] md:text-xs tracking-widest uppercase text-[#2D3A2F] hover:text-black font-bold flex items-center gap-1 transition-colors cursor-pointer border-b border-transparent hover:border-black pb-0.5"
                >
                  Back to top ↑
                </button>
              </div>

            </div>

          </div>
        </footer>
      )}

          </div>

          {/* Product Details overlay inside smooth-content */}
          <AnimatePresence>
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
                setScreen={setScreen}
              />
            )}
          </AnimatePresence>

        </div>
      </div>

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

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Clock, 
  Droplet, 
  ArrowUpRight 
} from 'lucide-react';
import { Product } from '../types';

interface CarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function Carousel({ products, onSelectProduct }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  // Helper to calculate true absolute top of the container relative to the document
  const getAbsoluteTop = () => {
    if (!containerRef.current) return 0;
    let top = 0;
    let el: HTMLElement | null = containerRef.current;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent as HTMLElement | null;
    }
    return top;
  };

  // Set up window scroll listener to track precise scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the top of the container has scrolled past the top of the viewport
      const scrolled = -rect.top;
      const totalScrollableDistance = sectionHeight - viewportHeight;
      
      if (totalScrollableDistance <= 0) return;
      
      // Clamp progress between 0 and 1
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
      
      // Map progress to active product index
      const index = Math.max(0, Math.min(
        Math.floor(progress * products.length),
        products.length - 1
      ));
      
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial compute
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [products.length]);

  // Handle high-precision step-by-step scroll wheel snapping when carousel is sticky
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;
      
      // Only capture wheel snapping when the section occupies the sticky viewport
      const rect = containerRef.current.getBoundingClientRect();
      const isSticky = rect.top <= 20 && rect.bottom >= window.innerHeight - 20;
      
      if (!isSticky) return;

      // Filter out micro scrolls or kinetic inertias below 15
      if (Math.abs(e.deltaY) < 15) return;

      const now = Date.now();
      const timeElapsed = now - lastScrollTime.current;
      const isCooldown = timeElapsed < 600; // Perfect snappiness matching smooth scroll duration (600ms)

      if (e.deltaY > 0) {
        // User scrolls down
        if (activeIndex < products.length - 1) {
          e.preventDefault();
          if (!isCooldown) {
            lastScrollTime.current = now;
            scrollToIndex(activeIndex + 1);
          }
        }
      } else if (e.deltaY < 0) {
        // User scrolls up
        if (activeIndex > 0) {
          e.preventDefault();
          if (!isCooldown) {
            lastScrollTime.current = now;
            scrollToIndex(activeIndex - 1);
          }
        }
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeIndex, products.length]);

  const currentProduct = products[activeIndex] || products[0];

  // Map product categories to luxury classifications
  const getSubclass = (id: string) => {
    switch (id) {
      case 'shea-honey':
        return 'ORGANIC LIPID NOURISHMENT';
      case 'mandarin-peach':
        return 'EFFERVESCENT VITAMIN RITUAL';
      case 'lavender-currant':
        return 'THERAPEUTIC TWILIGHT CALM';
      default:
        return 'ESSENTIAL SANCTUARY FORMULA';
    }
  };

  // Smooth scroll handler to target precise index within the sticky track using static positions
  const scrollToIndex = (idx: number) => {
    if (!containerRef.current) return;
    const absoluteTop = getAbsoluteTop();
    const sectionHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollableDistance = sectionHeight - viewportHeight;
    
    // Calculate ratio
    const scrollRatio = idx / (products.length - 1);
    const targetScrollY = absoluteTop + (scrollRatio * totalScrollableDistance);
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + products.length) % products.length;
    scrollToIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % products.length;
    scrollToIndex(nextIndex);
  };

  // Custom refined transition animations for high-end text changes
  const textVariants = {
    enter: { opacity: 0, y: 35 },
    center: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as any }
    },
    exit: { 
      opacity: 0, 
      y: -25,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section 
      id="range-carousel-section" 
      ref={containerRef}
      className="relative text-neutral-900 border-b border-stone-200/40 bg-[#FAF5EE]"
      style={{ height: `${products.length * 100}vh` }} // Dynamic proportional track based on product count
    >
      {/* Absolute micro background grid lines to anchor the editorial feel */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#EFE8DE_1px,transparent_1px),linear-gradient(to_bottom,#EFE8DE_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />
      
      {/* Dynamic ambient color glow that shifts behind the active formulation product */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ease-in-out opacity-[0.25] filter blur-[140px]">
        <div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full transition-all duration-1000"
          style={{ 
            background: currentProduct.id === 'shea-honey' ? '#F2DFCD' : 
                        currentProduct.id === 'mandarin-peach' ? '#FADCD2' : '#E8D5EB' 
          }}
        />
      </div>

      {/* 1. DESKTOP CINEMATIC SPLIT VIEW: Full Viewport 50/50 Section */}
      <div className="hidden lg:block sticky top-0 h-screen w-full overflow-hidden select-none">
        <div className="w-full h-full flex flex-row">
          
          {/* A. LEFT HALF: Interactive Editorial Narrative Panel (50vw) */}
          <div className="w-1/2 h-full flex flex-col justify-between p-16 xl:p-24 relative z-10 border-r border-[#EFE8DE] bg-[#FAF5EE]/40 backdrop-blur-[2px]">
            
            {/* Top Row: Delicate Section Heading (Clears header space gracefully) */}
            <div className="pt-8 border-b border-[#EFE8DE] pb-6">
              <div className="space-y-1 text-left">
                <span className="font-sans text-[10px] tracking-[0.35em] uppercase font-bold text-neutral-400 block pb-1">
                  COSMETIC SANCTUARY
                </span>
                <h2 className="font-sans text-xl font-light tracking-tight text-neutral-900">
                  Our Collection
                </h2>
              </div>
            </div>

            {/* Central Workspace: Interactive product detail with robust micro-transitions */}
            <div className="flex-grow flex flex-col justify-center py-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={textVariants}
                  className="space-y-8"
                >
                  {/* Soap Name & High Fashion Tagline */}
                  <div className="space-y-3.5">
                    <h3 className="font-sans text-[4.2rem] xl:text-[5.4rem] font-light tracking-tight text-neutral-950 leading-[1.02] -ml-1">
                      {currentProduct.name}
                    </h3>
                    <p className="font-sans text-sm xl:text-base text-neutral-500 font-light leading-relaxed max-w-lg">
                      {currentProduct.tagline}
                    </p>
                  </div>

                  {/* Technical Specifications details */}
                  <div className="flex gap-8 text-xs font-sans text-neutral-500 font-normal py-1">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-[#2B7A78] stroke-[1.5]" />
                      <span>pH {currentProduct.pHLevel.split(' ')[0]} Balanced Formula</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-neutral-300 pl-8">
                      <Clock className="w-4 h-4 text-amber-700 stroke-[1.5]" />
                      <span>{currentProduct.weight} Limited Vessel</span>
                    </div>
                  </div>

                  {/* Explore aesthetic button type */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectProduct(currentProduct)}
                      className="group relative bg-neutral-950 text-white hover:bg-neutral-800 font-sans text-xs tracking-[0.18em] uppercase px-11 py-4.5 rounded-full inline-flex items-center justify-center gap-3.5 cursor-pointer transition-all duration-300 active:scale-98 font-semibold shadow-sm overflow-hidden"
                    >
                      <span>EXPLORE AESTHETIC STORY</span>
                      <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Row: Manual controls, Scent and indicator bullets */}
            <div className="flex items-center justify-between border-t border-[#EFE8DE] pt-6">
              
              {/* Prev / Next controls */}
              <div className="flex items-center gap-3.5">
                <button
                  onClick={handlePrev}
                  className="p-3.5 rounded-full bg-white border border-[#E9E2D7] hover:border-neutral-400 hover:bg-neutral-50 text-neutral-700 hover:text-black cursor-pointer active:scale-95 transition-all duration-300 shadow-xs"
                  aria-label="Previous Batch"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleNext}
                  className="p-3.5 rounded-full bg-white border border-[#E9E2D7] hover:border-neutral-400 hover:bg-neutral-50 text-neutral-700 hover:text-black cursor-pointer active:scale-95 transition-all duration-300 shadow-xs"
                  aria-label="Next Batch"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic scroll status label */}
              <div className="flex items-center gap-2.5 select-none font-sans text-xs text-neutral-500 font-medium">
                <span className="font-extrabold uppercase text-[10px] tracking-[0.15em] text-neutral-400">ACTIVE EXPERIMENTAL CELL</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-semibold text-neutral-700 uppercase">BATCH {activeIndex + 1}</span>
              </div>

              {/* Index track bullets */}
              <div className="flex gap-3 items-center">
                <span className="font-sans font-mono text-xs text-neutral-500 mr-1.5 tracking-wide font-medium">
                  {(activeIndex + 1).toString().padStart(2, '0')} / {products.length.toString().padStart(2, '0')}
                </span>
                
                <div className="flex gap-2">
                  {products.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => scrollToIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === idx ? 'w-8 bg-neutral-900' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to item ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* B. RIGHT HALF: Full Screen Immersive Image Slider (50vw) */}
          <div className="w-1/2 h-full bg-[#EAE3DA] relative overflow-hidden">
            
            {/* Sliding Track containing full-viewport immersive background images */}
            <motion.div 
              className="w-full h-full flex flex-col"
              animate={{ y: `-${activeIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              {products.map((p, idx) => (
                <div key={p.id} className="relative w-full h-screen flex-shrink-0">
                  <img
                    src={p.bgImage}
                    alt={p.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  
                  {/* Glassy Batch tag overlay */}
                  <div className="absolute top-10 left-10 z-20">
                    <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-neutral-850 bg-white/90 backdrop-blur-md px-4.5 py-2 rounded-full border border-neutral-350/25 select-none shadow-sm block">
                      {p.badge}
                    </span>
                  </div>

                  {/* Elegant full height vertical grid overlay of light and shadows */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/[0.08] pointer-events-none" />
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>

      {/* 2. MOBILE SCENE: STACKED INTERACTION WITH IMAGES & INFO FLOWS */}
      <div className="lg:hidden max-w-[1440px] mx-auto px-6 relative z-10 w-full py-16">
        
        {/* Mobile Heading */}
        <div className="space-y-3 text-left mb-12">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-bold text-neutral-500 block">
            COSMETIC SANCTUARY
          </span>
          <h2 className="font-sans text-3xl font-light tracking-tight text-neutral-950">
            Our Collection
          </h2>
          <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed pt-1">
            Our limited capsule batches suspension-molded with high-pressure formulation techniques.
          </p>
        </div>

        {/* Stacked Products layout */}
        <div className="flex flex-col gap-12">
          {products.map((p, idx) => (
            <div 
              key={p.id}
              className="p-6 sm:p-8 rounded-3xl bg-white/40 border border-[#EFE8DE] backdrop-blur-xs space-y-6 text-left shadow-[0_10px_30px_rgba(139,115,85,0.03)]"
            >
              {/* Title & description */}
              <div className="space-y-2">
                <h3 className="font-sans text-2xl sm:text-3xl font-light tracking-tight text-neutral-950">
                  {p.name}
                </h3>
                <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                  {p.tagline}
                </p>
              </div>

              {/* High res widescreen display image frame */}
              <div className="relative aspect-[16/10] w-full bg-stone-150 rounded-2xl overflow-hidden border border-[#E9E2D7] shadow-sm">
                <img
                  src={p.bgImage}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="font-sans text-[8px] tracking-widest uppercase font-bold text-neutral-800 bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-300/30 select-none">
                    {p.badge}
                  </span>
                </div>
              </div>



              {/* Specs & CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 gap-4">
                <div className="flex gap-4 text-[10px] font-sans text-neutral-500">
                  <span className="flex items-center gap-1"><Droplet className="w-3 h-3 text-[#2B7A78]" /> pH {p.pHLevel.split(' ')[0]}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-700" /> {p.weight}</span>
                </div>
                
                <button
                  onClick={() => onSelectProduct(p)}
                  className="w-full sm:w-auto bg-neutral-950 text-white hover:bg-neutral-800 font-sans text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2.5 cursor-pointer font-bold shadow-xs"
                >
                  <span>EXPLORE AESTHETIC STORY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

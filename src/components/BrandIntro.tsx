/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Leaf, Droplet } from 'lucide-react';

export default function BrandIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section 
      id="brand-intro-section" 
      className="pt-12 pb-4 md:pt-16 md:pb-6 bg-[#FAF8F5] text-[#2D3A2F] relative overflow-hidden font-sans border-b border-[#E5DEC1]/30"
    >
      {/* Background Soft Organic Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E5DEC1]/10 rounded-full blur-3xl pointer-events-none animate-slow-pan" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#EAD9EC]/8 animate-float rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* Left Column: Typographic Hook + Parallax Floating Visual */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 flex flex-col space-y-8 text-left"
          >
            {/* Header Block */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#2D3A2F]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#2D3A2F] uppercase">
                  Who We Are
                </span>
              </div>
              
              <div className="space-y-4">
                <h2 className="font-serif text-[48px] sm:text-[60px] md:text-[72px] lg:text-[76px] font-normal leading-[0.95] tracking-tight uppercase select-none">
                  SOUL VIVA
                </h2>
                <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#2D3A2F]/90 font-normal leading-tight">
                  Transforming everyday bathing into a ritual of renewal.
                </p>
              </div>
            </div>

            {/* Premium Layered Floating Product Composition */}
            <div className="relative w-full max-w-xl mx-auto lg:mx-0 pr-12 pb-12">
              {/* BRAND ELEMENT WATERMARK (Droplet, gel-bar outline, botanical leaf) at 5% opacity */}
              <div className="absolute inset-0 -z-10 opacity-5 flex items-center justify-center pointer-events-none transform scale-125 translate-x-4 text-[#2D3A2F]">
                <svg width="450" height="450" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Droplet & Soap bar outline combination */}
                  <path d="M200 40 C110 160 100 240 100 280 C100 335 145 380 200 380 C255 380 300 335 300 280 C300 240 290 160 200 40 Z" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 4" />
                  {/* Botanical leaf path in the center */}
                  <path d="M200 120 C240 160 240 240 200 280 C160 240 160 160 200 120 Z" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M200 120 V280" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M200 160 C215 170 225 185 225 200" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M200 190 C185 200 175 215 175 230" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M200 220 C215 230 225 245 225 260" stroke="currentColor" strokeWidth="1.5" />
                  {/* Concentric luxury circles/ripple lines */}
                  <circle cx="200" cy="280" r="110" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 8" />
                  <circle cx="200" cy="280" r="130" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Luxury Scene Background Frame */}
              <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden border border-[#E5DEC1]/55 shadow-md">
                <img 
                  src="/Waterlily and Pear/Soap_packaging_in_luxury_scene_202606121132.jpeg" 
                  alt="Soul Viva Luxury Packaging Scene" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Floating 3D Packaging Box Overlay */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5.5, 
                  ease: "easeInOut" 
                }}
                className="absolute -bottom-6 -right-6 w-44 h-44 sm:w-56 sm:h-56 z-20 drop-shadow-[0_25px_40px_rgba(45,58,47,0.22)] pointer-events-none"
              >
                <img 
                  src="/Waterlily and Pear/Soul Viva - Waterlily & Pear - Front 1.png" 
                  alt="Floating Waterlily & Pear Packaging"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: High Hierarchy Story Cards */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 flex flex-col space-y-6 lg:ml-auto w-full"
          >
            {/* Story Card 1: Inspired by Nature */}
            <div className="bg-white/80 border border-[#E5DEC1]/40 rounded-[28px] p-6 md:p-8 shadow-xs hover:shadow-md hover:bg-white hover:border-[#2D3A2F]/20 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-[#F5F2EB] text-[#2D3A2F] border border-[#E5DEC1]/30">
                  <Leaf className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-serif italic text-xl md:text-2xl text-[#2D3A2F] font-semibold">
                  Inspired by Nature
                </h4>
              </div>
              <p className="font-sans text-[15px] sm:text-base text-neutral-600 leading-relaxed font-light">
                Crafted with natural extracts — mandarin, lavender, sea minerals, honey, shea, and more — each bar goes beyond cleansing. The skin-loving ingredients work with the glycerin-rich base to leave skin moisturised, nourished, and alive.
              </p>
            </div>

            {/* Story Card 2: Crafted for Skin */}
            <div className="bg-white/80 border border-[#E5DEC1]/40 rounded-[28px] p-6 md:p-8 shadow-xs hover:shadow-md hover:bg-white hover:border-[#2D3A2F]/20 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-[#F5F2EB] text-[#2D3A2F] border border-[#E5DEC1]/30">
                  <Droplet className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-serif italic text-xl md:text-2xl text-[#2D3A2F] font-semibold">
                  Crafted for Skin
                </h4>
              </div>
              <p className="font-sans text-[15px] sm:text-base text-neutral-600 leading-relaxed font-light">
                Six variants, each a different world: a burst of colour, a fragrance that transports, a lather that genuinely cares for skin. A product that gives consumers not just freshness and care, but something rarer: a reason to feel joy in the ordinary.
              </p>
            </div>

            {/* Story Card 3: Designed for Experience */}
            <div className="bg-white/80 border border-[#E5DEC1]/40 rounded-[28px] p-6 md:p-8 shadow-xs hover:shadow-md hover:bg-white hover:border-[#2D3A2F]/20 transition-all duration-300 flex flex-col space-y-4 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-[#F5F2EB] text-[#2D3A2F] border border-[#E5DEC1]/30">
                  <Sparkles className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-serif italic text-xl md:text-2xl text-[#2D3A2F] font-semibold">
                  Designed for Experience
                </h4>
              </div>
              <p className="font-sans text-[15px] sm:text-base text-neutral-600 leading-relaxed font-light">
                Every day, millions of people step into the shower for a moment that is entirely their own. Soul Viva is built around that moment — transforming a daily routine into a sensory escape inspired by nature and emotion.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

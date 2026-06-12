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
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      id="brand-intro-section" 
      className="py-24 md:py-32 bg-[#FAF8F5] text-[#2D3A2F] relative overflow-hidden font-sans border-b border-[#E5DEC1]/30"
    >
      {/* Background Soft Organic Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E5DEC1]/10 rounded-full blur-3xl pointer-events-none animate-slow-pan" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#EAD9EC]/8 animate-float rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"
        >
          {/* Left Column: Typographic Hook + Parallax Floating Visual */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 flex flex-col space-y-10 text-left"
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
            <div className="relative w-full max-w-md mx-auto lg:mx-0 pr-8 pb-8">
              {/* Luxury Scene Background Frame */}
              <div className="w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-[#E5DEC1]/50 shadow-md">
                <img 
                  src="/Waterlily and Pear/Soap_packaging_in_luxury_scene_202606121132.jpeg" 
                  alt="Soul Viva Luxury Packaging Scene" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Floating 3D Packaging Box Overlay */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5.5, 
                  ease: "easeInOut" 
                }}
                className="absolute -bottom-6 -right-2 w-32 h-32 sm:w-40 sm:h-40 z-20 drop-shadow-[0_20px_35px_rgba(45,58,47,0.18)] pointer-events-none"
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
            className="lg:col-span-7 flex flex-col space-y-6 max-w-xl lg:ml-auto"
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Sparkles, Droplets, Info } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      className="group relative bg-white/70 backdrop-blur-md border border-neutral-100/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white hover:border-neutral-200"
      whileHover={{ y: -8 }}
      onClick={() => onSelect(product)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Bloom Shadow Effect behind the card on hover */}
      <div 
        className={`absolute -inset-10 -z-10 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none ${
          product.id === 'crystal-clarity' ? 'bg-sky-100/50' :
          product.id === 'shea-honey' ? 'bg-amber-100/50' :
          product.id === 'mandarin-peach' ? 'bg-orange-100/50' : 'bg-purple-100/50'
        }`}
      />

      {/* Card Header: Category & Badge */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="font-sans text-[10px] tracking-[0.2em] font-semibold text-neutral-400 uppercase">
            {product.subtitle}
          </span>
          <h3 className="font-sans text-2xl font-light tracking-tight text-neutral-800 mt-1">
            {product.name}
          </h3>
        </div>
        {product.badge && (
          <span className="font-sans text-[9px] tracking-[0.15em] font-medium text-brand-dark/70 bg-neutral-100 px-2.5 py-1 rounded-full uppercase border border-neutral-200/50">
            {product.badge}
          </span>
        )}
      </div>

      {/* Card Visual Content - Aesthetic Setting Previews, overlaid with product box */}
      <div className="relative h-60 md:h-72 w-full mb-6 rounded-2xl overflow-hidden bg-neutral-50 flex items-center justify-center">
        {/* Soft Background Tint */}
        <div className={`absolute inset-0 opacity-40 bg-gradient-to-b ${product.accentClass}`} />

        {/* Ambient image of the soap's physical harvesting / luxury space preview */}
        <motion.img
          src={product.bgImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Transparent Mask overlay to make images sink beautifully */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent/10" />

        {/* Floating crystalline bar image representation */}
        {product.id === 'crystal-clarity' && (
          <motion.img
            src={product.image}
            alt="Crystalline transparent bar"
            className="absolute w-44 h-44 object-contain z-10 animate-float pointer-events-none drop-shadow-xl select-none"
            style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
          />
        )}
        
        {/* Decorative Scent Note Bubble hover overlay */}
        <div className="absolute inset-x-3 bottom-3 glass-pill py-2.5 px-4 rounded-xl flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
          <span className="font-sans text-[10px] tracking-wider text-neutral-600 font-medium">Scent Notes:</span>
          <span className="font-mono text-[10px] text-neutral-700 font-light truncate max-w-[150px]">
            {product.scentNotes.top[0]} &bull; {product.scentNotes.heart[0]}
          </span>
        </div>
      </div>

      {/* Card Info footer */}
      <div>
        {/* Brief poetic tagline */}
        <p className="font-sans text-xs text-neutral-500 line-clamp-2 min-h-8 mb-6 leading-relaxed">
          {product.tagline}
        </p>

        {/* Divider line */}
        <div className="w-full h-[1px] bg-neutral-100 mb-5" />

        {/* Formulation Info & Primary CTA */}
        <div className="flex justify-between items-center">
          <div>
            <span className="font-sans text-[10px] text-brand-dark/90 block font-semibold tracking-wider uppercase">{product.skinType}</span>
            <span className="font-sans text-[9px] text-neutral-400 uppercase tracking-widest block font-light">pH {product.pHLevel} Equilibrium</span>
          </div>
          
          <button 
            type="button"
            className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] font-semibold text-brand-dark uppercase border border-neutral-300/80 hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 px-4 py-2.5 rounded-full"
          >
            Explore <Info className="w-3.5 h-3.5 ml-1 inline stroke-[2]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

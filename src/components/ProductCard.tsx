import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Proportional rotation (max 12 degrees tilt)
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 12;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      className="group flex flex-col gap-4 cursor-pointer text-left w-full select-none"
      onClick={() => onSelect(product)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 3D tilt image frame */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-square w-full rounded-[28px] overflow-hidden bg-[#FAF5EE] flex items-center justify-center p-0 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(45,90,86,0.06)] hover:bg-[#F5ECE2]"
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
        }}
      >
        {/* Soft dynamic color backing glow aura */}
        <div 
          className="absolute w-48 h-48 rounded-full opacity-0 group-hover:opacity-35 transition-all duration-500 pointer-events-none blur-3xl"
          style={{ 
            backgroundColor: product.themeColor,
            transform: 'translateZ(10px)'
          }}
        />

        {/* 3D shadow depth layering for the product image */}
        <motion.img
          src={product.bgImage}
          alt={product.name}
          className="w-full h-full object-cover z-10 select-none pointer-events-none group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          style={{ transform: 'translateZ(35px)' }}
          animate={{ opacity: isHovered && product.image ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {product.image && (
          <motion.img
            src={product.image}
            alt={`${product.name} Hover View`}
            className="absolute inset-0 w-full h-full object-cover z-15 select-none pointer-events-none"
            style={{ transform: 'translateZ(35px)' }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
        
        {/* Inner light glare sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>

      {/* Details Row Underneath Card */}
      <div className="flex justify-between items-start px-2 py-1">
        <h3 className="font-sans text-[15px] sm:text-[16px] font-semibold text-neutral-900 tracking-tight leading-snug group-hover:text-black flex items-center gap-1 flex-1 pr-4">
          <span>{product.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:text-black transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
        </h3>
        <span className="font-sans text-[15px] sm:text-[16px] font-medium text-neutral-750 flex-shrink-0">
          100g
        </span>
      </div>
    </motion.div>
  );
}

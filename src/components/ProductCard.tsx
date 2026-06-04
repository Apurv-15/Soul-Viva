import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  // Dynamic badges to match screenshot style
  const getBadgeText = (id: string) => {
    switch (id) {
      case 'sea-minerals-menthol':
      case 'shea-honey':
      case 'lavender-currant':
        return "58% OFF";
      case 'waterlily-pear':
        return "NEW";
      default:
        return "SPECIAL";
    }
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      className="group relative bg-[#ECEAE4] rounded-[28px] p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 h-[460px] hover:shadow-[0_20px_40px_rgba(45,90,86,0.06)]"
      whileHover={{ y: -6 }}
      onClick={() => onSelect(product)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top Controls Container */}
      <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-center pointer-events-auto">
        {/* Heart Favorite Circle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-neutral-500 hover:text-red-500 active:scale-90 transition-all duration-300 cursor-pointer"
          aria-label="Favorite product"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? 'fill-red-500 text-red-500' : 'text-neutral-500'
            }`}
          />
        </button>

        {/* Dynamic Forest Green Badges */}
        <span className="bg-[#2D3A2F] text-white text-[9px] tracking-widest font-bold px-3 py-1.5 rounded-[4px] uppercase select-none">
          {getBadgeText(product.id)}
        </span>
      </div>

      {/* Main product visual cutout container */}
      <div className="flex-1 flex items-center justify-center relative mt-8 mb-4">
        {/* Ambient background glow on hover */}
        <div className="absolute w-36 h-36 rounded-full bg-white/20 blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

        {/* Clean floating soap cutout image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-44 h-44 object-contain drop-shadow-xl z-10 select-none pointer-events-none"
          whileHover={{ y: -10, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
      </div>

      {/* Product Details Block */}
      <div className="flex flex-col items-center mt-2 z-10">
        <h3 className="font-serif text-xl font-light text-[#2D3A2F] tracking-tight text-center leading-tight">
          {product.name}
        </h3>
        <span className="font-sans text-[10px] text-neutral-400 uppercase tracking-widest mt-1.5 font-semibold">
          {product.subtitle}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, CreditCard, Sparkles, ShoppingBag, CheckCircle, Leaf } from 'lucide-react';

interface CartDrawerProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  cart,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [giftWrapping, setGiftWrapping] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateCarbonTax = () => {
    return 2.5; // Fixed carbon tracking offset fee
  };

  const calculateTotal = () => {
    const giftWrapCost = giftWrapping ? 5 : 0;
    return calculateSubtotal() + calculateCarbonTax() + giftWrapCost;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mimic secure server payment checking
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
      {/* Dark tint backdrop */}
      <motion.div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-md h-full bg-brand-light text-brand-dark flex flex-col justify-between shadow-2xl z-10 border-l border-neutral-100"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
      >
        {/* Header toolbar */}
        <div className="sticky top-0 z-20 flex justify-between items-center px-6 py-5 border-b border-neutral-100 bg-brand-light/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="font-sans text-xs tracking-[0.2em] font-semibold uppercase">
              Sanctuary Bag
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-brand-dark cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Successful complete overlay */}
        <AnimatePresence>
          {checkoutComplete && (
            <motion.div
              className="absolute inset-0 bg-brand-light z-30 p-8 flex flex-col items-center justify-center text-center space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 mb-2">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-emerald-600">
                  PAYMENT SECURED
                </span>
                <h3 className="font-sans text-2xl font-light tracking-tight text-neutral-900">
                  Ritual Order Confirmed
                </h3>
              </div>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-sm">
                Your hand-poured transparency gel bars have entered the curing vault. Estimated delivery in 2-3 standard working days. An experiential tracking invoice has been sent to your email.
              </p>
              <div className="w-full bg-white p-4 rounded-xl border border-neutral-100 space-y-2.5 max-w-sm text-left font-sans text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Shipment Service</span>
                  <span className="text-neutral-700 font-medium">EcoExpress Air (Carbon Neutral)</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Arrival</span>
                  <span className="text-neutral-700 font-medium font-mono">May 25, 2026</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  onClose();
                }}
                className="bg-brand-dark hover:bg-neutral-800 text-white font-sans text-xs tracking-widest uppercase px-8 py-3.5 rounded-full outline-none w-full max-w-sm"
              >
                Close Bag
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {cart.length === 0 ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center mb-2">
                <ShoppingBag className="w-5 h-5 text-neutral-300 stroke-[1.2]" />
              </div>
              <h4 className="font-sans text-base font-medium text-neutral-700">Your Bag is Empty</h4>
              <p className="font-sans text-xs text-neutral-400 max-w-[200px]">
                Browse the Pure Clarity or local fragrance range to select your initial bar.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-neutral-100 flex gap-4 relative group"
                >
                  {/* Thumbnail tint frame */}
                  <div className={`w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center p-1 relative ${item.product.accentClass}`}>
                    <img src={item.product.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    {item.product.id === 'crystal-clarity' && (
                      <img src={item.product.image} className="w-12 h-12 object-contain relative animate-float select-none" />
                    )}
                  </div>

                  {/* Description details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-sans text-sm font-semibold text-neutral-800 truncate pr-5">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-sans text-[10px] text-neutral-400">
                      Pack: <span className="font-semibold text-neutral-500">{item.packSize} Bar{item.packSize > 1 ? 's' : ''}</span> &bull; Housing: <span className="font-semibold text-neutral-500 capitalize">{item.selectedPackaging}</span>
                    </p>

                    <div className="flex justify-between items-center pt-1">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-neutral-200 rounded-lg">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-neutral-500 hover:bg-neutral-50 disabled:opacity-30"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs px-2.5 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-500 hover:bg-neutral-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total cost for this combo */}
                      <span className="font-mono text-xs font-semibold text-neutral-800">
                        ${item.price * item.quantity}.00
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gift wrapping option */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-100 flex items-center justify-between">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-sans text-xs font-semibold text-neutral-800 block">
                      Include Gift Case & Note (+ $5.00)
                    </span>
                    <span className="font-sans text-[10px] text-neutral-400 block font-light">
                      Fitted with deep gold wax stamps and handmade parchment message card.
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="rounded border-neutral-300 text-brand-dark focus:ring-brand-dark cursor-pointer h-4.5 w-4.5"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer section: Totals and simulation checkout checkout form */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-100 bg-white p-6 space-y-4">
            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span className="font-mono font-medium">${calculateSubtotal()}.00</span>
              </div>
              <div className="flex justify-between text-neutral-500 items-center">
                <span className="flex items-center gap-1">
                  Eco carbon neutral offset fee <Leaf className="w-3 h-3 text-emerald-500" />
                </span>
                <span className="font-mono font-medium">${calculateCarbonTax().toFixed(2)}</span>
              </div>
              {giftWrapping && (
                <div className="flex justify-between text-neutral-500">
                  <span>Gift Presentation</span>
                  <span className="font-mono font-medium">$5.00</span>
                </div>
              )}
              <div className="border-t border-neutral-100 pt-2 flex justify-between text-neutral-900 text-sm font-semibold">
                <span>Final Crystalline Cost</span>
                <span className="font-mono text-base font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Simulated Checkout Area with minimal input */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
              <span className="font-sans text-[9px] tracking-widest font-semibold uppercase text-neutral-400 block">
                Simulated Secure Checkout
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-1/2 p-2 border border-neutral-200 rounded-lg text-xs font-sans focus:outline-none focus:border-brand-dark"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  required
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || '';
                    setCardNumber(v);
                  }}
                  className="w-1/2 p-2 border border-neutral-200 rounded-lg text-xs font-sans focus:outline-none focus:border-brand-dark"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-dark hover:bg-neutral-800 disabled:bg-neutral-400 text-white py-3 px-6 h-12 font-sans text-xs tracking-[0.2em] rounded-full uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin border-2 border-white/30 border-t-white w-4 h-4 rounded-full" />
                    Transacting Sanctuaries...
                  </span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 stroke-[1.8]" /> Pay Securely (${calculateTotal().toFixed(2)})
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InquiryForm } from '../types';
import { X, Sparkles, Send, CheckCircle2, Building, Calendar, PackageOpen } from 'lucide-react';

interface InquiryModalProps {
  onClose: () => void;
}

export default function InquiryModal({ onClose }: InquiryModalProps) {
  const [form, setForm] = useState<InquiryForm>({
    name: '',
    email: '',
    phone: '',
    subject: 'Consultation Request',
    message: '',
    interestIn: 'hospitality',
    quantityNeeded: '100 - 500 bars'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Dark blur backdrop */}
      <motion.div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative bg-brand-light text-brand-dark rounded-3xl max-w-lg w-full p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.2)] border border-neutral-100 max-h-[90vh] overflow-y-auto"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-brand-dark transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Heading */}
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-neutral-400 block">
                  EXPERIENTIAL CONSULTATION
                </span>
                <h3 className="font-sans text-2xl font-light tracking-tight text-neutral-900">
                  Custom & Hospitality Inquiry
                </h3>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                  We formulate customized signature batches of transparent gel bar soaps for luxury resorts, spas, design offices, and bridal rituals.
                </p>
              </div>

              {/* Inquiry topic selectors */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'hospitality', label: 'Resorts & Spa', icon: <Building className="w-4 h-4 text-emerald-500 mb-1" /> },
                  { id: 'gifting', label: 'Bespoke Gifts', icon: <PackageOpen className="w-4 h-4 text-amber-500 mb-1" /> },
                  { id: 'bridal', label: 'Special Occasion', icon: <Calendar className="w-4 h-4 text-purple-500 mb-1" /> },
                ].map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, interestIn: topic.id }))}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      form.interestIn === topic.id
                        ? 'border-brand-dark bg-white shadow-sm font-semibold'
                        : 'border-neutral-200/60 bg-white/40 hover:border-neutral-300'
                    }`}
                  >
                    {topic.icon}
                    <span className="font-sans text-[10px] tracking-wide text-neutral-700">{topic.label}</span>
                  </button>
                ))}
              </div>

              {/* Inputs Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-[10px] tracking-wide text-neutral-400 uppercase font-semibold">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full p-2.5 border border-neutral-200/80 rounded-lg text-xs font-sans focus:outline-none focus:border-brand-dark bg-white/60"
                      placeholder="e.g. Eleanor Vance"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-sans text-[10px] tracking-wide text-neutral-400 uppercase font-semibold">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full p-2.5 border border-neutral-200/80 rounded-lg text-xs font-sans focus:outline-none focus:border-brand-dark bg-white/60"
                      placeholder="e.g. eleanor@vancecorp.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-[10px] tracking-wide text-neutral-400 uppercase font-semibold">
                      Estimated Volume
                    </label>
                    <select
                      value={form.quantityNeeded}
                      onChange={e => setForm(p => ({ ...p, quantityNeeded: e.target.value }))}
                      className="w-full p-2.5 border border-neutral-200/80 rounded-lg text-xs font-sans focus:outline-none focus:border-brand-dark bg-white/60"
                    >
                      <option value="50 - 100 bars">50 - 100 bars (Trial Sample)</option>
                      <option value="100 - 500 bars">100 - 500 bars (Boutique Resort)</option>
                      <option value="500 - 2000 bars">500 - 2000 bars (Hospitality Group)</option>
                      <option value="2000+ bars">2000+ bars (Continuous Contract)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-sans text-[10px] tracking-wide text-neutral-400 uppercase font-semibold">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full p-2.5 border border-neutral-200/80 rounded-lg text-xs font-sans focus:outline-none focus:border-brand-dark bg-white/60"
                      placeholder="+1 (555) 0192"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[10px] tracking-wide text-neutral-400 uppercase font-semibold">
                    Description of Your Space or Vision
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full p-2.5 border border-neutral-200/80 rounded-lg text-xs font-sans focus:outline-none focus:border-brand-dark bg-white/60 resize-none"
                    placeholder="We would love to know: do you have a specific scent direction? Let us know the hotel atmosphere or design vision."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-brand-dark hover:bg-neutral-800 disabled:bg-neutral-400 text-white py-3.5 px-6 h-12 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin border-2 border-white/30 border-t-white w-4 h-4 rounded-full" />
                      Dispatching Request...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Dispatch Consultation Inquiry
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-emerald-600">
                  DISPATCH SUCCESSFUL
                </span>
                <h3 className="font-sans text-2xl font-light tracking-tight text-neutral-900">
                  Your Vision is in Formulating
                </h3>
              </div>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
                Thank you for inquiring, <strong>{form.name}</strong>. A dedicated Soul Viva formulation specialist has received your spa/hospitality parameters. We will review your vision and reach out to you within 24 business hours.
              </p>
              <button
                onClick={onClose}
                className="bg-brand-dark hover:bg-neutral-800 text-white font-sans text-xs tracking-widest uppercase px-8 py-3.5 rounded-full outline-none w-full max-w-xs cursor-pointer"
              >
                Close Inquiry Panel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

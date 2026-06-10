"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Globe, MapPin, Clock, CheckCircle2, ChevronDown, Check } from 'lucide-react';
import { PRODUCTS } from '../data';

interface InquiryPageProps {
  onBackToHome?: () => void;
}

const COUNTRIES = [
  'Argentina', 'Chile', 'Colombia', 'Mexico', 'Brazil', 'Peru', 
  'Ecuador', 'UK', 'USA', 'Canada', 'Australia', 'Other'
];

const BUSINESS_TYPES = [
  'Distributor / Importer', 'Retailer / Chain Store', 
  'Wholesaler', 'E-commerce Seller', 'Hotel / Hospitality', 'Other'
];

export default function InquiryPage({ onBackToHome }: InquiryPageProps) {
  const [activeTab, setActiveTab] = useState<'trade' | 'sample'>('trade');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Form 1: General Trade Inquiry State
  const [tradeForm, setTradeForm] = useState({
    name: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    country: 'USA',
    businessType: 'Distributor / Importer',
    message: ''
  });

  // Form 2: Sample Request State
  const [sampleForm, setSampleForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    businessType: 'Distributor / Importer',
    variants: [] as string[], // array of variant ids
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    notes: '',
    confirmed: false
  });

  // Dropdown states
  const [showTradeCountry, setShowTradeCountry] = useState(false);
  const [showTradeType, setShowTradeType] = useState(false);
  const [showSampleCountry, setShowSampleCountry] = useState(false);
  const [showSampleType, setShowSampleType] = useState(false);

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const newSubmission = {
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type: 'trade',
      timestamp: new Date().toISOString(),
      status: 'pending',
      data: { ...tradeForm }
    };

    try {
      const existing = localStorage.getItem('soulviva_inquiries');
      const inquiries = existing ? JSON.parse(existing) : [];
      inquiries.unshift(newSubmission);
      localStorage.setItem('soulviva_inquiries', JSON.stringify(inquiries));
    } catch (err) {
      console.error('Failed to save trade inquiry to localStorage:', err);
    }

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleSampleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleForm.confirmed) {
      alert("Please confirm you are requesting samples as a qualified trade buyer.");
      return;
    }
    setIsSending(true);

    const newSubmission = {
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type: 'sample',
      timestamp: new Date().toISOString(),
      status: 'pending',
      data: { ...sampleForm }
    };

    try {
      const existing = localStorage.getItem('soulviva_inquiries');
      const inquiries = existing ? JSON.parse(existing) : [];
      inquiries.unshift(newSubmission);
      localStorage.setItem('soulviva_inquiries', JSON.stringify(inquiries));
    } catch (err) {
      console.error('Failed to save sample request to localStorage:', err);
    }

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setTradeForm({
      name: '',
      company: '',
      jobTitle: '',
      email: '',
      phone: '',
      country: 'USA',
      businessType: 'Distributor / Importer',
      message: ''
    });
    setSampleForm({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      businessType: 'Distributor / Importer',
      variants: [],
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
      notes: '',
      confirmed: false
    });
    setSubmitted(false);
  };

  const handleVariantToggle = (variantId: string) => {
    setSampleForm(prev => {
      const alreadyChecked = prev.variants.includes(variantId);
      const newVariants = alreadyChecked 
        ? prev.variants.filter(id => id !== variantId)
        : [...prev.variants, variantId];
      return { ...prev, variants: newVariants };
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 select-none bg-transparent">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="font-sans text-[10px] tracking-[0.3em] text-[#2d5a56] font-bold uppercase block">
          Get in Touch
        </span>
        <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] font-normal leading-tight text-neutral-900 tracking-tight">
          Let's talk about <span className="italic font-serif text-[#2D5A56]">Soul Viva</span>
        </h1>
        <p className="font-sans text-xs md:text-sm text-neutral-500 font-light leading-relaxed select-text">
          Whether you're a distributor exploring new brands, a retailer building your personal care range, or a buyer looking for a premium Indian export partner — we'd love to hear from you. All enquiries are responded to within 1–2 business days (IST).
        </p>
      </div>

      {/* Main Container Grid */}
      <div className="w-full bg-white rounded-[40px] border-[12px] border-white shadow-[0_24px_70px_rgba(139,115,85,0.06)] overflow-hidden flex flex-col lg:flex-row min-h-[750px] relative">
        
        {/* LEFT COLUMN: Clean Form Workspace */}
        <div className="w-full lg:w-[62%] p-6 sm:p-10 md:p-14 flex flex-col justify-between bg-[#FDFDFB] relative z-10">
          
          {/* Tab Switcher */}
          <div className="flex border-b border-neutral-200 mb-8 w-full select-none">
            <button
              onClick={() => { setActiveTab('trade'); setSubmitted(false); }}
              className={`flex-1 py-4 font-sans text-xs sm:text-sm tracking-wider uppercase font-semibold border-b-2 cursor-pointer transition-all duration-300 ${
                activeTab === 'trade' 
                  ? 'border-neutral-900 text-neutral-900' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              General Trade Inquiry
            </button>
            <button
              onClick={() => { setActiveTab('sample'); setSubmitted(false); }}
              className={`flex-1 py-4 font-sans text-xs sm:text-sm tracking-wider uppercase font-semibold border-b-2 cursor-pointer transition-all duration-300 ${
                activeTab === 'sample' 
                  ? 'border-neutral-900 text-neutral-900' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Request Samples
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  {/* Tab 1: General Trade Inquiry Form */}
                  {activeTab === 'trade' && (
                    <form onSubmit={handleTradeSubmit} className="space-y-4 text-left">
                      <div className="mb-2">
                        <h3 className="font-serif text-lg font-normal text-neutral-800">General Trade Inquiry</h3>
                        <p className="font-sans text-xs text-neutral-400 font-light mt-1">
                          For distributors, retailers, importers and wholesalers who wish to enquire about Soul Viva for stocking.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <input
                            type="text"
                            required
                            value={tradeForm.name}
                            onChange={(e) => setTradeForm({ ...tradeForm, name: e.target.value })}
                            placeholder="Your Name *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>

                        {/* Company Name */}
                        <div>
                          <input
                            type="text"
                            required
                            value={tradeForm.company}
                            onChange={(e) => setTradeForm({ ...tradeForm, company: e.target.value })}
                            placeholder="Company Name *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Title */}
                        <div>
                          <input
                            type="text"
                            value={tradeForm.jobTitle}
                            onChange={(e) => setTradeForm({ ...tradeForm, jobTitle: e.target.value })}
                            placeholder="Job Title (e.g. Purchasing Manager, Owner)"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>

                        {/* Business Email */}
                        <div>
                          <input
                            type="email"
                            required
                            value={tradeForm.email}
                            onChange={(e) => setTradeForm({ ...tradeForm, email: e.target.value })}
                            placeholder="Business Email Address *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Phone */}
                        <div className="md:col-span-1">
                          <input
                            type="text"
                            value={tradeForm.phone}
                            onChange={(e) => setTradeForm({ ...tradeForm, phone: e.target.value })}
                            placeholder="Phone / WhatsApp"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>

                        {/* Country Dropdown */}
                        <div className="relative md:col-span-1">
                          <button
                            type="button"
                            onClick={() => { setShowTradeCountry(!showTradeCountry); setShowTradeType(false); }}
                            className="w-full text-left flex justify-between items-center bg-white border border-stone-200 hover:border-neutral-300 rounded-lg px-4 py-3 text-xs font-medium text-neutral-700 cursor-pointer"
                          >
                            <span>{tradeForm.country}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                          </button>
                          <AnimatePresence>
                            {showTradeCountry && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setShowTradeCountry(false)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-0 top-full mt-1 w-full max-h-48 bg-white border border-stone-200 rounded-lg shadow-lg overflow-y-auto z-40 p-1"
                                >
                                  {COUNTRIES.map((c) => (
                                    <button
                                      key={c}
                                      type="button"
                                      onClick={() => {
                                        setTradeForm({ ...tradeForm, country: c });
                                        setShowTradeCountry(false);
                                      }}
                                      className="w-full text-left font-sans text-xs px-3 py-2 hover:bg-stone-50 rounded text-neutral-750"
                                    >
                                      {c}
                                    </button>
                                  ))}
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Business Type Dropdown */}
                        <div className="relative md:col-span-1">
                          <button
                            type="button"
                            onClick={() => { setShowTradeType(!showTradeType); setShowTradeCountry(false); }}
                            className="w-full text-left flex justify-between items-center bg-white border border-stone-200 hover:border-neutral-300 rounded-lg px-4 py-3 text-xs font-medium text-neutral-700 cursor-pointer"
                          >
                            <span className="truncate">{tradeForm.businessType}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                          </button>
                          <AnimatePresence>
                            {showTradeType && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setShowTradeType(false)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-0 top-full mt-1 w-full max-h-48 bg-white border border-stone-200 rounded-lg shadow-lg overflow-y-auto z-40 p-1"
                                >
                                  {BUSINESS_TYPES.map((b) => (
                                    <button
                                      key={b}
                                      type="button"
                                      onClick={() => {
                                        setTradeForm({ ...tradeForm, businessType: b });
                                        setShowTradeType(false);
                                      }}
                                      className="w-full text-left font-sans text-xs px-3 py-2 hover:bg-stone-50 rounded text-neutral-750"
                                    >
                                      {b}
                                    </button>
                                  ))}
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Message Text area */}
                      <div>
                        <textarea
                          rows={4}
                          value={tradeForm.message}
                          onChange={(e) => setTradeForm({ ...tradeForm, message: e.target.value })}
                          placeholder="Tell us more about your enquiry"
                          className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors resize-y leading-relaxed"
                        />
                      </div>

                      {/* Disclaimer */}
                      <p className="text-[10px] text-neutral-450 leading-relaxed font-light">
                        We'll respond within 1–2 business days. Your information is used solely to respond to your enquiry and will not be shared with third parties.
                      </p>

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSending}
                          className="w-full bg-[#2D3A2F] hover:bg-[#1E2720] text-white font-sans text-xs tracking-widest font-bold py-4 px-6 rounded-xl cursor-pointer shadow-sm hover:shadow transition-all duration-300 active:scale-99 flex justify-center items-center gap-2 outline-none uppercase"
                        >
                          {isSending ? 'Sending...' : 'Submit Enquiry'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Tab 2: Sample Request Form */}
                  {activeTab === 'sample' && (
                    <form onSubmit={handleSampleSubmit} className="space-y-4 text-left">
                      <div className="mb-2">
                        <h3 className="font-serif text-lg font-normal text-neutral-800">Request Product Samples</h3>
                        <p className="font-sans text-xs text-neutral-400 font-light mt-1">
                          We're happy to send samples to qualified trade buyers. Please complete the form below and we'll dispatch your sample pack within 5–7 business days. Shipping charges may apply for international orders.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                          <input
                            type="text"
                            required
                            value={sampleForm.firstName}
                            onChange={(e) => setSampleForm({ ...sampleForm, firstName: e.target.value })}
                            placeholder="First Name *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>

                        {/* Last Name */}
                        <div>
                          <input
                            type="text"
                            required
                            value={sampleForm.lastName}
                            onChange={(e) => setSampleForm({ ...sampleForm, lastName: e.target.value })}
                            placeholder="Last Name *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Company Name */}
                        <div>
                          <input
                            type="text"
                            required
                            value={sampleForm.company}
                            onChange={(e) => setSampleForm({ ...sampleForm, company: e.target.value })}
                            placeholder="Company Name *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>

                        {/* Business Email */}
                        <div>
                          <input
                            type="email"
                            required
                            value={sampleForm.email}
                            onChange={(e) => setSampleForm({ ...sampleForm, email: e.target.value })}
                            placeholder="Business Email Address *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Phone */}
                        <div className="md:col-span-1">
                          <input
                            type="text"
                            required
                            value={sampleForm.phone}
                            onChange={(e) => setSampleForm({ ...sampleForm, phone: e.target.value })}
                            placeholder="Phone / WhatsApp *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>

                        {/* Business Type Dropdown */}
                        <div className="relative md:col-span-1">
                          <button
                            type="button"
                            onClick={() => { setShowSampleType(!showSampleType); setShowSampleCountry(false); }}
                            className="w-full text-left flex justify-between items-center bg-white border border-stone-200 hover:border-neutral-300 rounded-lg px-4 py-3 text-xs font-medium text-neutral-700 cursor-pointer"
                          >
                            <span className="truncate">{sampleForm.businessType}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                          </button>
                          <AnimatePresence>
                            {showSampleType && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setShowSampleType(false)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-0 top-full mt-1 w-full max-h-48 bg-white border border-stone-200 rounded-lg shadow-lg overflow-y-auto z-40 p-1"
                                >
                                  {BUSINESS_TYPES.map((b) => (
                                    <button
                                      key={b}
                                      type="button"
                                      onClick={() => {
                                        setSampleForm({ ...sampleForm, businessType: b });
                                        setShowSampleType(false);
                                      }}
                                      className="w-full text-left font-sans text-xs px-3 py-2 hover:bg-stone-50 rounded text-neutral-750"
                                    >
                                      {b}
                                    </button>
                                  ))}
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Country Dropdown */}
                        <div className="relative md:col-span-1">
                          <button
                            type="button"
                            onClick={() => { setShowSampleCountry(!showSampleCountry); setShowSampleType(false); }}
                            className="w-full text-left flex justify-between items-center bg-white border border-stone-200 hover:border-neutral-300 rounded-lg px-4 py-3 text-xs font-medium text-neutral-700 cursor-pointer"
                          >
                            <span>{sampleForm.country}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                          </button>
                          <AnimatePresence>
                            {showSampleCountry && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setShowSampleCountry(false)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-0 top-full mt-1 w-full max-h-48 bg-white border border-stone-200 rounded-lg shadow-lg overflow-y-auto z-40 p-1"
                                >
                                  {COUNTRIES.map((c) => (
                                    <button
                                      key={c}
                                      type="button"
                                      onClick={() => {
                                        setSampleForm({ ...sampleForm, country: c });
                                        setShowSampleCountry(false);
                                      }}
                                      className="w-full text-left font-sans text-xs px-3 py-2 hover:bg-stone-50 rounded text-neutral-750"
                                    >
                                      {c}
                                    </button>
                                  ))}
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Select Variants for Samples (Checkboxes) */}
                      <div className="space-y-2.5 pt-1">
                        <span className="font-sans text-xs tracking-wider text-neutral-400 font-bold uppercase block">
                          Select Variants for Samples
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-neutral-50 p-4.5 rounded-xl border border-neutral-200/50">
                          {PRODUCTS.map((prod) => {
                            const isChecked = sampleForm.variants.includes(prod.id);
                            return (
                              <button
                                key={prod.id}
                                type="button"
                                onClick={() => handleVariantToggle(prod.id)}
                                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left font-sans text-xs font-semibold select-none cursor-pointer transition-all duration-300 ${
                                  isChecked 
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-inner scale-97' 
                                    : 'bg-white border-stone-200 text-neutral-600 hover:border-neutral-400'
                                }`}
                              >
                                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-neutral-300'}`}>
                                  {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span className="truncate">{prod.name.split(' & ')[0]}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="space-y-3.5 pt-1">
                        <span className="font-sans text-xs tracking-wider text-neutral-400 font-bold uppercase block">
                          Delivery Address
                        </span>
                        <div className="grid grid-cols-1 gap-3">
                          <input
                            type="text"
                            required
                            value={sampleForm.address1}
                            onChange={(e) => setSampleForm({ ...sampleForm, address1: e.target.value })}
                            placeholder="Address Line 1 *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                          <input
                            type="text"
                            value={sampleForm.address2}
                            onChange={(e) => setSampleForm({ ...sampleForm, address2: e.target.value })}
                            placeholder="Address Line 2 (Optional)"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            required
                            value={sampleForm.city}
                            onChange={(e) => setSampleForm({ ...sampleForm, city: e.target.value })}
                            placeholder="City *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                          <input
                            type="text"
                            value={sampleForm.state}
                            onChange={(e) => setSampleForm({ ...sampleForm, state: e.target.value })}
                            placeholder="State / Province"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                          <input
                            type="text"
                            required
                            value={sampleForm.zip}
                            onChange={(e) => setSampleForm({ ...sampleForm, zip: e.target.value })}
                            placeholder="Postal / ZIP Code *"
                            className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Additional notes */}
                      <div>
                        <textarea
                          rows={3}
                          value={sampleForm.notes}
                          onChange={(e) => setSampleForm({ ...sampleForm, notes: e.target.value })}
                          placeholder="Additional Notes (e.g. special requests, technical dossier, pricing sheet)"
                          className="w-full text-xs font-medium text-neutral-800 bg-white border border-stone-200 hover:border-neutral-300 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-lg px-4 py-3 outline-none transition-colors resize-y leading-relaxed"
                        />
                      </div>

                      {/* Confirmation Checkbox */}
                      <div className="flex items-start gap-2.5 select-none pt-1">
                        <button
                          type="button"
                          onClick={() => setSampleForm({ ...sampleForm, confirmed: !sampleForm.confirmed })}
                          className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors mt-0.5 ${
                            sampleForm.confirmed 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-neutral-300 hover:border-neutral-400 bg-white'
                          }`}
                        >
                          {sampleForm.confirmed && <Check className="w-3 h-3 stroke-[3]" />}
                        </button>
                        <span 
                          onClick={() => setSampleForm({ ...sampleForm, confirmed: !sampleForm.confirmed })}
                          className="text-[10px] text-neutral-500 font-light cursor-pointer hover:text-neutral-700 leading-snug"
                        >
                          I confirm that I am requesting samples as a qualified trade buyer for business evaluation purposes.
                        </span>
                      </div>

                      {/* Disclaimer */}
                      <p className="text-[10px] text-neutral-450 leading-relaxed font-light">
                        Sample requests are reviewed within 1 business day. We'll confirm dispatch details by email. International samples may attract a nominal courier charge.
                      </p>

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSending}
                          className="w-full bg-[#2D3A2F] hover:bg-[#1E2720] text-white font-sans text-xs tracking-widest font-bold py-4 px-6 rounded-xl cursor-pointer shadow-sm hover:shadow transition-all duration-300 active:scale-99 flex justify-center items-center gap-2 outline-none uppercase"
                        >
                          {isSending ? 'Requesting...' : 'Request Samples'}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="inquiry_success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl p-8 sm:p-12 border border-neutral-100 shadow-[0_12px_45px_rgba(94,199,182,0.05)] text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f4fbf9] border border-emerald-500/30 flex items-center justify-center text-emerald-600 scale-in">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans text-xl font-bold text-neutral-800 tracking-tight select-text">
                      Enquiry Received
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-neutral-500 leading-relaxed font-light select-text max-w-sm">
                      Thank you for contacting Soul Viva. Your request has been logged successfully. A trade representative will review the details and reach back to you within 1–2 business days.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="font-sans text-xs font-bold tracking-wider uppercase text-neutral-800 hover:text-black px-6 py-2.5 border border-neutral-200 hover:border-neutral-400 rounded-xl cursor-pointer transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simple Clean footer anchor link */}
          <div className="pt-6 border-t border-stone-200/40 text-center md:text-left self-stretch mt-8">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="font-sans text-xs font-bold text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer block md:inline"
              >
                &larr; Return to Cosmetic Formulation Story
              </button>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Beautiful Forest Green Contact Details Panel */}
        <div className="w-full lg:w-[38%] bg-[#2D3A2F] text-white relative overflow-hidden flex flex-col justify-between p-8 md:p-12 select-none min-h-[500px]">
          
          {/* Subtle Ambient light elements */}
          <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-[#5EC7B6]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[10%] left-[-10%] w-72 h-72 bg-[#E5DEC1]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top details block */}
          <div className="space-y-8 relative z-10 text-left">
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#5EC7B6] font-bold">Quick Channels</span>
              <h3 className="font-serif text-2xl md:text-3xl font-normal leading-tight text-white">Contact Details</h3>
            </div>

            <div className="space-y-6">
              {/* Detail 1 */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-emerald-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Email Address</span>
                  <a href="mailto:reach.us@soulviva.in" className="font-sans text-sm font-semibold text-white hover:text-[#5EC7B6] transition-colors block mt-0.5 border-b border-white/10 hover:border-[#5EC7B6] w-fit">
                    reach.us@soulviva.in
                  </a>
                </div>
              </div>

              {/* Detail 2 */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#ffd653]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Phone / WhatsApp</span>
                  <a href="tel:+919773778579" className="font-sans text-sm font-semibold text-white hover:text-[#ffd653] transition-colors block mt-0.5">
                    (+91) 97737 78579
                  </a>
                </div>
              </div>

              {/* Detail 3 */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-emerald-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Website URL</span>
                  <a href="https://www.soulviva.in" target="_blank" rel="noopener noreferrer" className="font-sans text-sm font-semibold text-white hover:text-[#5EC7B6] transition-colors block mt-0.5 border-b border-white/10 hover:border-[#5EC7B6] w-fit">
                    www.soulviva.in
                  </a>
                </div>
              </div>

              {/* Detail 4 */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#fcd116]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Office Address</span>
                  <span className="font-sans text-xs font-light text-neutral-200 block mt-0.5 leading-relaxed">
                    D 9, Ground Floor, Sector 3,<br />
                    Noida, Uttar Pradesh 201301, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom details block */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left relative z-10 space-y-2 mt-8">
            <div className="flex items-center gap-2 text-emerald-300">
              <Clock className="w-4 h-4" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Response Guarantee</span>
            </div>
            <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed">
              We respond to all verified trade buyer enquiries within 1–2 business days (IST).
            </p>
          </div>

        </div>

      </div>

      {/* COMMERCIAL & EXPORT SPECIFICATIONS MODULE */}
      <div className="mt-16 space-y-12">
        <div className="text-center md:text-left space-y-3">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase block select-none">
            B2B OPERATIONS & SPECIFICATIONS
          </span>
          <h2 className="font-sans text-2xl md:text-4xl font-light tracking-tight text-[#2D5A56] leading-none">
            Commercial & Export Information
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-500 font-light max-w-2xl leading-relaxed">
            Direct access to our micro-batch contract logistics, certified standards, and regulatory documentation.
          </p>
        </div>

        {/* Specs bento grids */}
        <div className="text-left">
          
          {/* Card C: Export Compliance & Regulatory Standards */}
          <div className="bg-[#f0f9f7]/50 border border-[#dbece7] rounded-[32px] p-8 md:p-12 shadow-sm space-y-6">
            <div className="space-y-2 text-left">
              <span className="inline-block bg-[#5EC7B6]/20 text-[#2d5a56] px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold">
                Regulatory Standards
              </span>
              <h3 className="font-sans text-xl md:text-2xl font-normal text-neutral-850">
                Export Compliance — <span className="italic">Built for International Markets</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-neutral-500 font-light max-w-4xl leading-relaxed">
                Soul Viva is designed and documented for export from India. Every element — from labelling to barcoding to ingredient declarations — is built to meet the requirements of international trade partners and regulatory authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2 font-sans text-sm">
              
              {/* Compliance Item 1 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs space-y-3.5 text-left flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-neutral-900 text-base flex items-center gap-2 mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5EC7B6]" />
                    GS1 Barcodes
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    All six variants carry internationally registered GS1 EAN-13 barcodes, registered under Belleaves Private Limited via GS1 India's DataKart platform. Globally scannable and recognised at point of sale in all major retail markets.
                  </p>
                </div>
              </div>

              {/* Compliance Item 2 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs space-y-3.5 text-left flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-neutral-900 text-base flex items-center gap-2 mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5EC7B6]" />
                    INCI Declarations
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Full INCI (International Nomenclature Cosmetic Ingredient) ingredient lists have been prepared to international convention — with correct IUPAC nomenclature, Latin binomials for all botanical extracts, and proper descending-concentration order as required by EU and Latin American regulations.
                  </p>
                </div>
              </div>

              {/* Compliance Item 3 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs space-y-3.5 text-left flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-neutral-900 text-base flex items-center gap-2 mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5EC7B6]" />
                    Export Documentation
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Belleaves Private Limited holds an active Import Export Code (IEC) and is registered under Udyam as an MSME (manufacturing category). Full export documentation is available upon request, including commercial invoices, certificates of origin, and certificates of analysis.
                  </p>
                </div>
              </div>

              {/* Compliance Item 4 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs space-y-3.5 text-left flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-neutral-900 text-base flex items-center gap-2 mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5EC7B6]" />
                    Claims Substantiation
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    All variants are dermatologically tested for all skin types. All product claims are substantiated: 100% Natural Extracts, Cruelty Free, Paraben Free, Silicon Free. The product is classified as a cosmetic/toiletry for customs and import purposes in all target markets.
                  </p>
                </div>
              </div>

              {/* Compliance Item 5 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs text-left space-y-3.5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-neutral-900 text-base flex items-center gap-2 mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5EC7B6]" />
                    Mandatory Labeling
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    All product labels carry the full set of mandatory information required for international trade: product name and category, net weight (100g), country of origin (India), full ingredient list (INCI), shelf life (24 months), manufacturer name and address, and brand owner address.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Section: Manufacturing Facilities Allocation Details */}
        <div className="bg-[#f0f9f7] border border-[#dbece7] rounded-[32px] p-8 md:p-12 text-left space-y-8">
          <div className="space-y-4">
            <span className="font-sans text-[10px] tracking-widest font-bold text-neutral-400 uppercase block">Production Infrastructure</span>
            <h3 className="font-sans text-xl md:text-3xl font-light text-[#2D5A56]">
              Production Facility — <span className="italic">Crafted by Experts in Soap Making</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2 text-sm md:text-base">
              <p className="font-sans text-neutral-600 leading-relaxed">
                Soul Viva is manufactured by a certified contract manufacturing partner in India — specialists in glycerin-based soap and gel bar production who supply some of India's most well-known personal care brands.
              </p>
              <p className="font-sans text-neutral-600 leading-relaxed">
                The manufacturing partner has extensive expertise in transparent glycerin soap technology — the core format of Soul Viva — and is equipped to handle the precision required for consistent colour, fragrance load, and bar weight across all six variants.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#dbece7]" />

          <div className="space-y-4">
            <h4 className="font-sans text-sm tracking-wider font-semibold uppercase text-neutral-800">
              Facility Key Facts
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Fact 1 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs text-left space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#2D5A56] block">Location</span>
                  <span className="font-sans text-base font-bold text-neutral-800 block mt-1">Maharashtra, India</span>
                </div>
                <span className="font-sans text-sm text-neutral-600 block leading-relaxed mt-3">Certified contract partner supplying leading personal care brands.</span>
              </div>

              {/* Fact 2 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs text-left space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#2D5A56] block">Speciality & Standards</span>
                  <span className="font-sans text-base font-bold text-neutral-800 block mt-1">Glycerin Soap & Gel Bars</span>
                </div>
                <span className="font-sans text-sm text-neutral-600 block leading-relaxed mt-3">Built to international export standards & scalable to meet demand.</span>
              </div>

              {/* Fact 3 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs text-left space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#2D5A56] block">Quality Control</span>
                  <span className="font-sans text-base font-bold text-neutral-800 block mt-1">Full Batch QC & Traceability</span>
                </div>
                <span className="font-sans text-sm text-neutral-600 block leading-relaxed mt-3">End-to-end batch traceability on every production run.</span>
              </div>

              {/* Fact 4 */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-xs text-left space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#2D5A56] block">Carton & Logistics</span>
                  <span className="font-sans text-base font-bold text-neutral-800 block mt-1">48 Units / Master Carton</span>
                </div>
                <span className="font-sans text-sm text-neutral-600 block leading-relaxed mt-3">8 shrinkpacks × 6 units. Guaranteed 24 months shelf life.</span>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

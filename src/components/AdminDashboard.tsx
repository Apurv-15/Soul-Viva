/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Search,
  Trash2,
  Check,
  Clock,
  ArrowLeft,
  RefreshCw,
  Download,
  AlertCircle,
  Briefcase,
  Layers,
  ChevronDown,
  CheckCircle,
  Truck
} from 'lucide-react';
import { PRODUCTS } from '../data';

interface Submission {
  id: string;
  type: 'trade' | 'sample';
  timestamp: string;
  status: 'pending' | 'reviewed' | 'dispatched';
  data: {
    name?: string;
    firstName?: string;
    lastName?: string;
    company: string;
    jobTitle?: string;
    email: string;
    phone: string;
    country: string;
    businessType: string;
    message?: string;
    variants?: string[];
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    notes?: string;
    confirmed?: boolean;
  };
}

interface AdminDashboardProps {
  onBackToHome?: () => void;
}

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub_mock_1',
    type: 'trade',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
    status: 'pending',
    data: {
      name: 'Alejandro Silva',
      company: 'Importaciones del Sur S.A.',
      jobTitle: 'CEO / Sourcing Director',
      email: 'a.silva@importacionesdelsur.com.ar',
      phone: '+54 9 11 5555-1234',
      country: 'Argentina',
      businessType: 'Distributor / Importer',
      message: 'We are a leading premium personal care importer and distributor in Argentina and Chile. We supply over 450 luxury pharmacy outlets and health boutiques. We would love to distribute Soul Viva moisturising gel bars to our retail network. Please share your commercial pricing sheet, minimum order quantities (MOQ) for FOB export, and technical dossier.'
    }
  },
  {
    id: 'sub_mock_2',
    type: 'sample',
    timestamp: new Date(Date.now() - 3600000 * 25).toISOString(), // 25 hours ago
    status: 'reviewed',
    data: {
      firstName: 'Sarah',
      lastName: 'Jenkins',
      company: 'Wellness Boutique UK',
      email: 'sarah.j@wellnessboutique.co.uk',
      phone: '+44 7911 123456',
      businessType: 'Retailer / Chain Store',
      variants: ['sea-minerals-menthol', 'waterlily-pear', 'cherry-blossom-strawberry'],
      address1: '10 High Street',
      address2: 'Flat 2B, Kensington',
      city: 'London',
      state: 'Greater London',
      zip: 'SW1A 1AA',
      country: 'UK',
      notes: 'We are planning to stock physical samples in our flagship London store. Please include your B2B trade brochure and commercial retail pricing sheet.',
      confirmed: true
    }
  },
  {
    id: 'sub_mock_3',
    type: 'trade',
    timestamp: new Date(Date.now() - 3600000 * 50).toISOString(), // ~2 days ago
    status: 'reviewed',
    data: {
      name: 'Michael Vance',
      company: 'Eco Hospitality Group',
      jobTitle: 'VP of Procurement',
      email: 'mvance@ecohospitality.com',
      phone: '+1 416-555-0199',
      country: 'Canada',
      businessType: 'Hotel / Hospitality',
      message: 'Interested in sourcing high-glycerin gel bars for our chain of eco-luxury lodges across British Columbia. We require customized soap weights (50g/75g) or standard 100g bars wrapped in sustainable plastic-free cartons. Looking forward to your response.'
    }
  },
  {
    id: 'sub_mock_4',
    type: 'sample',
    timestamp: new Date(Date.now() - 3600000 * 75).toISOString(), // ~3 days ago
    status: 'dispatched',
    data: {
      firstName: 'James',
      lastName: 'Miller',
      company: 'Naturals Australia Ltd',
      email: 'jmiller@naturals.com.au',
      phone: '+61 2 9876 5432',
      businessType: 'Wholesaler',
      variants: ['shea-honey', 'lavender-currant', 'mandarin-peach', 'waterlily-pear'],
      address1: '55 Harbourview Terrace',
      address2: 'Unit 4, Pyrmont',
      city: 'Sydney',
      state: 'New South Wales',
      zip: '2009',
      country: 'Australia',
      notes: 'Testing the moisturizing retention claims of the glycerin base. We supply natural organic lines to domestic Australian chains.',
      confirmed: true
    }
  }
];

export default function AdminDashboard({ onBackToHome }: AdminDashboardProps) {
  const [inquiries, setInquiries] = useState<Submission[]>([]);
  const [activeTypeTab, setActiveTypeTab] = useState<'all' | 'trade' | 'sample'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load inquiries
  const loadInquiries = () => {
    try {
      const stored = localStorage.getItem('soulviva_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      } else {
        // First time, set with mock data to showcase the portal beautifully
        localStorage.setItem('soulviva_inquiries', JSON.stringify(MOCK_SUBMISSIONS));
        setInquiries(MOCK_SUBMISSIONS);
      }
    } catch (err) {
      console.error('Error loading inquiries:', err);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // Update Status
  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'reviewed' | 'dispatched') => {
    const updated = inquiries.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setInquiries(updated);
    localStorage.setItem('soulviva_inquiries', JSON.stringify(updated));
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this submission?')) return;
    const updated = inquiries.filter(item => item.id !== id);
    setInquiries(updated);
    localStorage.setItem('soulviva_inquiries', JSON.stringify(updated));
    if (expandedId === id) setExpandedId(null);
  };

  // Clear All
  const handleClearAll = () => {
    if (!confirm('Warning! This will clear all logged inquiries and sample requests. Continue?')) return;
    localStorage.removeItem('soulviva_inquiries');
    setInquiries([]);
    setExpandedId(null);
  };

  // Generate Mock Data
  const handleGenerateMocks = () => {
    localStorage.setItem('soulviva_inquiries', JSON.stringify(MOCK_SUBMISSIONS));
    setInquiries(MOCK_SUBMISSIONS);
    setExpandedId(null);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Type,Date,Status,Company,Name/Contact,Email,Phone,Country,Business Type,Details/Notes,Address/Variants\n';
    
    inquiries.forEach(sub => {
      const type = sub.type.toUpperCase();
      const date = new Date(sub.timestamp).toLocaleString().replace(/,/g, '');
      const status = sub.status.toUpperCase();
      const company = `"${sub.data.company.replace(/"/g, '""')}"`;
      const name = sub.type === 'trade' 
        ? `"${(sub.data.name || '').replace(/"/g, '""')}"`
        : `"${(sub.data.firstName + ' ' + sub.data.lastName).replace(/"/g, '""')}"`;
      const email = sub.data.email;
      const phone = sub.data.phone;
      const country = sub.data.country;
      const businessType = sub.data.businessType;
      
      const message = sub.type === 'trade'
        ? `"${(sub.data.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
        : `"${(sub.data.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
        
      const additional = sub.type === 'trade'
        ? 'N/A'
        : `"${[
            sub.data.address1, 
            sub.data.address2, 
            sub.data.city, 
            sub.data.state, 
            sub.data.zip,
            `Variants: ${(sub.data.variants || []).join('|')}`
          ].filter(Boolean).join(', ').replace(/"/g, '""')}"`;

      csvContent += `${sub.id},${type},${date},${status},${company},${name},${email},${phone},${country},${businessType},${message},${additional}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `soul_viva_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter computations
  const filteredInquiries = inquiries.filter(item => {
    // Type tab
    if (activeTypeTab !== 'all' && item.type !== activeTypeTab) return false;
    
    // Status filter
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    
    // Country filter
    if (filterCountry !== 'all' && item.data.country !== filterCountry) return false;
    
    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const company = item.data.company.toLowerCase();
      const email = item.data.email.toLowerCase();
      const phone = item.data.phone.toLowerCase();
      const text = item.type === 'trade' 
        ? (item.data.name || '').toLowerCase() + ' ' + (item.data.message || '').toLowerCase()
        : (item.data.firstName || '').toLowerCase() + ' ' + (item.data.lastName || '').toLowerCase() + ' ' + (item.data.notes || '').toLowerCase();
      
      if (!company.includes(q) && !email.includes(q) && !phone.includes(q) && !text.includes(q)) {
        return false;
      }
    }
    
    return true;
  });

  // Extract unique countries for filter dropdown
  const uniqueCountries = Array.from(new Set(inquiries.map(item => item.data.country))).filter(Boolean);

  // Metrics
  const totalCount = inquiries.length;
  const tradeCount = inquiries.filter(i => i.type === 'trade').length;
  const sampleCount = inquiries.filter(i => i.type === 'sample').length;
  const pendingCount = inquiries.filter(i => i.status === 'pending').length;
  const reviewedCount = inquiries.filter(i => i.status === 'reviewed').length;
  const dispatchedCount = inquiries.filter(i => i.status === 'dispatched').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 bg-transparent select-text">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-3 text-left">
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#2d5a56] font-bold uppercase block">
            B2B OPERATIONAL PORTAL
          </span>
          <h1 className="font-serif text-[42px] font-normal leading-none text-neutral-900 tracking-tight">
            Inquiry <span className="italic font-serif text-[#2D5A56]">Dashboard</span>
          </h1>
          <p className="font-sans text-xs md:text-sm text-neutral-500 font-light max-w-xl leading-relaxed select-text">
            Admin console for evaluating general trade enquiries, tracking logistics requests, and managing product sample dispatch logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadInquiries}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase text-neutral-600 hover:text-black bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 active:scale-97 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={inquiries.length === 0}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase text-neutral-600 hover:text-black bg-white border border-neutral-200 hover:border-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 active:scale-97 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase bg-[#2D3A2F] hover:bg-[#1E2720] text-white rounded-xl px-5 py-3 cursor-pointer transition-all duration-300 active:scale-97 shadow-sm hover:shadow"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return
            </button>
          )}
        </div>
      </div>

      {/* METRICS Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Metric 1: Total inquiries */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DEC1]/60 shadow-xs flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 block">Total Enquiries</span>
            <span className="font-serif text-3xl md:text-4xl font-normal text-neutral-800 block mt-2">{totalCount}</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-light pt-2 border-t border-stone-100 flex justify-between">
            <span>Trade: <strong>{tradeCount}</strong></span>
            <span>Samples: <strong>{sampleCount}</strong></span>
          </div>
        </div>

        {/* Metric 2: Pending Reviews */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DEC1]/60 shadow-xs flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 block">Pending Review</span>
            <span className="font-serif text-3xl md:text-4xl font-normal text-amber-600 block mt-2">{pendingCount}</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-light pt-2 border-t border-stone-100 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>Awaiting buyer response audit</span>
          </div>
        </div>

        {/* Metric 3: Reviewed and Approved */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DEC1]/60 shadow-xs flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 block">Reviewed Trade</span>
            <span className="font-serif text-3xl md:text-4xl font-normal text-teal-600 block mt-2">{reviewedCount}</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-light pt-2 border-t border-stone-100 flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-teal-500" />
            <span>B2B verification completed</span>
          </div>
        </div>

        {/* Metric 4: Samples Dispatched */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DEC1]/60 shadow-xs flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 block">Samples Dispatched</span>
            <span className="font-serif text-3xl md:text-4xl font-normal text-emerald-700 block mt-2">{dispatchedCount}</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-light pt-2 border-t border-stone-100 flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-emerald-600" />
            <span>Fulfillment log dispatched</span>
          </div>
        </div>

      </div>

      {/* FILTER PANEL AND SEARCH */}
      <div className="bg-white border border-[#E5DEC1]/60 rounded-3xl p-6 shadow-sm mb-8 space-y-6 text-left">
        
        {/* Search and Filters grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company, name, email or message..."
              className="w-full pl-11 pr-4 py-3 bg-[#FAF9F5] border border-stone-200 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-xl text-xs font-medium text-neutral-800 outline-none transition-all placeholder:text-neutral-400"
            />
          </div>

          {/* Country filter */}
          <div>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-[#5EC7B6] rounded-xl px-4 py-3 text-xs font-semibold text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Countries</option>
              {uniqueCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-[#5EC7B6] rounded-xl px-4 py-3 text-xs font-semibold text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="dispatched">Dispatched</option>
            </select>
          </div>
        </div>

        {/* Tab filters and admin commands row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-100 pt-4 gap-4">
          <div className="flex bg-neutral-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTypeTab('all')}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                activeTypeTab === 'all' 
                  ? 'bg-white text-neutral-800 shadow-xs' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setActiveTypeTab('trade')}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                activeTypeTab === 'trade' 
                  ? 'bg-white text-neutral-800 shadow-xs' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Trade Inquiries
            </button>
            <button
              onClick={() => setActiveTypeTab('sample')}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                activeTypeTab === 'sample' 
                  ? 'bg-white text-neutral-800 shadow-xs' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Sample Requests
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleGenerateMocks}
              className="text-[10px] tracking-widest font-bold uppercase text-[#2D5A56] hover:text-[#1c3835] bg-[#E8F3F1] border border-[#C5DFDA] px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              Load Demo Data
            </button>
            <button
              onClick={handleClearAll}
              className="text-[10px] tracking-widest font-bold uppercase text-red-600 hover:text-red-800 bg-red-50 border border-red-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              Clear Database
            </button>
          </div>
        </div>

      </div>

      {/* SUBMISSIONS LIST */}
      <div className="space-y-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const formattedDate = new Date(item.timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-3xl transition-all duration-300 overflow-hidden text-left ${
                  isExpanded 
                    ? 'border-[#2D5A56] shadow-md ring-1 ring-[#2D5A56]/20' 
                    : 'border-[#E5DEC1]/60 hover:border-neutral-300 shadow-xs'
                }`}
              >
                
                {/* Header row (Click to expand) */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-stone-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon based on type */}
                    <div className={`p-3 rounded-2xl flex items-center justify-center ${
                      item.type === 'trade' 
                        ? 'bg-[#E8F3F1] text-[#2d5a56] border border-[#C5DFDA]' 
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-150'
                    }`}>
                      {item.type === 'trade' ? <Briefcase className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-sans text-xs font-bold text-neutral-800 select-text">
                          {item.type === 'trade' 
                            ? item.data.name 
                            : `${item.data.firstName} ${item.data.lastName}`}
                        </span>
                        <span className="font-mono text-[9px] text-neutral-400 bg-neutral-100 rounded px-1.5 py-0.5">
                          {item.data.company}
                        </span>
                        
                        {/* Type badge */}
                        <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                          item.type === 'trade' 
                            ? 'bg-[#C5DFDA]/40 text-[#2d5a56]' 
                            : 'bg-indigo-100/60 text-indigo-700'
                        }`}>
                          {item.type === 'trade' ? 'Trade Inquiry' : 'Sample Request'}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-neutral-400 text-xs font-light select-text">
                        <span>{item.data.businessType}</span>
                        <span>&bull;</span>
                        <span>{item.data.country}</span>
                        <span>&bull;</span>
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    {/* Status Badge */}
                    <span className={`text-[10px] tracking-wider uppercase font-bold px-3 py-1 rounded-full border ${
                      item.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : item.status === 'reviewed'
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {item.status}
                    </span>

                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDeleteInquiry(item.id, e)}
                      className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details Pane */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-stone-100 bg-[#FAF9F5]/40"
                    >
                      <div className="p-6 md:p-8 space-y-6">
                        
                        {/* Bento Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Col 1: Contact card */}
                          <div className="bg-white border border-[#E5DEC1]/40 rounded-2xl p-5 space-y-4">
                            <h4 className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 border-b border-stone-100 pb-2">
                              Contact Channels
                            </h4>
                            
                            <div className="space-y-3 font-sans text-xs">
                              {/* Email */}
                              <div className="flex items-center gap-3.5 select-text">
                                <Mail className="w-4 h-4 text-neutral-400" />
                                <div>
                                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Email</span>
                                  <a href={`mailto:${item.data.email}`} className="font-semibold text-[#2D5A56] hover:underline">
                                    {item.data.email}
                                  </a>
                                </div>
                              </div>

                              {/* Phone */}
                              {item.data.phone && (
                                <div className="flex items-center gap-3.5 select-text">
                                  <Phone className="w-4 h-4 text-neutral-400" />
                                  <div>
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Phone / WhatsApp</span>
                                    <a href={`tel:${item.data.phone}`} className="font-semibold text-neutral-800 hover:underline">
                                      {item.data.phone}
                                    </a>
                                  </div>
                                </div>
                              )}

                              {/* Job Title */}
                              {item.data.jobTitle && (
                                <div className="flex items-center gap-3.5 select-text">
                                  <Briefcase className="w-4 h-4 text-neutral-400" />
                                  <div>
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Job Title</span>
                                    <span className="font-semibold text-neutral-850">
                                      {item.data.jobTitle}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Country & Biz */}
                              <div className="flex items-center gap-3.5 select-text">
                                <Globe className="w-4 h-4 text-neutral-400" />
                                <div>
                                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Demographics & Biz</span>
                                  <span className="font-semibold text-neutral-850">
                                    {item.data.country} ({item.data.businessType})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Col 2 & 3: Content / Request Details */}
                          <div className="md:col-span-2 bg-white border border-[#E5DEC1]/40 rounded-2xl p-5 flex flex-col justify-between">
                            
                            {item.type === 'trade' ? (
                              // Trade details
                              <div className="space-y-3 h-full">
                                <h4 className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 border-b border-stone-100 pb-2">
                                  Enquiry Message
                                </h4>
                                <p className="font-sans text-xs text-neutral-700 leading-relaxed font-light select-text whitespace-pre-line">
                                  {item.data.message || 'No additional message was provided.'}
                                </p>
                              </div>
                            ) : (
                              // Sample Request details
                              <div className="space-y-4">
                                <h4 className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 border-b border-stone-100 pb-2">
                                  Sample Pack Configuration
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  
                                  {/* Requested Variants */}
                                  <div className="space-y-2">
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Selected Soap Bars</span>
                                    <div className="flex flex-wrap gap-1.5">
                                      {item.data.variants && item.data.variants.length > 0 ? (
                                        item.data.variants.map(vId => {
                                          const prod = PRODUCTS.find(p => p.id === vId);
                                          return (
                                            <span
                                              key={vId}
                                              className="inline-block bg-[#F5F2EB] text-neutral-700 border border-stone-200 px-2 py-1 rounded-md text-[10px] font-semibold"
                                            >
                                              {prod ? prod.name : vId}
                                            </span>
                                          );
                                        })
                                      ) : (
                                        <span className="text-[10px] text-red-500 flex items-center gap-1 font-medium">
                                          <AlertCircle className="w-3 h-3" />
                                          No variants selected
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Address */}
                                  <div className="space-y-1 select-text">
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Delivery Address</span>
                                    <div className="font-sans text-xs font-light text-neutral-700 leading-relaxed flex items-start gap-1">
                                      <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                                      <div>
                                        <span className="font-medium block">{item.data.address1}</span>
                                        {item.data.address2 && <span className="block">{item.data.address2}</span>}
                                        <span>
                                          {item.data.city}, {item.data.state && `${item.data.state}, `} {item.data.zip}
                                        </span>
                                        <span className="block font-medium uppercase text-stone-500 mt-0.5">{item.data.country}</span>
                                      </div>
                                    </div>
                                  </div>

                                </div>

                                {item.data.notes && (
                                  <div className="space-y-1 pt-2 border-t border-stone-100 select-text">
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Special Notes & Attachments</span>
                                    <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                                      {item.data.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}

                          </div>
                        </div>

                        {/* Status Admin Control Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 select-none">
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                              Update Status:
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'pending')}
                                className={`px-2.5 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                  item.status === 'pending'
                                    ? 'bg-amber-100 border border-amber-300 text-amber-800'
                                    : 'bg-white border border-stone-200 text-neutral-500 hover:text-black hover:border-neutral-400'
                                }`}
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'reviewed')}
                                className={`px-2.5 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                  item.status === 'reviewed'
                                    ? 'bg-teal-100 border border-teal-300 text-teal-800'
                                    : 'bg-white border border-stone-200 text-neutral-500 hover:text-black hover:border-neutral-400'
                                }`}
                              >
                                Reviewed
                              </button>
                              {item.type === 'sample' && (
                                <button
                                  onClick={() => handleUpdateStatus(item.id, 'dispatched')}
                                  className={`px-2.5 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                    item.status === 'dispatched'
                                      ? 'bg-emerald-100 border border-emerald-300 text-emerald-800'
                                      : 'bg-white border border-stone-200 text-neutral-500 hover:text-black hover:border-neutral-400'
                                  }`}
                                >
                                  Dispatched
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="text-[10px] text-neutral-400 font-mono">
                            ID: {item.id}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })
        ) : (
          <div className="bg-white border border-[#E5DEC1]/60 rounded-3xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-sans text-sm font-semibold text-neutral-800">No submissions found</h4>
              <p className="font-sans text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                Try resetting search queries and filters, generating demo entries, or submitting a new B2B trade inquiry form.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

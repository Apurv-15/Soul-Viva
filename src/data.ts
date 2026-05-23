import { Product, BrandCommitment } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'sea-minerals-menthol',
    name: 'Sea Minerals & Menthol',
    tagline: 'A Refreshing Dip in the Open Sea.',
    subtitle: 'Cool, Refreshed, Purified Skin',
    description: 'A bathing experience that feels like a dip in the ocean — cool, crisp, and alive. Waves wash over you as freshness awakens every sense.',
    longDescription: 'Beneath it all, a quiet calm. Soul Viva Sea Minerals & Menthol brings that feeling to your shower, leaving you cool and refreshed. Experience absolute purification and skin-identical hydration. Each bar contains high-purity natural mint extracts and marine salts for a truly sensory awakening. Net weight: 100g.',
    price: 35,
    weight: '100g / 3.5 oz',
    pHLevel: '5.5 (Skin-Identical)',
    skinType: 'Cool, Refreshed, Purified Skin',
    accentClass: 'from-sky-100 to-blue-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(56,189,248,0.3)]',
    themeColor: '#DFEAF2',
    badge: 'Cooling Rush',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgLtfqgmWlshLIfTTyZkhoAuDw8CsmWZYPgzsJt4TdSQqcvfnSGQldGjeKvXN5FHKFmges0x3gEl7NL1sWQz2pwUupDs4pPHAgM056N-HyAy6pHoTeJQkHdMI93XfVo9teySungi2v6GcwstJK_NVt1wL3i7LUKi5GEm_5E9T-oOr9iORt6A0uSPLcBmBIYzY3ig4cWqt3T4WajhH9_6zYz_ZEgvMPogd7RHAVusvcINLGRdcSWAyORY24zYQO8LSLCxA04Mc2MCM',
    bgImage: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&q=80&w=1200',
    scentNotes: {
      top: ['Crisp Menthol', 'Marine Mist'],
      heart: ['Ozone Accord', 'Coastal Kelp'],
      base: ['Sea Salt', 'White Cedar']
    },
    keyIngredients: [
      {
        name: 'Glycerin',
        role: 'Humectant Protector',
        source: 'Organic Plants',
        description: 'Draws in Moisture, Keeping Skin Soft and Smooth.'
      },
      {
        name: 'Sea Minerals',
        role: 'Purifying Cleanser',
        source: 'Ocean Purity',
        description: 'Cleanse and Refresh with Ocean Purity.'
      },
      {
        name: 'Menthol',
        role: 'Instant Refresher',
        source: 'Peppermint Distillate',
        description: 'Delivers an Instant Cooling Rush.'
      }
    ],
    sensoryProfile: {
      hydration: 95,
      purity: 100,
      latherDensity: 85,
      longevity: 80
    }
  },
  {
    id: 'waterlily-pear',
    name: 'Waterlily & Pear',
    tagline: 'An Escape into a Tropical Waterfall.',
    subtitle: 'For Dewy Fresh Skin',
    description: 'A bathing experience that feels like standing under a tropical waterfall. Fresh water flows over you, surrounded by lush greens and soft blooms.',
    longDescription: 'Pure, vibrant, and alive. Soul Viva Waterlily & Pear brings that feeling to your shower, leaving your skin dewy and fresh. It is blended with deep-penetrating plant moisturizers and crisp garden fruit essences to balance high-clarity hydration with sensory bliss. Net weight: 100g.',
    price: 35,
    weight: '100g / 3.5 oz',
    pHLevel: '5.5 (Acid Balanced)',
    skinType: 'Dewy Fresh Skin',
    accentClass: 'from-emerald-50 to-teal-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(52,211,153,0.25)]',
    themeColor: '#E6F4EA',
    badge: 'Dewy Fresh',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgLtfqgmWlshLIfTTyZkhoAuDw8CsmWZYPgzsJt4TdSQqcvfnSGQldGjeKvXN5FHKFmges0x3gEl7NL1sWQz2pwUupDs4pPHAgM056N-HyAy6pHoTeJQkHdMI93XfVo9teySungi2v6GcwstJK_NVt1wL3i7LUKi5GEm_5E9T-oOr9iORt6A0uSPLcBmBIYzY3ig4cWqt3T4WajhH9_6zYz_ZEgvMPogd7RHAVusvcINLGRdcSWAyORY24zYQO8LSLCxA04Mc2MCM',
    bgImage: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=1200',
    scentNotes: {
      top: ['Crisp Pear', 'Lush Greens'],
      heart: ['Waterlily Extract', 'Lotus Blooms'],
      base: ['Fresh Dew', 'Soft Cedarwood']
    },
    keyIngredients: [
      {
        name: 'Glycerin',
        role: 'Dewy Base',
        source: 'Vegetable Oils',
        description: 'Draws in Moisture, Keeping Skin Soft and Smooth.'
      },
      {
        name: 'Waterlily Extract',
        role: 'Flora Rejuvenator',
        source: 'Aquatic Flowers',
        description: 'Hydrates and refreshes skin.'
      },
      {
        name: 'Pear Essence',
        role: 'Aromatic Softener',
        source: 'Pressed Pears',
        description: 'Leaves skin soft and supple.'
      }
    ],
    sensoryProfile: {
      hydration: 97,
      purity: 95,
      latherDensity: 82,
      longevity: 78
    }
  },
  {
    id: 'cherry-blossom-strawberry',
    name: 'Cherry Blossom & Strawberry',
    tagline: 'A Soft Romantic Bloom.',
    subtitle: 'Soft Glowing Skin',
    description: 'A bathing experience that feels like standing beneath blooming cherry blossoms. Petals drift through the air as a sweet, delicate fragrance surrounds you.',
    longDescription: 'Light, tender, and romantic. Soul Viva Cherry Blossom & Strawberry brings that feeling to your shower, leaving your skin soft and glowing. Specially designed for dull skins seeking a gentle radiance renewal and continuous humectant support. Net weight: 100g.',
    price: 35,
    weight: '100g / 3.5 oz',
    pHLevel: '5.5 (Skin Optimal)',
    skinType: 'Soft Glowing Skin',
    accentClass: 'from-pink-100 to-rose-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(244,63,94,0.25)]',
    themeColor: '#FFE4E6',
    badge: 'Romantic Bloom',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgLtfqgmWlshLIfTTyZkhoAuDw8CsmWZYPgzsJt4TdSQqcvfnSGQldGjeKvXN5FHKFmges0x3gEl7NL1sWQz2pwUupDs4pPHAgM056N-HyAy6pHoTeJQkHdMI93XfVo9teySungi2v6GcwstJK_NVt1wL3i7LUKi5GEm_5E9T-oOr9iORt6A0uSPLcBmBIYzY3ig4cWqt3T4WajhH9_6zYz_ZEgvMPogd7RHAVusvcINLGRdcSWAyORY24zYQO8LSLCxA04Mc2MCM',
    bgImage: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=1200',
    scentNotes: {
      top: ['Wild Strawberry', 'Red Berries'],
      heart: ['Cherry Blossom', 'Sakura Petals'],
      base: ['Warm Vanilla', 'Sugared Amber']
    },
    keyIngredients: [
      {
        name: 'Glycerin',
        role: 'Elastic Cushioner',
        source: 'Vegetable Source',
        description: 'Draws in Moisture, Keeping Skin Soft and Smooth.'
      },
      {
        name: 'Strawberry Essence',
        role: 'Radiance Booster',
        source: 'Ripe Strawberries',
        description: 'Leaves skin radiant.'
      },
      {
        name: 'Cherry Blossom Extract',
        role: 'Luminosity Perfector',
        source: 'Sakura Petals',
        description: 'Enhances Skin’s Natural Glow.'
      }
    ],
    sensoryProfile: {
      hydration: 92,
      purity: 90,
      latherDensity: 88,
      longevity: 82
    }
  },
  {
    id: 'lavender-currant',
    name: 'Lavender & Black Currant',
    tagline: 'A Moment of Pure Relaxation.',
    subtitle: 'Smooth & Happy Skin',
    description: 'A bathing experience that feels like sinking into a calming lavender bath. Soft aromas ease the mind while gentle warmth relaxes the body.',
    longDescription: 'Deeply soothing and serene. Soul Viva Lavender & Black Currant brings that feeling to your shower, leaving you calm and comforted. Packed with polyphenols and natural extracts, it provides the ultimate twilight wind-down. Net weight: 100g.',
    price: 35,
    weight: '100g / 3.5 oz',
    pHLevel: '5.5 (Skin Balanced)',
    skinType: 'Smooth & Happy Skin',
    accentClass: 'from-purple-100 to-indigo-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(168,85,247,0.25)]',
    themeColor: '#ECCDF2',
    badge: 'Pure Relaxation',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgLtfqgmWlshLIfTTyZkhoAuDw8CsmWZYPgzsJt4TdSQqcvfnSGQldGjeKvXN5FHKFmges0x3gEl7NL1sWQz2pwUupDs4pPHAgM056N-HyAy6pHoTeJQkHdMI93XfVo9teySungi2v6GcwstJK_NVt1wL3i7LUKi5GEm_5E9T-oOr9iORt6A0uSPLcBmBIYzY3ig4cWqt3T4WajhH9_6zYz_ZEgvMPogd7RHAVusvcINLGRdcSWAyORY24zYQO8LSLCxA04Mc2MCM',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIiJGuNkuPzfhXoZIIfIH40WGoo6u9qqm2tAZX4JP055boJPuVj_JrjdIHh_liGrtw9LlphKB8U1XgFRSjbtJcPNb-5yDBV00_1cMQfQ3jbnX4d_OC9iv910CJwyfbzyhkWPjHGd7wXBaP944zu28JeKX633AXI9eYkmRDdynzUV8YR_LPi5vQcxK_EdJYjsETBYynKYbMAebKZPDgtmg9qESck5YBLVd0MsnCMLZZ9M5Trwf04-PbZhr8Jj9FxISVhzE-WwXN57A',
    scentNotes: {
      top: ['Black Currant Buds', 'Deep Berries'],
      heart: ['French Lavender', 'Warm Chamomile'],
      base: ['Amberwood', 'Sustainable Sandalwood']
    },
    keyIngredients: [
      {
        name: 'Glycerin',
        role: 'Skin Smoother',
        source: 'Botanical',
        description: 'Draws in Moisture, Keeping Skin Soft and Smooth.'
      },
      {
        name: 'Black Currant Essence',
        role: 'Lipid Nourisher',
        source: 'Forest Currants',
        description: 'Nourishes for Smoother Skin.'
      },
      {
        name: 'Lavender Extract',
        role: 'Epidermal Calmer',
        source: 'Provence Lavender',
        description: 'Calms and Soothes Skin.'
      }
    ],
    sensoryProfile: {
      hydration: 94,
      purity: 98,
      latherDensity: 88,
      longevity: 85
    }
  },
  {
    id: 'mandarin-peach',
    name: 'Mandarin & Peach',
    tagline: 'A Burst of Fresh Energy.',
    subtitle: 'Energised Fresh Skin',
    description: 'A bathing experience that feels like a burst of citrus energy. Bright, juicy notes awaken your senses, filling the air with vibrant freshness.',
    longDescription: 'Lively, uplifting, and radiant. Soul Viva Mandarin & Peach brings that feeling to your shower, leaving your skin energised and fresh. Infused with natural Vitamin-rich extracts that offer superb tone clarifying capabilities and fresh citrus therapy. Net weight: 100g.',
    price: 35,
    weight: '100g / 3.5 oz',
    pHLevel: '5.5 (Acid Balanced)',
    skinType: 'Energised Fresh Skin',
    accentClass: 'from-orange-100 to-amber-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(249,115,22,0.25)]',
    themeColor: '#FFE5D9',
    badge: 'Citrus Energy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgLtfqgmWlshLIfTTyZkhoAuDw8CsmWZYPgzsJt4TdSQqcvfnSGQldGjeKvXN5FHKFmges0x3gEl7NL1sWQz2pwUupDs4pPHAgM056N-HyAy6pHoTeJQkHdMI93XfVo9teySungi2v6GcwstJK_NVt1wL3i7LUKi5GEm_5E9T-oOr9iORt6A0uSPLcBmBIYzY3ig4cWqt3T4WajhH9_6zYz_ZEgvMPogd7RHAVusvcINLGRdcSWAyORY24zYQO8LSLCxA04Mc2MCM',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASCAe9iP9BWs_IKsTVNjk94b-Np4mog7CwyLQ5XdeZB46FsdrxyVEKDipHwPaK1hErO8912V0_CPnVVGt2bjGBON1OBk5AMv7LR4kztUrAQAlrWjHbIl1IDZLMxiYD8mI4k_2iCsjgh-oPsthoN2925uTIzhi2mjD5c3B1zh6FIrhWaMdoT0nFv4jEcxkVRa-cj9_iPEHIVtsmEEwU6KE_bxhGoOMT2En5xkQbX0DMLid97AGQc7Kndvkvu4KBV0dZzR9PfS2BnW4',
    scentNotes: {
      top: ['Sun-Kissed Mandarin', 'Sweet Satsuma'],
      heart: ['White Peach Nectar', 'Bitter Orange Bloom'],
      base: ['Warm Vetiver', 'Cedar Wood']
    },
    keyIngredients: [
      {
        name: 'Glycerin',
        role: 'Elasticizer',
        source: 'Vegetable',
        description: 'Draws in Moisture, Keeping Skin Soft and Smooth.'
      },
      {
        name: 'Mandarin Extract',
        role: 'Vibrancy Stimulator',
        source: 'Calabrian Groves',
        description: 'Refreshes and Energises Skin.'
      },
      {
        name: 'Peach Essence',
        role: 'Texture Velvetizer',
        source: 'Organic Orchards',
        description: 'Softens and Smoothens Skin.'
      }
    ],
    sensoryProfile: {
      hydration: 88,
      purity: 96,
      latherDensity: 90,
      longevity: 70
    }
  },
  {
    id: 'shea-honey',
    name: 'Shea Butter & Honey',
    tagline: 'A Warm, Comforting Embrace.',
    subtitle: 'Deeply Nourished Skin',
    description: 'A bathing experience that feels like a warm, cozy hug. Rich, creamy softness wraps around your skin, leaving you feeling nourished and comforted.',
    longDescription: 'Gentle, smooth, and soothing. Soul Viva Shea Butter & Honey brings that feeling to your shower, leaving your skin deeply nourished and soft. Rich in active botanical lipids and lipids identical to the skin barrier. Net weight: 100g.',
    price: 35,
    weight: '100g / 3.5 oz',
    pHLevel: '5.6 (lipid-rich)',
    skinType: 'Deeply Nourished Skin',
    accentClass: 'from-amber-100 to-yellow-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(245,158,11,0.25)]',
    themeColor: '#FFE5D9',
    badge: 'Comfort Shield',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgLtfqgmWlshLIfTTyZkhoAuDw8CsmWZYPgzsJt4TdSQqcvfnSGQldGjeKvXN5FHKFmges0x3gEl7NL1sWQz2pwUupDs4pPHAgM056N-HyAy6pHoTeJQkHdMI93XfVo9teySungi2v6GcwstJK_NVt1wL3i7LUKi5GEm_5E9T-oOr9iORt6A0uSPLcBmBIYzY3ig4cWqt3T4WajhH9_6zYz_ZEgvMPogd7RHAVusvcINLGRdcSWAyORY24zYQO8LSLCxA04Mc2MCM',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBule4BSWFomZBlikgvjVWv33NBc1JJLgbMeFuX9SYb2qKKXAJbvb9FjEk_f8TM246I9xatTrBcijXNAdVGksWKXlCznMHuviJuvU1cLixDdGeTNPD02flbK554dB0f6B4Te29ric4cV7In6f6lP2SMnHXWTYivmU6CCAz8lfpt0BuTpdNCNWZdoKu3Vv3SeQWcULDGSv2yBwqGCsE322FGmvbYoxyBREjXLZHJxU2zl9H_rwlzsL0l69h-etS8x_0hZgFt3pvTmZQ',
    scentNotes: {
      top: ['Warm Honeycomb', 'Amaretto Blossom'],
      heart: ['Creamy Raw Shea', 'Wild Heather'],
      base: ['Vanilla Bean', 'Rich Labdanum']
    },
    keyIngredients: [
      {
        name: 'Glycerin',
        role: 'Humectant Lock',
        source: 'Sustainable Sourced Plants',
        description: 'Draws in Moisture, Keeping Skin Soft and Smooth.'
      },
      {
        name: 'Shea Butter',
        role: 'Deep Nourisher',
        source: 'Cold-Pressed Nut Oil',
        description: 'Deeply Nourishes Dry Skin.'
      },
      {
        name: 'Honey Extract',
        role: 'Conditioner',
        source: 'Forest Beehive Extract',
        description: 'Leaves Skin Soft and Smooth.'
      }
    ],
    sensoryProfile: {
      hydration: 98,
      purity: 92,
      latherDensity: 95,
      longevity: 82
    }
  }
];

export const COMMITMENTS: BrandCommitment[] = [
  {
    id: 'dermatological',
    title: 'Dermatologically Tested',
    description: 'Every formulation undergoes rigorous, third-party clinical trials to guarantee zero skin irritation and maximum biocompatibility.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'crueltyfree',
    title: 'Cruelty Free & Vegan',
    description: 'We never test on animals, nor do we use any animal-derived ingredients (no tallow, lard, or animal gelatin). Safe, ethical, clean.',
    iconName: 'Sparkles'
  },
  {
    id: 'natureextracted',
    title: '100% Natural Distillates',
    description: 'Leveraging clean botanical extracts, supercritical CO2 oils, and cold-pressed blossom nectars for honest, organic nourishment.',
    iconName: 'Droplet'
  },
  {
    id: 'parabenfree',
    title: 'Zero Synthetic Fillers',
    description: 'Completely free from parabens, phthalates, synthetic binding starches, petroleum diluents or endocrine disruptors.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'siliconefree',
    title: 'Water Soluble Purity',
    description: 'Designed to rinse completely clean, leaving no hydrophobic layer of silicones or residue to block respiratory skin pores.',
    iconName: 'CheckCircle2'
  }
];

export const STORIES = [
  {
    year: '2022',
    heading: 'The Transparent Dream',
    content: 'We set outer boundaries to create a soap bar that acts like condensed water: beautiful, glasslike, and light-reflective, yet overflowing with natural emollients. It took 310 micro-adjustments in raw glycerin purity to obtain stable transparency.'
  },
  {
    year: '2023',
    heading: 'The High-Viscosity Gel Matrix',
    content: 'Standard soap bars require synthetic drying starches to remain solid. We created a proprietary gel network that suspends deep skin humectants in a solid state using hydrogen bond stabilization, which melts beautifully into a clinical silk lather.'
  },
  {
    year: '2024',
    heading: 'Botanical Sanctuary Integration',
    content: 'We integrated pristine harvests—Kashmir Lavender, Meadow Honey, and Calabria Mandarin—creating three poetic sensory experiences where the bar embodies the pure atmosphere of their harvest origins.'
  }
];

import { UserAccount, PassItem, RewardDeal, Transaction } from '../types';

export const initialUserAccount: UserAccount = {
  name: 'Sarah Tan',
  phone: '+6012-882 9134',
  balance: 48.50,
  points: 1420,
  validityDate: '28 Nov 2026',
  planName: 'Hotlink Prepaid Unlimited 5G',
  totalQuotaGb: 60,
  remainingQuotaGb: 42.8,
  hotspotRemainingGb: 8.5,
  hotspotTotalGb: 10,
  is5GActive: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
};

export const samplePasses: PassItem[] = [
  {
    id: 'pass-5g-unl-30d',
    name: 'Unlimited 5G/4G + Calls',
    category: '5g_unlimited',
    price: 45,
    period: '30 Days',
    speed: 'Up to 100 Mbps',
    quotaLabel: 'Unlimited 5G Data (80GB FUP)',
    hotspotLabel: '15 GB High-Speed Hotspot',
    perks: ['Unlimited Calls to all networks', 'Uncapped 5G Speeds', 'Hotlink Points x2 on reload'],
    isPopular: true,
    badge: 'BESTSELLER',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pass-pantas-50',
    name: 'Pantas High-Speed 50GB',
    category: 'pantas',
    price: 35,
    period: '30 Days',
    speed: 'Uncapped up to 300 Mbps',
    quotaLabel: '50 GB All-Access Data',
    hotspotLabel: 'Full data usable as Hotspot',
    perks: ['No speed caps', 'Rollover up to 20GB unused', 'Free 1,000 SMS'],
    isPopular: false,
    badge: 'UNCAPPED 5G',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pass-stream-unl',
    name: 'Stream & Game Unlimited',
    category: 'streaming',
    price: 28,
    period: '30 Days',
    speed: 'HD 1080p Streaming',
    quotaLabel: 'Unlimited YouTube, Netflix & TikTok',
    hotspotLabel: '5 GB General Hotspot',
    perks: ['Zero buffering on Netflix & YouTube', 'MLBB & PUBG ping priority', 'Discord unlimited audio'],
    isPopular: false,
    badge: 'GAMERS CHOICE',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pass-roam-asean',
    name: 'ASEAN 7-Day Roaming Pass',
    category: 'roaming',
    price: 25,
    period: '7 Days',
    speed: 'Partner 5G Roaming',
    quotaLabel: '10 GB High-Speed Roaming',
    hotspotLabel: 'Shareable with friends',
    perks: ['Valid in Singapore, Thailand, Indonesia, Vietnam', 'Auto-connect to premium partners', 'Free 30 mins roaming calls'],
    isPopular: false,
    badge: 'TRAVEL SPECIAL',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pass-booster-10',
    name: 'Instant 15GB 5G Turbo Booster',
    category: 'booster',
    price: 10,
    period: '7 Days',
    speed: 'Maximum 5G Speed',
    quotaLabel: '15 GB Immediate Extra Quota',
    hotspotLabel: 'Includes 5GB Hotspot',
    perks: ['Instant activation', 'Stacks with existing active plan', 'No auto-renewal'],
    isPopular: false,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  },
];

export const sampleRewards: RewardDeal[] = [
  {
    id: 'deal-tealive',
    title: 'Buy 1 Free 1 Any Signature Drink',
    merchant: 'Tealive Malaysia',
    category: 'fnb',
    pointsCost: 250,
    discountBadge: '1-FOR-1',
    expiryDate: '15 Dec 2026',
    imageUrl: 'https://images.unsplash.com/photo-1558857563-b37cfb8cb833?auto=format&fit=crop&w=600&q=80',
    description: 'Enjoy a free handcrafted beverage of equal or lesser value at any Tealive outlet nationwide.',
    voucherCode: 'HOTLINK-TEA-9921',
    claimed: false,
  },
  {
    id: 'deal-grabfood',
    title: 'RM 10 OFF GrabFood Delivery',
    merchant: 'GrabFood',
    category: 'fnb',
    pointsCost: 400,
    discountBadge: 'RM10 OFF',
    expiryDate: '30 Nov 2026',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    description: 'Min spend RM30 on any restaurant order with free delivery perks.',
    voucherCode: 'GRABHOTLINK10',
    claimed: false,
  },
  {
    id: 'deal-pubg',
    title: '600 UC + Rare Weapon Skin Crate',
    merchant: 'PUBG Mobile',
    category: 'gaming',
    pointsCost: 650,
    discountBadge: 'SPECIAL CRATE',
    expiryDate: '20 Dec 2026',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    description: 'Direct in-game credit code redeemable on Midasbuy or in-game redemption center.',
    voucherCode: 'PUBG-HOTLINK-77X',
    claimed: false,
  },
  {
    id: 'deal-cinema',
    title: '50% OFF IMAX / Dolby Atmos Tickets',
    merchant: 'GSC Cinemas',
    category: 'entertainment',
    pointsCost: 350,
    discountBadge: '50% OFF',
    expiryDate: '31 Dec 2026',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    description: 'Valid for all weekend and weekday screenings across 35 GSC cinema complexes.',
    voucherCode: 'GSC-HALF-3382',
    claimed: false,
  },
  {
    id: 'deal-shopee',
    title: 'RM 15 OFF Gadgets & Electronics',
    merchant: 'Shopee Official Mall',
    category: 'shopping',
    pointsCost: 500,
    discountBadge: 'RM15 OFF',
    expiryDate: '12 Dec 2026',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    description: 'Apply on Shopee App checkout for purchases of phone cases, chargers, headphones and more.',
    voucherCode: 'SHOPEE-HOT15',
    claimed: false,
  },
];

export const sampleTransactions: Transaction[] = [
  {
    id: 'tx-101',
    title: 'Online Reload via Touch n Go',
    timestamp: 'Today, 2:15 PM',
    amount: 50.00,
    type: 'reload',
    status: 'successful',
    receiptNo: 'REC-2026-98124',
  },
  {
    id: 'tx-102',
    title: 'Unlimited 5G 30-Day Pass Renew',
    timestamp: '01 Nov 2026, 09:30 AM',
    amount: -45.00,
    type: 'pass_purchase',
    status: 'successful',
    receiptNo: 'REC-2026-97451',
  },
  {
    id: 'tx-103',
    title: 'Claimed Tealive Buy 1 Free 1',
    timestamp: '28 Oct 2026, 4:45 PM',
    amount: -250,
    type: 'reward_redemption',
    status: 'successful',
    receiptNo: 'REW-99120',
  },
  {
    id: 'tx-104',
    title: 'Instant Reload via Maybank2u',
    timestamp: '25 Oct 2026, 11:20 AM',
    amount: 30.00,
    type: 'reload',
    status: 'successful',
    receiptNo: 'REC-2026-94119',
  },
];

export const sampleHtmlTemplates = [
  {
    id: 'hotlink-promo',
    name: 'Hotlink 5G Raya Superpass (Promo)',
    html: `<div class="screen-card">
  <h2>Hotlink 5G Raya Mega Pass</h2>
  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" alt="5G Neon Glow" />
  <p>Experience ultra low-latency 5G with uncapped streaming on YouTube, TikTok, and Spotify.</p>
  <ul>
    <li>⚡ Up to 1 Gbps Ultra-Speed</li>
    <li>🎁 Free RM10 Foodpanda Voucher</li>
    <li>📶 25GB Hotspot Sharing</li>
  </ul>
  <button>Claim RM35 Mega Pass</button>
</div>`,
  },
  {
    id: 'travel-roam',
    name: 'ASEAN & Japan Roam Pass',
    html: `<div class="screen-card">
  <h2>Global Roaming Explorer</h2>
  <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" alt="Tropical Coastline" />
  <p>Seamless 5G connectivity across 15 Asia-Pacific countries with zero SIM swaps.</p>
  <ul>
    <li>🌏 Auto-network selection</li>
    <li>📱 Keep your local WhatsApp active</li>
    <li>💬 24/7 Priority Travel Assistance</li>
  </ul>
  <button>Activate Roaming Pass RM25</button>
</div>`,
  },
  {
    id: 'gamer-lounge',
    name: 'HotlinkMU Gaming & MLBB Gear',
    html: `<div class="screen-card">
  <h2>Level Up with HotlinkMU</h2>
  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80" alt="Esports Gaming Room" />
  <p>Exclusive server ping booster routes for Mobile Legends, Free Fire, and Valorant mobile.</p>
  <ul>
    <li>🎮 Dedicated ping under 15ms</li>
    <li>💎 Double Diamonds on Codashop</li>
    <li>🏆 Weekly Tournament Passes</li>
  </ul>
  <button>Get Gamer Bundle</button>
</div>`,
  },
];

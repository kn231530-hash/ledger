export type ScreenType = 'home' | 'passes' | 'rewards' | 'topup' | 'profile' | 'importer';

export type ViewMode = 'phone' | 'fluid' | 'gallery';

export interface UserAccount {
  name: string;
  phone: string;
  balance: number;
  points: number;
  validityDate: string;
  planName: string;
  totalQuotaGb: number;
  remainingQuotaGb: number;
  hotspotRemainingGb: number;
  hotspotTotalGb: number;
  is5GActive: boolean;
  avatarUrl: string;
}

export type PassCategory = '5g_unlimited' | 'pantas' | 'streaming' | 'roaming' | 'booster';

export interface PassItem {
  id: string;
  name: string;
  category: PassCategory;
  price: number;
  period: string;
  speed: string;
  quotaLabel: string;
  hotspotLabel?: string;
  perks: string[];
  isPopular?: boolean;
  badge?: string;
  imageUrl: string;
}

export interface RewardDeal {
  id: string;
  title: string;
  merchant: string;
  category: 'fnb' | 'entertainment' | 'shopping' | 'gaming';
  pointsCost: number;
  discountBadge: string;
  expiryDate: string;
  imageUrl: string;
  description: string;
  voucherCode: string;
  claimed?: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  timestamp: string;
  amount: number;
  type: 'reload' | 'pass_purchase' | 'reward_redemption' | 'sos_credit';
  status: 'successful' | 'processing' | 'failed';
  receiptNo: string;
}

export interface ParsedScreenData {
  title: string;
  description: string;
  images: string[];
  buttons: string[];
  bulletPoints: string[];
  rawSnippet: string;
}

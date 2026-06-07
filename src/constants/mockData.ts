// ─── Shared types ────────────────────────────────────────────────────────────

export interface Admin {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

// ─── Overview ────────────────────────────────────────────────────────────────

export interface OverviewResponse {
  newSignups: number;
  newSignupsTrend: number;
  gmv: number;
  gmvTrend: number;
  revenue: number;
  revenueTrend: number;
  transactionSuccessRate: number;
  successRateTrend: number;
  d30Retention: number;
  d30RetentionTrend: number;
}

// ─── Time series ─────────────────────────────────────────────────────────────

export interface TimeSeriesPoint {
  date: string;
  value: number;
  series: string;
}

// ─── Acquisition ─────────────────────────────────────────────────────────────

export interface ChannelBreakdown {
  channel: string;
  users: number;
  percentage: number;
}

export interface AcquisitionResponse {
  totalSignups: number;
  signupsTrend: number;
  series: TimeSeriesPoint[];
  channels: ChannelBreakdown[];
}

// ─── Activation ──────────────────────────────────────────────────────────────

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
}

export interface ActivationResponse {
  medianHoursToFirstTxn: number;
  medianTrend: number;
  p90HoursToActivation: number;
  p90Trend: number;
  funnel: FunnelStage[];
}

// ─── Retention ───────────────────────────────────────────────────────────────

export type CohortStatus = 'healthy' | 'warning' | 'regression' | 'pending';

export interface CohortRow {
  key: string;
  cohortMonth: string;
  size: number;
  d7Percent: number | null;
  d30Percent: number | null;
  status: CohortStatus;
}

export interface RetentionSummary {
  averageD30: number;
  churnRate: number;
  stickiness: number;
  ltvForecastNgn: number;
  cohorts: CohortRow[];
}

// ─── Revenue ─────────────────────────────────────────────────────────────────

export interface RevenuePoint {
  date: string;
  revenue: number;
}

export interface RevenueStats {
  arpu: number;
  arpuTrend: number;
  rpau: number;
  rpauTrend: number;
  takeRatePercent: number;
  trendLabel: string;
  series: RevenuePoint[];
}

// ─── Transactions ────────────────────────────────────────────────────────────

export interface TransactionVolumePoint {
  date: string;
  offramp: number;
  billPayment: number;
  onramp: number;
}

export interface FailureRow {
  key: string;
  reason: string;
  count: number;
  percentage: number;
}

export interface TransactionStats {
  avgProcessingSeconds: number;
  processingTrend: number;
  p99Seconds: number;
  p90Seconds: number;
  p50Seconds: number;
  volumeSeries: TransactionVolumePoint[];
  failures: FailureRow[];
}

// ─── Engagement ──────────────────────────────────────────────────────────────

export interface EngagementStats {
  stickinessPercent: number;
  stickinessTrend: number;
  avgSessionsPerUser: number;
  sessionsTrend: number;
  series: TimeSeriesPoint[];
}

// ─── Mock data ───────────────────────────────────────────────────────────────

export const MOCK_LOGIN: LoginResponse = {
  token: 'mock-jwt-token-linq-admin',
  admin: { id: 1, email: 'admin@linq.so', name: 'LINQ Admin', role: 'Administrator' },
};

export const MOCK_OVERVIEW: OverviewResponse = {
  newSignups: 12482,
  newSignupsTrend: 14.2,
  gmv: 2260000,
  gmvTrend: 12.4,
  revenue: 45200,
  revenueTrend: 4.2,
  transactionSuccessRate: 94.2,
  successRateTrend: 0.8,
  d30Retention: 24.8,
  d30RetentionTrend: 1.2,
};

const days = (n: number) => {
  const pts = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    pts.push(d.toISOString().split('T')[0]);
  }
  return pts;
};

const dates30 = days(30);

export const MOCK_ACQUISITION: AcquisitionResponse = {
  totalSignups: 12482,
  signupsTrend: 14.2,
  series: [
    ...dates30.map((date, i) => ({ date, value: 320 + Math.round(Math.sin(i / 3) * 80 + i * 4), series: 'New Signups' })),
    ...dates30.map((date, i) => ({ date, value: 210 + Math.round(Math.sin(i / 4) * 50 + i * 2.5), series: 'KYC Completions' })),
  ],
  channels: [
    { channel: 'Organic', users: 5980, percentage: 47.9 },
    { channel: 'Referral', users: 3120, percentage: 25.0 },
    { channel: 'Paid Ads', users: 2241, percentage: 18.0 },
    { channel: 'Influencer', users: 1141, percentage: 9.1 },
  ],
};

export const MOCK_ACTIVATION: ActivationResponse = {
  medianHoursToFirstTxn: 11.3,
  medianTrend: -1.2,
  p90HoursToActivation: 72.1,
  p90Trend: 4.5,
  funnel: [
    { stage: 'Signups', count: 12450, percentage: 100 },
    { stage: 'KYC Completed', count: 8466, percentage: 68 },
    { stage: 'First Transaction', count: 5229, percentage: 42 },
  ],
};

export const MOCK_RETENTION: RetentionSummary = {
  averageD30: 24.8,
  churnRate: 3.1,
  stickiness: 42.5,
  ltvForecastNgn: 18400,
  cohorts: [
    { key: '1', cohortMonth: 'October 2024', size: 2840, d7Percent: 48.2, d30Percent: 31.4, status: 'healthy' },
    { key: '2', cohortMonth: 'November 2024', size: 3120, d7Percent: 45.6, d30Percent: 28.9, status: 'healthy' },
    { key: '3', cohortMonth: 'December 2024', size: 2650, d7Percent: 41.2, d30Percent: 22.1, status: 'warning' },
    { key: '4', cohortMonth: 'January 2025', size: 3410, d7Percent: 38.7, d30Percent: 11.8, status: 'regression' },
    { key: '5', cohortMonth: 'February 2025', size: 4210, d7Percent: 42.1, d30Percent: 24.8, status: 'healthy' },
    { key: '6', cohortMonth: 'March 2025', size: 3890, d7Percent: 39.5, d30Percent: null, status: 'pending' },
  ],
};

export const MOCK_REVENUE: RevenueStats = {
  arpu: 0.92,
  arpuTrend: 4.2,
  rpau: 1.74,
  rpauTrend: -1.5,
  takeRatePercent: 2.0,
  trendLabel: 'Stable',
  series: dates30.map((date, i) => ({
    date,
    revenue: 1200 + Math.round(Math.sin(i / 4) * 300 + i * 45),
  })),
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MOCK_TRANSACTIONS: TransactionStats = {
  avgProcessingSeconds: 4.2,
  processingTrend: -0.8,
  p99Seconds: 12.4,
  p90Seconds: 6.1,
  p50Seconds: 3.8,
  volumeSeries: weekDays.map((date) => ({
    date,
    offramp: 1200 + Math.round(Math.random() * 600),
    billPayment: 800 + Math.round(Math.random() * 400),
    onramp: 400 + Math.round(Math.random() * 300),
  })),
  failures: [
    { key: '1', reason: 'wallet_timeout', count: 842, percentage: 42.1 },
    { key: '2', reason: 'bank_transfer_failed', count: 624, percentage: 31.2 },
    { key: '3', reason: 'insufficient_funds', count: 300, percentage: 15.0 },
    { key: '4', reason: 'kyc_unverified', count: 150, percentage: 7.5 },
    { key: '5', reason: 'fraud_threshold_met', count: 84, percentage: 4.2 },
  ],
};

export const MOCK_ENGAGEMENT: EngagementStats = {
  stickinessPercent: 7.6,
  stickinessTrend: 1.2,
  avgSessionsPerUser: 2.3,
  sessionsTrend: 0.4,
  series: [
    ...dates30.map((date, i) => ({ date, value: 1800 + Math.round(Math.sin(i / 3) * 200 + i * 15), series: 'DAU' })),
    ...dates30.map((date, i) => ({ date, value: 8400 + Math.round(Math.sin(i / 4) * 500 + i * 40), series: 'WAU' })),
    ...dates30.map((date, i) => ({ date, value: 23600 + Math.round(Math.sin(i / 5) * 800 + i * 60), series: 'MAU' })),
  ],
};

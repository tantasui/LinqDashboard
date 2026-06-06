export interface OverviewMetrics {
  period: string;
  users: { new_signups: number; kyc_completed: number; signup_to_kyc_rate: number };
  activation: { kyc_to_first_txn_rate: number; avg_ttft_hours: number; activated_users: number };
  gmv: { total_usdc: number; offramp_usdc: number; onramp_usdc: number; bill_ngn: number };
  revenue: { total_usdc: number; per_active_user: number; arpu: number };
  transactions: { total: number; success_rate: number; failed: number };
  retention: { d7: number; d30: number };
}

export interface ActivationFunnelResponse {
  cohort_month: string;
  stage_1_signups: number;
  stage_2_kyc_completed: number;
  stage_3_first_transaction: number;
  signup_to_kyc_rate: number;
  kyc_to_first_txn_rate: number;
  overall_activation_rate: number;
  median_ttft_hours: number;
  p90_ttft_hours: number;
}

export interface UserAcquisitionPoint {
  date: string;
  new_signups: number;
  kyc_completions: number;
  channel_breakdown?: Record<string, number>;
}

export interface EngagementPoint {
  date: string;
  dau: number;
  wau: number;
  mau: number;
  stickiness_ratio: number;
  avg_sessions_per_user: number;
  avg_txns_per_user_per_week: number;
}

export interface FailureReason {
  reason: string;
  count: number;
}

export interface TransactionPoint {
  date: string;
  offramp_count: number;
  onramp_count: number;
  bill_count: number;
  failure_reasons: FailureReason[];
  avg_processing_time: number;
}

export interface RevenuePoint {
  date: string;
  total_revenue: number;
  revenue_per_txn: number;
  rpau: number;
  arpu: number;
  take_rate: number;
}

export interface CohortRetention {
  cohort_month: string;
  size: number;
  d7: number;
  d30: number;
}

export interface RetentionSummaryResponse {
  cohorts: CohortRetention[];
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

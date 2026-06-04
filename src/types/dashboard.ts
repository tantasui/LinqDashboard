export interface OverviewMetrics {
  newSignups: number;
  gmv: number;
  revenue: number;
  transactionSuccessRate: number; // percentage (0-100)
  d30Retention: number; // percentage (0-100)
}

export interface UserAcquisitionPoint {
  date: string;
  signups: number;
  channel?: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
}

export interface EngagementPoint {
  date: string;
  dau: number;
  wau: number;
  mau: number;
}

export interface TransactionPoint {
  date: string;
  offrampCount: number;
  onrampCount: number;
  offrampVolume: number;
  onrampVolume: number;
}

export interface CohortRetention {
  key?: string;
  cohortMonth: string;
  size: number;
  d7Percent: number;
  d30Percent: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

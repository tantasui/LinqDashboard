import type {
  LoginResponse,
  OverviewResponse,
  AcquisitionResponse,
  ActivationResponse,
  RetentionSummary,
  RevenueStats,
  TransactionStats,
  EngagementStats,
} from '@/constants/mockData';
import {
  MOCK_LOGIN,
  MOCK_OVERVIEW,
  MOCK_ACQUISITION,
  MOCK_ACTIVATION,
  MOCK_RETENTION,
  MOCK_REVENUE,
  MOCK_TRANSACTIONS,
  MOCK_ENGAGEMENT,
} from '@/constants/mockData';

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function login(email: string, password: string): Promise<LoginResponse> {
  await delay(300);
  if (email === 'admin@linq.so' && password === 'admin') return MOCK_LOGIN;
  throw new Error('Invalid credentials');
}

export async function getOverview(): Promise<OverviewResponse> {
  await delay(300);
  return MOCK_OVERVIEW;
}

export async function getAcquisition(
  _from: string,
  _to: string,
  _granularity: 'daily' | 'weekly' | 'monthly'
): Promise<AcquisitionResponse> {
  await delay(300);
  return MOCK_ACQUISITION;
}

export async function getActivationFunnel(_cohortMonth: string): Promise<ActivationResponse> {
  await delay(300);
  return MOCK_ACTIVATION;
}

export async function getRetentionSummary(_fromMonth: string, _toMonth: string): Promise<RetentionSummary> {
  await delay(300);
  return MOCK_RETENTION;
}

export async function getRevenue(_from: string, _to: string): Promise<RevenueStats> {
  await delay(300);
  return MOCK_REVENUE;
}

export async function getTransactions(_from: string, _to: string): Promise<TransactionStats> {
  await delay(300);
  return MOCK_TRANSACTIONS;
}

export async function getEngagement(_from: string, _to: string): Promise<EngagementStats> {
  await delay(300);
  return MOCK_ENGAGEMENT;
}

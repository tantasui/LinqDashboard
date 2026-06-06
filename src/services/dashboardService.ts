import api from './api';
import { 
  OverviewMetrics, 
  UserAcquisitionPoint,
  ActivationFunnelResponse,
  EngagementPoint,
  TransactionPoint,
  RevenuePoint,
  RetentionSummaryResponse
} from '@/types/dashboard';

export const dashboardService = {
  getOverview: async (from?: string, to?: string): Promise<OverviewMetrics> => {
    const res = await api.get('/admin/dashboard/overview', { params: { from, to } });
    return res.data;
  },

  getUserAcquisition: async (from?: string, to?: string, granularity?: string): Promise<UserAcquisitionPoint[]> => {
    const res = await api.get('/admin/dashboard/users', { params: { from, to, granularity } });
    return res.data;
  },

  getActivationFunnel: async (cohort_month?: string): Promise<ActivationFunnelResponse> => {
    const res = await api.get('/admin/dashboard/activation-funnel', { params: { cohort_month } });
    return res.data;
  },

  getEngagement: async (from?: string, to?: string): Promise<EngagementPoint[]> => {
    const res = await api.get('/admin/dashboard/engagement', { params: { from, to } });
    return res.data;
  },

  getTransactions: async (from?: string, to?: string): Promise<TransactionPoint[]> => {
    const res = await api.get('/admin/dashboard/transactions', { params: { from, to } });
    return res.data;
  },

  getRevenue: async (from?: string, to?: string): Promise<RevenuePoint[]> => {
    const res = await api.get('/admin/dashboard/revenue', { params: { from, to } });
    return res.data;
  },

  getRetentionSummary: async (): Promise<RetentionSummaryResponse> => {
    const res = await api.get('/admin/dashboard/retention-summary');
    return res.data;
  }
};

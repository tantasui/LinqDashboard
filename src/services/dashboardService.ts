import api from './api';
import { 
  OverviewMetrics, 
  UserAcquisitionPoint,
  FunnelStage,
  EngagementPoint,
  TransactionPoint,
  CohortRetention
} from '@/types/dashboard';

// These endpoints correspond to Phase 1 in the LINQ METRICS DASHBOARD PLAN.
// Note: They do not exist on the backend yet, so we return null/stubs for now,
// or we make the call and gracefully handle 404s in the components.

export const dashboardService = {
  getOverview: async (start?: string, end?: string): Promise<OverviewMetrics | null> => {
    try {
      const res = await api.get('/admin/dashboard/overview', { params: { start, end } });
      return res.data;
    } catch (e) {
      return null;
    }
  },

  getUserAcquisition: async (start?: string, end?: string): Promise<UserAcquisitionPoint[] | null> => {
    try {
      const res = await api.get('/admin/dashboard/users', { params: { start, end } });
      return res.data;
    } catch (e) {
      return null;
    }
  },

  getActivationFunnel: async (start?: string, end?: string): Promise<FunnelStage[] | null> => {
    try {
      const res = await api.get('/admin/dashboard/activation-funnel', { params: { start, end } });
      return res.data;
    } catch (e) {
      return null;
    }
  },

  getEngagement: async (start?: string, end?: string): Promise<EngagementPoint[] | null> => {
    try {
      const res = await api.get('/admin/dashboard/engagement', { params: { start, end } });
      return res.data;
    } catch (e) {
      return null;
    }
  },

  getTransactions: async (start?: string, end?: string): Promise<TransactionPoint[] | null> => {
    try {
      const res = await api.get('/admin/dashboard/transactions', { params: { start, end } });
      return res.data;
    } catch (e) {
      return null;
    }
  },

  getRetentionSummary: async (): Promise<CohortRetention[] | null> => {
    try {
      const res = await api.get('/admin/dashboard/retention-summary');
      return res.data;
    } catch (e) {
      return null;
    }
  }
};

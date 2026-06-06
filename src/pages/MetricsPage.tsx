import React, { useState, useEffect } from 'react';
import { Row, Col, DatePicker, Typography, Space, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type {
  OverviewMetrics,
  UserAcquisitionPoint,
  ActivationFunnelResponse,
  EngagementPoint,
  TransactionPoint,
  RevenuePoint,
  RetentionSummaryResponse,
} from '@/types/dashboard';
import { dashboardService } from '@/services/dashboardService';
import { OverviewStats } from '@/components/OverviewStats';
import { RetentionTable } from '@/components/RetentionTable';
import {
  UserAcquisitionChart,
  ActivationFunnelChart,
  EngagementChart,
  TransactionsChart,
  RevenueChart,
} from '@/components/charts';
import { FloatingChatButton } from '@/components/FloatingChatButton';

const { RangePicker } = DatePicker;
const { Title } = Typography;

// Helper to manage state for each section
function useFetchSection<T>(fetchFn: (from?: string, to?: string) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (from?: string, to?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn(from, to);
      setData(result);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
}

export const MetricsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [funnelCohort, setFunnelCohort] = useState<string | undefined>(undefined);

  const overview = useFetchSection<OverviewMetrics>(dashboardService.getOverview);
  const acquisition = useFetchSection<UserAcquisitionPoint[]>((from, to) => dashboardService.getUserAcquisition(from, to, 'daily'));
  const engagement = useFetchSection<EngagementPoint[]>(dashboardService.getEngagement);
  const transactions = useFetchSection<TransactionPoint[]>(dashboardService.getTransactions);
  const revenue = useFetchSection<RevenuePoint[]>(dashboardService.getRevenue);
  const retention = useFetchSection<RetentionSummaryResponse>(dashboardService.getRetentionSummary);

  // Funnel uses cohort month, not the global date range
  const funnel = useFetchSection<ActivationFunnelResponse>(() => dashboardService.getActivationFunnel(funnelCohort));

  // Global fetch effect triggered by dateRange
  useEffect(() => {
    const from = dateRange ? dateRange[0].format('YYYY-MM-DD') : undefined;
    const to = dateRange ? dateRange[1].format('YYYY-MM-DD') : undefined;

    overview.fetchData(from, to);
    acquisition.fetchData(from, to);
    engagement.fetchData(from, to);
    transactions.fetchData(from, to);
    revenue.fetchData(from, to);
    retention.fetchData(); // Retention ignores date range as it shows all cohorts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  // Separate effect for funnel since it depends on cohort dropdown
  useEffect(() => {
    funnel.fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [funnelCohort]);

  // Generate some recent months for the funnel dropdown
  const cohortOptions = Array.from({ length: 6 }).map((_, i) => {
    const d = dayjs().subtract(i, 'month');
    return { label: d.format('MMMM YYYY'), value: d.format('YYYY-MM') };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header Row */}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3} style={{ margin: 0 }}>Metrics Overview</Title>
        </Col>
        <Col>
          <Space>
            <RangePicker
              onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
            />
          </Space>
        </Col>
      </Row>

      {/* KPI Stats */}
      <OverviewStats 
        data={overview.data} 
        isLoading={overview.isLoading} 
        error={overview.error} 
      />

      {/* Charts Grid */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <UserAcquisitionChart 
            data={acquisition.data} 
            isLoading={acquisition.isLoading} 
            error={acquisition.error} 
          />
        </Col>

        <Col xs={24} lg={12}>
          <ActivationFunnelChart 
            data={funnel.data} 
            isLoading={funnel.isLoading} 
            error={funnel.error} 
            extra={
              <Select
                placeholder="Select Cohort"
                allowClear
                style={{ width: 150 }}
                value={funnelCohort}
                onChange={setFunnelCohort}
                options={cohortOptions}
              />
            }
          />
        </Col>

        <Col xs={24} lg={12}>
          <EngagementChart 
            data={engagement.data} 
            isLoading={engagement.isLoading} 
            error={engagement.error} 
          />
        </Col>

        <Col xs={24} lg={12}>
          <TransactionsChart 
            data={transactions.data} 
            isLoading={transactions.isLoading} 
            error={transactions.error} 
          />
        </Col>

        <Col xs={24}>
          <RevenueChart 
            data={revenue.data} 
            isLoading={revenue.isLoading} 
            error={revenue.error} 
          />
        </Col>
      </Row>

      {/* Retention Table */}
      <Row>
        <Col span={24}>
          <RetentionTable 
            data={retention.data ? retention.data.cohorts : null} 
            isLoading={retention.isLoading} 
            error={retention.error} 
          />
        </Col>
      </Row>

      <FloatingChatButton />
    </div>
  );
};

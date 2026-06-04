import React, { useState } from 'react';
import { Row, Col, DatePicker, Typography, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import type {
  OverviewMetrics,
  UserAcquisitionPoint,
  FunnelStage,
  EngagementPoint,
  TransactionPoint,
  CohortRetention,
} from '@/types/dashboard';
import { OverviewStats } from '@/components/OverviewStats';
import { MetricCard } from '@/components/MetricCard';
import { RetentionTable } from '@/components/RetentionTable';
import {
  UserAcquisitionChart,
  ActivationFunnelChart,
  EngagementChart,
  TransactionsChart,
} from '@/components/charts';
import { FloatingChatButton } from '@/components/FloatingChatButton';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export const MetricsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

  // No API calls in this ticket — all data is null or hardcoded stub.
  // When backend endpoints land (LINQ-06/07/08), replace these with
  // fetched data from dashboardService.
  const isLoading = false;

  const overviewData: OverviewMetrics | null = null;
  const acquisitionData: UserAcquisitionPoint[] | null = null;
  const funnelData: FunnelStage[] | null = null;
  const engagementData: EngagementPoint[] | null = null;
  const transactionsData: TransactionPoint[] | null = null;
  const retentionData: CohortRetention[] | null = null;

  // dateRange is kept in page-level state and can be passed as props
  // to child components when data fetching is wired up.
  const _dateRange = dateRange; // suppress unused warning — wired in next ticket
  void _dateRange;

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
      <OverviewStats data={overviewData} isLoading={isLoading} />

      {/* Charts Grid */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <MetricCard title="User Acquisition" isLoading={isLoading}>
            <UserAcquisitionChart data={acquisitionData} isLoading={isLoading} />
          </MetricCard>
        </Col>

        <Col xs={24} lg={12}>
          <MetricCard title="Activation Funnel" isLoading={isLoading}>
            <ActivationFunnelChart data={funnelData} isLoading={isLoading} />
          </MetricCard>
        </Col>

        <Col xs={24} lg={12}>
          <MetricCard title="Engagement (DAU / WAU / MAU)" isLoading={isLoading}>
            <EngagementChart data={engagementData} isLoading={isLoading} />
          </MetricCard>
        </Col>

        <Col xs={24} lg={12}>
          <MetricCard title="Transactions" isLoading={isLoading}>
            <TransactionsChart data={transactionsData} isLoading={isLoading} />
          </MetricCard>
        </Col>
      </Row>

      {/* Retention Table */}
      <Row>
        <Col span={24}>
          <MetricCard title="Retention by Cohort" isLoading={isLoading}>
            <RetentionTable data={retentionData} isLoading={isLoading} />
          </MetricCard>
        </Col>
      </Row>

      <FloatingChatButton />
    </div>
  );
};

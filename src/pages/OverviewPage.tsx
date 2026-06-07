import { useCallback } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMetricFetch } from '@/hooks/useMetricFetch';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { getOverview, getRetentionSummary } from '@/api/endpoints';
import { SectionCard } from '@/components/common/SectionCard';
import { StatTile } from '@/components/common/StatTile';
import { StatusChip } from '@/components/common/StatusChip';
import { LineChart } from '@/components/charts/LineChart';
import { colors } from '@/theme';
import { formatNumber, formatCurrency, formatPercent } from '@/utils/formatMetric';
import type { CohortRow } from '@/constants/mockData';
import { MOCK_ACQUISITION } from '@/constants/mockData';

function getD30Status(pct: number | null) {
  if (pct == null) return 'pending' as const;
  if (pct >= 30) return 'success' as const;
  if (pct >= 15) return 'warning' as const;
  return 'error' as const;
}

const cohortColumns: ColumnsType<CohortRow> = [
  { title: 'Cohort', dataIndex: 'cohortMonth', key: 'cohortMonth', render: (v: string) => <span style={{ color: colors.textPrimary, fontSize: 13 }}>{v}</span> },
  { title: 'Size', dataIndex: 'size', key: 'size', render: (v: number) => <span style={{ color: colors.textSecondary }}>{formatNumber(v)}</span> },
  {
    title: 'D7',
    dataIndex: 'd7Percent',
    key: 'd7',
    render: (v: number | null) =>
      v != null ? <StatusChip label={formatPercent(v)} status={getD30Status(v)} /> : <span style={{ color: colors.textMuted }}>—</span>,
  },
  {
    title: 'D30',
    dataIndex: 'd30Percent',
    key: 'd30',
    render: (v: number | null) =>
      v != null ? <StatusChip label={formatPercent(v)} status={getD30Status(v)} /> : <span style={{ color: colors.textMuted }}>—</span>,
  },
];

export function OverviewPage() {
  const { isMobile, isTablet } = useBreakpoint();

  const overviewFetcher = useCallback(() => getOverview(), []);
  const retentionFetcher = useCallback(() => getRetentionSummary('', ''), []);

  const { data: overview, loading: ovLoading } = useMetricFetch(overviewFetcher);
  const { data: retention, loading: retLoading } = useMetricFetch(retentionFetcher);

  const statCols = isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)';
  const chartCols = isMobile || isTablet ? '1fr' : '3fr 2fr';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Stat tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: statCols, gap: 12 }}>
        <StatTile label="New Signups" value={overview ? formatNumber(overview.newSignups) : null} trend={overview?.newSignupsTrend} accentColor={colors.secondary} isLoading={ovLoading} />
        <StatTile label="GMV" value={overview ? formatCurrency(overview.gmv) : null} trend={overview?.gmvTrend} accentColor={colors.primary} isLoading={ovLoading} />
        <StatTile label="Revenue" value={overview ? formatCurrency(overview.revenue) : null} trend={overview?.revenueTrend} accentColor={colors.success} isLoading={ovLoading} />
        <StatTile label="Success Rate" value={overview ? formatPercent(overview.transactionSuccessRate) : null} trend={overview?.successRateTrend} accentColor={colors.success} isLoading={ovLoading} />
        <StatTile label="D30 Retention" value={overview ? formatPercent(overview.d30Retention) : null} trend={overview?.d30RetentionTrend} accentColor={colors.warning} isLoading={ovLoading} />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: chartCols, gap: 16 }}>
        <SectionCard title="Transaction Trend" loading={ovLoading}>
          <LineChart data={MOCK_ACQUISITION.series} height={isMobile ? 200 : 260} />
        </SectionCard>

        <SectionCard title="Retention Snapshot" loading={retLoading}>
          {retention && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <Tag color="success">Avg D30: {formatPercent(retention.averageD30)}</Tag>
              <Tag color="warning">Churn: {formatPercent(retention.churnRate)}</Tag>
            </div>
          )}
          <div style={{ overflowX: 'auto' }}>
            <Table<CohortRow>
              dataSource={retention?.cohorts.slice(0, 4) ?? []}
              columns={cohortColumns}
              size="small"
              pagination={false}
              rowKey="key"
              style={{ background: 'transparent' }}
            />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

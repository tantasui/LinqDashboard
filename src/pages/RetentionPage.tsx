import { useCallback } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMetricFetch } from '@/hooks/useMetricFetch';
import { getRetentionSummary } from '@/api/endpoints';
import { SectionCard } from '@/components/common/SectionCard';
import { StatTile } from '@/components/common/StatTile';
import { StatusChip } from '@/components/common/StatusChip';
import type { ChipStatus } from '@/components/common/StatusChip';
import { colors } from '@/theme';
import { formatNumber, formatPercent, formatNGN } from '@/utils/formatMetric';
import type { CohortRow } from '@/constants/mockData';

function d30Status(pct: number | null): ChipStatus {
  if (pct == null) return 'pending';
  if (pct >= 30) return 'success';
  if (pct >= 15) return 'warning';
  return 'error';
}

const columns: ColumnsType<CohortRow> = [
  {
    title: 'Cohort Month',
    dataIndex: 'cohortMonth',
    key: 'cohortMonth',
    render: (v: string) => <span style={{ color: colors.textPrimary }}>{v}</span>,
  },
  {
    title: 'Cohort Size',
    dataIndex: 'size',
    key: 'size',
    render: (v: number) => <span style={{ color: colors.textSecondary, fontFamily: "'JetBrains Mono', monospace" }}>{formatNumber(v)}</span>,
  },
  {
    title: 'D7 Retention',
    dataIndex: 'd7Percent',
    key: 'd7',
    render: (v: number | null) =>
      v != null
        ? <StatusChip label={formatPercent(v)} status={d30Status(v)} />
        : <span style={{ color: colors.textMuted }}>—</span>,
  },
  {
    title: 'D30 Retention',
    dataIndex: 'd30Percent',
    key: 'd30',
    render: (v: number | null) =>
      v != null
        ? <StatusChip label={formatPercent(v)} status={d30Status(v)} />
        : <span style={{ color: colors.textMuted }}>—</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (v: string) => {
      const map: Record<string, { label: string; status: ChipStatus }> = {
        healthy: { label: 'Healthy', status: 'success' },
        warning: { label: 'Warning', status: 'warning' },
        regression: { label: 'Regression', status: 'error' },
        pending: { label: 'Pending', status: 'neutral' },
      };
      const item = map[v] ?? { label: v, status: 'neutral' as ChipStatus };
      return <StatusChip label={item.label} status={item.status} />;
    },
  },
];

export function RetentionPage() {
  const fetcher = useCallback(() => getRetentionSummary('', ''), []);
  const { data, loading } = useMetricFetch(fetcher);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatTile label="Avg D30 Retention" value={data ? formatPercent(data.averageD30) : null} accentColor={colors.success} isLoading={loading} />
        <StatTile label="Churn Rate" value={data ? formatPercent(data.churnRate) : null} accentColor={colors.errorStrong} isLoading={loading} />
        <StatTile label="Stickiness (DAU/MAU)" value={data ? formatPercent(data.stickiness) : null} accentColor={colors.secondary} isLoading={loading} />
        <StatTile label="LTV Forecast" value={data ? formatNGN(data.ltvForecastNgn) : null} accentColor={colors.warning} isLoading={loading} />
      </div>

      {/* Cohort table */}
      <SectionCard title="Retention by Cohort" subtitle="D7 and D30 retention rates per cohort month" loading={loading}>
        <Table<CohortRow>
          dataSource={data?.cohorts ?? []}
          columns={columns}
          pagination={false}
          rowKey="key"
          rowClassName={(r) => r.status === 'regression' ? 'regression-row' : ''}
          style={{ background: 'transparent' }}
        />
      </SectionCard>
    </div>
  );
}

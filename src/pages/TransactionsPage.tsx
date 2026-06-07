import { useCallback } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMetricFetch } from '@/hooks/useMetricFetch';
import { getTransactions } from '@/api/endpoints';
import { SectionCard } from '@/components/common/SectionCard';
import { StatTile } from '@/components/common/StatTile';
import { BarChart } from '@/components/charts/BarChart';
import { colors } from '@/theme';
import { formatSeconds, formatPercent } from '@/utils/formatMetric';
import { useDashboardStore } from '@/store/dashboardStore';
import { toApiDateRange } from '@/utils/dates';
import type { FailureRow } from '@/constants/mockData';

const failureColumns: ColumnsType<FailureRow> = [
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason',
    render: (v: string) => <span className="fira-code" style={{ color: colors.textPrimary }}>{v}</span>,
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
    render: (v: number) => <span style={{ color: colors.textSecondary }}>{v.toLocaleString()}</span>,
  },
  {
    title: '% of Failures',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (v: number) => {
      const color = v > 35 ? colors.errorStrong : v > 20 ? colors.warning : colors.textMuted;
      return <span style={{ color, fontWeight: 600 }}>{formatPercent(v)}</span>;
    },
  },
];

export function TransactionsPage() {
  const { dateRange } = useDashboardStore();
  const { from, to } = toApiDateRange(dateRange);

  const fetcher = useCallback(() => getTransactions(from, to), [from, to]);
  const { data, loading } = useMetricFetch(fetcher);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Volume chart */}
      <SectionCard title="Transaction Volume" subtitle="Offramp / Bill Payment / Onramp" loading={loading}>
        <BarChart data={data?.volumeSeries ?? []} height={300} />
      </SectionCard>

      {/* Failure table + processing time */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
        <SectionCard title="Failure Breakdown" loading={loading}>
          <Table<FailureRow>
            dataSource={data?.failures ?? []}
            columns={failureColumns}
            pagination={false}
            rowKey="key"
            size="small"
            style={{ background: 'transparent' }}
          />
        </SectionCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <StatTile
            label="Avg Processing Time"
            value={data ? formatSeconds(data.avgProcessingSeconds) : null}
            trend={data?.processingTrend}
            accentColor={colors.secondary}
            isLoading={loading}
          />
          {data && !loading && (
            <div
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Percentiles
              </div>
              {[
                { label: 'P99', value: data.p99Seconds },
                { label: 'P90', value: data.p90Seconds },
                { label: 'P50', value: data.p50Seconds },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>{label}</span>
                  <span style={{ fontFamily: colors.fontMono, fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>
                    {formatSeconds(value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

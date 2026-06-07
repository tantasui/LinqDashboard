import { useCallback } from 'react';
import { useMetricFetch } from '@/hooks/useMetricFetch';
import { getRevenue } from '@/api/endpoints';
import { SectionCard } from '@/components/common/SectionCard';
import { StatTile } from '@/components/common/StatTile';
import { colors } from '@/theme';
import { formatPercent, formatTrend } from '@/utils/formatMetric';
import { useDashboardStore } from '@/store/dashboardStore';
import { toApiDateRange } from '@/utils/dates';
import Line from '@ant-design/plots/es/components/line';
import { Skeleton } from 'antd';

export function RevenuePage() {
  const { dateRange } = useDashboardStore();
  const { from, to } = toApiDateRange(dateRange);

  const fetcher = useCallback(() => getRevenue(from, to), [from, to]);
  const { data, loading } = useMetricFetch(fetcher);

  const chartData = (data?.series ?? []).map((p) => ({ date: p.date, value: p.revenue, series: 'Revenue' }));

  const trendInfo = data ? formatTrend(data.arpuTrend ?? null) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Revenue chart */}
      <SectionCard
        title="Revenue Over Time"
        subtitle={trendInfo ? `${trendInfo.label} vs prior period` : undefined}
        loading={loading}
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <Line
            data={chartData}
            xField="date"
            yField="value"
            colorField="series"
            height={300}
            autoFit
            smooth
            color={[colors.primary]}
            area={{ style: { fillOpacity: 0.12 } }}
            axis={{
              x: { labelFill: colors.textMuted, labelFontSize: 12, line: false, grid: false },
              y: { labelFill: colors.textMuted, labelFontSize: 12, line: false, gridStroke: colors.borderSubtle },
            }}
            theme="dark"
          />
        )}
      </SectionCard>

      {/* KPI tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <StatTile
          label="ARPU"
          value={data ? `$${data.arpu.toFixed(2)}` : null}
          trend={data?.arpuTrend}
          accentColor={colors.primary}
          isLoading={loading}
        />
        <StatTile
          label="RPAU"
          value={data ? `$${data.rpau.toFixed(2)}` : null}
          trend={data?.rpauTrend}
          accentColor={colors.secondary}
          isLoading={loading}
        />
        <StatTile
          label="Take Rate"
          value={data ? formatPercent(data.takeRatePercent) : null}
          unit={data?.trendLabel}
          accentColor={colors.success}
          isLoading={loading}
        />
      </div>
    </div>
  );
}

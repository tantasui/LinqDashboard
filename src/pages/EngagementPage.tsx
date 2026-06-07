import { useCallback } from 'react';
import { useMetricFetch } from '@/hooks/useMetricFetch';
import { getEngagement } from '@/api/endpoints';
import { SectionCard } from '@/components/common/SectionCard';
import { StatTile } from '@/components/common/StatTile';
import { LineChart } from '@/components/charts/LineChart';
import { colors } from '@/theme';
import { formatPercent } from '@/utils/formatMetric';
import { useDashboardStore } from '@/store/dashboardStore';
import { toApiDateRange } from '@/utils/dates';

export function EngagementPage() {
  const { dateRange } = useDashboardStore();
  const { from, to } = toApiDateRange(dateRange);

  const fetcher = useCallback(() => getEngagement(from, to), [from, to]);
  const { data, loading } = useMetricFetch(fetcher);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* DAU/WAU/MAU chart */}
      <SectionCard title="DAU / WAU / MAU" subtitle="Active user trends over selected period" loading={loading}>
        <LineChart data={data?.series ?? []} height={320} />
      </SectionCard>

      {/* KPI tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <StatTile
          label="Stickiness Ratio (DAU/MAU)"
          value={data ? formatPercent(data.stickinessPercent) : null}
          trend={data?.stickinessTrend}
          accentColor={colors.primary}
          isLoading={loading}
        />
        <StatTile
          label="Avg Sessions per User"
          value={data ? data.avgSessionsPerUser.toFixed(1) : null}
          unit="sessions"
          trend={data?.sessionsTrend}
          accentColor={colors.secondary}
          isLoading={loading}
        />
      </div>
    </div>
  );
}

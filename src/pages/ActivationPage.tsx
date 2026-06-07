import { useCallback } from 'react';
import { Select } from 'antd';
import dayjs from 'dayjs';
import { useMetricFetch } from '@/hooks/useMetricFetch';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { getActivationFunnel } from '@/api/endpoints';
import { SectionCard } from '@/components/common/SectionCard';
import { StatTile } from '@/components/common/StatTile';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { colors } from '@/theme';
import { formatHours } from '@/utils/formatMetric';
import { useDashboardStore } from '@/store/dashboardStore';

const monthOptions = Array.from({ length: 12 }, (_, i) => {
  const d = dayjs().subtract(i, 'month');
  return { value: d.format('YYYY-MM'), label: d.format('MMMM YYYY') };
});

export function ActivationPage() {
  const { cohortMonth, setCohortMonth } = useDashboardStore();
  const { isMobile, isTablet } = useBreakpoint();

  const fetcher = useCallback(() => getActivationFunnel(cohortMonth), [cohortMonth]);
  const { data, loading } = useMetricFetch(fetcher);

  const layoutCols = isMobile || isTablet ? '1fr' : '2fr 1fr';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, color: colors.textSecondary }}>Cohort:</span>
        <Select
          value={cohortMonth}
          onChange={setCohortMonth}
          options={monthOptions}
          style={{ width: isMobile ? '100%' : 200 }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: layoutCols, gap: 16 }}>
        <SectionCard title="Activation Funnel" loading={loading}>
          <FunnelChart data={data?.funnel ?? []} />
        </SectionCard>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 16 }}>
          <StatTile label="Median Time to First Txn" value={data ? formatHours(data.medianHoursToFirstTxn) : null} trend={data?.medianTrend} accentColor={colors.secondary} isLoading={loading} />
          <StatTile label="P90 Time to Activation" value={data ? formatHours(data.p90HoursToActivation) : null} trend={data?.p90Trend} accentColor={colors.warning} isLoading={loading} />
        </div>
      </div>
    </div>
  );
}

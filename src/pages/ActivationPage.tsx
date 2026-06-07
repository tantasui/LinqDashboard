import { useCallback } from 'react';
import { Select } from 'antd';
import dayjs from 'dayjs';
import { useMetricFetch } from '@/hooks/useMetricFetch';
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

  const fetcher = useCallback(() => getActivationFunnel(cohortMonth), [cohortMonth]);
  const { data, loading } = useMetricFetch(fetcher);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Cohort selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, color: colors.textSecondary }}>Cohort:</span>
        <Select
          value={cohortMonth}
          onChange={setCohortMonth}
          options={monthOptions}
          style={{ width: 180 }}
          size="middle"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        {/* Funnel chart */}
        <SectionCard title="Activation Funnel" loading={loading}>
          <FunnelChart data={data?.funnel ?? []} />
        </SectionCard>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <StatTile
            label="Median Time to First Txn"
            value={data ? formatHours(data.medianHoursToFirstTxn) : null}
            trend={data?.medianTrend}
            accentColor={colors.secondary}
            isLoading={loading}
          />
          <StatTile
            label="P90 Time to Activation"
            value={data ? formatHours(data.p90HoursToActivation) : null}
            trend={data?.p90Trend}
            accentColor={colors.warning}
            isLoading={loading}
          />

          {/* Funnel summary cards */}
          {!loading && data && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.funnel.map((stage) => (
                <div
                  key={stage.stage}
                  style={{
                    background: colors.surfaceLow,
                    border: `1px solid ${colors.borderSubtle}`,
                    borderRadius: 8,
                    padding: '10px 14px',
                  }}
                >
                  <div style={{ fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {stage.stage}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: colors.textPrimary, fontFamily: colors.fontMono, marginTop: 2 }}>
                    {stage.count.toLocaleString()}
                    <span style={{ fontSize: 13, color: colors.textMuted, marginLeft: 8 }}>{stage.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

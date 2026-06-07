import { useState, useCallback } from 'react';
import { Radio, Progress } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useMetricFetch } from '@/hooks/useMetricFetch';
import { getAcquisition } from '@/api/endpoints';
import { SectionCard } from '@/components/common/SectionCard';
import { StatTile } from '@/components/common/StatTile';
import { LineChart } from '@/components/charts/LineChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { colors } from '@/theme';
import { formatNumber } from '@/utils/formatMetric';
import { useDashboardStore } from '@/store/dashboardStore';
import { toApiDateRange } from '@/utils/dates';

type Granularity = 'daily' | 'weekly' | 'monthly';

export function AcquisitionPage() {
  const [granularity, setGranularity] = useState<Granularity>('daily');
  const { dateRange } = useDashboardStore();
  const { from, to } = toApiDateRange(dateRange);

  const fetcher = useCallback(
    () => getAcquisition(from, to, granularity),
    [from, to, granularity]
  );
  const { data, loading } = useMetricFetch(fetcher);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary tile */}
      <div style={{ maxWidth: 240 }}>
        <StatTile
          label="Total Signups"
          value={data ? formatNumber(data.totalSignups) : null}
          trend={data?.signupsTrend}
          accentColor={colors.secondary}
          isLoading={loading}
        />
      </div>

      {/* Main chart */}
      <SectionCard
        title="User Acquisition"
        loading={loading}
        extra={
          <Radio.Group
            size="small"
            value={granularity}
            onChange={(e: RadioChangeEvent) => setGranularity(e.target.value as Granularity)}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="daily">Daily</Radio.Button>
            <Radio.Button value="weekly">Weekly</Radio.Button>
            <Radio.Button value="monthly">Monthly</Radio.Button>
          </Radio.Group>
        }
      >
        <LineChart data={data?.series ?? []} height={300} />
      </SectionCard>

      {/* Donut + funnel bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 16 }}>
        <SectionCard title="Channel Breakdown" loading={loading}>
          <DonutChart data={data?.channels ?? []} />
        </SectionCard>

        <SectionCard title="Channel Funnel Velocity" loading={loading}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
            {(data?.channels ?? []).map((ch, i) => (
              <div key={ch.channel}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, color: colors.textSecondary }}>{ch.channel}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>
                    {ch.percentage.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  percent={ch.percentage}
                  showInfo={false}
                  strokeColor={[colors.primary, colors.secondary, colors.tertiary, colors.onramp][i % 4]}
                  trailColor={colors.surfaceHigh}
                  size="small"
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

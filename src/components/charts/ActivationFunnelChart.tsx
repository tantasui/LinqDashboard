import React from 'react';
import { Funnel } from '@ant-design/plots';
import { MetricCard } from '../MetricCard';
import type { ActivationFunnelResponse } from '@/types/dashboard';
import { formatPercent, formatNumber } from '@/utils/formatMetric';

interface ActivationFunnelChartProps {
  data: ActivationFunnelResponse | null;
  isLoading: boolean;
  error: string | null;
  extra?: React.ReactNode;
}

export const ActivationFunnelChart: React.FC<ActivationFunnelChartProps> = ({ data, isLoading, error, extra }) => {
  const chartData = React.useMemo(() => {
    if (!data) return [];
    return [
      { stage: 'Signups', count: data.stage_1_signups, rate: null },
      { stage: 'KYC Completed', count: data.stage_2_kyc_completed, rate: data.signup_to_kyc_rate },
      { stage: 'First Transaction', count: data.stage_3_first_transaction, rate: data.kyc_to_first_txn_rate },
    ];
  }, [data]);

  const config = {
    data: chartData,
    xField: 'stage',
    yField: 'count',
    dynamicHeight: true,
    label: {
      formatter: (datum: any) => {
        const title = datum.stage;
        const count = formatNumber(datum.count);
        const rate = datum.rate ? `(${formatPercent(datum.rate)})` : '';
        return `${title}\n${count} ${rate}`;
      },
      style: {
        fill: '#fff',
        fontSize: 14,
      },
    },
    tooltip: {
      showMarkers: false,
      formatter: (datum: any) => {
        return { name: datum.stage, value: formatNumber(datum.count) };
      },
    },
  };

  return (
    <MetricCard 
      title="Activation Funnel" 
      extra={extra}
      isLoading={isLoading} 
      error={error}
      isEmpty={!data}
      style={{ minHeight: 300 }}
    >
      <Funnel {...config} height={300} />
      {data && (
        <div style={{ marginTop: 16, textAlign: 'center', color: '#888' }}>
          Median Time to First Txn: <strong>{data.median_ttft_hours}h</strong>
        </div>
      )}
    </MetricCard>
  );
};

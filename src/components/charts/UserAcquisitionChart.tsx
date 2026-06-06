import React from 'react';
import { Line } from '@ant-design/plots';
import { MetricCard } from '../MetricCard';
import type { UserAcquisitionPoint } from '@/types/dashboard';

interface UserAcquisitionChartProps {
  data: UserAcquisitionPoint[] | null;
  isLoading: boolean;
  error: string | null;
}

export const UserAcquisitionChart: React.FC<UserAcquisitionChartProps> = ({ data, isLoading, error }) => {
  // Transform data for G2 multi-series
  const chartData = React.useMemo(() => {
    if (!data) return [];
    
    return data.flatMap(point => [
      { date: point.date, type: 'New Signups', value: point.new_signups },
      { date: point.date, type: 'KYC Completions', value: point.kyc_completions }
    ]);
  }, [data]);

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    colorField: 'type',
    seriesField: 'type',
    smooth: true,
    padding: 'auto',
    color: ['#1677ff', '#52c41a'],
    tooltip: {
      showMarkers: true,
    },
    point: {
      shape: 'circle',
      size: 3,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
  };

  return (
    <MetricCard 
      title="User Acquisition" 
      isLoading={isLoading} 
      error={error}
      isEmpty={!data || data.length === 0}
      style={{ minHeight: 300 }}
    >
      <Line {...config} height={300} />
    </MetricCard>
  );
};

import React from 'react';
import { Line } from '@ant-design/plots';
import { Skeleton, theme } from 'antd';
import type { EngagementPoint } from '@/types/dashboard';

interface EngagementChartProps {
  data: EngagementPoint[] | null;
  isLoading: boolean;
}

interface FlattenedEngagementPoint {
  date: string;
  value: number;
  metric: string;
}

export const EngagementChart: React.FC<EngagementChartProps> = ({ data, isLoading }) => {
  const { token } = theme.useToken();

  if (isLoading) return <Skeleton active paragraph={{ rows: 8 }} />;

  // Stub data — requires flattening for G2 plot multi-series
  const rawData = data || [
    { date: '2026-06-01', dau: 250, wau: 1500, mau: 5000 },
    { date: '2026-06-02', dau: 280, wau: 1550, mau: 5100 },
    { date: '2026-06-03', dau: 300, wau: 1600, mau: 5200 },
    { date: '2026-06-04', dau: 270, wau: 1650, mau: 5300 },
  ];

  const chartData: FlattenedEngagementPoint[] = [];
  rawData.forEach(d => {
    chartData.push({ date: d.date, value: d.dau, metric: 'DAU' });
    chartData.push({ date: d.date, value: d.wau, metric: 'WAU' });
    chartData.push({ date: d.date, value: d.mau, metric: 'MAU' });
  });

  const config = {
    data: chartData,
    xField: 'date' as const,
    yField: 'value' as const,
    colorField: 'metric' as const,
    smooth: true,
    height: 300,
    color: [token.colorPrimary, token.colorSuccess, token.colorError],
    legend: {
      position: 'top' as const,
    },
  };

  return <Line {...config} />;
};

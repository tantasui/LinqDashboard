import React from 'react';
import { Line } from '@ant-design/plots';
import { Skeleton, theme } from 'antd';
import type { UserAcquisitionPoint } from '@/types/dashboard';

interface UserAcquisitionChartProps {
  data: UserAcquisitionPoint[] | null;
  isLoading: boolean;
}

export const UserAcquisitionChart: React.FC<UserAcquisitionChartProps> = ({ data, isLoading }) => {
  const { token } = theme.useToken();

  if (isLoading) return <Skeleton active paragraph={{ rows: 8 }} />;

  // Stub data — replaced with real data when LINQ-06 lands
  const chartData = data || [
    { date: '2026-06-01', signups: 120, channel: 'organic' },
    { date: '2026-06-02', signups: 150, channel: 'organic' },
    { date: '2026-06-03', signups: 140, channel: 'referral' },
    { date: '2026-06-04', signups: 200, channel: 'paid' },
    { date: '2026-06-05', signups: 180, channel: 'referral' },
  ];

  const config = {
    data: chartData,
    xField: 'date' as const,
    yField: 'signups' as const,
    colorField: 'channel' as const,
    smooth: true,
    height: 300,
    color: [token.colorPrimary, token.colorSuccess, token.colorWarning],
    legend: {
      position: 'top' as const,
    },
  };

  return <Line {...config} />;
};

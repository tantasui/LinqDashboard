import React from 'react';
import { Funnel } from '@ant-design/plots';
import { Skeleton, theme } from 'antd';
import type { FunnelStage } from '@/types/dashboard';

interface ActivationFunnelChartProps {
  data: FunnelStage[] | null;
  isLoading: boolean;
}

export const ActivationFunnelChart: React.FC<ActivationFunnelChartProps> = ({ data, isLoading }) => {
  const { token } = theme.useToken();

  if (isLoading) return <Skeleton active paragraph={{ rows: 8 }} />;

  // Stub data
  const chartData = data || [
    { stage: 'Signup', count: 1000, percentage: 100 },
    { stage: 'KYC Started', count: 600, percentage: 60 },
    { stage: 'KYC Completed', count: 400, percentage: 40 },
    { stage: 'First Txn', count: 200, percentage: 20 },
  ];

  const config = {
    data: chartData,
    xField: 'stage' as const,
    yField: 'count' as const,
    height: 300,
    dynamicHeight: true,
    color: [token.colorPrimary],
    label: {
      text: (d: FunnelStage) => `${d.stage}\n${d.count}`,
    },
  };

  return <Funnel {...config} />;
};

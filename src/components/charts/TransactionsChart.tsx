import React from 'react';
import { Column } from '@ant-design/plots';
import { Skeleton, theme } from 'antd';
import type { TransactionPoint } from '@/types/dashboard';

interface TransactionsChartProps {
  data: TransactionPoint[] | null;
  isLoading: boolean;
}

interface FlattenedTransactionPoint {
  date: string;
  type: string;
  count: number;
}

export const TransactionsChart: React.FC<TransactionsChartProps> = ({ data, isLoading }) => {
  const { token } = theme.useToken();

  if (isLoading) return <Skeleton active paragraph={{ rows: 8 }} />;

  const rawData = data || [
    { date: '2026-06-01', offrampCount: 120, onrampCount: 80, offrampVolume: 12000, onrampVolume: 8000 },
    { date: '2026-06-02', offrampCount: 150, onrampCount: 90, offrampVolume: 15000, onrampVolume: 9000 },
    { date: '2026-06-03', offrampCount: 140, onrampCount: 85, offrampVolume: 14000, onrampVolume: 8500 },
  ];

  // Flatten to grouped format for Column chart
  const chartData: FlattenedTransactionPoint[] = [];
  rawData.forEach(d => {
    chartData.push({ date: d.date, type: 'Offramp', count: d.offrampCount });
    chartData.push({ date: d.date, type: 'Onramp', count: d.onrampCount });
  });

  const config = {
    data: chartData,
    isGroup: true,
    xField: 'date' as const,
    yField: 'count' as const,
    colorField: 'type' as const,
    height: 300,
    color: [token.colorPrimary, token.colorSuccess],
  };

  return <Column {...config} />;
};

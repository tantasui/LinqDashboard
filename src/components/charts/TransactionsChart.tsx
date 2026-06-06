import React from 'react';
import { Column } from '@ant-design/plots';
import { Table, Typography } from 'antd';
import { MetricCard } from '../MetricCard';
import type { TransactionPoint } from '@/types/dashboard';
import { formatNumber } from '@/utils/formatMetric';

interface TransactionsChartProps {
  data: TransactionPoint[] | null;
  isLoading: boolean;
  error: string | null;
}

export const TransactionsChart: React.FC<TransactionsChartProps> = ({ data, isLoading, error }) => {
  const chartData = React.useMemo(() => {
    if (!data) return [];
    return data.flatMap(point => [
      { date: point.date, type: 'Offramp', count: point.offramp_count },
      { date: point.date, type: 'Onramp', count: point.onramp_count },
      { date: point.date, type: 'Bill Payment', count: point.bill_count },
    ]);
  }, [data]);

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'count',
    colorField: 'type',
    isStack: true,
    color: ['#1677ff', '#52c41a', '#722ed1'],
    tooltip: {
      showMarkers: false,
    },
  };

  // Aggregate failure reasons from the latest data point or across all points
  const latestFailureReasons = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    // Just show reasons from the most recent day, or aggregate them
    const agg: Record<string, number> = {};
    data.forEach(p => {
      p.failure_reasons?.forEach(f => {
        agg[f.reason] = (agg[f.reason] || 0) + f.count;
      });
    });
    return Object.entries(agg).map(([reason, count]) => ({ reason, count })).sort((a, b) => b.count - a.count);
  }, [data]);

  const columns = [
    { title: 'Failure Reason', dataIndex: 'reason', key: 'reason' },
    { 
      title: 'Count', 
      dataIndex: 'count', 
      key: 'count',
      render: (val: number) => formatNumber(val)
    },
  ];

  return (
    <MetricCard 
      title="Transactions Volume" 
      isLoading={isLoading} 
      error={error}
      isEmpty={!data || data.length === 0}
      style={{ minHeight: 450 }}
    >
      <Column {...config} height={250} />
      
      {latestFailureReasons.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <Typography.Title level={5} style={{ fontSize: 14 }}>Failure Breakdown</Typography.Title>
          <Table 
            dataSource={latestFailureReasons} 
            columns={columns} 
            size="small"
            pagination={false}
            rowKey="reason"
            scroll={{ y: 150 }}
          />
        </div>
      )}
    </MetricCard>
  );
};

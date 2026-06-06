import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MetricCard } from './MetricCard';
import { CohortRetention } from '@/types/dashboard';
import { formatPercent, formatNumber } from '@/utils/formatMetric';

interface RetentionTableProps {
  data: CohortRetention[] | null;
  isLoading: boolean;
  error: string | null;
}

export const RetentionTable: React.FC<RetentionTableProps> = ({ data, isLoading, error }) => {
  const getRetentionColor = (decimal: number) => {
    const percent = decimal * 100;
    if (percent >= 30) return '#00E396'; // Green
    if (percent >= 15) return '#FEB019'; // Yellow
    return '#FF4560'; // Red
  };

  const columns: ColumnsType<CohortRetention> = [
    {
      title: 'Cohort Month',
      dataIndex: 'cohort_month',
      key: 'cohort_month',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (val: number) => formatNumber(val),
    },
    {
      title: 'D7 Retention',
      dataIndex: 'd7',
      key: 'd7',
      render: (val: number) => (
        <Tag color={getRetentionColor(val)} style={{ color: val * 100 < 15 ? '#fff' : '#000', fontWeight: 600 }}>
          {formatPercent(val)}
        </Tag>
      ),
    },
    {
      title: 'D30 Retention',
      dataIndex: 'd30',
      key: 'd30',
      render: (val: number) => (
        <Tag color={getRetentionColor(val)} style={{ color: val * 100 < 15 ? '#fff' : '#000', fontWeight: 600 }}>
          {formatPercent(val)}
        </Tag>
      ),
    },
  ];

  return (
    <MetricCard 
      title="Cohort Retention" 
      isLoading={isLoading} 
      error={error}
      isEmpty={!data || data.length === 0}
      style={{ minHeight: 300 }}
    >
      <Table
        columns={columns}
        dataSource={data || []}
        pagination={false}
        rowKey="cohort_month"
        bordered={false}
        size="middle"
        scroll={{ x: 'max-content' }}
      />
    </MetricCard>
  );
};

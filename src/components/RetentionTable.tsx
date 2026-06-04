import React from 'react';
import { Table, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CohortRetention } from '@/types/dashboard';

interface RetentionTableProps {
  data: CohortRetention[] | null;
  isLoading: boolean;
}

export const RetentionTable: React.FC<RetentionTableProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 5 }} />;
  }

  const columns: ColumnsType<CohortRetention> = [
    {
      title: 'Cohort Month',
      dataIndex: 'cohortMonth',
      key: 'cohortMonth',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'D7 Retention',
      dataIndex: 'd7Percent',
      key: 'd7Percent',
      render: (val: number) => `${val.toFixed(1)}%`,
    },
    {
      title: 'D30 Retention',
      dataIndex: 'd30Percent',
      key: 'd30Percent',
      render: (val: number) => `${val.toFixed(1)}%`,
    },
  ];

  // Placeholder stub data if null
  const tableData: CohortRetention[] = data || [
    { key: '1', cohortMonth: '2026-05', size: 1200, d7Percent: 45.2, d30Percent: 25.1 },
    { key: '2', cohortMonth: '2026-04', size: 980, d7Percent: 42.1, d30Percent: 23.5 },
    { key: '3', cohortMonth: '2026-03', size: 850, d7Percent: 40.0, d30Percent: 21.0 },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      rowKey="key"
      bordered={false}
    />
  );
};

import React from 'react';
import { Card, Skeleton, Alert, Empty } from 'antd';

interface MetricCardProps {
  title: string;
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  children: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  isLoading = false,
  error = null,
  isEmpty = false,
  children,
  extra,
  style,
}) => {
  return (
    <Card
      title={title}
      extra={extra}
      style={{ height: '100%', ...style }}
    >
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : isEmpty ? (
        <Empty description="No data available" />
      ) : (
        children
      )}
    </Card>
  );
};

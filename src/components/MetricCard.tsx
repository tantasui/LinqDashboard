import React from 'react';
import { Card, Skeleton } from 'antd';

interface MetricCardProps {
  title: string;
  isLoading?: boolean;
  children: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  isLoading = false,
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
      ) : (
        children
      )}
    </Card>
  );
};

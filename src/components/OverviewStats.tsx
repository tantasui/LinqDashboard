import React from 'react';
import { Card, Col, Row, Statistic, Skeleton, theme, Alert, Empty } from 'antd';
import {
  UserAddOutlined,
  DollarOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import type { OverviewMetrics } from '@/types/dashboard';
import { formatPercent, formatUSDC, formatNumber } from '@/utils/formatMetric';

interface OverviewStatsProps {
  data: OverviewMetrics | null;
  isLoading: boolean;
  error: string | null;
}

export const OverviewStats: React.FC<OverviewStatsProps> = ({ data, isLoading, error }) => {
  const { token } = theme.useToken();

  if (isLoading) {
    return (
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <Col xs={24} sm={12} md={8} lg={4} key={key} style={{ flex: '1 1 auto' }}>
            <Card>
              <Skeleton active paragraph={{ rows: 1 }} title={{ width: '60%' }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  if (error) {
    return <Alert message="Error loading overview stats" description={error} type="error" showIcon />;
  }

  if (!data) {
    return <Empty description="No data available" />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="New Signups"
            value={data.users.new_signups}
            formatter={(val) => formatNumber(val as number)}
            prefix={<UserAddOutlined style={{ color: token.colorPrimary }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="GMV"
            value={data.gmv.total_usdc}
            formatter={(val) => formatUSDC(val as number)}
            prefix={<DollarOutlined style={{ color: token.colorSuccess }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="Total Revenue"
            value={data.revenue.total_usdc}
            formatter={(val) => formatUSDC(val as number)}
            prefix={<RiseOutlined style={{ color: token.colorWarning }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="Success Rate"
            value={data.transactions.success_rate}
            formatter={(val) => formatPercent(val as number)}
            prefix={<CheckCircleOutlined style={{ color: token.colorSuccess }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="D7 Retention"
            value={data.retention.d7}
            formatter={(val) => formatPercent(val as number)}
            prefix={<RetweetOutlined style={{ color: token.colorPrimary }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="D30 Retention"
            value={data.retention.d30}
            formatter={(val) => formatPercent(val as number)}
            prefix={<RetweetOutlined style={{ color: token.colorPrimary }} />}
          />
        </Card>
      </Col>
    </Row>
  );
};

import React from 'react';
import { Card, Col, Row, Statistic, Skeleton, theme } from 'antd';
import {
  UserAddOutlined,
  DollarOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import type { OverviewMetrics } from '@/types/dashboard';

interface OverviewStatsProps {
  data: OverviewMetrics | null;
  isLoading: boolean;
}

export const OverviewStats: React.FC<OverviewStatsProps> = ({ data, isLoading }) => {
  const { token } = theme.useToken();

  if (isLoading) {
    return (
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5].map((key) => (
          <Col xs={24} sm={12} md={8} lg={4} key={key} style={{ flex: '1 1 auto' }}>
            <Card>
              <Skeleton active paragraph={{ rows: 1 }} title={{ width: '60%' }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  // Fallback to stub data if data is null
  const stats = data || {
    newSignups: 0,
    gmv: 0,
    revenue: 0,
    transactionSuccessRate: 0,
    d30Retention: 0,
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="New Signups"
            value={stats.newSignups}
            prefix={<UserAddOutlined style={{ color: token.colorPrimary }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="GMV"
            value={stats.gmv}
            precision={2}
            prefix={<DollarOutlined style={{ color: token.colorSuccess }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="Revenue"
            value={stats.revenue}
            precision={2}
            prefix={<RiseOutlined style={{ color: token.colorWarning }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="Success Rate"
            value={stats.transactionSuccessRate}
            precision={1}
            suffix="%"
            prefix={<CheckCircleOutlined style={{ color: token.colorSuccess }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4} style={{ flex: '1 1 auto' }}>
        <Card variant="borderless">
          <Statistic
            title="D30 Retention"
            value={stats.d30Retention}
            precision={1}
            suffix="%"
            prefix={<RetweetOutlined style={{ color: token.colorPrimary }} />}
          />
        </Card>
      </Col>
    </Row>
  );
};

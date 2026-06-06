import React from 'react';
import { Line } from '@ant-design/plots';
import { Statistic, Card, Row, Col } from 'antd';
import { MetricCard } from '../MetricCard';
import type { RevenuePoint } from '@/types/dashboard';
import { formatPercent, formatUSDC } from '@/utils/formatMetric';

interface RevenueChartProps {
  data: RevenuePoint[] | null;
  isLoading: boolean;
  error: string | null;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, isLoading, error }) => {
  const config = {
    data: data || [],
    xField: 'date',
    yField: 'total_revenue',
    smooth: true,
    padding: 'auto',
    color: '#faad14',
    tooltip: { showMarkers: true },
    point: { shape: 'circle', size: 3 },
  };

  const latestStats = data && data.length > 0 ? data[data.length - 1] : null;

  return (
    <MetricCard 
      title="Daily Revenue" 
      isLoading={isLoading} 
      error={error}
      isEmpty={!data || data.length === 0}
      style={{ minHeight: 450 }}
    >
      <Line {...config} height={250} />
      
      {latestStats != null && (
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={8}>
            <Card size="small" variant="borderless" style={{ background: '#f5f5f5', textAlign: 'center' }}>
              <Statistic 
                title="ARPU" 
                value={latestStats.arpu} 
                formatter={(val) => formatUSDC(val as number)} 
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" variant="borderless" style={{ background: '#f5f5f5', textAlign: 'center' }}>
              <Statistic 
                title="RPAU" 
                value={latestStats.rpau} 
                formatter={(val) => formatUSDC(val as number)} 
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" variant="borderless" style={{ background: '#f5f5f5', textAlign: 'center' }}>
              <Statistic 
                title="Take Rate" 
                value={latestStats.take_rate} 
                formatter={(val) => formatPercent(val as number)} 
              />
            </Card>
          </Col>
        </Row>
      )}
    </MetricCard>
  );
};

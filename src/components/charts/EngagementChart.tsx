import React from 'react';
import { Line } from '@ant-design/plots';
import { Statistic, Card, Row, Col } from 'antd';
import { MetricCard } from '../MetricCard';
import type { EngagementPoint } from '@/types/dashboard';
import { formatPercent } from '@/utils/formatMetric';

interface EngagementChartProps {
  data: EngagementPoint[] | null;
  isLoading: boolean;
  error: string | null;
}

export const EngagementChart: React.FC<EngagementChartProps> = ({ data, isLoading, error }) => {
  const chartData = React.useMemo(() => {
    if (!data) return [];
    return data.flatMap(point => [
      { date: point.date, type: 'DAU', value: point.dau },
      { date: point.date, type: 'WAU', value: point.wau },
      { date: point.date, type: 'MAU', value: point.mau }
    ]);
  }, [data]);

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    colorField: 'type',
    seriesField: 'type',
    smooth: true,
    padding: 'auto',
    color: ['#1677ff', '#52c41a', '#faad14'],
    tooltip: { showMarkers: true },
    point: { shape: 'circle', size: 3 },
  };

  const latestStickiness = data && data.length > 0 ? data[data.length - 1].stickiness_ratio : null;

  return (
    <MetricCard 
      title="Engagement (DAU/WAU/MAU)" 
      isLoading={isLoading} 
      error={error}
      isEmpty={!data || data.length === 0}
      style={{ minHeight: 350 }}
    >
      <Line {...config} height={250} />
      {latestStickiness != null && (
        <Row style={{ marginTop: 16 }}>
          <Col span={24}>
            <Card size="small" variant="borderless" style={{ background: '#f5f5f5', textAlign: 'center' }}>
              <Statistic 
                title="Current Stickiness (DAU/MAU)" 
                value={latestStickiness} 
                formatter={(val) => formatPercent(val as number)} 
              />
            </Card>
          </Col>
        </Row>
      )}
    </MetricCard>
  );
};

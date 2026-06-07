import Funnel from '@ant-design/plots/es/components/funnel';
import { Skeleton } from 'antd';
import { colors } from '@/theme';
import type { FunnelStage } from '@/constants/mockData';

interface FunnelChartProps {
  data: FunnelStage[];
  loading?: boolean;
}

export function FunnelChart({ data, loading }: FunnelChartProps) {
  if (loading) return <Skeleton active paragraph={{ rows: 8 }} style={{ padding: 16 }} />;

  const config = {
    data,
    xField: 'stage',
    yField: 'count',
    height: 360,
    autoFit: true,
    color: [colors.primary, `${colors.primary}bb`, `${colors.primary}66`],
    style: {
      fillOpacity: 0.9,
    },
    label: {
      text: (d: FunnelStage) => `${d.stage}\n${d.percentage}% — ${d.count.toLocaleString()}`,
      fill: colors.textPrimary,
      fontSize: 13,
      fontFamily: colors.fontBody,
    },
    axis: false,
    tooltip: {
      style: {
        background: colors.surfaceElevated,
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        color: colors.textPrimary,
      },
    },
    theme: 'dark',
  };

  return (
    <div style={{ background: 'transparent' }}>
      <Funnel {...config} />
    </div>
  );
}

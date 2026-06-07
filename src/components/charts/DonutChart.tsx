import Pie from '@ant-design/plots/es/components/pie';
import { Skeleton } from 'antd';
import { colors, chartColors } from '@/theme';
import type { ChannelBreakdown } from '@/constants/mockData';

interface DonutChartProps {
  data: ChannelBreakdown[];
  loading?: boolean;
}

export function DonutChart({ data, loading }: DonutChartProps) {
  if (loading) return <Skeleton active paragraph={{ rows: 6 }} style={{ padding: 16 }} />;

  const config = {
    data,
    angleField: 'users',
    colorField: 'channel',
    innerRadius: 0.65,
    height: 280,
    autoFit: true,
    color: chartColors,
    label: {
      text: (d: ChannelBreakdown) => `${d.percentage.toFixed(1)}%`,
      fill: colors.textPrimary,
      fontSize: 12,
    },
    legend: {
      color: {
        itemLabelFill: colors.textSecondary,
        itemLabelFontSize: 12,
      },
    },
    tooltip: {
      style: {
        background: colors.surfaceElevated,
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        color: colors.textPrimary,
      },
    },
    style: {
      stroke: colors.surface,
      strokeWidth: 2,
    },
    theme: 'dark',
  };

  return (
    <div style={{ background: 'transparent' }}>
      <Pie {...config} />
    </div>
  );
}

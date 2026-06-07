import Line from '@ant-design/plots/es/components/line';
import { Skeleton } from 'antd';
import { colors, chartColors } from '@/theme';
import type { TimeSeriesPoint } from '@/constants/mockData';

interface LineChartProps {
  data: TimeSeriesPoint[];
  height?: number;
  loading?: boolean;
}

export function LineChart({ data, height = 300, loading }: LineChartProps) {
  if (loading) return <Skeleton active paragraph={{ rows: 6 }} style={{ padding: 16 }} />;

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    colorField: 'series',
    height,
    autoFit: true,
    smooth: true,
    color: chartColors,
    area: {
      style: {
        fillOpacity: 0.12,
      },
    },
    axis: {
      x: {
        labelFill: colors.textMuted,
        labelFontSize: 12,
        labelFontFamily: colors.fontBody,
        tickStroke: 'transparent',
        line: false,
        grid: false,
      },
      y: {
        labelFill: colors.textMuted,
        labelFontSize: 12,
        labelFontFamily: colors.fontBody,
        tickStroke: 'transparent',
        line: false,
        gridStroke: colors.borderSubtle,
        gridStrokeOpacity: 0.6,
      },
    },
    tooltip: {
      style: {
        background: colors.surfaceElevated,
        boxShadow: `0 4px 16px rgba(0,0,0,0.4)`,
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        color: colors.textPrimary,
      },
    },
    legend: {
      color: {
        itemLabelFill: colors.textSecondary,
        itemLabelFontSize: 12,
      },
    },
    style: {
      stroke: undefined,
      lineWidth: 2,
    },
    theme: 'dark',
  };

  return (
    <div style={{ background: 'transparent' }}>
      <Line {...config} />
    </div>
  );
}

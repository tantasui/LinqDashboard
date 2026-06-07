import Column from '@ant-design/plots/es/components/column';
import { Skeleton } from 'antd';
import { colors, chartColors } from '@/theme';
import type { TransactionVolumePoint } from '@/constants/mockData';

interface StackedBarDatum {
  date: string;
  value: number;
  series: string;
}

interface BarChartProps {
  data: TransactionVolumePoint[];
  height?: number;
  loading?: boolean;
}

function transformToStacked(data: TransactionVolumePoint[]): StackedBarDatum[] {
  return data.flatMap((d) => [
    { date: d.date, value: d.offramp, series: 'Offramp' },
    { date: d.date, value: d.billPayment, series: 'Bill Payment' },
    { date: d.date, value: d.onramp, series: 'Onramp' },
  ]);
}

export function BarChart({ data, height = 300, loading }: BarChartProps) {
  if (loading) return <Skeleton active paragraph={{ rows: 6 }} style={{ padding: 16 }} />;

  const stacked = transformToStacked(data);

  const config = {
    data: stacked,
    xField: 'date',
    yField: 'value',
    colorField: 'series',
    stack: true,
    height,
    autoFit: true,
    color: chartColors,
    style: {
      radiusTopLeft: 6,
      radiusTopRight: 6,
    },
    axis: {
      x: {
        labelFill: colors.textMuted,
        labelFontSize: 12,
        tickStroke: 'transparent',
        line: false,
        grid: false,
      },
      y: {
        labelFill: colors.textMuted,
        labelFontSize: 12,
        tickStroke: 'transparent',
        line: false,
        gridStroke: colors.borderSubtle,
        gridStrokeOpacity: 0.6,
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
    legend: {
      color: {
        itemLabelFill: colors.textSecondary,
        itemLabelFontSize: 12,
      },
    },
    theme: 'dark',
  };

  return (
    <div style={{ background: 'transparent' }}>
      <Column {...config} />
    </div>
  );
}

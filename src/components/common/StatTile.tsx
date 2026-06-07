import { Skeleton } from 'antd';
import { colors } from '@/theme';
import { formatTrend } from '@/utils/formatMetric';

interface StatTileProps {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
  trend?: number | null;
  accentColor?: string;
  isLoading?: boolean;
}

export function StatTile({ label, value, unit, trend, accentColor, isLoading }: StatTileProps) {
  const accent = accentColor ?? colors.primary;
  const trendInfo = trend != null ? formatTrend(trend) : null;

  const displayValue = value == null ? '—' : value;

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left accent stripe */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 3,
          height: 40,
          background: accent,
          borderRadius: '0 2px 2px 0',
        }}
      />

      <div style={{ paddingLeft: 8 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: colors.textMuted,
            marginBottom: 6,
          }}
        >
          {label}
        </div>

        {isLoading ? (
          <Skeleton.Input active style={{ height: 36, width: 120 }} />
        ) : (
          <div
            style={{
              fontFamily: colors.fontMono,
              fontSize: 30,
              fontWeight: 700,
              color: colors.textPrimary,
              lineHeight: 1,
              letterSpacing: '-0.5px',
            }}
          >
            {displayValue}
            {unit && (
              <span style={{ fontSize: 14, fontWeight: 400, color: colors.textSecondary, marginLeft: 4 }}>
                {unit}
              </span>
            )}
          </div>
        )}

        {trendInfo && !isLoading && (
          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              fontWeight: 600,
              color:
                trendInfo.direction === 'up'
                  ? colors.success
                  : trendInfo.direction === 'down'
                  ? colors.errorStrong
                  : colors.textMuted,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
              {trendInfo.direction === 'up' ? 'trending_up' : trendInfo.direction === 'down' ? 'trending_down' : 'remove'}
            </span>
            {trendInfo.label}
          </div>
        )}
      </div>
    </div>
  );
}

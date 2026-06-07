import { Skeleton, Alert, Empty, Button } from 'antd';
import { colors } from '@/theme';
import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
  loading?: boolean;
  error?: Error | null;
  empty?: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
}

export function SectionCard({ title, subtitle, extra, loading, error, empty, children, style }: SectionCardProps) {
  const renderBody = () => {
    if (loading) return <Skeleton active paragraph={{ rows: 5 }} />;
    if (error) return <Alert type="error" message={error.message} />;
    if (empty) {
      return (
        <Empty description="No data for this period">
          <Button ghost size="small">Change date range</Button>
        </Empty>
      );
    }
    return children;
  };

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderTop: `2px solid ${colors.primary}`,
        borderRadius: 12,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${colors.borderSubtle}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: colors.fontDisplay,
              fontSize: 16,
              fontWeight: 700,
              color: colors.textPrimary,
              letterSpacing: '-0.2px',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{subtitle}</div>
          )}
        </div>
        {extra && <div>{extra}</div>}
      </div>

      {/* Body */}
      <div style={{ padding: 20 }}>{renderBody()}</div>
    </div>
  );
}

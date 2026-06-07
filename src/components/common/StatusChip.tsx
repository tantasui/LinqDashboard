import { colors } from '@/theme';

export type ChipStatus = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'pending';

interface StatusChipProps {
  label: string;
  status: ChipStatus;
}

const STATUS_STYLES: Record<ChipStatus, { bg: string; text: string }> = {
  success: { bg: 'rgba(74,222,128,0.1)', text: colors.success },
  warning: { bg: 'rgba(251,191,36,0.1)', text: colors.warning },
  error: { bg: 'rgba(255,180,171,0.15)', text: colors.error },
  info: { bg: 'rgba(0,212,255,0.1)', text: colors.secondary },
  neutral: { bg: 'rgba(149,141,161,0.1)', text: colors.textMuted },
  pending: { bg: 'rgba(149,141,161,0.1)', text: colors.textMuted },
};

export function StatusChip({ label, status }: StatusChipProps) {
  const style = STATUS_STYLES[status];
  return (
    <span
      style={{
        display: 'inline-block',
        background: style.bg,
        color: style.text,
        borderRadius: 9999,
        padding: '2px 10px',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

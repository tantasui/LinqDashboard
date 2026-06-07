import { ShieldCheck } from '@phosphor-icons/react';
import { colors } from '@/theme';

export function RiskPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <ShieldCheck size={56} style={{ color: colors.textMuted }} />
      <h2 style={{ fontFamily: colors.fontDisplay, fontSize: 24, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
        Risk &amp; Failures
      </h2>
      <p style={{ color: colors.textSecondary, margin: 0 }}>Advanced risk monitoring and failure analysis. Coming in Phase 3.</p>
    </div>
  );
}

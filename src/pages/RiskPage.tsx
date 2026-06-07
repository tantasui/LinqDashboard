import { colors } from '@/theme';

export function RiskPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 56, color: colors.textMuted }}>security</span>
      <h2 style={{ fontFamily: colors.fontDisplay, fontSize: 24, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
        Risk &amp; Failures
      </h2>
      <p style={{ color: colors.textSecondary, margin: 0 }}>Advanced risk monitoring and failure analysis. Coming in Phase 3.</p>
    </div>
  );
}

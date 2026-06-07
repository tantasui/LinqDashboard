import { Wallet } from '@phosphor-icons/react';
import { colors } from '@/theme';

export function WalletBehaviorPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <Wallet size={56} style={{ color: colors.textMuted }} />
      <h2 style={{ fontFamily: colors.fontDisplay, fontSize: 24, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
        Wallet Behavior
      </h2>
      <p style={{ color: colors.textSecondary, margin: 0 }}>Wallet usage patterns and balance distribution analysis. Coming in Phase 3.</p>
    </div>
  );
}

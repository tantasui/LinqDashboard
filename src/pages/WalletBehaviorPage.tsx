import { colors } from '@/theme';

export function WalletBehaviorPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 56, color: colors.textMuted }}>account_balance_wallet</span>
      <h2 style={{ fontFamily: colors.fontDisplay, fontSize: 24, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
        Wallet Behavior
      </h2>
      <p style={{ color: colors.textSecondary, margin: 0 }}>Wallet usage patterns and balance distribution analysis. Coming in Phase 3.</p>
    </div>
  );
}

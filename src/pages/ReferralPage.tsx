import { Users } from '@phosphor-icons/react';
import { colors } from '@/theme';

export function ReferralPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <Users size={56} style={{ color: colors.textMuted }} />
      <h2 style={{ fontFamily: colors.fontDisplay, fontSize: 24, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
        Referral Loop
      </h2>
      <p style={{ color: colors.textSecondary, margin: 0 }}>Referral programme analytics and viral coefficient tracking. Coming in Phase 3.</p>
    </div>
  );
}

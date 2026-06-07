import { colors } from '@/theme';

export function SegmentsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 56, color: colors.textMuted }}>pie_chart</span>
      <h2 style={{ fontFamily: colors.fontDisplay, fontSize: 24, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
        Segments
      </h2>
      <p style={{ color: colors.textSecondary, margin: 0 }}>User segmentation and cohort builder. Coming in Phase 3.</p>
    </div>
  );
}

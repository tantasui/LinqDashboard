import { Link } from 'react-router-dom';
import { Warning } from '@phosphor-icons/react';
import { colors } from '@/theme';

export function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: colors.bgBase,
        gap: 16,
        padding: 24,
      }}
    >
      <Warning size={64} style={{ color: colors.textMuted }} />
      <h1
        style={{
          fontFamily: colors.fontDisplay,
          fontSize: 32,
          fontWeight: 700,
          color: colors.textPrimary,
          margin: 0,
        }}
      >
        Page not found
      </h1>
      <p style={{ color: colors.textSecondary, margin: 0 }}>
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/overview"
        style={{
          marginTop: 8,
          color: colors.primary,
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: 15,
        }}
      >
        ← Back to Overview
      </Link>
    </div>
  );
}

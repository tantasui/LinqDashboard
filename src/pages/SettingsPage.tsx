import { useNavigate } from 'react-router-dom';
import { Button, Divider } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { StatusChip } from '@/components/common/StatusChip';
import { colors } from '@/theme';

export function SettingsPage() {
  const navigate = useNavigate();
  const admin = useAuthStore((s) => s.admin);
  const logout = useAuthStore((s) => s.logout);

  const initials = admin?.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'LQ';

  const handleSignOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 24px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderTop: `2px solid ${colors.primary}`,
          borderRadius: 16,
          padding: 36,
        }}
      >
        {/* Avatar + name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: colors.primaryDim,
              border: `2px solid ${colors.primary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: colors.primary,
            }}
          >
            {initials}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{ fontFamily: colors.fontDisplay, fontSize: 22, fontWeight: 700, color: colors.textPrimary }}
            >
              {admin?.name ?? 'Admin User'}
            </div>
            <div style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
              {admin?.email ?? 'admin@linq.so'}
            </div>
          </div>
          <StatusChip label={admin?.role ?? 'Administrator'} status="info" />
        </div>

        <Divider style={{ borderColor: colors.borderSubtle, margin: '16px 0' }} />

        {/* Info grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 28,
          }}
        >
          {[
            { label: 'Location', value: 'Lagos, Nigeria' },
            { label: 'Tier Level', value: 'Platform Admin' },
            { label: 'Account ID', value: `#${admin?.id ?? '0001'}` },
            { label: 'Role', value: admin?.role ?? 'Administrator' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: colors.surfaceLow,
                border: `1px solid ${colors.borderSubtle}`,
                borderRadius: 8,
                padding: '12px 16px',
              }}
            >
              <div style={{ fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                {label}
              </div>
              <div style={{ fontSize: 14, color: colors.textPrimary, fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>

        <Divider style={{ borderColor: colors.borderSubtle, margin: '0 0 24px' }} />

        <Button
          danger
          size="large"
          block
          onClick={handleSignOut}
          style={{ fontWeight: 600 }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}

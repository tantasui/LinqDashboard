import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { colors } from '@/theme';

interface NavItem {
  key: string;
  label: string;
  icon: string;
  soon?: boolean;
}

const NAV_SECTIONS: Array<{ heading?: string; items: NavItem[] }> = [
  {
    items: [{ key: '/overview', label: 'Overview', icon: 'dashboard' }],
  },
  {
    heading: 'Acquisition',
    items: [
      { key: '/acquisition', label: 'Users & Channels', icon: 'person_add' },
      { key: '/activation', label: 'Activation Funnel', icon: 'bolt' },
    ],
  },
  {
    heading: 'Retention',
    items: [{ key: '/retention', label: 'Retention by Cohort', icon: 'analytics' }],
  },
  {
    heading: 'Economics',
    items: [
      { key: '/revenue', label: 'Revenue', icon: 'payments' },
      { key: '/transactions', label: 'Transactions', icon: 'receipt_long' },
      { key: '/engagement', label: 'Engagement', icon: 'forum' },
    ],
  },
  {
    heading: 'Risk & Growth',
    items: [
      { key: '/risk', label: 'Risk & Failures', icon: 'security', soon: true },
      { key: '/referral', label: 'Referral Loop', icon: 'group', soon: true },
      { key: '/wallet', label: 'Wallet Behavior', icon: 'account_balance_wallet', soon: true },
      { key: '/segments', label: 'Segments', icon: 'pie_chart', soon: true },
    ],
  },
  {
    items: [{ key: '/settings', label: 'Settings', icon: 'settings' }],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();
  const admin = useAuthStore((s) => s.admin);

  const initials = admin?.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'LQ';

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 64,
          left: 0,
          width: 240,
          height: 'calc(100vh - 64px)',
          background: colors.surfaceLowest,
          borderRight: `1px solid ${colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0 8px' }}>
          {/* Logo */}
          <div style={{ padding: '20px 8px 24px', borderBottom: `1px solid ${colors.borderSubtle}` }}>
            <span
              style={{
                fontFamily: colors.fontDisplay,
                fontSize: 22,
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: '-0.5px',
              }}
            >
              LINQ
            </span>
            <span
              style={{ display: 'block', fontSize: 11, color: colors.textMuted, marginTop: 2, letterSpacing: '0.05em' }}
            >
              Admin Dashboard
            </span>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, paddingTop: 12, overflowY: 'auto' }}>
            {NAV_SECTIONS.map((section, si) => (
              <div key={si} style={{ marginBottom: 4 }}>
                {section.heading && (
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: colors.textMuted,
                      padding: '12px 12px 4px',
                    }}
                  >
                    {section.heading}
                  </div>
                )}
                {section.items.map((item) => {
                  const active = pathname === item.key || pathname.startsWith(item.key + '/');
                  return (
                    <div
                      key={item.key}
                      onClick={() => { navigate(item.key); if (!isDesktop) onClose(); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 12px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        marginBottom: 2,
                        borderLeft: active ? `3px solid ${colors.primary}` : '3px solid transparent',
                        background: active ? colors.primaryDim : 'transparent',
                        color: active ? colors.textPrimary : colors.textSecondary,
                        transition: 'background 0.15s, color 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLDivElement).style.background = colors.surfaceHigh;
                          (e.currentTarget as HTMLDivElement).style.color = colors.textPrimary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                          (e.currentTarget as HTMLDivElement).style.color = colors.textSecondary;
                        }
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18, flexShrink: 0 }}>
                        {item.icon}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, flex: 1 }}>{item.label}</span>
                      {item.soon && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            background: 'rgba(245,158,11,0.15)',
                            color: colors.warning,
                            borderRadius: 9999,
                            padding: '2px 7px',
                            letterSpacing: '0.04em',
                          }}
                        >
                          Soon
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Admin footer */}
          <div
            style={{
              padding: '12px 8px',
              borderTop: `1px solid ${colors.borderSubtle}`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: colors.primaryDim,
                border: `1px solid ${colors.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: colors.primary,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: colors.textPrimary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {admin?.name ?? 'Admin'}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {admin?.role ?? 'Administrator'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

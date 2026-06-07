import { useLocation, useNavigate } from 'react-router-dom';
import {
  SquaresFour, UserPlus, Lightning, ChartLine,
  Money, Receipt, ChatCircle, ShieldCheck,
  Users, Wallet, ChartPie, Gear,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { useAuthStore } from '@/store/authStore';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { colors } from '@/theme';

interface NavItem {
  key: string;
  label: string;
  Icon: Icon;
  soon?: boolean;
}

const NAV_SECTIONS: Array<{ heading?: string; items: NavItem[] }> = [
  {
    items: [{ key: '/overview', label: 'Overview', Icon: SquaresFour }],
  },
  {
    heading: 'Acquisition',
    items: [
      { key: '/acquisition', label: 'Users & Channels', Icon: UserPlus },
      { key: '/activation', label: 'Activation Funnel', Icon: Lightning },
    ],
  },
  {
    heading: 'Retention',
    items: [{ key: '/retention', label: 'Retention by Cohort', Icon: ChartLine }],
  },
  {
    heading: 'Economics',
    items: [
      { key: '/revenue', label: 'Revenue', Icon: Money },
      { key: '/transactions', label: 'Transactions', Icon: Receipt },
      { key: '/engagement', label: 'Engagement', Icon: ChatCircle },
    ],
  },
  {
    heading: 'Risk & Growth',
    items: [
      { key: '/risk', label: 'Risk & Failures', Icon: ShieldCheck, soon: true },
      { key: '/referral', label: 'Referral Loop', Icon: Users, soon: true },
      { key: '/wallet', label: 'Wallet Behavior', Icon: Wallet, soon: true },
      { key: '/segments', label: 'Segments', Icon: ChartPie, soon: true },
    ],
  },
  {
    items: [{ key: '/settings', label: 'Settings', Icon: Gear }],
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
          background: '#13121a',
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
                        borderLeft: '3px solid transparent',
                        background: active ? colors.primary : 'transparent',
                        color: active ? 'white' : colors.textSecondary,
                        transition: 'background 0.15s, color 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLDivElement).style.background = colors.primary;
                          (e.currentTarget as HTMLDivElement).style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                          (e.currentTarget as HTMLDivElement).style.color = colors.textSecondary;
                        }
                      }}
                    >
                      <item.Icon size={18} weight={active ? 'fill' : 'regular'} style={{ flexShrink: 0 }} />
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

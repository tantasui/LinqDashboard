import { useLocation } from 'react-router-dom';
import { DatePicker, Badge } from 'antd';
import dayjs from 'dayjs';
import { useDashboardStore } from '@/store/dashboardStore';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/theme';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const ROUTE_TITLES: Record<string, string> = {
  '/overview': 'Overview',
  '/acquisition': 'Users & Channels',
  '/activation': 'Activation Funnel',
  '/retention': 'Retention by Cohort',
  '/revenue': 'Revenue',
  '/transactions': 'Transactions',
  '/engagement': 'Engagement',
  '/risk': 'Risk & Failures',
  '/referral': 'Referral Loop',
  '/wallet': 'Wallet Behavior',
  '/segments': 'Segments',
  '/settings': 'Settings',
};

interface TopBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function TopBar({ sidebarOpen, onToggleSidebar }: TopBarProps) {
  const { pathname } = useLocation();
  const { dateRange, setDateRange } = useDashboardStore();
  const admin = useAuthStore((s) => s.admin);

  const title = ROUTE_TITLES[pathname] ?? 'Dashboard';

  const handleRangeChange = (vals: [Dayjs | null, Dayjs | null] | null) => {
    if (vals && vals[0] && vals[1]) {
      setDateRange([vals[0], vals[1]]);
    }
  };

  const presets: Array<{ label: string; value: [Dayjs, Dayjs] }> = [
    { label: 'Last 7 days', value: [dayjs().subtract(7, 'day'), dayjs()] },
    { label: 'Last 30 days', value: [dayjs().subtract(30, 'day'), dayjs()] },
    { label: 'Last 90 days', value: [dayjs().subtract(90, 'day'), dayjs()] },
    { label: 'This month', value: [dayjs().startOf('month'), dayjs()] },
    { label: 'Last month', value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')] },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        background: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 16,
        zIndex: 100,
      }}
    >
      {/* Hamburger toggle */}
      <button
        onClick={onToggleSidebar}
        title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          background: sidebarOpen ? colors.primaryDim : colors.surfaceHigh,
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 0.15s, border-color 0.15s',
          color: sidebarOpen ? colors.primary : colors.textSecondary,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.primaryDim;
          e.currentTarget.style.borderColor = colors.primary;
          e.currentTarget.style.color = colors.primary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = sidebarOpen ? colors.primaryDim : colors.surfaceHigh;
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.color = sidebarOpen ? colors.primary : colors.textSecondary;
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          {sidebarOpen ? 'menu_open' : 'menu'}
        </span>
      </button>

      {/* Page title */}
      <h1
        style={{
          fontFamily: colors.fontDisplay,
          fontSize: 20,
          fontWeight: 700,
          color: colors.textPrimary,
          margin: 0,
          flex: 1,
          letterSpacing: '-0.3px',
        }}
      >
        {title}
      </h1>

      {/* Date range picker */}
      <RangePicker
        value={dateRange}
        onChange={handleRangeChange}
        presets={presets}
        style={{
          background: colors.surfaceHigh,
          borderColor: colors.border,
          color: colors.textPrimary,
        }}
        allowClear={false}
      />

      {/* Notifications */}
      <Badge count={3} size="small">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 22, color: colors.textSecondary, cursor: 'pointer' }}
        >
          notifications
        </span>
      </Badge>

      {/* Admin name */}
      <div style={{ fontSize: 14, color: colors.textSecondary, marginLeft: 4 }}>
        {admin?.name ?? 'Admin'}
      </div>
    </div>
  );
}

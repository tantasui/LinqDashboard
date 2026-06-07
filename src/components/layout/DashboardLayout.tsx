import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { FloatingChatButton } from './FloatingChatButton';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { colors } from '@/theme';

const { Content } = Layout;
const SIDEBAR_W = 240;

export function DashboardLayout() {
  const { isDesktop } = useBreakpoint();
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  // Auto-close on mobile, auto-open on desktop when viewport changes
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <Layout style={{ minHeight: '100vh', background: colors.bgBase }}>
      {/* Backdrop — only rendered on mobile/tablet when sidebar is open */}
      {!isDesktop && sidebarOpen && (
        <div
          onClick={handleCloseSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />

      <Layout
        style={{
          marginLeft: isDesktop && sidebarOpen ? SIDEBAR_W : 0,
          background: colors.bgBase,
          transition: 'margin-left 0.25s ease',
        }}
      >
        <TopBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <Content
          style={{
            marginTop: 64,
            padding: isDesktop ? 24 : 16,
            minHeight: 'calc(100vh - 64px)',
            background: colors.bgBase,
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      <FloatingChatButton />
    </Layout>
  );
}

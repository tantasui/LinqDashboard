import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { FloatingChatButton } from './FloatingChatButton';
import { colors } from '@/theme';

const { Content } = Layout;

const SIDEBAR_W = 240;

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh', background: colors.bgBase }}>
      <Sidebar open={sidebarOpen} />
      <Layout
        style={{
          marginLeft: sidebarOpen ? SIDEBAR_W : 0,
          background: colors.bgBase,
          transition: 'margin-left 0.25s ease',
        }}
      >
        <TopBar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <Content
          style={{
            marginTop: 64,
            padding: 24,
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

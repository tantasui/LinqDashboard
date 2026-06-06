import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Space, Avatar, theme } from 'antd';
import {
  BarChartOutlined,
  TeamOutlined,
  TransactionOutlined,
  ApiOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './DashboardLayout.css';

const { Header, Sider, Content } = Layout;

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  // Read admin name from localStorage (set during login)
  const getAdminName = (): string => {
    const userStr = localStorage.getItem('linq_admin_user');
    if (userStr) {
      try {
        const parsed: { username?: string } = JSON.parse(userStr);
        return parsed.username || 'Admin';
      } catch {
        return 'Admin';
      }
    }
    return 'Admin';
  };

  const handleLogout = () => {
    localStorage.removeItem('linq_admin_token');
    localStorage.removeItem('linq_admin_user');
    navigate('/login');
  };

  const userMenu = {
    items: [
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        onClick: handleLogout,
      },
    ],
  };

  const navItems = [
    {
      key: '/',
      icon: <BarChartOutlined />,
      label: 'Metrics Overview',
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: 'Users',
      disabled: true,
      title: 'Coming soon'
    },
    {
      key: '/transactions',
      icon: <TransactionOutlined />,
      label: 'Transactions',
      disabled: true,
      title: 'Coming soon'
    },
    {
      key: '/api-monitor',
      icon: <ApiOutlined />,
      label: 'API Monitor',
      disabled: true,
      title: 'Coming soon'
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="linq-sider"
        width={240}
      >
        <div className="linq-logo-container">
          {collapsed ? (
            <div style={{ color: token.colorPrimary }}>L</div>
          ) : (
            <div style={{ color: token.colorPrimary }}>LINQ Metrics</div>
          )}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={navItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout className="site-layout">
        <Header className="linq-header">
          <div className="header-content">
            <h2 style={{ margin: 0, color: token.colorText, fontSize: 18 }}>Dashboard</h2>
            <Dropdown menu={userMenu} placement="bottomRight" trigger={['click', 'hover']}>
              <span style={{ cursor: 'pointer', color: token.colorText, display: 'inline-block' }}>
                <Space>
                  <Avatar icon={<UserOutlined />} style={{ backgroundColor: token.colorPrimary }} />
                  <span>{getAdminName()}</span>
                </Space>
              </span>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: '24px 24px', overflow: 'initial' }}>
          <div style={{ padding: 24, minHeight: 360, borderRadius: token.borderRadius }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

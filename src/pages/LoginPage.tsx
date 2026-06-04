import React, { useState } from 'react';
import { Form, Input, Button, Card, App, Typography, theme } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();
  const { message } = App.useApp();

  const onLogin = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      // Stub: no real API call in this ticket.
      // When backend lands, replace with: const res = await axios.post('/admin/login', values);
      console.log('Login stub:', values);

      // Simulate success: store a stub JWT
      localStorage.setItem('linq_admin_token', 'stub-jwt-token');
      localStorage.setItem('linq_admin_user', JSON.stringify({ id: 1, email: values.email, username: 'Admin' }));

      message.success('Login successful');
      navigate('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${token.colorBgBase} 0%, ${token.colorBgContainer} 100%)`,
    }}>
      <Card
        style={{
          width: 400,
          background: token.colorBgElevated,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${token.colorBorder}`,
        }}
        styles={{ body: { padding: '40px 32px' } }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: token.colorText, marginBottom: 8 }}>LINQ</Title>
          <Text style={{ color: token.colorTextSecondary }}>Metrics Dashboard Admin</Text>
        </div>

        <Form<LoginFormValues> name="login" onFinish={onLogin} layout="vertical" size="large">
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input prefix={<UserOutlined style={{ color: token.colorTextSecondary }} />} placeholder="Admin Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password prefix={<LockOutlined style={{ color: token.colorTextSecondary }} />} placeholder="Password" />
          </Form.Item>
          <Form.Item style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

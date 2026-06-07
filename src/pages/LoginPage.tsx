import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { login } from '@/api/endpoints';
import { colors } from '@/theme';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const authLogin = useAuthStore((s) => s.login);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setError(null);
    setLoading(true);
    try {
      const res = await login(values.email, values.password);
      authLogin(res.token, res.admin);
      navigate('/overview', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bgBase,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderTop: `2px solid ${colors.primary}`,
          borderRadius: 16,
          padding: 36,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              fontFamily: colors.fontDisplay,
              fontSize: 32,
              fontWeight: 700,
              color: colors.primary,
              letterSpacing: '-0.5px',
            }}
          >
            LINQ
          </div>
          <div style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
            Admin Dashboard
          </div>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            style={{ marginBottom: 20 }}
            closable
            onClose={() => setError(null)}
          />
        )}

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label={<span style={{ color: colors.textSecondary }}>Email</span>}
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input
              placeholder="admin@linq.so"
              size="large"
              style={{ background: colors.surfaceLow, borderColor: colors.border, color: colors.textPrimary }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: colors.textSecondary }}>Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              placeholder="••••••••"
              size="large"
              style={{ background: colors.surfaceLow, borderColor: colors.border, color: colors.textPrimary }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
              style={{ background: colors.primary, borderColor: colors.primary, fontWeight: 600 }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: colors.textMuted }}>
          Use admin@linq.so / admin to sign in
        </div>
      </div>
    </div>
  );
}

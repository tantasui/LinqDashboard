import api from './api';
import { LoginResponse, VerifyResponse, AdminUser } from '@/types/auth';

export const authService = {
  login: async (email: string, password: string): Promise<string> => {
    // For now we assume the backend requires POST /admin/login 
    // which returns a login_token for OTP verification
    const response = await api.post<LoginResponse>('/admin/login', { email, password });
    return response.data.login_token;
  },
  verifyOTP: async (login_token: string, otp: string): Promise<VerifyResponse> => {
    const response = await api.post<VerifyResponse>('/admin/verify-login', { login_token, otp });
    return response.data;
  },
  resendOTP: async (login_token: string): Promise<void> => {
    await api.post('/admin/resend-otp', { login_token });
  },
  logout: async (): Promise<void> => {
    try {
      await api.post('/admin/logout');
    } catch (e) {
      console.error('Logout request failed', e);
    } finally {
      localStorage.removeItem('linq_admin_token');
      localStorage.removeItem('linq_admin_user');
      window.location.href = '/login';
    }
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('linq_admin_token');
  },
  getAdminUser: (): AdminUser | null => {
    const userStr = localStorage.getItem('linq_admin_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};

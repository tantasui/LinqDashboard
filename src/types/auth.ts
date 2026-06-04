export interface AdminUser {
  id: number;
  email: string;
  username?: string;
  role?: string;
}

export interface LoginResponse {
  message: string;
  login_token: string;
  requires_otp: boolean;
}

export interface VerifyResponse {
  message: string;
  token: string;
  admin: AdminUser;
}

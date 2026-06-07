import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const colors = {
  primary: '#8a4fff',
  primaryHover: '#7B3FE8',
  primaryGlow: 'rgba(138,79,255,0.18)',
  primaryDim: 'rgba(138,79,255,0.10)',
  secondary: '#00D4FF',
  onramp: '#80D8FF',
  tertiary: '#ffb95f',
  success: '#4ade80',
  warning: '#fbbf24',
  error: '#ffb4ab',
  errorStrong: '#EF4444',
  bgBase: '#0C0A0F',
  surface: '#13111A',
  surfaceRaised: '#1C1826',
  surfaceElevated: '#241F33',
  surfaceLowest: '#100828',
  surfaceLow: '#1e1636',
  surfaceHigh: '#2d2545',
  surfaceHighest: '#383051',
  border: '#2D2640',
  borderSubtle: '#1F1B2E',
  textPrimary: '#e8deff',
  textSecondary: '#ccc3d8',
  textMuted: '#958da1',
  fontDisplay: '"Google Sans", sans-serif',
  fontBody: '"Google Sans", sans-serif',
  fontMono: '"Google Sans", sans-serif',
  fontCode: '"Google Sans", sans-serif',
} as const;

export const chartColors = [
  colors.primary,
  colors.secondary,
  colors.tertiary,
  colors.onramp,
  colors.success,
  colors.warning,
];

export const linqTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: colors.primary,
    colorBgBase: colors.bgBase,
    colorBgContainer: colors.surface,
    colorBgElevated: colors.surfaceElevated,
    colorBgLayout: colors.bgBase,
    colorBorder: colors.border,
    colorBorderSecondary: colors.borderSubtle,
    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.errorStrong,
    colorInfo: colors.secondary,
    fontFamily: '"Google Sans", sans-serif',
    borderRadius: 8,
    borderRadiusLG: 12,
    fontSize: 16,
  },
  components: {
    Layout: {
      siderBg: colors.surfaceLowest,
      headerBg: colors.surface,
      bodyBg: colors.bgBase,
    },
    Menu: {
      darkItemBg: colors.surfaceLowest,
      darkItemSelectedBg: colors.primaryDim,
      darkItemColor: colors.textSecondary,
      darkItemHoverBg: colors.surfaceHigh,
      darkItemHoverColor: colors.textPrimary,
      borderRadius: 8,
    },
    Table: {
      colorBgContainer: colors.surface,
      headerBg: colors.surfaceHigh,
      headerColor: colors.textSecondary,
      colorBorderSecondary: colors.border,
      rowHoverBg: colors.surfaceLow,
    },
    Drawer: {
      colorBgElevated: colors.surface,
    },
    Select: {
      colorBgContainer: colors.surfaceHigh,
      optionSelectedBg: colors.primaryDim,
    },
    DatePicker: {
      colorBgContainer: colors.surfaceHigh,
    },
    Button: {
      colorBgContainer: colors.surfaceHigh,
    },
    Form: {
      colorBgContainer: colors.surfaceLow,
    },
    Input: {
      colorBgContainer: colors.surfaceLow,
      colorBorder: colors.border,
    },
    Skeleton: {
      colorFill: colors.surfaceHigh,
      colorFillContent: colors.surfaceElevated,
    },
    Card: {
      colorBgContainer: colors.surface,
      colorBorderSecondary: colors.border,
    },
  },
};

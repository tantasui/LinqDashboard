import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const linqTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#8A4FFF', // LINQ purple from logo
    colorBgBase: '#0F0F0F',
    colorBgContainer: '#1A1A2E',
    colorBgElevated: '#16213E',
    colorBorder: '#2A2A4A',
    colorText: '#EAEAEA',
    colorTextSecondary: '#8B8FA3',
    colorSuccess: '#00E396',
    colorWarning: '#FEB019',
    colorError: '#FF4560',
    fontFamily: '"Inter", sans-serif',
    borderRadius: 8,
  },
  components: {
    Layout: {
      siderBg: '#0F0F0F',
      headerBg: '#1A1A2E',
      bodyBg: '#0F0F0F',
    },
    Card: {
      colorBgContainer: '#1E1E1E',
      colorBorderSecondary: '#2A2A4A',
    },
    Menu: {
      itemBg: '#0F0F0F',
      itemActiveBg: '#1A1A2E',
      itemHoverColor: '#8A4FFF',
      itemSelectedColor: '#8A4FFF',
    },
    Table: {
      colorBgContainer: '#1E1E1E',
      colorBorderSecondary: '#2A2A4A',
      headerBg: '#2A2A4A',
      headerColor: '#EAEAEA',
    },
  },
};

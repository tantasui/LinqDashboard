import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import App from './App';
import { linqTheme } from './theme/themeConfig';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={linqTheme}>
      <AntdApp>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
);


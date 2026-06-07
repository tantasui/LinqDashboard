import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AuthGuard } from '@/components/layout/AuthGuard';
import { LoginPage } from '@/pages/LoginPage';
import { OverviewPage } from '@/pages/OverviewPage';
import { AcquisitionPage } from '@/pages/AcquisitionPage';
import { ActivationPage } from '@/pages/ActivationPage';
import { RetentionPage } from '@/pages/RetentionPage';
import { RevenuePage } from '@/pages/RevenuePage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { EngagementPage } from '@/pages/EngagementPage';
import { RiskPage } from '@/pages/RiskPage';
import { ReferralPage } from '@/pages/ReferralPage';
import { WalletBehaviorPage } from '@/pages/WalletBehaviorPage';
import { SegmentsPage } from '@/pages/SegmentsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/overview" replace /> },
      { path: 'overview', element: <OverviewPage /> },
      { path: 'acquisition', element: <AcquisitionPage /> },
      { path: 'activation', element: <ActivationPage /> },
      { path: 'retention', element: <RetentionPage /> },
      { path: 'revenue', element: <RevenuePage /> },
      { path: 'transactions', element: <TransactionsPage /> },
      { path: 'engagement', element: <EngagementPage /> },
      { path: 'risk', element: <RiskPage /> },
      { path: 'referral', element: <ReferralPage /> },
      { path: 'wallet', element: <WalletBehaviorPage /> },
      { path: 'segments', element: <SegmentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

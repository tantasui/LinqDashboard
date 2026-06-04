# LINQ Metrics Dashboard

A standalone React + TypeScript + Vite administration dashboard for monitoring and analyzing LINQ platform performance and business metrics.

## Tech Stack
- **React + Vite** (TypeScript)
- **Ant Design (antd v6)**: Core UI components, layouts, tables, and loading skeletons.
- **@ant-design/plots**: High-performance charting library (Line, Column, and Funnel visualization).
- **React Router v6**: Client-side routing.
- **Axios**: Standardized API client layer.

## Project Structure
- `src/main.tsx`: Entry point configured with Ant Design `<App>` context and custom LINQ theme config.
- `src/App.tsx`: App-level routing and authentication guards.
- `src/theme/themeConfig.ts`: Dynamic theme configuration utilizing Ant Design v6 tokens for a premium dark-mode palette.
- `src/services/`:
  - `authService.ts`: Stubbed OTP login, verify, and session management.
  - `dashboardService.ts`: Stubbed endpoints for dashboard statistics.
- `src/components/`:
  - `OverviewStats.tsx`: Key Performance Indicators (KPIs) banner.
  - `RetentionTable.tsx`: Cohort retention analysis.
  - `FloatingChatButton.tsx`: Quick action helper.
  - `charts/`: Chart modules using `@ant-design/plots`.
- `src/layouts/DashboardLayout.tsx`: Common sidebar, header layout with user avatar menu.
- `src/pages/`:
  - `LoginPage.tsx`: Glassmorphism-style administrator login page.
  - `MetricsPage.tsx`: Interactive dashboard displaying filter options, stats, graphs, and cohorts.

## Getting Started

### Development
To launch the development server locally:
```bash
npm install
npm run dev
```

### Production Build
To verify type correctness and compile the build:
```bash
npm run build
```

## Integrating Real Data
When the backend REST API endpoints land, replace the mock values and fallback hooks inside [src/services/dashboardService.ts](file:///c:/Users/daniel/Documents/LinqDashboard/src/services/dashboardService.ts) and [src/services/authService.ts](file:///c:/Users/daniel/Documents/LinqDashboard/src/services/authService.ts) with direct API calls.

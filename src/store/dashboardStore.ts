import { create } from 'zustand';
import dayjs, { type Dayjs } from 'dayjs';

interface DashboardState {
  dateRange: [Dayjs, Dayjs];
  setDateRange: (range: [Dayjs, Dayjs]) => void;
  cohortMonth: string;
  setCohortMonth: (month: string) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  dateRange: [dayjs().subtract(30, 'day'), dayjs()],
  setDateRange: (dateRange) => set({ dateRange }),
  cohortMonth: dayjs().subtract(1, 'month').format('YYYY-MM'),
  setCohortMonth: (cohortMonth) => set({ cohortMonth }),
}));

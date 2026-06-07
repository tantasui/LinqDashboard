import type { Dayjs } from 'dayjs';

export function toApiDateRange(range: [Dayjs, Dayjs]): { from: string; to: string } {
  return {
    from: range[0].format('YYYY-MM-DD'),
    to: range[1].format('YYYY-MM-DD'),
  };
}

export function formatAxisDate(dateStr: string, granularity: 'daily' | 'weekly' | 'monthly'): string {
  const d = new Date(dateStr);
  if (granularity === 'monthly') return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  if (granularity === 'weekly') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

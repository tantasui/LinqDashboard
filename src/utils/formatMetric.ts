export function formatNumber(value: number | null | undefined, decimals = 0): string {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-NG', { maximumFractionDigits: decimals }).format(value);
}

export function formatCurrency(value: number | null | undefined, currency = 'USD'): string {
  if (value == null) return '—';
  const symbol = currency === 'NGN' ? '₦' : '$';
  return symbol + new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value);
}

export function formatPercent(value: number | null | undefined, decimals = 1): string {
  if (value == null) return '—';
  return `${value.toFixed(decimals)}%`;
}

export function formatTrend(value: number | null | undefined): {
  label: string;
  direction: 'up' | 'down' | 'flat';
} {
  if (value == null) return { label: '—', direction: 'flat' };
  if (value > 0) return { label: `+${value.toFixed(1)}%`, direction: 'up' };
  if (value < 0) return { label: `${value.toFixed(1)}%`, direction: 'down' };
  return { label: '0.0%', direction: 'flat' };
}

export function formatSeconds(value: number | null | undefined): string {
  if (value == null) return '—';
  return `${value.toFixed(1)}s`;
}

export function formatHours(value: number | null | undefined): string {
  if (value == null) return '—';
  return `${value.toFixed(1)} hrs`;
}

export function formatUSDC(value: number | null | undefined): string {
  return formatCurrency(value, 'USD');
}

export function formatNGN(value: number | null | undefined): string {
  return formatCurrency(value, 'NGN');
}

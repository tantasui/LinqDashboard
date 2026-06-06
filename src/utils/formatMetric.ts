import numeral from 'numeral';

/**
 * Formats a decimal percentage to a string.
 * Example: 0.38 -> "38.0%"
 * @param decimal The decimal value to format
 * @param precision Number of decimal places (default 1)
 */
export function formatPercent(decimal: number, precision = 1): string {
  if (decimal == null || isNaN(decimal)) return '-';
  const percentStr = (decimal * 100).toFixed(precision);
  return `${percentStr}%`;
}

/**
 * Formats a number to USDC currency string.
 * Example: 480000 -> "$480,000.00"
 */
export function formatUSDC(amount: number): string {
  if (amount == null || isNaN(amount)) return '-';
  return numeral(amount).format('$0,0.00');
}

/**
 * Formats a number compactly (e.g., 1.2M, 50K).
 */
export function formatCompact(value: number): string {
  if (value == null || isNaN(value)) return '-';
  return numeral(value).format('0.0a').toUpperCase();
}

/**
 * Formats a whole number with commas.
 * Example: 48000 -> "48,000"
 */
export function formatNumber(value: number): string {
  if (value == null || isNaN(value)) return '-';
  return numeral(value).format('0,0');
}

/**
 * Formats a percentage change for badges/tags.
 * Example: 0.12 -> { text: "+12.0%", isPositive: true }
 */
export function formatChange(decimal: number): { text: string; isPositive: boolean } {
  if (decimal == null || isNaN(decimal)) return { text: '-', isPositive: true };
  const percent = decimal * 100;
  const isPositive = percent >= 0;
  const sign = isPositive ? '+' : '';
  return {
    text: `${sign}${percent.toFixed(1)}%`,
    isPositive,
  };
}

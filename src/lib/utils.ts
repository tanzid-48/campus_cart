export function calculateGrowth(
  current: number,
  previous: number,
): { percent: number; isPositive: boolean } {
  if (previous === 0) {
    return { percent: current > 0 ? 100 : 0, isPositive: current > 0 };
  }
  const percent = Math.round(((current - previous) / previous) * 100);
  return { percent: Math.abs(percent), isPositive: percent >= 0 };
}

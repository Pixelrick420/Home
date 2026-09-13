import { rawContributions } from "./githubContributions";

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function quartile(sorted: number[], at: number): number {
  return sorted[Math.floor((sorted.length - 1) * at)] ?? 0;
}

function levelFromCount(
  count: number,
  bounds: [number, number, number],
): ActivityDay["level"] {
  if (count <= 0) return 0;
  const [q1, q2, q3] = bounds;
  if (count > q3) return 4;
  if (count > q2) return 3;
  if (count > q1) return 2;
  return 1;
}

function computeLevels(days: Array<{ date: string; count: number }>): ActivityDay[] {
  const sorted = days
    .map((day) => day.count)
    .filter((count) => count > 0)
    .sort((a, b) => a - b);

  const bounds: [number, number, number] = [
    quartile(sorted, 0.25),
    quartile(sorted, 0.5),
    quartile(sorted, 0.75),
  ];

  return days.map((day) => ({
    date: day.date,
    count: day.count,
    level: levelFromCount(day.count, bounds),
  }));
}

export const githubActivity = computeLevels(rawContributions);
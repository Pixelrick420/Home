import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { motion } from "framer-motion";
import {
  duration,
  ease,
  fontSize,
  offset,
  radius,
  spacing,
} from "../constants";
import { useTheme } from "../context/useTheme";
import { githubActivity, toDateKey, type ActivityDay } from "../data/activity";
import { useScrollFade } from "../hooks/useScrollFade";
import { fonts } from "../theme";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

const DAY_MS = 86_400_000;
const TOTAL_DAYS = 365;
const ROWS = 7;
const MAX_COLUMNS = Math.floor(TOTAL_DAYS / ROWS);
const CELL_TARGET = 16;
const GAP = 4;

const MONTHS_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const LEVEL_SCALE = {
  light: ["#eef3e3", "#d3e99f", "#b3e455", "#8ad01d", "#a3e635"],
  dark: ["#161b14", "#243019", "#334521", "#4c6b2c", "#a3e635"],
} as const;

interface DayCell {
  date: string;
  count: number;
  level: number;
}

interface Tip {
  x: number;
  y: number;
  cell: DayCell;
  above: boolean;
}

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function buildDays(activity: Map<string, ActivityDay>): {
  days: DayCell[];
  total: number;
} {
  const today = startOfDay(new Date());
  const from = new Date(today.getTime() - (TOTAL_DAYS - 1) * DAY_MS);

  const days: DayCell[] = [];
  let total = 0;

  for (let i = 0; i < TOTAL_DAYS; i += 1) {
    const date = new Date(from.getTime() + i * DAY_MS);
    const key = toDateKey(date);
    const entry = activity.get(key) ?? { date: key, count: 0, level: 0 };
    total += entry.count;
    days.push(entry);
  }

  return { days, total };
}

function dateLabel(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  return `${MONTHS_ABBR[month - 1]} ${day}, ${year}`;
}

export default function ActivityHeatmap() {
  const { t, mode } = useTheme();
  const [contentRef, visible] = useScrollFade<HTMLDivElement>({ threshold: 0.08 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [width, setWidth] = useState(0);

  const { days, total } = useMemo(
    () => buildDays(new Map(githubActivity.map((day) => [day.date, day]))),
    [],
  );

  const columns = Math.min(
    MAX_COLUMNS,
    Math.max(1, Math.floor((width + GAP) / (CELL_TARGET + GAP))),
  );
  const cellSize = width > 0 ? (width + GAP) / columns - GAP : CELL_TARGET;
  const daysShown = Math.min(TOTAL_DAYS, columns * ROWS);

  const cells = useMemo(() => {
    const offset = Math.max(0, TOTAL_DAYS - columns * ROWS);
    const visible = days.slice(offset);
    const grid: DayCell[][] = [];
    for (let col = 0; col < columns; col += 1) {
      const column: DayCell[] = [];
      for (let row = 0; row < ROWS; row += 1) {
        column.push(visible[col * ROWS + row]);
      }
      grid.push(column);
    }
    return grid;
  }, [columns, days]);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const measure = () => setWidth(footer.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const tipText = tip
    ? tip.cell.count > 0
      ? `${tip.cell.count} ${
          tip.cell.count === 1 ? "contribution" : "contributions"
        } on ${dateLabel(tip.cell.date)}`
      : `No contributions on ${dateLabel(tip.cell.date)}`
    : "";

  function handleCellEnter(cell: DayCell, row: number, event: MouseEvent<HTMLDivElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(
      Math.max(cellRect.left - canvasRect.left + cellRect.width / 2, 72),
      canvasRect.width - 72,
    );
    setTip({
      x,
      y: cellRect.top - canvasRect.top + cellRect.height / 2,
      cell,
      above: row >= Math.floor(ROWS / 2),
    });
  }

  return (
    <Section id="activity">
      <SectionHeader label="03 - Activity">
        What I'm <span style={{ color: t.accent }}>Up To</span>
      </SectionHeader>

      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: offset.y }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : offset.y }}
        transition={{ duration: duration.slow, ease }}
      >
        <div
          ref={canvasRef}
          className="heatmap-canvas"
          style={{ position: "relative", width: "max-content", margin: "0 auto" }}
        >
          <div
            className="heatmap-grid"
            style={{ display: "flex", gap: `${GAP}px` }}
          >
            {cells.map((column, col) => (
              <div
                key={`col-${col}`}
                style={{ display: "flex", flexDirection: "column", gap: `${GAP}px` }}
              >
                {column.map((day, row) => (
                  <div
                    key={day.date}
                    className="heatmap-cell"
                    onMouseEnter={(event) => handleCellEnter(day, row, event)}
                    onMouseLeave={() => setTip(null)}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: radius.bar,
                      backgroundColor: LEVEL_SCALE[mode][day.level],
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div
            className="heatmap-tooltip"
            style={{
              position: "absolute",
              top: tip?.y ?? 0,
              left: tip?.x ?? 0,
              transform:
                tip && !tip.above
                  ? "translate(-50%, 10px)"
                  : "translate(-50%, calc(-100% - 10px))",
              transformOrigin: "top center",
              opacity: tip ? 1 : 0,
              pointerEvents: "none",
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: radius.card,
              backgroundColor: "#222222",
              color: "#F2F2F2",
              fontFamily: fonts.sans,
              fontSize: fontSize.xxs,
              fontWeight: 500,
              whiteSpace: "nowrap",
              transition: "opacity 0.12s ease",
              zIndex: 20,
            }}
          >
            {tipText}
          </div>
        </div>

        <div
          ref={footerRef}
          className="heatmap-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: spacing.sm,
            marginTop: spacing.lg,
          }}
        >
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: fontSize.sm,
              fontWeight: 600,
              color: t.textSub,
            }}
          >
            {total.toLocaleString()} contributions last year
          </span>
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: fontSize.sm,
              fontWeight: 600,
              color: t.textSub,
            }}
          >
            showing {daysShown} days
          </span>
        </div>
      </motion.div>

      <style>{`
        .heatmap-cell {
          transition: transform 0.12s ease;
        }
        .heatmap-cell:hover {
          transform: scale(1.2);
        }
      `}</style>
    </Section>
  );
}
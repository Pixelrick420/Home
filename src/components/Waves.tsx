import { useEffect, useRef } from "react";
import { useTheme } from "../context/useTheme";

const MAX_DPR = 1;
const MOBILE_BREAKPOINT = 768;
const GRID_SIZE = 10;
const MOBILE_GRID_SIZE = 30;
const FRAME_INTERVAL_MS = 20;
const LEVELS = [-1.2, -0.8, -0.2, 0.2, 0.8, 1.2];

function readThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    bg: styles.getPropertyValue("--bg").trim() || "#000000",
    accent: styles.getPropertyValue("--accent").trim() || "#cccccc",
  };
}

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { mode } = useTheme();
  const colorsRef = useRef({ bg: "#000000", accent: "#cccccc" });
  const timeRef = useRef(0);

  useEffect(() => {
    colorsRef.current = readThemeColors();
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const mobileQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`,
    );

    let width = 0;
    let height = 0;
    let gridSize = GRID_SIZE;
    let isMobile = mobileQuery.matches;
    let cols = 0;
    let rows = 0;

    let field: Float32Array;
    let xComp: Float32Array;
    let yComp: Float32Array;
    let xBase1: Float32Array;
    let xBase2: Float32Array;
    let diagI: Float32Array;
    let yBase1: Float32Array;
    let yBase2: Float32Array;
    let diagJ: Float32Array;
    let sinA: Float32Array;
    let cosA: Float32Array;
    let sinB: Float32Array;
    let cosB: Float32Array;

    let appliedBg = "";
    let appliedAccent = "";

    const layout = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = mobileQuery.matches;
      gridSize = isMobile ? MOBILE_GRID_SIZE : GRID_SIZE;
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        isMobile ? 1 : MAX_DPR,
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 2;
      ctx.lineJoin = isMobile ? "miter" : "round";
      ctx.lineCap = isMobile ? "butt" : "round";

      appliedBg = "";
      appliedAccent = "";

      cols = Math.ceil(width / gridSize) + 1;
      rows = Math.ceil(height / gridSize) + 1;
      field = new Float32Array(cols * rows);
      xComp = new Float32Array(cols);
      yComp = new Float32Array(rows);
      xBase1 = new Float32Array(cols);
      xBase2 = new Float32Array(cols);
      diagI = new Float32Array(cols);
      yBase1 = new Float32Array(rows);
      yBase2 = new Float32Array(rows);
      diagJ = new Float32Array(rows);
      sinA = new Float32Array(cols);
      cosA = new Float32Array(cols);
      sinB = new Float32Array(rows);
      cosB = new Float32Array(rows);

      for (let i = 0; i < cols; i++) {
        const g = i * gridSize;
        xBase1[i] = g * 0.007;
        xBase2[i] = g * 0.013;
        diagI[i] = g * 0.008;
      }
      for (let j = 0; j < rows; j++) {
        const g = j * gridSize;
        yBase1[j] = g * 0.011;
        yBase2[j] = g * 0.017;
        diagJ[j] = g * 0.008;
        sinB[j] = Math.sin(diagJ[j]);
        cosB[j] = Math.cos(diagJ[j]);
      }
    };

    let animationId = 0;
    let layoutFrame = 0;
    let running = false;
    let last = 0;

    const draw = (now: number) => {
      if (!running) return;
      animationId = requestAnimationFrame(draw);
      if (now - last < FRAME_INTERVAL_MS) return;
      const dt = Math.min(now - last, 50) / 16.666;
      last = now;

      const scrollOffset = window.scrollY * 0.6;
      const tf = timeRef.current * 0.7;
      const tfA = tf * 0.01;
      const tfB = tf * 0.8;
      const s1 = scrollOffset * 0.011;
      const s2 = scrollOffset * 0.017;
      const s3 = scrollOffset * 0.008;
      const invRange = 1 / 2.2;

      for (let i = 0; i < cols; i++) {
        xComp[i] =
          (Math.sin(xBase1[i] + tfA) + Math.sin(xBase2[i] + tfA)) * 0.5;
      }
      for (let j = 0; j < rows; j++) {
        yComp[j] =
          (Math.sin(yBase1[j] + s1 + tfA) + Math.sin(yBase2[j] + s2 + tfA)) *
          0.5;
      }

      for (let i = 0; i < cols; i++) {
        const a = diagI[i] + s3 + tfB;
        sinA[i] = Math.sin(a);
        cosA[i] = Math.cos(a);
      }

      for (let i = 0; i < cols; i++) {
        const offset = i * rows;
        const xc = xComp[i];
        const si = sinA[i];
        const ci = cosA[i];
        for (let j = 0; j < rows; j++) {
          field[offset + j] =
            (xc + yComp[j] + si * cosB[j] + ci * sinB[j]) * invRange;
        }
      }

      const colors = colorsRef.current;
      if (colors.bg !== appliedBg) {
        ctx.fillStyle = colors.bg;
        appliedBg = colors.bg;
      }
      ctx.fillRect(0, 0, width, height);
      if (colors.accent !== appliedAccent) {
        ctx.strokeStyle = colors.accent;
        appliedAccent = colors.accent;
      }

      for (const level of LEVELS) {
        ctx.beginPath();
        for (let i = 0; i < cols - 1; i++) {
          const iOff = i * rows;
          const iNextOff = (i + 1) * rows;
          const x = i * gridSize;

          for (let j = 0; j < rows - 1; j++) {
            const y = j * gridSize;
            const v1 = field[iOff + j];
            const v2 = field[iNextOff + j];
            const v3 = field[iNextOff + j + 1];
            const v4 = field[iOff + j + 1];

            let caseIndex = 0;
            if (v1 > level) caseIndex |= 1;
            if (v2 > level) caseIndex |= 2;
            if (v3 > level) caseIndex |= 4;
            if (v4 > level) caseIndex |= 8;
            if (caseIndex === 0 || caseIndex === 15) continue;

            const topX = x + gridSize * ((level - v1) / (v2 - v1));
            const rightY = y + gridSize * ((level - v2) / (v3 - v2));
            const bottomX = x + gridSize * ((level - v4) / (v3 - v4));
            const leftY = y + gridSize * ((level - v1) / (v4 - v1));

            switch (caseIndex) {
              case 1:
              case 14:
                ctx.moveTo(x, leftY);
                ctx.lineTo(topX, y);
                break;
              case 2:
              case 13:
                ctx.moveTo(topX, y);
                ctx.lineTo(x + gridSize, rightY);
                break;
              case 3:
              case 12:
                ctx.moveTo(x, leftY);
                ctx.lineTo(x + gridSize, rightY);
                break;
              case 4:
              case 11:
                ctx.moveTo(x + gridSize, rightY);
                ctx.lineTo(bottomX, y + gridSize);
                break;
              case 5:
                ctx.moveTo(x, leftY);
                ctx.lineTo(topX, y);
                ctx.moveTo(x + gridSize, rightY);
                ctx.lineTo(bottomX, y + gridSize);
                break;
              case 6:
              case 9:
                ctx.moveTo(topX, y);
                ctx.lineTo(bottomX, y + gridSize);
                break;
              case 7:
              case 8:
                ctx.moveTo(x, leftY);
                ctx.lineTo(bottomX, y + gridSize);
                break;
              case 10:
                ctx.moveTo(topX, y);
                ctx.lineTo(x + gridSize, rightY);
                ctx.moveTo(x, leftY);
                ctx.lineTo(bottomX, y + gridSize);
                break;
            }
          }
        }
        ctx.stroke();
      }

      timeRef.current += 0.004 * dt;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationId);
      } else if (!running) {
        running = true;
        last = performance.now();
        animationId = requestAnimationFrame(draw);
      }
    };

    const onResize = () => {
      if (layoutFrame) return;
      layoutFrame = requestAnimationFrame(() => {
        layoutFrame = 0;
        layout();
      });
    };

    layout();
    running = true;
    last = performance.now();
    animationId = requestAnimationFrame(draw);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    mobileQuery.addEventListener("change", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(layoutFrame);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      mobileQuery.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-1]"
    />
  );
}

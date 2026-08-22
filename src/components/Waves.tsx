import { useEffect, useRef } from "react";
import { useTheme } from "../context/useTheme";
import { zIndex } from "../constants";

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { t } = useTheme();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    let width = 0;
    let height = 0;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
    const gridSize = isMobile ? 30 : 12;
    const levels = [-1.2, -0.8, -0.2, 0.2, 0.8, 1.2];

    let animationId: number;
    let time = 0;
    let cols = 0;
    let rows = 0;
    let last = 0;

    let field: Float32Array;
    let xComp: Float32Array;
    let yComp: Float32Array;
    let xBase1: Float32Array;
    let xBase2: Float32Array;
    let diagI: Float32Array;
    let yBase1: Float32Array;
    let yBase2: Float32Array;
    let diagJ: Float32Array;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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
      }
    }

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();

    const draw = (now: number) => {
      animationId = requestAnimationFrame(draw);
      if (now - last < 20) return;
      const dt = Math.min(now - last, 50) / 16.666;
      last = now;

      const scrollOffset = scrollYRef.current * 0.6;
      const tf = time * 0.7;
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
        const offset = i * rows;
        const xc = xComp[i];
        const di = diagI[i];
        for (let j = 0; j < rows; j++) {
          const diag = Math.sin(di + diagJ[j] + s3 + tfB);
          field[offset + j] = (xc + yComp[j] + diag) * invRange;
        }
      }

      ctx.fillStyle = t.bg;
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = t.accent;
      ctx.lineJoin = isMobile ? "miter" : "round";
      ctx.lineCap = isMobile ? "butt" : "round";

      for (const level of levels) {
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

      time += 0.012 * dt;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        last = 0;
        animationId = requestAnimationFrame(draw);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(animationId);
    };
  }, [t.bg, t.accent]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: zIndex.waves,
        pointerEvents: "none",
      }}
    />
  );
}

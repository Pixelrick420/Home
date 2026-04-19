import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { t } = useTheme();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const gridSize = 12;
    const levels = [-0.8, -0.2, 0.2, 0.8];

    let animationId: number;
    let time = 0;
    let cols = 0;
    let rows = 0;

    let field: Float32Array;
    let xComp: Float32Array;
    let yComp: Float32Array;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / gridSize) + 1;
      rows = Math.ceil(height / gridSize) + 1;
      field = new Float32Array(cols * rows);
      xComp = new Float32Array(cols);
      yComp = new Float32Array(rows);
    }

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      const scrollOffset = scrollYRef.current * 0.6;
      const tf = time * 0.7;

      for (let i = 0; i < cols; i++) {
        xComp[i] =
          (Math.sin(i * gridSize * 0.007 + tf * 0.01) +
            Math.sin(i * gridSize * 0.013 + tf * 0.01)) *
          0.5;
      }
      for (let j = 0; j < rows; j++) {
        yComp[j] =
          (Math.sin((j * gridSize + scrollOffset) * 0.011 + tf * 0.01) +
            Math.sin((j * gridSize + scrollOffset) * 0.017 + tf * 0.01)) *
          0.5;
      }

      for (let i = 0; i < cols; i++) {
        const offset = i * rows;
        const xc = xComp[i];
        for (let j = 0; j < rows; j++) {
          const diag = Math.sin(
            (i + j) * gridSize * 0.008 + scrollOffset * 0.008 + tf * 0.8,
          );
          field[offset + j] = (xc + yComp[j] + diag) / 2.2;
        }
      }

      ctx.fillStyle = t.bg;
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = t.accent;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

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

      time += 0.012;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [t.bg, t.accent]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

function noise(x: number, y: number, t: number) {
  const freq = 0.012;
  const tf = t * 0.7;
  const a = Math.sin(x * freq + tf);
  const b = Math.sin(y * freq + tf * 0.9);
  const c = Math.sin((x + y) * 0.008 + tf * 0.8);
  return (a + b + c) / 2.2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { t } = useTheme();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();

    const gridSize = 20;
    const levels = [-0.8, 0, 0.8];

    let time = 0;
    let animationId: number | null = null;
    let lastFrameTime = 0;
    const FRAME_INTERVAL = 1000 / 30;

    function handleScroll() {
      scrollYRef.current = window.scrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    function drawLine(ctx: CanvasRenderingContext2D, a: number[], b: number[]) {
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
    }

    function draw(now = 0) {
      if (now - lastFrameTime < FRAME_INTERVAL) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = now;

      const currentScroll = scrollYRef.current;
      const currentTime = time;
      const currentWidth = width;
      const currentHeight = height;

      ctx.fillStyle = t.bg;
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      ctx.lineWidth = 3;
      ctx.strokeStyle = t.accent;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      const scrollOffset = currentScroll * 0.6;

      const cols = Math.ceil(currentWidth / gridSize) + 1;
      const rows = Math.ceil(currentHeight / gridSize) + 1;

      const field: number[][] = Array(cols);
      for (let i = 0; i < cols; i++) {
        field[i] = Array(rows);
        const xPos = i * gridSize;
        for (let j = 0; j < rows; j++) {
          const yWorld = j * gridSize + scrollOffset;
          field[i][j] = noise(xPos, yWorld, currentTime);
        }
      }

      for (const level of levels) {
        ctx.beginPath();
        for (let i = 0; i < cols - 1; i++) {
          for (let j = 0; j < rows - 1; j++) {
            const x = i * gridSize;
            const y = j * gridSize;
            const v1 = field[i][j];
            const v2 = field[i + 1][j];
            const v3 = field[i + 1][j + 1];
            const v4 = field[i][j + 1];

            let caseIndex = 0;
            if (v1 > level) caseIndex |= 1;
            if (v2 > level) caseIndex |= 2;
            if (v3 > level) caseIndex |= 4;
            if (v4 > level) caseIndex |= 8;
            if (caseIndex === 0 || caseIndex === 15) continue;

            const topT = (level - v1) / (v2 - v1);
            const rightT = (level - v2) / (v3 - v2);
            const bottomT = (level - v4) / (v3 - v4);
            const leftT = (level - v1) / (v4 - v1);

            const top = [
              Math.floor(lerp(x, x + gridSize, topT)),
              Math.floor(y),
            ];
            const right = [
              Math.floor(x + gridSize),
              Math.floor(lerp(y, y + gridSize, rightT)),
            ];
            const bottom = [
              Math.floor(lerp(x, x + gridSize, bottomT)),
              Math.floor(y + gridSize),
            ];
            const left = [
              Math.floor(x),
              Math.floor(lerp(y, y + gridSize, leftT)),
            ];

            switch (caseIndex) {
              case 1:
              case 14:
                drawLine(ctx, left, top);
                break;
              case 2:
              case 13:
                drawLine(ctx, top, right);
                break;
              case 3:
              case 12:
                drawLine(ctx, left, right);
                break;
              case 4:
              case 11:
                drawLine(ctx, right, bottom);
                break;
              case 5:
                drawLine(ctx, left, top);
                drawLine(ctx, right, bottom);
                break;
              case 6:
              case 9:
                drawLine(ctx, top, bottom);
                break;
              case 7:
              case 8:
                drawLine(ctx, left, bottom);
                break;
              case 10:
                drawLine(ctx, top, right);
                drawLine(ctx, left, bottom);
                break;
            }
          }
        }
        ctx.stroke();
      }

      time += 0.008;
      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [t.bg, t.accent]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

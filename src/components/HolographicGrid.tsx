import { useEffect, useRef } from "react";

interface HolographicGridProps {
  className?: string;
}

export const HolographicGrid = ({ className = "" }: HolographicGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    let offset = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid settings
      const gridSize = 50;
      const lineWidth = 1;

      // Draw vertical lines
      ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
      ctx.lineWidth = lineWidth;

      for (let x = offset % gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = offset % gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      offset += 0.2; // Slow drift animation
      animationId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

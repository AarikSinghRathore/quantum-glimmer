import { useEffect, useRef } from "react";

interface Rotating3DShapeProps {
  shape: "cube" | "sphere" | "ring";
  size?: number;
  speed?: number;
  className?: string;
}

export const Rotating3DShape = ({ 
  shape, 
  size = 100, 
  speed = 1,
  className = "" 
}: Rotating3DShapeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size * 2;
    canvas.height = size * 2;

    let angle = 0;
    let animationId: number;

    const drawCube = (rotation: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const cubeSize = size * 0.6;

      // Simple 3D cube wireframe
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      const points = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      ];

      const rotated = points.map(([x, y, z]) => {
        const x2 = x * cos - z * sin;
        const z2 = x * sin + z * cos;
        return [x2 * cubeSize / 2 + centerX, y * cubeSize / 2 + centerY, z2];
      });

      ctx.strokeStyle = "rgba(0, 255, 255, 0.6)";
      ctx.lineWidth = 2;

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(rotated[a][0], rotated[a][1]);
        ctx.lineTo(rotated[b][0], rotated[b][1]);
        ctx.stroke();
      });
    };

    const drawSphere = (rotation: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = size * 0.6;

      ctx.strokeStyle = "rgba(0, 119, 255, 0.6)";
      ctx.lineWidth = 2;

      // Draw multiple rings to simulate sphere
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 8;
        const r = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY + y, r, r * 0.3, rotation, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Vertical ring
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius, rotation, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawRing = (rotation: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const outerRadius = size * 0.6;
      const innerRadius = outerRadius * 0.6;

      ctx.strokeStyle = "rgba(157, 0, 255, 0.6)";
      ctx.lineWidth = 2;

      // Outer ring
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, outerRadius, outerRadius * 0.3, rotation, 0, Math.PI * 2);
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, innerRadius, innerRadius * 0.3, rotation, 0, Math.PI * 2);
      ctx.stroke();

      // Connecting lines
      const segments = 16;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle) * 0.3;

        ctx.beginPath();
        ctx.moveTo(
          centerX + cos * innerRadius,
          centerY + sin * innerRadius
        );
        ctx.lineTo(
          centerX + cos * outerRadius,
          centerY + sin * outerRadius
        );
        ctx.stroke();
      }
    };

    const animate = () => {
      angle += 0.01 * speed;

      if (shape === "cube") drawCube(angle);
      else if (shape === "sphere") drawSphere(angle);
      else if (shape === "ring") drawRing(angle);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [shape, size, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{ filter: "drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))" }}
    />
  );
};

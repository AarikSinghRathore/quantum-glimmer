import { useEffect } from "react";
import { HolographicGrid } from "@/components/HolographicGrid";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Rotating3DShape } from "@/components/Rotating3DShape";
import { useNavigate, useLocation } from "react-router-dom";

const Processing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image;

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      navigate("/result", { state: { image } });
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigate, image]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <HolographicGrid />
      <FloatingOrbs />

      {/* Scan Line Effect */}
      <div className="scan-line fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 fade-in-glow">
        {/* Processing Title */}
        <h1 className="text-3xl md:text-5xl font-heading neon-text mb-12 tracking-widest text-center animate-pulse-glow">
          GENERATING 3D DEPTH MAP
        </h1>

        {/* Image with Rotating Shapes */}
        <div className="relative">
          {/* Orbiting Shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            {/* Cube */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-rotate">
              <div className="relative w-[500px] h-20 flex justify-center">
                <Rotating3DShape shape="cube" size={80} speed={1.5} />
              </div>
            </div>

            {/* Sphere */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 animate-rotate" style={{ animationDelay: "0.66s" }}>
              <div className="relative w-20 h-[500px] flex items-center justify-center">
                <Rotating3DShape shape="sphere" size={90} speed={1.2} />
              </div>
            </div>

            {/* Ring */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-rotate" style={{ animationDelay: "1.33s" }}>
              <div className="relative w-[500px] h-20 flex justify-center">
                <Rotating3DShape shape="ring" size={85} speed={1.3} />
              </div>
            </div>
          </div>

          {/* Central Image */}
          {image && (
            <div className="glass-panel rounded-2xl p-4 border-2 border-primary shadow-glow">
              <img
                src={image}
                alt="Processing"
                className="w-64 h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Status Text */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-secondary text-xl font-heading tracking-wide animate-pulse">
            AI DEPTH ANALYSIS IN PROGRESS
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
          <p className="text-muted-foreground text-sm font-body">
            Analyzing depth layers and constructing holographic matrix
          </p>
        </div>

        {/* Pulsing Light Beams Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent animate-pulse-glow" />
        </div>
      </div>
    </div>
  );
};

export default Processing;

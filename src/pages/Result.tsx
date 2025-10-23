import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HolographicGrid } from "@/components/HolographicGrid";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Rotating3DShape } from "@/components/Rotating3DShape";
import { useNavigate, useLocation } from "react-router-dom";
import { Download, Share2, Sparkles, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image;
  const [show3D, setShow3D] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    toast.success("3D Hologram downloaded successfully!");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
  };

  const handleEnhance = () => {
    toast.info("Enhancement feature coming soon!");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <HolographicGrid />
      <FloatingOrbs />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 fade-in-glow">
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Button variant="holo" size="lg" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
            Home
          </Button>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-heading neon-text mb-8 tracking-widest text-center">
          3D HOLOGRAM READY
        </h1>

        {/* 3D Viewer */}
        <div className="relative w-full max-w-4xl">
          {/* Floating Decorative Shapes */}
          <div className="absolute -top-12 -left-12 float">
            <Rotating3DShape shape="ring" size={60} speed={0.4} />
          </div>
          <div className="absolute -top-12 -right-12 float" style={{ animationDelay: "1s" }}>
            <Rotating3DShape shape="cube" size={50} speed={0.5} />
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 float" style={{ animationDelay: "2s" }}>
            <Rotating3DShape shape="sphere" size={55} speed={0.45} />
          </div>

          {/* Main Viewer */}
          <div className="glass-panel rounded-2xl p-6 border-2 border-primary shadow-glow">
            <div
              className="relative aspect-square bg-surface/50 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {image && (
                <div
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
                  style={{
                    transform: show3D
                      ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                      : "none",
                  }}
                >
                  <img
                    src={image}
                    alt="3D Result"
                    className={`max-w-full max-h-full object-contain ${
                      show3D ? "shadow-[0_0_60px_rgba(0,255,255,0.6)]" : ""
                    }`}
                    style={{
                      filter: show3D
                        ? "drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))"
                        : "none",
                    }}
                  />
                </div>
              )}

              {/* Holographic Particle Effect Overlay */}
              {show3D && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${4 + Math.random() * 2}s`,
                        opacity: 0.3 + Math.random() * 0.3,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Interaction Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-hud px-4 py-2 rounded-lg">
                <p className="text-xs text-muted font-body">
                  {show3D ? "Drag to rotate • Scroll to zoom" : "2D View Active"}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              <Button
                variant={show3D ? "success" : "holo"}
                size="lg"
                onClick={() => setShow3D(!show3D)}
              >
                {show3D ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                {show3D ? "3D View" : "2D View"}
              </Button>

              <Button variant="holo" size="lg" onClick={handleDownload}>
                <Download className="w-5 h-5" />
                Download
              </Button>

              <Button variant="holoSecondary" size="lg" onClick={handleEnhance}>
                <Sparkles className="w-5 h-5" />
                Enhance
              </Button>

              <Button variant="holoAccent" size="lg" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
          <div className="glass-hud p-4 rounded-lg text-center">
            <p className="text-xs text-muted-foreground font-body mb-1">Depth Layers</p>
            <p className="text-2xl font-heading text-primary">256</p>
          </div>

          <div className="glass-hud p-4 rounded-lg text-center">
            <p className="text-xs text-muted-foreground font-body mb-1">Processing Time</p>
            <p className="text-2xl font-heading text-secondary">4.8s</p>
          </div>

          <div className="glass-hud p-4 rounded-lg text-center">
            <p className="text-xs text-muted-foreground font-body mb-1">Quality Score</p>
            <p className="text-2xl font-heading text-success">98%</p>
          </div>
        </div>

        {/* Convert Another */}
        <Button
          variant="holoHero"
          size="xl"
          onClick={() => navigate("/upload")}
          className="mt-8 pulse-glow"
        >
          <Sparkles className="w-6 h-6" />
          Convert Another Image
        </Button>
      </div>
    </div>
  );
};

export default Result;

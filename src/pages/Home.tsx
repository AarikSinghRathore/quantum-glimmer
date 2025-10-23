import { Button } from "@/components/ui/button";
import { HolographicGrid } from "@/components/HolographicGrid";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Rotating3DShape } from "@/components/Rotating3DShape";
import { useNavigate } from "react-router-dom";
import { Sparkles, Image, Settings } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Holographic Background */}
      <HolographicGrid />
      <FloatingOrbs />

      {/* Scan Line Effect */}
      <div className="scan-line fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 fade-in-glow">
        {/* App Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-heading neon-text mb-4 tracking-widest">
            HOLOCONVERT AI
          </h1>
          <p className="text-muted text-lg md:text-xl font-body tracking-wide">
            Transform 2D Photos into Stunning 3D Holograms
          </p>
        </div>

        {/* Floating 3D Shapes Around Button */}
        <div className="relative mb-16">
          <div className="absolute -top-20 -left-20 float">
            <Rotating3DShape shape="ring" size={80} speed={0.5} />
          </div>
          <div className="absolute -top-16 -right-24 float" style={{ animationDelay: "1s" }}>
            <Rotating3DShape shape="cube" size={60} speed={0.7} />
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 float" style={{ animationDelay: "2s" }}>
            <Rotating3DShape shape="sphere" size={70} speed={0.6} />
          </div>

          {/* Hero Button */}
          <Button
            variant="holoHero"
            size="xl"
            onClick={() => navigate("/upload")}
            className="pulse-glow"
          >
            <Sparkles className="w-6 h-6" />
            Convert to 3D
            <Sparkles className="w-6 h-6" />
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <div className="glass-panel p-6 rounded-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center text-center">
              <Sparkles className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-sm font-heading text-foreground mb-2">AI POWERED</h3>
              <p className="text-xs text-muted-foreground font-body">
                Advanced depth estimation using cutting-edge AI models
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center text-center">
              <Image className="w-8 h-8 text-secondary mb-3" />
              <h3 className="text-sm font-heading text-foreground mb-2">INSTANT RESULTS</h3>
              <p className="text-xs text-muted-foreground font-body">
                Generate 3D holograms from any 2D photo in seconds
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center text-center">
              <Settings className="w-8 h-8 text-accent mb-3" />
              <h3 className="text-sm font-heading text-foreground mb-2">FULL CONTROL</h3>
              <p className="text-xs text-muted-foreground font-body">
                Interactive 3D viewer with rotation and depth controls
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex gap-4 mt-12">
          <Button variant="holo" size="lg">
            <Image className="w-5 h-5" />
            Gallery
          </Button>
          <Button variant="holoSecondary" size="lg">
            <Settings className="w-5 h-5" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

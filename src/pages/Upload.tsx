import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { HolographicGrid } from "@/components/HolographicGrid";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Rotating3DShape } from "@/components/Rotating3DShape";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

const UploadPage = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageFile(file);
    } else {
      toast.error("Please upload an image file");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      toast.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploading(true);
    // Simulate upload and processing
    setTimeout(() => {
      navigate("/processing", { state: { image: selectedImage } });
    }, 800);
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
            Back
          </Button>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-heading neon-text mb-8 tracking-widest text-center">
          UPLOAD IMAGE
        </h1>

        {/* Upload Area */}
        <div className="relative w-full max-w-2xl">
          {/* Floating Shapes */}
          <div className="absolute -top-16 -left-16 float">
            <Rotating3DShape shape="ring" size={70} speed={0.6} />
          </div>
          <div className="absolute -bottom-16 -right-16 float" style={{ animationDelay: "1s" }}>
            <Rotating3DShape shape="cube" size={60} speed={0.5} />
          </div>

          {/* Glass Panel */}
          <div className="glass-panel rounded-2xl p-8 border-2 border-primary/30">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
                isDragging
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-primary/50 hover:border-primary"
              }`}
            >
              {/* Upload Progress Orb */}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse-glow">
                    <Rotating3DShape shape="sphere" size={100} speed={2} />
                  </div>
                </div>
              )}

              {selectedImage ? (
                <div className="flex flex-col items-center gap-6">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-w-full max-h-64 rounded-lg shadow-glow"
                  />
                  <div className="flex gap-4">
                    <Button
                      variant="holoSecondary"
                      size="lg"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-5 h-5" />
                      Change Image
                    </Button>
                    <Button
                      variant="holoHero"
                      size="lg"
                      onClick={handleConvert}
                      disabled={isUploading}
                      className="pulse-glow"
                    >
                      <Sparkles className="w-5 h-5" />
                      {isUploading ? "Processing..." : "Convert to 3D"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="relative">
                    <Upload className="w-16 h-16 text-primary animate-float" />
                    <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse-glow" />
                  </div>

                  <div>
                    <p className="text-lg font-heading text-foreground mb-2">
                      DRAG & DROP YOUR IMAGE
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      Or click the button below to select
                    </p>
                  </div>

                  <Button
                    variant="holo"
                    size="lg"
                    onClick={() => fileInputRef.current?.click()}
                    className="pulse-glow"
                  >
                    <Upload className="w-5 h-5" />
                    Select Image
                  </Button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Format Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground font-body">
                Supported formats: JPG, PNG, WEBP • Max size: 10MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;

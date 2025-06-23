import { useState, useEffect } from "react";
import Image from "next/image";
import { isMobileDevice } from "@/utils/performance";

type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  withScanlines?: boolean;
  withGlitch?: boolean;
  onError?: () => JSX.Element;
};

const OptimizedImage = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  priority = false,
  quality = 75,
  withScanlines = false,
  withGlitch = false,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  // Reduce effects on mobile devices
  const isMobile = typeof window !== "undefined" ? isMobileDevice() : false;
  const shouldApplyEffects = !isMobile;

  // Apply glitch effect periodically if enabled
  useEffect(() => {
    if (withGlitch && shouldApplyEffects && !hasError) {
      const glitchInterval = setInterval(() => {
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 200);
      }, Math.random() * 5000 + 5000); // Random interval between 5-10 seconds

      return () => clearInterval(glitchInterval);
    }
  }, [withGlitch, shouldApplyEffects, hasError]);

  // Handle error state
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="text-xs text-gray-500">LOADING...</div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
          {onError ? (
            onError()
          ) : (
            <>
              <div className="text-[#6ABC96] text-xs mb-1">IMAGE ERROR</div>
              <div className="text-xs text-gray-500">
                Unable to load resource
              </div>
            </>
          )}
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          className={`${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
        />
      )}

      {/* Scanlines effect */}
      {withScanlines && shouldApplyEffects && isLoaded && !hasError && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 0%, rgba(32, 32, 32, 0.3) 50%, transparent 100%)",
            backgroundSize: "100% 4px",
          }}
        />
      )}

      {/* Glitch effect */}
      {withGlitch &&
        shouldApplyEffects &&
        showGlitch &&
        isLoaded &&
        !hasError && (
          <>
            <div
              className="absolute inset-0 z-20 opacity-70"
              style={{
                left: `${Math.random() * 10 - 5}px`,
                background: "rgba(255, 0, 0, 0.2)",
                mixBlendMode: "difference",
              }}
            />
            <div
              className="absolute inset-0 z-20 opacity-70"
              style={{
                left: `${Math.random() * 10 - 5}px`,
                background: "rgba(0, 255, 255, 0.2)",
                mixBlendMode: "difference",
              }}
            />
          </>
        )}

      {/* Terminal-style frame */}
      <div className="absolute inset-0 pointer-events-none border border-gray-700 z-30"></div>

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-500 z-30"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500 z-30"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500 z-30"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-500 z-30"></div>
    </div>
  );
};

export default OptimizedImage;

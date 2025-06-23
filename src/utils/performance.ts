import { useState, useEffect } from "react";

/**
 * Utility functions for performance optimization
 */

/**
 * Debounce function to limit how often a function can be called
 * Useful for resize events and other frequent updates
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

/**
 * Determines if the device is a mobile device
 * Used to conditionally render certain effects
 */
export const isMobileDevice = (): boolean => {
  return (
    typeof window !== "undefined" &&
    (window.innerWidth < 1200 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ))
  );
};

/**
 * Determines the appropriate image size based on device
 * Used to load smaller images on mobile devices
 */
export const getOptimalImageSize = (): string => {
  if (typeof window === "undefined") return "medium"; // Default for SSR

  const width = window.innerWidth;
  if (width < 640) return "small";
  if (width < 1024) return "medium";
  return "large";
};

/**
 * Lazy loads images as they scroll into view
 * Improves initial page load performance
 */
export const setupLazyLoading = (): void => {
  if (typeof window === "undefined" || !("IntersectionObserver" in window))
    return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement;
        if (lazyImage.dataset.src) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy-load");
          imageObserver.unobserve(lazyImage);
        }
      }
    });
  });

  const lazyImages = document.querySelectorAll("img.lazy-load");
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
};

/**
 * Reduces animation complexity based on device capability
 * Improves performance on lower-end devices
 */
export const adjustAnimationComplexity = (): void => {
  if (typeof window === "undefined") return;

  // Check if device is low-end or in battery saving mode
  const isLowEndDevice =
    navigator.hardwareConcurrency <= 4 || // 4 or fewer CPU cores
    /low|battery|power/i.test(navigator.userAgent.toLowerCase()); // Power saving mode indicators

  if (isLowEndDevice || isMobileDevice()) {
    document.body.classList.add("reduce-motion");
    document.body.classList.add("reduce-effects");
  }
};

/**
 * Hook to handle window resize with performance optimization
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    window.addEventListener("resize", handleResize);

    // Call once on initial load
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

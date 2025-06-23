import { useState, useEffect } from "react";
import p5Types from "p5";
import Sketch from "react-p5";

function cyrb128(str: string): number[] {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [
    (h1 ^ h2 ^ h3 ^ h4) >>> 0,
    (h2 ^ h1) >>> 0,
    (h3 ^ h1) >>> 0,
    (h4 ^ h1) >>> 0,
  ];
}

function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Terminal theme colors
const TERMINAL_BG = "#111111";
const TERMINAL_ACCENT = "#6ABC96"; // Primary green accent color

let r1: number[], r2: number[], directions: number[];
let n_reps: number;
let seed: number[], rand: () => number;
let current_angle: number;
let display_frame: number;
let paused: boolean;
let n_gons: number;

type TerminalHexagonsProps = {
  isMobile: boolean;
  parentRef?: React.RefObject<HTMLDivElement>;
};

const TerminalHexagons = ({ isMobile, parentRef }: TerminalHexagonsProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  // Update dimensions when parent size changes
  useEffect(() => {
    const updateSize = () => {
      if (parentRef?.current) {
        setDimensions({
          width: parentRef.current.clientWidth,
          height: parentRef.current.clientHeight,
        });
      }
    };

    // Initial size update
    updateSize();

    // Set up resize listener
    window.addEventListener("resize", updateSize);

    // Ensure canvas is initialized after parent ref is available
    const initTimer = setTimeout(() => {
      setCanvasInitialized(true);
    }, 100);

    return () => {
      window.removeEventListener("resize", updateSize);
      clearTimeout(initTimer);
    };
  }, [parentRef]);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    // Create canvas sized to parent container - ensure we have minimum dimensions
    const width = Math.max(parentRef?.current?.clientWidth || 300, 300);
    const height = Math.max(parentRef?.current?.clientHeight || 200, 200);

    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background(TERMINAL_BG);

    // Initialize with a consistent seed for deterministic randomness
    seed = cyrb128("SEXXX");
    rand = mulberry32(seed[0]);

    // Set up number of hexagon groups and repetitions
    n_gons = isMobile ? 5 : 12; // Fewer groups on mobile but still enough for good coverage
    n_reps = isMobile ? 6 : 8; // Fewer trailing hexagons on mobile for better performance

    // Initialize arrays for positioning and animation
    directions = [];
    r1 = [];
    r2 = [];

    // Position hexagons more evenly across the canvas with center alignment
    for (let k = 0; k < n_gons; k += 1) {
      directions[k] = Math.sign(p5.map(10 * rand(), 0, 10, -1, 1));
      // Use more balanced displacements to ensure coverage around the center
      r1[k] = 0.2 * p5.map(10 * rand(), 0, 10, -1, 1);
      r2[k] = 0.25 * p5.map(10 * rand(), 0, 10, -1, 1);
    }

    paused = false;
    display_frame = 0;
    current_angle = 39;
    p5.frameRate(30); // Lower framerate for performance
    p5.pixelDensity(1);
  };

  const draw = (p5: p5Types) => {
    p5.clear(); // Use clear instead of background to make the canvas transparent
    const decriment = [0.01, 0.008]; // Increased and balanced spacing between trailing hexagons

    for (let j = 0; j < n_gons; j += 1) {
      // Use the terminal accent color for all hexagons
      const baseColor = p5.color(TERMINAL_ACCENT);

      for (let i = 0; i <= n_reps; i += 1) {
        // Center all hexagons around the middle of the canvas with controlled displacement
        const x =
          p5.width * 0.5 +
          (directions[j] * i * decriment[0] + j * r1[j]) * p5.width * 0.8;
        const y =
          p5.height * 0.5 +
          (directions[j] * i * decriment[1] + j * r2[j]) * p5.height * 0.5;

        // Progressively reduce opacity and stroke weight for trailing hexagons
        const alpha = p5.map(i, 0, n_reps, 255, 40);
        const strokeWeight = p5.map(i, 0, n_reps, 1.5, 0.5);

        baseColor.setAlpha(alpha);
        p5.stroke(baseColor);

        if (!paused) {
          display_frame += 1;
          current_angle = display_frame / 60000.0 + 39; // Slower rotation
        }

        const sides = 6;
        // Larger hexagons to fill more space - much larger on mobile
        const size = isMobile
          ? Math.min(60, p5.width * 0.25)
          : Math.min(100, p5.width * 0.4);
        const angle = p5.TWO_PI / sides;

        p5.push();
        p5.translate(x, y);
        p5.rotate(current_angle);
        p5.strokeWeight(strokeWeight);
        p5.noFill(); // No fill for cleaner look and to ensure text visibility

        // Draw hexagon
        p5.beginShape();
        for (let a = 0; a < p5.TWO_PI; a += angle) {
          const sx = p5.cos(a) * size;
          const sy = p5.sin(a) * size;
          p5.vertex(sx, sy);
        }
        p5.endShape(p5.CLOSE);

        p5.pop();
      }
    }
  };

  const resizeCanvas = (p5: p5Types) => {
    // Resize canvas to match parent container with minimum dimensions
    const width = Math.max(parentRef?.current?.clientWidth || 300, 300);
    const height = Math.max(parentRef?.current?.clientHeight || 200, 200);

    p5.resizeCanvas(width, height);
  };

  // Add a style to make the canvas position absolute and in the background
  const sketchStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none", // Allow clicking through to elements underneath
  } as React.CSSProperties;

  return (
    <div style={sketchStyle}>
      {/* Only render sketch when we know parent is ready */}
      {canvasInitialized && (
        // @ts-ignore
        <Sketch setup={setup} draw={draw} windowResized={resizeCanvas} />
      )}
    </div>
  );
};

export default TerminalHexagons;

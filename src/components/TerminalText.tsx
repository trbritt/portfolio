import { useState, useEffect, useRef } from "react";
import { isMobileDevice } from "@/utils/performance";

type TerminalTextProps = {
  text: string;
  typingSpeed?: number;
  delayStart?: number;
  showCursor?: boolean;
  className?: string;
  onComplete?: () => void;
  preTyped?: string;
  isCommand?: boolean;
};

const TerminalText = ({
  text,
  typingSpeed = 30,
  delayStart = 0,
  showCursor = true,
  className = "",
  onComplete,
  preTyped = "",
  isCommand = false,
}: TerminalTextProps) => {
  const [displayedText, setDisplayedText] = useState(preTyped);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const typingRef = useRef<number | null>(null);
  const textRef = useRef(text);

  // Use faster typing on mobile
  const isMobile = typeof window !== "undefined" ? isMobileDevice() : false;
  const actualTypingSpeed = isMobile
    ? Math.max(5, typingSpeed / 2)
    : typingSpeed;

  // Typing effect
  useEffect(() => {
    textRef.current = text; // Update ref when text prop changes

    if (delayStart > 0 && !hasStarted) {
      const startDelay = setTimeout(() => {
        setHasStarted(true);
        setIsTyping(true);
      }, delayStart);

      return () => clearTimeout(startDelay);
    } else {
      setHasStarted(true);
      setIsTyping(true);
    }
  }, [delayStart, hasStarted, text]);

  // Handle typing animation
  useEffect(() => {
    if (
      !isTyping ||
      !hasStarted ||
      displayedText.length >= textRef.current.length
    ) {
      if (displayedText.length >= textRef.current.length && onComplete) {
        onComplete();
      }
      return;
    }

    // Add some randomness to typing speed for realistic effect
    const randomVariation = Math.random() * 0.5 + 0.75; // 0.75 to 1.25
    const effectiveSpeed = actualTypingSpeed * randomVariation;

    typingRef.current = window.setTimeout(() => {
      const nextChar = textRef.current.charAt(displayedText.length);
      const nextText = displayedText + nextChar;
      setDisplayedText(nextText);

      // Add longer pause after punctuation
      if ([".", "!", "?", ",", ";", ":"].includes(nextChar)) {
        if (typingRef.current) clearTimeout(typingRef.current);
        typingRef.current = window.setTimeout(() => {
          setIsTyping(displayedText.length < textRef.current.length - 1);
        }, actualTypingSpeed * 4);
      } else {
        setIsTyping(displayedText.length < textRef.current.length - 1);
      }
    }, effectiveSpeed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayedText, isTyping, hasStarted, actualTypingSpeed, onComplete]);

  // Blinking cursor effect
  useEffect(() => {
    if (!showCursor) return;

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  return (
    <div className={`font-mono ${className}`}>
      {isCommand && <span className="text-[#6ABC96] mr-2">&gt;</span>}
      <span>{displayedText}</span>
      {showCursor && (
        <span
          className={`inline-block w-2 h-3 bg-gray-400 ml-1 ${
            cursorVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        ></span>
      )}
    </div>
  );
};

export default TerminalText;

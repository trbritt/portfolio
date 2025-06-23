import { useState, useEffect } from "react";

type SkillBarProps = {
  skillName: string;
  level: number; // 0-100
  skills: string[];
  animateIn?: boolean;
  delay?: number;
  className?: string;
};

const SkillBar = ({
  skillName,
  level,
  skills,
  animateIn = true,
  delay = 0,
  className = "",
}: SkillBarProps) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const segments = 10; // Number of segments in the bar
  const filledSegments = Math.round((level / 100) * segments);

  // Animate skill level on mount
  useEffect(() => {
    if (!animateIn) {
      setDisplayLevel(level);
      return;
    }

    const timer = setTimeout(() => {
      const animationDuration = 1000; // ms
      const intervalTime = 20; // ms
      const steps = animationDuration / intervalTime;
      const increment = level / steps;

      let currentLevel = 0;
      const interval = setInterval(() => {
        currentLevel += increment;
        if (currentLevel >= level) {
          setDisplayLevel(level);
          clearInterval(interval);
        } else {
          setDisplayLevel(Math.round(currentLevel));
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [level, animateIn, delay]);

  return (
    <div className={`skill-bar ${className} flex-col grow`}>
      <div className="flex justify-between items-center mb-1">
        <span className="inline-block px-2 py-1 bg-[#6ABC96] text-black font-bold text-xs">
          {skillName}
        </span>
        <span className="text-gray-500 text-xs">
          PROFICIENCY {displayLevel}%
        </span>
      </div>

      <div className="grid grid-cols-10 gap-1">
        {Array(segments)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`h-2 ${
                i < filledSegments ? "bg-gray-500" : "bg-gray-800"
              }`}
              style={{
                transition: "background-color 0.5s ease",
                transitionDelay: `${delay + i * 50}ms`,
              }}
            ></div>
          ))}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="text-gray-400 text-xs"
            style={{
              opacity: animateIn ? 0 : 1,
              animation: animateIn
                ? `fadeIn 0.5s ease forwards ${delay + 300 + i * 100}ms`
                : "none",
            }}
          >
            {skill}
            {i < skills.length - 1 ? " •" : ""}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SkillBar;

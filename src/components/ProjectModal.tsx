import { useState, useEffect, useRef } from "react";
import OptimizedImage from "./OptimizedImage";
import TerminalText from "./TerminalText";

type ContentItem = {
  code: string;
  title: string;
  description: string;
  location: string;
  detailedDescription?: string;
  image?: string;
  technologies?: string[];
  duration?: string;
  role?: string;
  achievements?: string[];
  externalLink?: string;
  degree?: string;
};

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: ContentItem | null;
};

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Determine content type for appropriate labeling
  const getContentType = () => {
    if (!project) return "PROJECT";

    // Check for degree (education)
    if ("degree" in project && project.degree) {
      return "EDUCATION";
    }

    // Check for external link (project)
    if ("externalLink" in project && project.externalLink) {
      return "PROJECT";
    }

    // Default to experience
    return "EXPERIENCE";
  };

  // Reset animation state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimatingOut(false);
      setIsTextComplete(false);
    }
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        window.addEventListener("mousedown", handleClickOutside);
      }, 100); // Small delay to prevent immediate closing
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    // Start the closing animation
    setIsAnimatingOut(true);

    // Call the actual close function after animation completes
    setTimeout(() => {
      onClose();
    }, 300); // Match with CSS transition duration
  };

  // Don't render anything if modal is not open
  if (!isOpen) {
    return null;
  }

  // Generate a pseudo-random position for the glitch effect
  const glitchOffset = () => `${Math.random() * 5 - 2.5}px`;

  // Content type specific label
  const contentType = getContentType();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
        isAnimatingOut ? "opacity-0" : "opacity-100 bg-opacity-80"
      }`}
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div
        ref={modalRef}
        className={`relative w-11/12 max-w-3xl bg-[#111111] border border-gray-700 transition-all duration-300 overflow-hidden
          ${
            isAnimatingOut
              ? "scale-95 translate-y-10 opacity-0"
              : "scale-100 translate-y-0 opacity-100"
          }`}
        aria-modal="true"
        role="dialog"
      >
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gray-500 z-10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gray-500 z-10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gray-500 z-10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gray-500 z-10"></div>

        {/* Modal header */}
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <div className="flex items-center">
            <div className="mr-2 px-2 py-1 bg-[#6ABC96] text-black text-xs font-bold">
              {contentType} {project?.code}
            </div>
            <h3 className="text-gray-200 text-lg">{project?.title}</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-[#6ABC96] transition-colors text-sm border border-gray-700 px-2 py-1"
            aria-label="Close modal"
          >
            [X] CLOSE
          </button>
        </div>

        {/* Project image with overlay - only show if there's an image */}
        {project?.image && (
          <div className="relative h-60 w-full overflow-hidden">
            <OptimizedImage
              src={project.image}
              alt={project.title}
              width={modalRef.current?.clientWidth}
              height={300}
              className="w-full h-full object-cover"
              withScanlines={true}
              withGlitch={true}
            />
            {/* Image overlay text */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3">
              <div className="text-xs text-gray-400">
                LOCATION: {project?.location}
              </div>
            </div>
          </div>
        )}

        {/* Project details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {/* Left column - Project info */}
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <div className="text-gray-400 text-xs">
                {contentType} OVERVIEW
              </div>
              <div className="text-gray-300">
                <TerminalText
                  text={
                    project?.detailedDescription || project?.description || ""
                  }
                  typingSpeed={15}
                  delayStart={300}
                  onComplete={() => setIsTextComplete(true)}
                />
              </div>
            </div>

            {/* Achievements section - only show if we have achievements */}
            {project?.achievements && project.achievements.length > 0 && (
              <div className="space-y-2 mt-4">
                <div className="text-gray-400 text-xs">
                  {contentType === "EDUCATION"
                    ? "HIGHLIGHTS"
                    : "KEY ACHIEVEMENTS"}
                </div>
                <ul className="space-y-2">
                  {project.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="text-gray-300 text-sm flex items-start"
                    >
                      <span className="text-[#6ABC96] mr-2">»</span>
                      {isTextComplete ? (
                        <span>{achievement}</span>
                      ) : (
                        <TerminalText
                          text={achievement}
                          typingSpeed={10}
                          delayStart={1000 + i * 500}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right column - Tech details */}
          <div className="border-l border-gray-700 pl-4 space-y-4">
            <div className="text-gray-400 text-xs mb-2">
              {contentType} DETAILS
            </div>
            <div className="text-xs text-gray-400 gap-y-1">
                » CODE: {project?.code}
            </div>

            <div className="text-xs text-gray-400 gap-y-1">
                » LOCATION: {project?.location}
            </div>

              {project?.duration && (
                <>
                  <div className="text-xs text-gray-400 gap-y-1">
                    » {contentType === "EDUCATION" ? "PERIOD" : "DURATION"}: {project.duration}
                  </div>
                </>
              )}

              {project?.role && (
                <>
                  <div className="text-xs text-gray-400 gap-y-1">
                    » ROLE: {project.role}
                  </div>
                </>
              )}

              {project?.degree && (
                <>
                  <div className="text-xs text-gray-400 gap-y-1">
                    » DEGREE: {project.degree}
                  </div>
                </>
              )}

            {/* Technologies used - only show for projects and experiences */}
            {contentType !== "EDUCATION" &&
              project?.technologies &&
              project.technologies.length > 0 && (
                <div>
                  <div className="text-gray-400 text-xs mb-2">TECHNOLOGIES</div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs border border-gray-700 px-2 py-1 text-gray-300"
                        style={{
                          animation: isTextComplete
                            ? `fadeIn 0.5s ease forwards ${i * 100}ms`
                            : "none",
                          opacity: isTextComplete ? 1 : 0,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* External link - only for projects */}
            {project?.externalLink && (
              <div>
                <div className="text-gray-400 text-xs mb-2">PROJECT LINK</div>
                <button
                  className="px-3 py-1 bg-gray-800 text-xs rounded-sm hover:bg-gray-700 transition-colors"
                  onClick={() => window.open(project.externalLink, "_blank")}
                >
                  <span className="text-[#6ABC96]">View Project</span> &gt;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4 flex justify-between items-center">
          <div className="text-xs text-gray-500">STATUS: DECLASSIFIED</div>
          <button
            onClick={handleClose}
            className="px-3 py-1 bg-gray-800 text-xs rounded-sm hover:bg-gray-700 transition-colors"
          >
            <span className="text-[#6ABC96]">RETURN</span> &gt;
          </button>
        </div>

        {/* Terminal scan lines effect */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 0%, rgba(32, 32, 32, 0.3) 50%, transparent 100%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Random glitch effect */}
        {Math.random() > 0.7 && (
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-10"
            style={{
              left: glitchOffset(),
              top: glitchOffset(),
              background: "rgba(255, 0, 0, 0.2)",
              mixBlendMode: "difference",
              animation: "glitch 0.2s ease",
            }}
          />
        )}
      </div>

      {/* CSS animations */}
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

        @keyframes glitch {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;

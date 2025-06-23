import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ContactLinks from "@/components/ContactLinks";
import TerminalText from "@/components/TerminalText";
import OptimizedImage from "@/components/OptimizedImage";
import SkillBar from "@/components/SkillBar";
import ProjectModal from "@/components/ProjectModal";
import TimeFilteredContent from "@/components/TimeFilteredContent";
import {skills, experiences, education, projects, personal_details, current_focus, social_links} from "@/components/Constants";

import {
  useWindowSize,
  adjustAnimationComplexity,
  setupLazyLoading,
  isMobileDevice,
} from "@/utils/performance";

const TerminalHexagons = dynamic(
  () => import("@/components/TerminalHexagons"),
  { ssr: false }
);
// Terminal-inspired Portfolio - Single Page Application
const Portfolio = () => {
  // State management
  const [currentSection, setCurrentSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const windowSize = useWindowSize();

  const focusPanelRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" ? isMobileDevice() : false;
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Performance optimizations on initial load
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      // Apply performance optimizations
      adjustAnimationComplexity();
      setupLazyLoading();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Simulated loading effect with progressive updates
  useEffect(() => {
    if (isLoading) {
      // Update progress every 100ms
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const next = prev + 5; // Increment by 5%
          return next >= 100 ? 100 : next;
        });
      }, 100);
      
      // Complete loading after 2 seconds
      const timer = setTimeout(() => {
        clearInterval(interval);
        setLoadingProgress(100);
        setIsLoading(false);
      }, 2000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [isLoading]);

  // Simulated loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render on resize to ensure layout adjusts
      setIsInitialized((prev) => prev);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Modal handlers
  const openContentDetails = (content: any) => {
    setSelectedContent(content);
    setIsModalOpen(true);
    // Add a class to the body to prevent scrolling while modal is open
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable scrolling
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  // Render loading screen
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#111111] text-gray-200 font-mono">
        <div className="text-xl mb-4">SYSTEM INITIALIZING</div>
        <div className="w-64 h-2 bg-gray-800 rounded-sm overflow-hidden">
          {/* Use inline style with the current progress value */}
          <div 
            className="h-full bg-[#6ABC96] transition-all duration-100 ease-linear" 
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          LOADING PORTFOLIO DATA... {loadingProgress}%
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 font-mono p-4 flex flex-col">
      <div className="border border-gray-700 flex-grow flex flex-col relative min-h-[calc(100vh-2rem)]">
        {/* Top border corner brackets */}
        <div className="absolute fixed top-0 left-0 w-8 h-8 border-t border-l border-gray-500"></div>
        <div className="absolute fixed top-0 right-0 w-8 h-8 border-t border-r border-gray-500"></div>
        {/* Bottom brackets now use fixed positioning for small screens and absolute for larger screens */}
        <div className="absolute fixed bottom-0 left-0 w-8 h-8 border-b border-l border-gray-500"></div>
        <div className="absolute fixed bottom-0 right-0 w-8 h-8 border-b border-r border-gray-500"></div>

        {/* Main grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 p-4 flex-grow pb-0">
          {/* Left sidebar - Personal details */}
          <div className="md:col-span-1 border border-gray-700 p-4 flex flex-col">
            <div className="border-b border-gray-700 pb-2 mb-4 flex items-center justify-between">
              <span className="text-sm">Who am I?</span>
              <span className="text-xs text-gray-500">Encrypted profile</span>
            </div>

            <div className="border border-gray-700 p-4 mb-6">
              <div className="w-full aspect-square bg-gray-800 mb-4 flex items-center justify-center">
                {/* Avatar placeholder with optimized image */}
                <OptimizedImage
                  src="/headshot.png"
                  alt="Developer profile"
                  width={330}
                  height={330}
                  className="rounded-full"
                  withScanlines={true}
                  withGlitch={true}
                  // Fallback to div if image fails to load
                  onError={() => (
                    <div className="w-20 h-20 rounded-full bg-gray-700 relative">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-500"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-500"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-500"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500"></div>
                    </div>
                  )}
                />
              </div>
              <div className="text-center w-full">
                <div className="text-lg mb-2">
                  Tristan Britt, Ph.D.
                </div>
                <div className="text-xs text-gray-400 gap-y-1">
                » ROLE: {personal_details.codeName}
                </div>
                <div className="text-xs text-gray-400 gap-y-1">
                » POSSIBLE LOCATION: {personal_details.currentLocation}
                </div>
              </div>
            </div>

            {/* Skills section */}
            <div className="border-b border-gray-700 pb-2 mb-4">
              <span className="text-sm">Skill Matrix</span>
            </div>

            <div className="text-xs space-y-6 flex-grow">
              <SkillBar
                skillName="PROGRAMMING LANGUAGES"
                level={92}
                skills={skills.programming_languages}
                delay={300}
              />

              <SkillBar
                skillName="FRAMEWORKS"
                level={85}
                skills={skills.frameworks}
                delay={600}
              />

              <SkillBar
                skillName="DEVOPS"
                level={78}
                skills={skills.devops}
                delay={900}
              />
              <SkillBar
                skillName="OTHER"
                level={78}
                skills={skills.other}
                delay={900}
              />
            </div>
          </div>

          {/* Center column */}
          <div className="md:col-span-2 border border-gray-700 p-4 flex flex-col">
            <div className="border-b border-gray-700 pb-2 mb-4">
              <span className="text-sm">Current Focus...</span>
            </div>

            {/* Hexagon visualization */}
            {isMobile ? (
              <div className="relative w-full h-[350px] mb-6">
                <div className="text-xs text-gray-400 max-w-s absolute top-10 left-4">
                  <TerminalText
                    text={current_focus.paragraphOne}
                    typingSpeed={5}
                    delayStart={200}
                    className="text-s text-gray-300"
                  />
                  <br/>
                  <TerminalText
                    text={current_focus.paragraphTwo}
                    typingSpeed={15}
                    delayStart={4500}
                    className="text-s text-gray-300"
                  />
                  <br/>
                  <TerminalText
                    text={current_focus.paragraphThree}
                    typingSpeed={15}
                    delayStart={8500}
                    className="text-s text-gray-300"
                  />
                </div>
              </div>
            ) : (
              <div
                ref={focusPanelRef}
                className="relative w-full h-full overflow-hidden"
              >
                {/* Hexagon background - positioned first in the DOM for proper layering */}
                <TerminalHexagons
                  isMobile={isMobile}
                  parentRef={focusPanelRef}
                />

                {/* Content overlay - positioned after the hexagons with higher z-index */}
                <div className="absolute top-10 left-4 z-10 bg-[#111111] bg-opacity-50 p-2 rounded max-w-s">
                  <TerminalText
                    text={current_focus.paragraphOne}
                    typingSpeed={5}
                    delayStart={200}
                    className="text-s text-gray-300"
                  />
                  <br/>
                  <TerminalText
                    text={current_focus.paragraphTwo}
                    typingSpeed={15}
                    delayStart={4500}
                    className="text-s text-gray-300"
                  />
                  <br/>
                  <TerminalText
                    text={current_focus.paragraphThree}
                    typingSpeed={15}
                    delayStart={8500}
                    className="text-s text-gray-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right column - TimeFilteredContent component */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {/* TimeFilteredContent component */}
            <TimeFilteredContent
              projects={projects}
              experiences={experiences}
              education={education}
              onOpenDetails={openContentDetails}
            />

            {/* Brief announcement */}
            {/* <div className="border border-gray-700 p-4"> */}
              <ContactLinks 
                links={social_links}
                email={personal_details.email}
              />
            {/* </div> */}
          </div>
        </div>

        {/* Space between content and footer */}
        <div className="h-6 bg-[#111111]"></div>

        {/* Footer */}
        <div className="border-t border-gray-700 py-2 px-4 text-xs text-gray-600 flex justify-between mt-auto">
          <div>COPYRIGHT: Tristan Britt 2025</div>
          <div>STATUS: ONLINE</div>
        </div>
      </div>

      {/* Project modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedContent}
      />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export default Portfolio;

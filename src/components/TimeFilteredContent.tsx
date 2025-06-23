import { useState, useEffect, useRef } from 'react';

type Project = {
  code: string;
  title: string;
  description: string;
  location: string;
  detailedDescription?: string;
  technologies?: string[];
  duration?: string;
  role?: string;
  image?: string;
  achievements?: string[];
  externalLink?: string;
};

type Experience = {
  code: string;
  title: string;
  description: string;
  location: string;
  detailedDescription?: string;
  technologies?: string[];
  duration?: string;
  role?: string;
  image?: string;
  achievements?: string[];
};

type Education = {
  code: string;
  title: string;
  description: string;
  location: string;
  duration?: string;
  achievements?: string[];
  degree?: string;
  detailedDescription?: string;
};

type TimeFilteredContentProps = {
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  onOpenDetails: (content: Project | Experience | Education) => void;
};

const TimeFilteredContent = ({
  projects,
  experiences,
  education,
  onOpenDetails,
}: TimeFilteredContentProps) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'experience' | 'education' | 'projects'>('experience');
  const [visibleContent, setVisibleContent] = useState<(Project | Experience | Education)[]>(experiences);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const previousTimeframeRef = useRef<'experience' | 'education' | 'projects'>('experience');
  
  // Update content based on active timeframe
  useEffect(() => {
    // Only animate if the timeframe actually changed
    if (previousTimeframeRef.current !== activeTimeframe) {
      // Immediate fadeout (no animation)
      setIsAnimating(true);
      setShouldAnimate(true); // Enable animations for content items
      
      // Immediately switch content
      const timer = setTimeout(() => {
        switch (activeTimeframe) {
          // Changed order: week (Experience) -> month (Education) -> day (Projects)
          case 'experience':
            setVisibleContent(experiences);
            break;
          case 'education':
            setVisibleContent(education);
            break;
          case 'projects':
            setVisibleContent(projects);
            break;
          default:
            setVisibleContent(experiences);
        }
        
        // Reset animation state right after content update for immediate fade-in
        setTimeout(() => {
          setIsAnimating(false);
          // Update the previous timeframe reference
          previousTimeframeRef.current = activeTimeframe;
        }, 20);
      }, 50); // Very short delay - just enough for React to process the state change
      
      return () => clearTimeout(timer);
    }
  }, [activeTimeframe, projects, experiences, education]);
  
  // Get label for the current timeframe content
  const getContentLabel = () => {
    switch (activeTimeframe) {
      // Updated labels to match the new order
      case 'experience':
        return `Experience (${experiences.length})`;
      case 'education':
        return `Education (${education.length})`;
      case 'projects':
        return `Projects (${projects.length})`;
      default:
        return 'Content';
    }
  };
  
  // Determine if the item is a project (to show/hide the "View Project" button)
  const isProject = (item: Project | Experience | Education): item is Project => {
    return 'externalLink' in item && item.externalLink !== undefined;
  };
  
  // Handle timeframe button click
  const handleTimeframeChange = (timeframe: 'experience' | 'education' | 'projects') => {
    // Only trigger animation if changing to a different timeframe
    if (timeframe !== activeTimeframe) {
      setActiveTimeframe(timeframe);
    }
  };
  
  // Disable animations when modal opens/closes
  useEffect(() => {
    // This effect will run when the component re-renders due to modal state changes
    // If the timeframe hasn't changed, we shouldn't animate
    if (previousTimeframeRef.current === activeTimeframe && !isAnimating) {
      setShouldAnimate(false);
    }
  }, [visibleContent]);
  
  return (
    <>
      {/* Time filter */}
      <div className="border border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">{getContentLabel()}</div>
          <div className="flex gap-1 text-xs">
            {[
              { key: 'experience', label: 'Experience' },
              { key: 'education', label: 'Education' },
              { key: 'projects', label: 'Projects' }
            ].map((period) => (
              <button 
                key={period.key}
                className={`px-2 py-1 border ${activeTimeframe === period.key ? 'border-[#6ABC96] text-[#6ABC96]' : 'border-gray-700 text-gray-500'}`}
                onClick={() => handleTimeframeChange(period.key as 'experience' | 'education' | 'projects')}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content list - No transition for opacity to make fade-out instant */}
      <div className="border border-gray-700 p-4 flex-grow overflow-y-auto max-h-[calc(100vh-320px)]">
        <div className={`space-y-4 ${isAnimating ? 'opacity-0' : 'opacity-100'}`} style={{ transition: 'none' }}>
          {visibleContent.map((item, i) => (
            <div 
              key={`${activeTimeframe}-${i}`} 
              className="border-b border-gray-800 pb-4 last:border-0"
              style={{
                opacity: shouldAnimate ? 0 : 1,
                animation: shouldAnimate ? `fadeIn 0.5s ease forwards ${isAnimating ? 0 : 100 + i * 100}ms` : 'none'
              }}
            >
              <div className="mb-1 text-xs text-gray-500">
                {activeTimeframe === 'experience' ? 'Position' : activeTimeframe === 'education' ? 'Program' : 'Project'} Code: {item.code}
              </div>
              <div className="font-bold mb-1">{item.title}</div>
              <div className="text-xs text-gray-400 mb-2">{item.description}</div>
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-sm hover:bg-gray-700 transition-colors"
                  onClick={() => onOpenDetails(item)}
                >
                  Details
                </button>
                {isProject(item) && (
                  <button 
                    className="px-3 py-1 bg-gray-800 text-xs rounded-sm hover:bg-gray-700 transition-colors"
                    onClick={() => window.open(item.externalLink, '_blank')}
                  >
                    <span className="text-[#6ABC96]">View Project</span> &gt;
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {visibleContent.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm">
              No {activeTimeframe === 'experience' ? 'experience' : activeTimeframe === 'education' ? 'education' : 'projects'} data available.
            </div>
          )}
        </div>
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default TimeFilteredContent;
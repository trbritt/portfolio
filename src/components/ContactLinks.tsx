import { useState, useEffect } from "react";
import Image from "next/image";
import ContactModal from "./ContactModal";

type SocialLink = {
  name: string;
  icon: string;
  url: string;
  hoverText: string;
};

type ContactLinksProps = {
  links: SocialLink[];
  email?: string;
};

const ContactLinks = ({ links, email }: ContactLinksProps) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Simulated terminal typing effect completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Toggle contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className="border border-gray-700 p-4 flex flex-col">
      <div className="border-b border-gray-700 pb-2 flex items-center justify-between">
        <span className="text-sm">Contact Information</span>
        <span className="text-xs text-gray-500">SECURE CHANNELS</span>
      </div>
      <div className="text-xs text-gray-400 flex-grow">
        {email && (
          <div className="mt-4">
            <span className="text-[#6ABC96] mr-2">» EMAIL:</span>
            <a
              href={`mailto:${email}`}
              className="text-gray-300 hover:text-[#6ABC96] transition-colors"
            >
              {email}
            </a>
          </div>
        )}
        <div className="mt-4 flex flex-col">
          <div className="text-[#6ABC96]">» SOCIAL NETWORKS:</div>

          <div className="flex items-center justify-center space-x-6 mt-2">
            {/* Existing social links */}
            {links.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative border border-gray-700 p-3 hover:border-[#6ABC96] transition-colors"
                  aria-label={link.name}
                  style={{
                    opacity: isTextComplete ? 1 : 0.3,
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-500"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-500"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-500"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500"></div>

                  {/* Fix image path to ensure it works in static export */}
                  <Image
                      src={link.icon}
                      alt={link.name}
                      width={24}
                      height={24}
                      className="transition-transform hover:scale-110"
                      unoptimized={true}
                  />
                </a>

                {/* Hover text label */}
                {hoveredLink === link.name && (
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 -bottom-8
                               bg-gray-800 px-2 py-1 text-xs whitespace-nowrap z-10
                               border border-gray-700 text-[#6ABC96]"
                  >
                    {link.hoverText}
                  </div>
                )}
              </div>
            ))}

            {/* New contact button */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredLink("contact")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button
                onClick={openContactModal}
                className="block relative border border-gray-700 p-3 hover:border-[#6ABC96] transition-colors"
                aria-label="Contact Form"
                style={{
                  opacity: isTextComplete ? 1 : 0.3,
                  transition: "all 0.3s ease",
                }}
              >
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-500"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-500"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-500"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500"></div>

                <Image
                  src="/images/envelope.svg"
                  alt="Contact"
                  width={24}
                  height={24}
                  className="transition-transform hover:scale-110"
                />
              </button>

              {/* Hover text label */}
              {hoveredLink === "contact" && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 -bottom-8
                             bg-gray-800 px-2 py-1 text-xs whitespace-nowrap z-10
                             border border-gray-700 text-[#6ABC96]"
                >
                  Contact Form
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Terminal scan lines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 0%, rgba(32, 32, 32, 0.3) 50%, transparent 100%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
};

export default ContactLinks;

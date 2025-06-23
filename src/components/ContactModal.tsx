import { useState, useEffect, useRef } from "react";
import TerminalText from "./TerminalText";
import emailjs from "emailjs-com";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    emailjs
        .send(
          'service_7j68kob',
          'template_tetz7jn',
          {
            from_name: form.name,
            to_name: "Tristan Britt",
            from_email: form.email,
            to_email: "tristan.britt@mail.mcgill.ca",
            message: form.message,
          },
          'SR-yfRRk2iss-w4qh'
        )
        .then(
          () => {
            setLoading(false);
            alert("Message sent. I will get back to you as soon as possible.");
            setForm({ name: "", email: "", message: "" });
          },
          (error) => {
            setLoading(false);
            console.error(error);
            alert("Something went wrong. Please try again.");
          }
        );
  };

  // Don't render anything if modal is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
        isAnimatingOut ? "opacity-0" : "opacity-100 bg-opacity-80"
      }`}
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div
        ref={modalRef}
        className={`relative w-11/12 max-w-2xl bg-[#111111] border border-gray-700 transition-all duration-300 overflow-hidden
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
              SECURE TRANSMISSION
            </div>
            <h3 className="text-gray-200 text-lg">Contact Form</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-[#6ABC96] transition-colors text-sm border border-gray-700 px-2 py-1"
            aria-label="Close modal"
          >
            [X] CLOSE
          </button>
        </div>

        {/* Contact Form */}
        <div className="p-6">
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">» IDENTIFIER (NAME)</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-gray-900 border border-gray-700 text-gray-300 px-3 py-2 text-sm focus:border-[#6ABC96] outline-none transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-gray-400">» COMMUNICATION PROTOCOL (EMAIL)</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-gray-900 border border-gray-700 text-gray-300 px-3 py-2 text-sm focus:border-[#6ABC96] outline-none transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-gray-400">» MESSAGE CONTENT</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows={5}
                className="w-full bg-gray-900 border border-gray-700 text-gray-300 px-3 py-2 text-sm focus:border-[#6ABC96] outline-none transition-colors resize-none"
              />
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-gray-500 flex items-center">
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-[#6ABC96]'} mr-2`}></div>
                {loading ? "TRANSMISSION IN PROGRESS..." : "READY TO TRANSMIT"}
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-gray-800 border border-gray-700 text-[#6ABC96] text-sm hover:bg-gray-700 transition-colors focus:outline-none focus:border-[#6ABC96] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "SENDING..." : "SEND MESSAGE >"}
              </button>
            </div>
          </div>
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
      `}</style>
    </div>
  );
};

export default ContactModal;
import { useState } from "react";
import { HelpCircle, X } from "lucide-react";

interface HelpWidgetProps {
  onNavigateToHelp?: (section: "faq" | "guides" | "contact" | "about" | "privacy") => void;
}

export function HelpWidget({ onNavigateToHelp }: HelpWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = (section: "faq" | "guides" | "contact" | "about" | "privacy") => {
    setIsOpen(false);
    if (onNavigateToHelp) {
      onNavigateToHelp(section);
    }
  };

  return (
    <>
      {/* Invisible backdrop to close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-50">
        {/* Menu */}
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-2">
            <button
              onClick={() => handleMenuClick("faq")}
              className="w-full px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-100"
            >
              FAQ
            </button>
            <button
              onClick={() => handleMenuClick("guides")}
              className="w-full px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-100"
            >
              Help
            </button>
            <button
              onClick={() => handleMenuClick("about")}
              className="w-full px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-100"
            >
              About
            </button>
            <button
              onClick={() => handleMenuClick("contact")}
              className="w-full px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors text-gray-700"
            >
              Contact
            </button>
            <button
              onClick={() => handleMenuClick("privacy")}
              className="w-full px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors text-gray-700"
            >
              Terms & Privacy
            </button>
          </div>
        )}

        {/* Help Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10 md:h-12 md:w-12 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center shadow-lg transition-colors"
          aria-label="Help menu"
        >
          {isOpen ? (
            <X className="h-4 w-4 md:h-5 md:w-5 text-white" />
          ) : (
            <HelpCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
          )}
        </button>
      </div>
    </>
  );
}
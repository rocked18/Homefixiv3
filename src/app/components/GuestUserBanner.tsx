import { Sparkles, Home, Hammer, Lightbulb, Droplet, Wrench, X } from "lucide-react";
import { useState } from "react";

interface GuestUserBannerProps {
  onSignUpClick: () => void;
  onUpgradeClick: () => void;
  onTryFree: () => void;
}

export function GuestUserBanner({ onSignUpClick, onUpgradeClick, onTryFree }: GuestUserBannerProps) {
  const [bannerClosed, setBannerClosed] = useState(false);

  if (bannerClosed) return null;

  return (
    <div className="w-full px-4 pt-8 pb-4">
      <div className="max-w-5xl mx-auto">
        {/* Custom Banner Design */}
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setBannerClosed(true)}
            className="absolute top-3 left-3 z-20 p-1.5 rounded-lg hover:bg-white/50 transition-colors group"
            aria-label="Close banner"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
          </button>

          {/* Decorative Background Elements */}
          <div className="absolute top-4 right-4 text-blue-200 opacity-50">
            <Home className="w-16 h-16" />
          </div>
          <div className="absolute bottom-4 left-4 text-blue-200 opacity-50">
            <Wrench className="w-12 h-12" />
          </div>
          <div className="absolute top-1/2 right-1/4 text-blue-200 opacity-30">
            <Hammer className="w-10 h-10" />
          </div>
          <div className="absolute bottom-1/3 right-8 text-blue-200 opacity-30">
            <Lightbulb className="w-10 h-10" />
          </div>
          <div className="absolute top-1/4 left-1/4 text-blue-200 opacity-30">
            <Droplet className="w-8 h-8" />
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Powered by AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI-Powered Home Repairs
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium mb-6">
              Fix it yourself with AI guidance
            </p>
            
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Get instant, expert guidance for any home repair or DIY project. 
              HOMEFIXI uses advanced AI to diagnose issues and provide step-by-step repair instructions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-3">
              <button
                onClick={onUpgradeClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
              >
                Create Account
              </button>
              <button
                onClick={() => {
                  onTryFree();
                  // Smooth scroll to the job setup form
                  setTimeout(() => {
                    const element = document.getElementById('job-setup-form');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-base font-medium"
              >
                Try for free
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Guest users can set up one job per day • Sign up for free to unlock all the features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
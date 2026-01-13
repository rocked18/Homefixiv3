import { Sparkles, BookOpen, Wrench, Video, CheckCircle2, Home, Hammer, Lightbulb, Droplet, X } from "lucide-react";
import { useState } from "react";

interface GuestUserPageLayoutProps {
  onSignUpClick: () => void;
  onUpgradeClick: () => void;
  onTryFree: () => void;
}

export function GuestUserPageLayout({ onSignUpClick, onUpgradeClick, onTryFree }: GuestUserPageLayoutProps) {
  const [bannerClosed, setBannerClosed] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section with Custom Design */}
        {!bannerClosed && (
          <div className="text-center mb-12">
            {/* Custom Banner Design */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 mb-8 overflow-hidden">
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
              <div className="relative z-10">
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
                    onClick={onTryFree}
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
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <FeatureCard
            icon={<BookOpen className="w-6 h-6 text-blue-600" />}
            title="Visual Step-by-Step Guides"
            description="Get detailed instructions with images showing exactly what to do at each step of your repair."
          />
          <FeatureCard
            icon={<Wrench className="w-6 h-6 text-blue-600" />}
            title="Materials & Tools List"
            description="Know exactly what you need before starting. Get a complete list of materials and tools with links to purchase."
          />
          <FeatureCard
            icon={<Video className="w-6 h-6 text-blue-600" />}
            title="Helpful Video Tutorials"
            description="Watch relevant how-to videos that complement your repair instructions for visual learners."
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6 text-blue-600" />}
            title="AI-Powered Diagnostics"
            description="Upload photos or describe your issue. Our AI identifies the problem and suggests the right solution."
          />
        </div>

        {/* Benefits Section */}
        <div className="bg-blue-50 rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">Why create a free account?</h3>
          <div className="space-y-3">
            <BenefitItem text="Save your repair jobs and access them anytime" />
            <BenefitItem text="Track your DIY project history" />
            <BenefitItem text="Get 50 AI responses every month for free" />
            <BenefitItem text="Save your home appliances for quick reference" />
            <BenefitItem text="Share your repair guides with others" />
          </div>
          <button
            onClick={onSignUpClick}
            className="mt-6 w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started Free
          </button>
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">How it works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <StepCard
              number="1"
              title="Describe Your Issue"
              description="Type your problem, upload a photo, or use voice input to tell us what needs fixing."
            />
            <StepCard
              number="2"
              title="Get AI Guidance"
              description="Our AI analyzes your issue and provides personalized, step-by-step repair instructions."
            />
            <StepCard
              number="3"
              title="Fix It Yourself"
              description="Follow the guide, request additional help, or generate visual aids as you complete your repair."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-white">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
        {number}
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

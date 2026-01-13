import { X, Check, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { useState } from "react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: "free" | "plus" | "pro" | "guest";
}

export function UpgradeModal({ isOpen, onClose, currentPlan = "guest" }: UpgradeModalProps) {
  const [selectedInterval, setSelectedInterval] = useState<"monthly" | "yearly">("monthly");

  if (!isOpen) return null;

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      yearlyPrice: 0,
      tagline: "Get started with Homefixi",
      features: [
        { text: "2 jobs per day", included: true },
        { text: "Job history saved", included: true },
        { text: "Save home appliances", included: true },
        { text: "Full access to action tools", included: true },
        { text: "Basic AI assistance", included: true },
      ],
      cta: "Your current plan",
      disabled: true,
      highlighted: false,
    },
    {
      id: "plus",
      name: "Plus",
      price: 12,
      yearlyPrice: 10,
      tagline: "More jobs with advanced features",
      badge: "LIMITED TIME",
      features: [
        { text: "10 jobs per day", included: true },
        { text: "Unlimited job history", included: true },
        { text: "Save unlimited appliances", included: true },
        { text: "Priority AI responses", included: true },
        { text: "Advanced troubleshooting guides", included: true },
        { text: "Save custom materials lists", included: true },
        { text: "Video tutorial recommendations", included: true },
        { text: "Email support", included: true },
      ],
      cta: "Claim free trial",
      trialText: "Free for the first month",
      highlighted: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: 25,
      yearlyPrice: 20,
      tagline: "Maximize your DIY productivity",
      features: [
        { text: "Unlimited jobs", included: true },
        { text: "Unlimited job history", included: true },
        { text: "Save unlimited appliances", included: true },
        { text: "Fastest AI responses", included: true },
        { text: "Expert-level solutions", included: true },
        { text: "Custom project planning", included: true },
        { text: "Integration with home improvement stores", included: true },
        { text: "Priority email & chat support", included: true },
        { text: "Early access to new features", included: true },
        { text: "Downloadable repair manuals", included: true },
      ],
      cta: "Get Pro",
      highlighted: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="text-center pt-12 pb-8 px-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Try Plus free for 1 month
          </h2>
          
          {/* Interval toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 gap-1">
            <button
              onClick={() => setSelectedInterval("monthly")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                selectedInterval === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedInterval("yearly")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                selectedInterval === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 px-6 pb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border-2 p-6 flex flex-col",
                plan.highlighted
                  ? "border-blue-500 shadow-lg bg-blue-50/30"
                  : "border-gray-200 bg-white"
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
              </div>

              {/* Price */}
              <div className="mb-2">
                {plan.price === 0 ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-semibold text-gray-900">0</span>
                    <span className="text-gray-500 text-sm">
                      <span className="text-gray-400">$&nbsp;</span>/ month
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    {selectedInterval === "monthly" ? (
                      <>
                        <span className="text-gray-400 line-through text-2xl">
                          ${plan.price + 8}
                        </span>
                        <span className="text-5xl font-semibold text-gray-900">
                          {plan.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-5xl font-semibold text-gray-900">
                        {plan.yearlyPrice}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">
                      <span className="text-gray-400">$&nbsp;</span>/ month
                    </span>
                  </div>
                )}
                {plan.trialText && (
                  <p className="text-xs text-gray-600 mt-1">{plan.trialText}</p>
                )}
              </div>

              {/* Tagline */}
              <p className="text-sm text-gray-600 mb-6">{plan.tagline}</p>

              {/* CTA button */}
              <Button
                className={cn(
                  "w-full mb-6 rounded-full font-medium",
                  currentPlan === "guest"
                    ? // Guest users: all buttons are active
                      plan.highlighted
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : plan.id === "free"
                      ? "bg-gray-900 hover:bg-gray-800 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                    : // Authenticated users: show current plan state
                      plan.highlighted && currentPlan !== plan.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : currentPlan === plan.id
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : (() => {
                        const tierLevels: Record<string, number> = { free: 0, plus: 1, pro: 2 };
                        const currentLevel = tierLevels[currentPlan || "free"] || 0;
                        const planLevel = tierLevels[plan.id] || 0;
                        return currentLevel > planLevel
                          ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                          : "bg-gray-900 hover:bg-gray-800 text-white";
                      })()
                )}
                disabled={currentPlan !== "guest" && currentPlan === plan.id}
              >
                {(() => {
                  // Guest users: show default CTAs
                  if (currentPlan === "guest") {
                    return plan.cta === "Your current plan" ? "Get Started Free" : plan.cta;
                  }
                  
                  // Authenticated users: show plan comparison logic
                  const tierLevels: Record<string, number> = { free: 0, plus: 1, pro: 2 };
                  const currentLevel = tierLevels[currentPlan || "free"] || 0;
                  const planLevel = tierLevels[plan.id] || 0;
                  
                  if (currentPlan === plan.id) return "Your current plan";
                  if (currentLevel > planLevel) return "Downgrade";
                  return plan.cta;
                })()}
              </Button>

              {/* Features list */}
              <div className="space-y-3 flex-1">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-gray-700 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              {plan.id === "plus" && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Promo terms apply. Starting Feb 12, 2026. ChatGPT Plus or Team
                    subscription required.{" "}
                    <a href="#" className="underline">
                      Limits apply
                    </a>
                  </p>
                </div>
              )}

              {plan.id === "pro" && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Unlimited subject to abuse guardrails.{" "}
                    <a href="#" className="underline">
                      Learn more
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom help text */}
        <div className="text-center pb-8 px-6">
          <p className="text-sm text-gray-600">
            Have an existing plan?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              See billing help
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
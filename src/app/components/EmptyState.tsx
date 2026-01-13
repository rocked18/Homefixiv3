import { useState, useRef, useEffect } from "react";
import { Plus, Mic, ArrowUp, Image, Check, Wrench, Lightbulb, Droplet, WashingMachine, Hammer, Trees } from "lucide-react";
import { Button } from "./ui/button";
import { ApplianceModelModal, ApplianceModel } from "./ApplianceModelModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface EmptyStateProps {
  onSubmit: (message: string, image?: File, jobType?: string, applianceDetails?: { model: ApplianceModel; serialNumber: string }) => void;
  disabled?: boolean;
  onOpenTerms?: (section: "terms" | "privacy") => void;
}

export function EmptyState({ onSubmit, disabled = false, onOpenTerms }: EmptyStateProps) {
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [showApplianceModal, setShowApplianceModal] = useState(false);
  const [applianceDetails, setApplianceDetails] = useState<{ model: ApplianceModel; serialNumber: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const jobTypes = [
    "Plumbing",
    "Home Appliances",
    "Electrics",
    "Repairs + Cleaning",
    "Custom Project",
    "Outdoor and Garden",
  ];

  // Get icon and color for each job type
  const getJobTypeConfig = (jobType: string) => {
    const configs: Record<string, { icon: React.ReactNode; color: string; bgColor: string; hoverBg: string; hoverBorder: string; hoverText: string; selectedBg: string; selectedBorder: string }> = {
      "Plumbing": {
        icon: <Droplet className="h-4 w-4" />,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        hoverBg: "hover:bg-blue-50",
        hoverBorder: "hover:border-blue-400",
        hoverText: "hover:text-blue-700",
        selectedBg: "bg-blue-50",
        selectedBorder: "border-blue-500"
      },
      "Home Appliances": {
        icon: <WashingMachine className="h-4 w-4" />,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        hoverBg: "hover:bg-purple-50",
        hoverBorder: "hover:border-purple-400",
        hoverText: "hover:text-purple-700",
        selectedBg: "bg-purple-50",
        selectedBorder: "border-purple-500"
      },
      "Electrics": {
        icon: <Lightbulb className="h-4 w-4" />,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        hoverBg: "hover:bg-yellow-50",
        hoverBorder: "hover:border-yellow-400",
        hoverText: "hover:text-yellow-700",
        selectedBg: "bg-yellow-50",
        selectedBorder: "border-yellow-500"
      },
      "Repairs + Cleaning": {
        icon: <Hammer className="h-4 w-4" />,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        hoverBg: "hover:bg-orange-50",
        hoverBorder: "hover:border-orange-400",
        hoverText: "hover:text-orange-700",
        selectedBg: "bg-orange-50",
        selectedBorder: "border-orange-500"
      },
      "Custom Project": {
        icon: <Wrench className="h-4 w-4" />,
        color: "text-gray-700",
        bgColor: "bg-gray-100",
        hoverBg: "hover:bg-gray-50",
        hoverBorder: "hover:border-gray-400",
        hoverText: "hover:text-gray-800",
        selectedBg: "bg-gray-50",
        selectedBorder: "border-gray-500"
      },
      "Outdoor and Garden": {
        icon: <Trees className="h-4 w-4" />,
        color: "text-green-600",
        bgColor: "bg-green-100",
        hoverBg: "hover:bg-green-50",
        hoverBorder: "hover:border-green-400",
        hoverText: "hover:text-green-700",
        selectedBg: "bg-green-50",
        selectedBorder: "border-green-500"
      }
    };
    return configs[jobType] || { 
      icon: <Wrench className="h-4 w-4" />, 
      color: "text-gray-700", 
      bgColor: "bg-gray-100",
      hoverBg: "hover:bg-gray-50",
      hoverBorder: "hover:border-gray-400",
      hoverText: "hover:text-gray-800",
      selectedBg: "bg-gray-50",
      selectedBorder: "border-gray-500"
    };
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 200; // Maximum height before scrolling (about 8 lines)
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }, [input]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    if (input.trim() && selectedJobType && !disabled) {
      onSubmit(input.trim(), selectedImage || undefined, selectedJobType, applianceDetails || undefined);
      // Reset state
      setInput("");
      setSelectedImage(null);
      setSelectedJobType("");
      setApplianceDetails(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isSubmitEnabled = input.trim() && selectedJobType && !disabled;

  return (
    <TooltipProvider delayDuration={100}>
      <div className="w-full" id="job-setup-form">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Set up your new job
        </h1>

        <div className="space-y-6">
          {/* Step 1: Describe the Job */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white text-sm font-semibold shadow-sm">
                1
              </div>
              <h2 className="font-semibold text-gray-900">Describe the job</h2>
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-3xl shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-200 px-4 py-2">
                
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Describe your job..."
                  disabled={disabled}
                  rows={1}
                  className="flex-1 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent resize-none overflow-y-auto leading-6"
                  style={{ minHeight: '24px', maxHeight: '200px' }}
                />
                
                <div className="flex items-end gap-2 flex-shrink-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-gray-700"
                      >
                        <Mic className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Dictate</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {input.trim() && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleSubmit}
                          disabled={disabled || !input.trim()}
                          size="icon"
                          className="h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-900 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          <ArrowUp className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Submit</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Upload Image (Optional) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white text-sm font-semibold shadow-sm">
                2
              </div>
              <h2 className="font-semibold text-gray-900">Upload image <span className="text-gray-500 font-normal text-sm">(optional)</span></h2>
            </div>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-primary/50 hover:bg-pink-50/30 transition-all duration-200 cursor-pointer"
              onClick={() => {
                if (!selectedImage) {
                  document.getElementById('image-upload')?.click();
                }
              }}
            >
              {selectedImage ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{selectedImage.name}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <>
                  <Image className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button asChild variant="outline" size="sm">
                      <span>Choose File</span>
                    </Button>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Step 3: Select Job Type */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white text-sm font-semibold shadow-sm">
                3
              </div>
              <h2 className="font-semibold text-gray-900">Select job type</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {jobTypes.map((jobType) => {
                const config = getJobTypeConfig(jobType);
                return (
                  <Button
                    key={jobType}
                    onClick={() => {
                      setSelectedJobType(jobType);
                      if (jobType === "Home Appliances") {
                        setShowApplianceModal(true);
                      }
                    }}
                    variant="outline"
                    className={`h-11 px-3 text-sm font-medium transition-all duration-200 flex items-center justify-start gap-2 ${
                      selectedJobType === jobType
                        ? `${config.selectedBg} ${config.selectedBorder} ${config.hoverText} shadow-sm scale-[1.02]`
                        : `${config.hoverBg} ${config.hoverBorder} ${config.hoverText} hover:shadow-sm hover:scale-[1.02]`
                    }`}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 rounded-md ${config.bgColor} ${config.color} flex-shrink-0`}>
                      {config.icon}
                    </div>
                    <span className="text-left flex-1">{jobType}</span>
                  </Button>
                );
              })}
            </div>

            {/* Show appliance details if selected */}
            {applianceDetails && selectedJobType === "Home Appliances" && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      {applianceDetails.model.brand} {applianceDetails.model.modelNumber}
                    </p>
                    <p className="text-xs text-blue-700">{applianceDetails.model.productName}</p>
                    {applianceDetails.serialNumber && (
                      <p className="text-xs text-blue-600 mt-1">
                        Serial: {applianceDetails.serialNumber}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => {
                      setApplianceDetails(null);
                      setShowApplianceModal(true);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 text-xs"
                  >
                    Change
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!isSubmitEnabled}
              className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
            >
              <ArrowUp className="h-5 w-5 mr-2" />
              Start Job
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-12">
          By messaging HomeFixi, an AI chatbot, you agree to our{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              onOpenTerms?.("terms");
            }}
            className="text-xs text-gray-500 underline hover:text-gray-700 cursor-pointer font-normal"
          >
            Terms
          </button>{" "}
          and have read our{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              onOpenTerms?.("privacy");
            }}
            className="text-xs text-gray-500 underline hover:text-gray-700 cursor-pointer font-normal"
          >
            Privacy Policy
          </button>
          . See Cookie Preferences.
        </p>

        {/* Appliance Model Modal */}
        <ApplianceModelModal
          isOpen={showApplianceModal}
          onClose={() => setShowApplianceModal(false)}
          onSelect={(model, serialNumber) => {
            setApplianceDetails({ model, serialNumber });
            setShowApplianceModal(false);
          }}
        />
      </div>
    </TooltipProvider>
  );
}
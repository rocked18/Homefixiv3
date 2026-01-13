import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RotateCw,
  MoreVertical,
  Download,
  ListChecks,
  Wrench,
  CheckCircle2,
  ExternalLink,
  Check,
  RefreshCw,
  MoreHorizontal,
  Video,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { toast } from "sonner";

export interface Material {
  name: string;
  quantity?: string;
  link?: string;
}

export interface Tool {
  name: string;
  link?: string;
}

export interface Step {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  steps?: Step[];
  materials?: Material[];
  tools?: Tool[];
  imageFile?: File;
  jobType?: string;
  applianceDetails?: {
    brand: string;
    modelNumber: string;
    productName: string;
    serialNumber: string;
  };
}

interface ChatMessageProps {
  message: ChatMessageData;
  onRegenerate?: () => void;
  isFirstMessage?: boolean;
  onOpenTerms?: () => void;
  onShare?: () => void;
  isGuestUser?: boolean;
  onUpgradeClick?: () => void;
}

export function ChatMessage({ message, onRegenerate, isFirstMessage = false, onOpenTerms, onShare, isGuestUser = false, onUpgradeClick }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showVisualGuide, setShowVisualGuide] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);
  const [isGeneratingMaterials, setIsGeneratingMaterials] = useState(false);
  const [isGeneratingVideos, setIsGeneratingVideos] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  // Get colors for each job type
  const getJobTypeColors = (jobType: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      "Plumbing": {
        bg: "bg-blue-50",
        text: "text-blue-900",
        border: "border-blue-200"
      },
      "Home Appliances": {
        bg: "bg-purple-50",
        text: "text-purple-900",
        border: "border-purple-200"
      },
      "Electrics": {
        bg: "bg-yellow-50",
        text: "text-yellow-900",
        border: "border-yellow-200"
      },
      "Repairs + Cleaning": {
        bg: "bg-orange-50",
        text: "text-orange-900",
        border: "border-orange-200"
      },
      "Custom Project": {
        bg: "bg-gray-50",
        text: "text-gray-900",
        border: "border-gray-200"
      },
      "Outdoor and Garden": {
        bg: "bg-green-50",
        text: "text-green-900",
        border: "border-green-200"
      }
    };
    return colorMap[jobType] || { bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-200" };
  };

  const handleCopy = () => {
    // Check if Clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message.content).then(() => {
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        // If Clipboard API fails, use fallback method
        copyToClipboardFallback();
      });
    } else {
      // Use fallback method directly if Clipboard API is not available
      copyToClipboardFallback();
    }
  };

  const copyToClipboardFallback = () => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = message.content;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error("Failed to copy to clipboard");
      }
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleLike = () => {
    if (liked) {
      // If already liked, toggle it off
      setLiked(false);
    } else {
      // Set liked to true and disliked to false
      setLiked(true);
      setDisliked(false);
      toast.success("Thanks for your feedback!");
    }
  };

  const handleDislike = () => {
    if (disliked) {
      // If already disliked, toggle it off
      setDisliked(false);
    } else {
      // Set disliked to true and liked to false
      setDisliked(true);
      setLiked(false);
      toast.success("Thanks for your feedback!");
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
      toast.success("Share link copied!");
    }
  };

  const handleDownload = () => {
    toast.success("Guide downloaded");
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate();
      toast.success("Regenerating response...");
    }
  };

  const handleGenerateGuide = () => {
    if (isGuestUser && onUpgradeClick) {
      onUpgradeClick();
      return;
    }
    setIsGeneratingGuide(true);
    // Simulate generation
    setTimeout(() => {
      setShowVisualGuide(true);
      setIsGeneratingGuide(false);
      toast.success("Visual guide generated!");
    }, 1500);
  };

  const handleGenerateMaterials = () => {
    if (isGuestUser && onUpgradeClick) {
      onUpgradeClick();
      return;
    }
    setIsGeneratingMaterials(true);
    // Simulate generation
    setTimeout(() => {
      setShowMaterials(true);
      setIsGeneratingMaterials(false);
      toast.success("Materials & tools list generated!");
    }, 1500);
  };

  const handleGenerateVideos = () => {
    if (isGuestUser && onUpgradeClick) {
      onUpgradeClick();
      return;
    }
    setIsGeneratingVideos(true);
    // Simulate generation
    setTimeout(() => {
      setShowVideos(true);
      setIsGeneratingVideos(false);
      toast.success("Related videos found!");
    }, 1500);
  };

  if (message.role === "user") {
    return (
      <div className="flex flex-col items-end gap-2 mb-8" data-message>
        {/* Text Input Bubble */}
        {message.content && (
          <div className="max-w-[80%] bg-gray-100 text-gray-900 rounded-3xl px-5 py-3">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        )}
        
        {/* Image Bubble */}
        {message.imageFile && (
          <div className="max-w-[80%] bg-gray-100 rounded-3xl p-2">
            <img
              src={URL.createObjectURL(message.imageFile)}
              alt="Uploaded"
              className="rounded-2xl max-h-64 object-contain"
            />
          </div>
        )}
        
        {/* Job Type/Category Bubble */}
        {message.jobType && (
          <div className={`max-w-[80%] ${getJobTypeColors(message.jobType).bg} ${getJobTypeColors(message.jobType).text} rounded-3xl px-5 py-3 ${getJobTypeColors(message.jobType).border}`}>
            <p className="text-sm">
              <span className="font-medium">Category:</span> {message.jobType}
            </p>
          </div>
        )}
        
        {/* Appliance Details Bubble */}
        {message.applianceDetails && (
          <div className="max-w-[80%] bg-blue-50 text-blue-900 rounded-3xl px-5 py-3 border border-blue-200">
            <div className="space-y-1">
              <p className="font-medium text-sm">
                {message.applianceDetails.brand} {message.applianceDetails.modelNumber}
              </p>
              <p className="text-sm text-blue-700">
                {message.applianceDetails.productName}
              </p>
              {message.applianceDetails.serialNumber && (
                <p className="text-xs text-blue-600">
                  Serial: {message.applianceDetails.serialNumber}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-10" data-message>
      {/* AI Response */}
      <div className="flex gap-4 mb-4">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">AI</span>
        </div>
        <div className="flex-1 space-y-4 pt-1">
          {/* Main Response Text */}
          <div className="prose prose-sm max-w-none text-gray-800">
            {message.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index} className="mb-3">{paragraph}</p>
            ))}
          </div>

          {/* Safety First Callout - Only on first message of a new job */}
          {isFirstMessage && (
            <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900 mb-1">Safety First</h4>
                <p className="text-sm text-amber-800 mb-2">
                  Always turn off power/water at the source before starting. Wear appropriate safety gear including gloves and safety glasses. If you're unsure about any step, consult a licensed professional.
                </p>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                  onClick={onOpenTerms}
                >
                  Read our Terms & Conditions
                </a>
              </div>
            </div>
          )}

          {/* Optional Content Generation Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {message.steps && message.steps.length > 0 && !showVisualGuide && (
              <Button
                onClick={handleGenerateGuide}
                disabled={isGeneratingGuide}
                variant="outline"
                size="sm"
                className="rounded-full border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                <ListChecks className="h-4 w-4 mr-2" />
                {isGeneratingGuide ? "Generating..." : "Visual Guide"}
              </Button>
            )}
            
            {((message.materials && message.materials.length > 0) || (message.tools && message.tools.length > 0)) && !showMaterials && (
              <Button
                onClick={handleGenerateMaterials}
                disabled={isGeneratingMaterials}
                variant="outline"
                size="sm"
                className="rounded-full border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                <Wrench className="h-4 w-4 mr-2" />
                {isGeneratingMaterials ? "Generating..." : "Materials & Tools"}
              </Button>
            )}
            
            {!showVideos && (
              <Button
                onClick={handleGenerateVideos}
                disabled={isGeneratingVideos}
                variant="outline"
                size="sm"
                className="rounded-full border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                <Video className="h-4 w-4 mr-2" />
                {isGeneratingVideos ? "Finding..." : "Videos"}
              </Button>
            )}
          </div>

          {/* Visual Guide - Shown when generated */}
          {showVisualGuide && message.steps && message.steps.length > 0 && (
            <CollapsiblePanel
              title="Step-by-Step Visual Guide"
              icon={<ListChecks className="h-5 w-5 text-blue-600" />}
              defaultOpen={true}
              onDownload={() => {}}
            >
              <div className="space-y-4">
                {message.steps.map((step, index) => (
                  <div key={index}>
                    {/* Safety First Callout - Show at the beginning of Step 1 */}
                    {index === 0 && (
                      <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-amber-900 mb-1">Safety First</h4>
                          <p className="text-sm text-amber-800 mb-2">
                            Always turn off power/water at the source before starting. Wear appropriate safety gear including gloves and safety glasses. If you're unsure about any step, consult a licensed professional.
                          </p>
                          <a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-700 underline"
                            onClick={onOpenTerms}
                          >
                            Read our Terms & Conditions
                          </a>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {step.description}
                        </p>
                        {step.imageUrl && (
                          <img
                            src={step.imageUrl}
                            alt={step.title}
                            className="rounded-lg w-full max-w-md"
                          />
                        )}
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </CollapsiblePanel>
          )}

          {/* Materials & Tools - Shown when generated */}
          {showMaterials && ((message.materials && message.materials.length > 0) || (message.tools && message.tools.length > 0)) && (
            <CollapsiblePanel
              title="Materials & Tools"
              icon={<Wrench className="h-5 w-5 text-blue-600" />}
              defaultOpen={true}
              onDownload={() => {}}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {message.materials && message.materials.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Materials
                    </h4>
                    <ul className="space-y-2">
                      {message.materials.map((material, index) => (
                        <li key={index} className="flex items-center justify-between text-sm text-gray-700">
                          <span>
                            {material.name}
                            {material.quantity && (
                              <span className="text-gray-500 ml-2">
                                ({material.quantity})
                              </span>
                            )}
                          </span>
                          {material.link && typeof material.link === 'string' && material.link.trim() !== '' && (
                            <a
                              href={material.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 ml-2"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {message.tools && message.tools.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tools</h4>
                    <ul className="space-y-2">
                      {message.tools.map((tool, index) => (
                        <li key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700 flex items-center">
                            <Wrench className="h-4 w-4 text-gray-400 mr-2" />
                            {tool.name}
                          </span>
                          {tool.link && typeof tool.link === 'string' && tool.link.trim() !== '' && (
                            <a
                              href={tool.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 ml-2"
                              title="Buy now"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CollapsiblePanel>
          )}

          {/* Videos - Shown when generated */}
          {showVideos && (
            <CollapsiblePanel
              title="Related Videos"
              icon={<Video className="h-5 w-5 text-blue-600" />}
              defaultOpen={true}
            >
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="w-32 h-20 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center">
                    <Video className="h-8 w-8 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">How to Fix a Leaky Faucet - Step by Step</h4>
                    <p className="text-xs text-gray-500">DIY Home Repairs • 2.3M views</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="w-32 h-20 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center">
                    <Video className="h-8 w-8 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">Common Faucet Problems and Solutions</h4>
                    <p className="text-xs text-gray-500">HomeFixIt Pro • 1.8M views</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="w-32 h-20 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center">
                    <Video className="h-8 w-8 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">Replacing Faucet Washers and O-Rings</h4>
                    <p className="text-xs text-gray-500">Plumbing Basics • 950K views</p>
                  </div>
                </div>
              </div>
            </CollapsiblePanel>
          )}

          {/* Action Buttons */}
          <TooltipProvider delayDuration={200}>
            <div className="flex items-center gap-1 mt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Copy</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLike}
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  >
                    {liked ? <ThumbsUp className="h-4 w-4 fill-current" /> : <ThumbsUp className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Good response</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDislike}
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  >
                    {disliked ? <ThumbsDown className="h-4 w-4 fill-current" /> : <ThumbsDown className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Bad response</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
              
              {onRegenerate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRegenerate}
                      className="hidden h-8 w-8 text-gray-500 hover:text-gray-700"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Regenerate</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownload}
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
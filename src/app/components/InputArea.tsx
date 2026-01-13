import { useState } from "react";
import { Mic, Image, ArrowUp, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ApplianceModel } from "./ApplianceModelModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface InputAreaProps {
  onSubmit: (message: string, image?: File, jobType?: string, applianceDetails?: { model: ApplianceModel; serialNumber: string }) => void;
  placeholder?: string;
  disabled?: boolean;
  onOpenTerms?: (section: "terms" | "privacy") => void;
}

export function InputArea({
  onSubmit,
  placeholder = "Ask anything",
  disabled = false,
  onOpenTerms,
}: InputAreaProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="bg-gray-50 px-4 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-full shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-200 px-4 py-3">
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                disabled={disabled}
                className="flex-1 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent pl-2"
              />
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                    >
                      <Image className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Attach image</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Dictate</p>
                  </TooltipContent>
                </Tooltip>
                <Button
                  onClick={handleSubmit}
                  disabled={!input.trim() || disabled}
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-rose-600 hover:from-[#E31C5F] hover:to-rose-700 disabled:bg-gray-200 disabled:text-gray-400 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
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
        </div>
      </div>
    </TooltipProvider>
  );
}
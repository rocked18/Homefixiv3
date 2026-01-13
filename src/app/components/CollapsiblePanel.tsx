import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface CollapsiblePanelProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onDownload?: () => void;
}

export function CollapsiblePanel({
  title,
  icon,
  children,
  defaultOpen = false,
  onDownload,
}: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      // Scroll to show the panel header when it opens
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [isOpen]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload();
      toast.success("Downloaded successfully!");
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on the download button
    if ((e.target as HTMLElement).closest('[data-download-button]')) {
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={panelRef} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <div
        onClick={handleHeaderClick}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {onDownload && (
            <button
              data-download-button
              onClick={handleDownload}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      <div
        className={cn(
          "transition-all duration-200 overflow-hidden",
          isOpen ? "max-h-[5000px]" : "max-h-0"
        )}
      >
        <div className="p-4 pt-0 border-t border-gray-100">{children}</div>
      </div>
    </div>
  );
}
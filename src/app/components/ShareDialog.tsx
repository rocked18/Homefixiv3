import { Link as LinkIcon, Info } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId: string;
}

export function ShareDialog({ isOpen, onClose, jobTitle, jobId }: ShareDialogProps) {
  const shareUrl = `${window.location.origin}/job/${jobId}`;

  const handleCopyLink = () => {
    // Check if Clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success("Link copied to clipboard");
      }).catch(() => {
        // If Clipboard API fails, use fallback method
        copyToClipboardFallback(shareUrl);
      });
    } else {
      // Use fallback method directly if Clipboard API is not available
      copyToClipboardFallback(shareUrl);
    }
  };

  const copyToClipboardFallback = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        toast.success("Link copied to clipboard");
      } else {
        toast.error("Failed to copy to clipboard");
      }
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleShareX = () => {
    const text = encodeURIComponent(`Check out this job: ${jobTitle}`);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleShareReddit = () => {
    const url = encodeURIComponent(shareUrl);
    const title = encodeURIComponent(jobTitle);
    window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        {/* Header */}
        <div className="p-6 pb-4">
          <DialogTitle className="text-2xl font-semibold">{jobTitle}</DialogTitle>
          <DialogDescription className="sr-only">
            Share this job conversation on social media or copy the link
          </DialogDescription>
        </div>

        {/* Warning Banner */}
        <div className="mx-6 mb-4 bg-gray-100 rounded-lg p-4 flex gap-3">
          <Info className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-gray-900">
              This conversation may include personal information.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Take a moment to check the content before sharing the link.
            </p>
          </div>
        </div>

        {/* Preview Box */}
        <div className="mx-6 mb-6 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-end justify-between">
            <p className="text-gray-700 text-sm leading-relaxed">
              This is a preview of your shared job conversation.
            </p>
            <span className="font-semibold text-sm">Homefixi</span>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="px-6 pb-8">
          <div className="flex items-center justify-center gap-4">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-14 w-14 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <LinkIcon className="h-5 w-5 text-gray-700" />
              </div>
              <span className="text-xs text-gray-600">Copy link</span>
            </button>

            {/* X (Twitter) */}
            <button
              onClick={handleShareX}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-14 w-14 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="text-xs text-gray-600">X</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={handleShareLinkedIn}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-14 w-14 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-600">LinkedIn</span>
            </button>

            {/* Reddit */}
            <button
              onClick={handleShareReddit}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-14 w-14 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-600">Reddit</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
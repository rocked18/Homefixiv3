import { X } from "lucide-react";
import { Button } from "./ui/button";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userEmail?: string;
}

export function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  userEmail,
}: LogoutConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Content */}
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-gray-900">
              Are you sure you want to log out?
            </h2>
            <p className="text-gray-600">
              Log out of Homefixi{userEmail ? ` as ${userEmail}` : ""}?
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onConfirm}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-6 text-base font-medium border-2 border-blue-500"
            >
              Log out
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full bg-white text-gray-900 hover:bg-gray-50 rounded-full py-6 text-base font-medium border-2 border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

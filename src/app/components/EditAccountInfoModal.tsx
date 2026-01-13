import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

interface EditAccountInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditAccountInfoModal({
  isOpen,
  onClose,
}: EditAccountInfoModalProps) {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(" ")[1] || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!isOpen) return null;

  const handleSave = () => {
    // In a real app, this would make an API call
    toast.success("Account information updated successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Edit Account Info
          </h2>
          <p className="text-gray-600 mb-8">
            You can edit your account information from here.
          </p>

          <div className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              onClick={handleSave}
              className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl px-8 py-6 text-base"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-xl px-8 py-6 text-base border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

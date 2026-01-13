import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth, UserStatus } from "../contexts/AuthContext";

export function DevAuthToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout, updateUserStatus } = useAuth();

  const handleStatusChange = (status: UserStatus) => {
    if (status === "user") {
      logout();
    } else if (user) {
      updateUserStatus(status);
    } else {
      login(status);
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-2 min-w-[200px]">
          <p className="text-xs font-semibold text-gray-700 mb-2">Test User Status:</p>
          <Button
            onClick={() => handleStatusChange("user")}
            variant={!user || user.status === "user" ? "default" : "outline"}
            size="sm"
            className="w-full justify-start text-xs"
          >
            User (Not Logged In)
          </Button>
          <Button
            onClick={() => handleStatusChange("free")}
            variant={user?.status === "free" ? "default" : "outline"}
            size="sm"
            className="w-full justify-start text-xs"
          >
            Free (Logged In)
          </Button>
          <Button
            onClick={() => handleStatusChange("paid")}
            variant={user?.status === "paid" ? "default" : "outline"}
            size="sm"
            className="w-full justify-start text-xs"
          >
            Paid (Premium)
          </Button>
          <div className="pt-2 border-t border-gray-200 text-xs text-gray-600">
            Current: <span className="font-semibold">{user?.status || "user"}</span>
          </div>
        </div>
      )}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg h-10 w-10"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}

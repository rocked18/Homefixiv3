import { useState } from "react";
import { Menu, Settings, X, User, UserPlus, EllipsisVertical, HelpCircle, CreditCard, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { LoginDialog } from "./LoginDialog";
import { LogoutConfirmationModal } from "./LogoutConfirmationModal";
import { useAuth, UserStatus } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton?: boolean;
  onProfileClick?: () => void;
  isSidebarOpen?: boolean;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onAccountClick?: () => void;
  onBillingClick?: () => void;
  onLogoutClick?: () => void;
}

export function Header({ onMenuClick, showMenuButton = false, onProfileClick, isSidebarOpen, onSettingsClick, onHelpClick, onAccountClick, onBillingClick, onLogoutClick }: HeaderProps) {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [devMenuOpen, setDevMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, login, updateUserStatus } = useAuth();

  const handleStatusChange = (status: UserStatus) => {
    if (status === "user") {
      logout();
    } else if (user) {
      updateUserStatus(status);
    } else {
      login(status);
    }
    setDevMenuOpen(false);
  };

  const handleLogoutClick = () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      setLogoutDialogOpen(true);
    }
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {showMenuButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="lg:hidden text-gray-600"
              >
                {isSidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-gray-900">Home<span className="text-primary">fixi</span></h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                {/* Log in button - icon on mobile, text on desktop */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white bg-black hover:bg-gray-800 rounded-full sm:px-6 px-2"
                  onClick={() => setLoginDialogOpen(true)}
                >
                  <User className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Log in</span>
                </Button>
                {/* Sign up button - icon on mobile, text on desktop */}
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-black border-gray-300 rounded-full sm:px-6 px-2"
                  onClick={() => setLoginDialogOpen(true)}
                >
                  <UserPlus className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Sign up for free</span>
                </Button>
              </>
            ) : (
              <>
                {/* Desktop: Name with dropdown menu */}
                <div className="hidden sm:flex items-center gap-1">
                  <button
                    onClick={onProfileClick}
                    className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {user?.name} <span className="text-gray-500">({user?.status})</span>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <EllipsisVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {onSettingsClick && (
                        <DropdownMenuItem onClick={onSettingsClick}>
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      )}
                      {onHelpClick && (
                        <DropdownMenuItem onClick={onHelpClick}>
                          <HelpCircle className="h-4 w-4" />
                          <span>Get Help</span>
                        </DropdownMenuItem>
                      )}
                      {onAccountClick && (
                        <DropdownMenuItem onClick={onAccountClick}>
                          <User className="h-4 w-4" />
                          <span>Account</span>
                        </DropdownMenuItem>
                      )}
                      {onBillingClick && (
                        <DropdownMenuItem onClick={onBillingClick}>
                          <CreditCard className="h-4 w-4" />
                          <span>Billing</span>
                        </DropdownMenuItem>
                      )}
                      {onLogoutClick && (
                        <DropdownMenuItem onClick={handleLogoutClick}>
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Profile icon for mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onProfileClick}
                  className="sm:hidden text-gray-700"
                >
                  <User className="h-5 w-5" />
                </Button>
              </>
            )}
            
            {/* Dev Auth Toggle */}
            <div className="relative ml-2">
              {devMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setDevMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-2 min-w-[200px] z-20">
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
                      onClick={() => handleStatusChange("plus")}
                      variant={user?.status === "plus" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start text-xs"
                    >
                      Plus
                    </Button>
                    <Button
                      onClick={() => handleStatusChange("pro")}
                      variant={user?.status === "pro" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start text-xs"
                    >
                      Pro
                    </Button>
                    <div className="pt-2 border-t border-gray-200 text-xs text-gray-600">
                      Current: <span className="font-semibold">{user?.status || "user"}</span>
                    </div>
                  </div>
                </>
              )}
              <Button
                onClick={() => setDevMenuOpen(!devMenuOpen)}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-600 hover:bg-gray-100"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <LoginDialog
        isOpen={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
      <LogoutConfirmationModal
        isOpen={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogoutConfirm}
        userEmail={user?.email}
      />
    </>
  );
}
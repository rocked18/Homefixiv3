import { Plus, Trash2, MessageSquare, Menu, X, Zap, ChevronDown, ChevronLeft, ChevronRight, Pin, EllipsisVertical, Share, Pencil, Settings, HelpCircle, Search, User, CreditCard, Bell, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "./ui/utils";
import { SavedAppliance } from "../App";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { DeleteJobModal } from "./DeleteJobModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export interface Job {
  id: string;
  title: string;
  timestamp: Date;
  jobType?: string;
  pinned?: boolean;
}

interface SidebarProps {
  jobs: Job[];
  activeJobId: string | null;
  onJobSelect: (jobId: string) => void;
  onNewJob: () => void;
  onJobRename?: (jobId: string, newTitle: string) => void;
  onJobPin?: (jobId: string) => void;
  onJobDelete?: (jobId: string) => void;
  onJobShare?: (jobId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  credits?: number;
  maxCredits?: number;
  appliances?: SavedAppliance[];
  onUpgradeClick?: () => void;
  onSignUpClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onSearchClick?: () => void;
  onAccountClick?: () => void;
  onBillingClick?: () => void;
  onNotificationsClick?: () => void;
  onLogoutClick?: () => void;
}

export function Sidebar({
  jobs,
  activeJobId,
  onJobSelect,
  onNewJob,
  onJobRename,
  onJobPin,
  onJobDelete,
  onJobShare,
  isOpen = true,
  onClose,
  credits,
  maxCredits,
  appliances,
  onUpgradeClick,
  onSignUpClick,
  onProfileClick,
  onSettingsClick,
  onHelpClick,
  onSearchClick,
  onAccountClick,
  onBillingClick,
  onNotificationsClick,
  onLogoutClick,
}: SidebarProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [jobsSectionExpanded, setJobsSectionExpanded] = useState(true);
  const [appliancesSectionExpanded, setAppliancesSectionExpanded] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<{ id: string; title: string } | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const JOBS_PER_PAGE = 6;
  
  // Sort jobs: pinned first, then by timestamp
  const sortedJobs = [...jobs].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
  
  const totalPages = Math.ceil(sortedJobs.length / JOBS_PER_PAGE);
  const startIndex = currentPage * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const visibleJobs = sortedJobs.slice(startIndex, endIndex);
  
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const { user } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && onClose && (
        <div
          className="fixed top-14 bottom-0 left-0 right-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}
      
      <aside
        className={cn(
          "flex flex-col h-full bg-white transition-all duration-300",
          "fixed lg:relative top-14 lg:top-0 bottom-0 lg:inset-y-0 left-0 z-40",
          // Mobile (iPhone): 65% width, Tablet (iPad): 50% width, Desktop: fixed 256px (w-64)
          "w-[65%] sm:w-[50%] lg:w-64 lg:border-r lg:border-gray-100",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full relative z-20 bg-white">
          {/* Mobile Close Button - Top Right */}
          {/* Removed - close button is now in header */}
          
          {/* Header */}
          <div className="flex-shrink-0 p-3">
            <Button
              onClick={onNewJob}
              className="w-full justify-center bg-primary text-white hover:bg-primary/90 h-10 px-4 rounded-full font-medium shadow-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              New job
            </Button>
          </div>

          {/* Jobs Section - Fixed height with internal scroll */}
          <div className="flex-shrink-0 px-2" style={{ height: '40vh', minHeight: '250px' }}>
            {jobs.length > 0 && (
              <div className="h-full flex flex-col">
                <button
                  onClick={() => setJobsSectionExpanded(!jobsSectionExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Your jobs
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      jobsSectionExpanded ? "rotate-0" : "-rotate-90"
                    )}
                  />
                </button>
                {jobsSectionExpanded && (
                  <div className="flex-1 flex flex-col min-h-0">
                    <ScrollArea className="flex-1">
                      <div className="space-y-1 pb-0">
                        {visibleJobs.map((job) => (
                          <div
                            key={job.id}
                            className="group relative"
                          >
                            <button
                              onClick={() => onJobSelect(job.id)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ease-in-out",
                                "text-sm truncate flex items-center gap-2",
                                job.pinned ? "pr-14" : "pr-8",
                                activeJobId === job.id
                                  ? "bg-gray-100 text-gray-900 shadow-sm"
                                  : "text-gray-700 hover:bg-gray-50 hover:shadow-sm hover:scale-[1.02]"
                              )}
                            >
                              <span className="truncate">{job.title}</span>
                            </button>
                            
                            {/* Pin icon - always visible when pinned */}
                            {job.pinned && (
                              <div className="absolute right-9 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Pin className="h-3.5 w-3.5 text-gray-400 fill-gray-400" />
                              </div>
                            )}
                            
                            {/* Three-dot menu button */}
                            <div className={cn(
                              "absolute right-2 top-1/2 -translate-y-1/2 transition-opacity",
                              openDropdownId === job.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}>
                              <DropdownMenu onOpenChange={(open) => setOpenDropdownId(open ? job.id : null)}>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 hover:bg-gray-200"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <EllipsisVertical className="h-4 w-4 text-gray-600" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    if (onJobShare) onJobShare(job.id);
                                  }}>
                                    <Share className="h-4 w-4" />
                                    <span>Share</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    if (onJobRename) onJobRename(job.id, job.title);
                                  }}>
                                    <Pencil className="h-4 w-4" />
                                    <span>Rename</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    if (onJobPin) onJobPin(job.id);
                                  }}>
                                    <Pin className="h-4 w-4" />
                                    <span>{job.pinned ? "Unpin" : "Pin"}</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    variant="destructive"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setJobToDelete({ id: job.id, title: job.title });
                                      setDeleteModalOpen(true);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center px-3 py-1 flex-shrink-0">
                        <Button
                          onClick={handlePrevPage}
                          disabled={currentPage === 0}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-xs text-gray-500">
                          {currentPage + 1} / {totalPages}
                        </span>
                        <Button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages - 1}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Home Appliances Section */}
          {appliances && appliances.length > 0 && (
            <div className="flex-shrink-0 px-2 pb-2 border-t border-gray-100 pt-4 mt-2">
              <div className="space-y-1">
                <button
                  onClick={() => setAppliancesSectionExpanded(!appliancesSectionExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Home Appliances</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      appliancesSectionExpanded ? "rotate-0" : "-rotate-90"
                    )}
                  />
                </button>
                {appliancesSectionExpanded && appliances.map((appliance) => (
                  <button
                    key={appliance.id}
                    className="w-full text-left px-3 py-2 rounded-lg transition-colors text-sm hover:bg-gray-50 text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 flex-shrink-0 text-gray-500" />
                      <span className="truncate font-medium">{appliance.brand} - {appliance.category}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 truncate">
                      {appliance.modelNumber && `Model: ${appliance.modelNumber}`}
                      {appliance.modelNumber && appliance.serialNumber && " • "}
                      {appliance.serialNumber && `S/N: ${appliance.serialNumber}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spacer to push bottom content down */}
          <div className="flex-1"></div>

          {/* User Info - Bottom */}
          <div className="border-t border-gray-100 p-3 flex-shrink-0">
            {user?.status === "free" ? (
              <div className="pt-5 pb-3 px-3 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user.name}
                    </p>
                    <span className="bg-white px-2 py-0.5 text-xs font-medium rounded-full inline-block mt-1">Free</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-white/50 rounded-lg transition-colors">
                        <EllipsisVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="end" className="w-56">
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
                        <DropdownMenuItem onClick={onLogoutClick}>
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-5">
                  <Button
                    onClick={onUpgradeClick}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-6 py-3 text-xs font-medium flex gap-2 items-center justify-center h-auto"
                  >
                    Upgrade Plan
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9.61054 2.0625L3.58887 10.5264H8.38943L8.38943 15.9375L14.4111 7.47361L9.61054 7.47361V2.0625Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            ) : user?.status === "plus" ? (
              <div className="pt-5 pb-3 px-3 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user.name}
                    </p>
                    <span className="bg-white px-2 py-0.5 text-xs font-medium rounded-full inline-block mt-1">Plus</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-white/50 rounded-lg transition-colors">
                        <EllipsisVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="end" className="w-56">
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
                        <DropdownMenuItem onClick={onLogoutClick}>
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-5">
                  <Button
                    onClick={onUpgradeClick}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-6 py-3 text-xs font-medium flex gap-2 items-center justify-center h-auto"
                  >
                    Upgrade Plan
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9.61054 2.0625L3.58887 10.5264H8.38943L8.38943 15.9375L14.4111 7.47361L9.61054 7.47361V2.0625Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            ) : user?.status === "pro" ? (
              <div className="pt-5 pb-5 px-3 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user.name}
                    </p>
                    <span className="text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-purple-700 px-2 py-0.5 rounded-full inline-block mt-1">Pro</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-white/50 rounded-lg transition-colors">
                        <EllipsisVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="end" className="w-56">
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
                        <DropdownMenuItem onClick={onLogoutClick}>
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <div className="pt-5 pb-3 px-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user ? user.name : "Guest User"}
                    </p>
                    <span className="bg-white px-2 py-0.5 text-xs font-medium rounded-full inline-block mt-1">Guest</span>
                  </div>
                </div>
                <div className="mt-5">
                  <Button
                    onClick={onSignUpClick}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-6 py-3 text-xs font-medium flex gap-2 items-center justify-center h-auto"
                  >
                    Sign up for free
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9.61054 2.0625L3.58887 10.5264H8.38943L8.38943 15.9375L14.4111 7.47361L9.61054 7.47361V2.0625Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Delete Job Modal */}
      <DeleteJobModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setJobToDelete(null);
        }}
        onConfirm={() => {
          if (jobToDelete && onJobDelete) {
            onJobDelete(jobToDelete.id);
          }
        }}
        jobTitle={jobToDelete?.title || ""}
      />
    </>
  );
}
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Sidebar, Job } from "./components/Sidebar";
import { ChatWindow } from "./components/ChatWindow";
import { EmptyState } from "./components/EmptyState";
import { GuestUserBanner } from "./components/GuestUserBanner";
import { InputArea } from "./components/InputArea";
import { ChatMessageData } from "./components/ChatMessage";
import { Toaster } from "./components/ui/sonner";
import { ApplianceModel } from "./components/ApplianceModelModal";
import { ShareDialog } from "./components/ShareDialog";
import { RenameDialog } from "./components/RenameDialog";
import { HelpWidget } from "./components/HelpWidget";
import { UpgradeModal } from "./components/UpgradeModal";
import { AccountDashboard } from "./components/AccountDashboard";
import { HelpFAQPage } from "./components/HelpFAQPage";
import { LoginDialog } from "./components/LoginDialog";
import { toast } from "sonner";

export interface SavedAppliance {
  id: string;
  modelNumber: string;
  brand: string;
  productName: string;
  serialNumber: string;
  category: string;
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Remove sidebarCollapsed state as sidebar will always be visible on desktop
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeJobId, setActiveJobId] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<ChatMessageData[]>(
    [],
  );
  const [jobMessages, setJobMessages] = useState<
    Record<string, ChatMessageData[]>
  >({});
  const [credits, setCredits] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [savedAppliances, setSavedAppliances] = useState<
    SavedAppliance[]
  >([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] =
    useState(false);
  const [selectedJobForAction, setSelectedJobForAction] =
    useState<Job | null>(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"chat" | "account" | "help">("chat");
  const [helpSection, setHelpSection] = useState<"faq" | "guides" | "contact" | "about" | "privacy">("faq");
  const [guestTryMode, setGuestTryMode] = useState(false);
  const maxCredits = 50;

  // Save messages to jobMessages whenever they change
  useEffect(() => {
    if (activeJobId && messages.length > 0) {
      setJobMessages((prev) => ({
        ...prev,
        [activeJobId]: messages,
      }));
    }
  }, [messages, activeJobId]);

  const handleNewJob = () => {
    // If there's an active job with no messages, don't create a new one
    // Just keep the current empty job active
    if (activeJobId && messages.length === 0) {
      setSidebarOpen(false);
      return;
    }

    const newJob: Job = {
      id: Date.now().toString(),
      title: "New Job",
      timestamp: new Date(),
    };
    setJobs([newJob, ...jobs]);
    setActiveJobId(newJob.id);
    setMessages([]);
    setSidebarOpen(false);
  };

  const handleJobSelect = (jobId: string) => {
    setActiveJobId(jobId);
    setSidebarOpen(false);
    // In a real app, load messages for this job
    setMessages(jobMessages[jobId] || []);
  };

  const handleSubmit = (
    input: string,
    image?: File,
    jobType?: string,
    applianceDetails?: {
      model: ApplianceModel;
      serialNumber: string;
    },
  ) => {
    // Save appliance to the sidebar if it's a Home Appliance job
    if (applianceDetails && jobType === "Home Appliances") {
      const newAppliance: SavedAppliance = {
        id: Date.now().toString(),
        modelNumber: applianceDetails.model.modelNumber,
        brand: applianceDetails.model.brand,
        productName: applianceDetails.model.productName,
        serialNumber: applianceDetails.serialNumber,
        category: applianceDetails.model.category,
      };

      // Check if appliance already exists
      // If model number exists, check both model and serial
      // If no model number, use a combination of brand and product type
      const exists = savedAppliances.some((a) => {
        if (newAppliance.modelNumber && a.modelNumber) {
          // Both have model numbers - compare model and serial
          return (
            a.modelNumber === newAppliance.modelNumber &&
            a.serialNumber === newAppliance.serialNumber
          );
        } else if (!newAppliance.modelNumber && !a.modelNumber) {
          // Neither has model number - compare brand, product name, and serial
          return (
            a.brand === newAppliance.brand &&
            a.productName === newAppliance.productName &&
            a.serialNumber === newAppliance.serialNumber
          );
        }
        return false;
      });

      if (!exists) {
        setSavedAppliances([...savedAppliances, newAppliance]);
      }
    }

    // Create user message with separate fields (not concatenated)
    const userMessage: ChatMessageData = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      imageFile: image,
      jobType: jobType,
      applianceDetails: applianceDetails
        ? {
            brand: applianceDetails.model.brand,
            modelNumber: applianceDetails.model.modelNumber,
            productName: applianceDetails.model.productName,
            serialNumber: applianceDetails.serialNumber,
          }
        : undefined,
    };

    // Update job title if it's the first message
    if (messages.length === 0 && activeJobId) {
      setJobs(
        jobs.map((job) =>
          job.id === activeJobId
            ? { ...job, title: generateJobSummary(input), jobType }
            : job,
        ),
      );
    }

    // If no active job, create one automatically
    if (!activeJobId) {
      const newJob: Job = {
        id: Date.now().toString(),
        title: generateJobSummary(input),
        timestamp: new Date(),
        jobType,
      };
      setJobs([newJob, ...jobs]);
      setActiveJobId(newJob.id);
    }

    // Add user message
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(
        input,
        applianceDetails,
      );
      setMessages((prev) => [...prev, aiResponse]);
      setCredits((prev) => Math.max(0, prev - 1));
      setIsLoading(false);
    }, 1000);
  };

  const handleRegenerate = (messageId: string) => {
    const messageIndex = messages.findIndex(
      (m) => m.id === messageId,
    );
    if (messageIndex > 0) {
      const previousUserMessage = messages[messageIndex - 1];
      if (previousUserMessage.role === "user") {
        // Remove the AI message and regenerate
        const newMessages = messages.slice(0, messageIndex);
        setMessages(newMessages);

        setTimeout(() => {
          const aiResponse = generateAIResponse(
            previousUserMessage.content,
          );
          setMessages((prev) => [...prev, aiResponse]);
        }, 1000);
      }
    }
  };

  const handleJobShare = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJobForAction(job);
      setShareDialogOpen(true);
    }
  };

  const handleJobRename = (
    jobId: string,
    currentTitle: string,
  ) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJobForAction(job);
      setRenameDialogOpen(true);
    }
  };

  const handleRenameSubmit = (newTitle: string) => {
    if (selectedJobForAction) {
      setJobs(
        jobs.map((job) =>
          job.id === selectedJobForAction.id
            ? { ...job, title: newTitle }
            : job,
        ),
      );
      toast.success("Job renamed successfully");
    }
  };

  const handleJobPin = (jobId: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId
          ? { ...job, pinned: !job.pinned }
          : job,
      ),
    );
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      toast.success(job.pinned ? "Job unpinned" : "Job pinned");
    }
  };

  const handleJobDelete = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setJobs(jobs.filter((j) => j.id !== jobId));
      if (activeJobId === jobId) {
        setActiveJobId(null);
        setMessages([]);
      }
      toast.success("Job deleted");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        showMenuButton={currentView === "chat"}
        onProfileClick={() => setCurrentView("account")}
        isSidebarOpen={sidebarOpen}
        onSettingsClick={() => {
          setCurrentView("account");
          toast.info("Opening account settings");
        }}
        onHelpClick={() => {
          setCurrentView("help");
          setHelpSection("faq");
        }}
        onAccountClick={() => {
          setCurrentView("account");
        }}
        onBillingClick={() => {
          setCurrentView("account");
          toast.info("Opening billing section");
        }}
        onLogoutClick={() => {
          toast.success("Logged out successfully");
          // Add logout logic here
        }}
      />

      <div className="flex-1 flex overflow-hidden">
        {currentView === "chat" ? (
          <>
            <Sidebar
              jobs={jobs}
              activeJobId={activeJobId}
              onJobSelect={handleJobSelect}
              onNewJob={handleNewJob}
              onJobRename={handleJobRename}
              onJobPin={handleJobPin}
              onJobDelete={handleJobDelete}
              onJobShare={handleJobShare}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              credits={credits}
              maxCredits={maxCredits}
              appliances={savedAppliances}
              onUpgradeClick={() => setUpgradeModalOpen(true)}
              onSignUpClick={() => setLoginDialogOpen(true)}
              onProfileClick={() => setCurrentView("account")}
              onSettingsClick={() => {
                setCurrentView("account");
                toast.info("Opening account settings");
              }}
              onHelpClick={() => {
                setCurrentView("help");
                setHelpSection("faq");
              }}
              onSearchClick={() => {
                toast.info("Search feature coming soon!");
              }}
              onAccountClick={() => {
                setCurrentView("account");
              }}
              onBillingClick={() => {
                setCurrentView("account");
                toast.info("Opening billing section");
              }}
              onNotificationsClick={() => {
                toast.info("Notifications feature coming soon!");
              }}
              onLogoutClick={() => {
                toast.success("Logged out successfully");
                // Add logout logic here
              }}
            />

            <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col overflow-y-auto">
                  {/* Show GuestUserBanner for guest users, then EmptyState for everyone */}
                  {(!user || user.status === "user") && (
                    <GuestUserBanner 
                      onSignUpClick={() => setLoginDialogOpen(true)} 
                      onUpgradeClick={() => setUpgradeModalOpen(true)}
                      onTryFree={() => setGuestTryMode(true)}
                    />
                  )}
                  <div className="flex-1 flex items-center justify-center px-4 py-8">
                    <div className="w-full max-w-3xl">
                      <EmptyState
                        onSubmit={handleSubmit}
                        disabled={credits <= 0 || isLoading}
                        onOpenTerms={(section) => {
                          setCurrentView("help");
                          setHelpSection("privacy");
                          // Scroll to the specific section after navigation
                          setTimeout(() => {
                            const element = document.getElementById(section);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 100);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <ChatWindow
                    messages={messages}
                    onRegenerate={handleRegenerate}
                    isLoading={isLoading}
                    onOpenTerms={() => {
                      setCurrentView("help");
                      setHelpSection("privacy");
                    }}
                    onShare={() => {
                      if (activeJobId) {
                        handleJobShare(activeJobId);
                      }
                    }}
                    isGuestUser={!user || user.status === "user"}
                    onUpgradeClick={() => setUpgradeModalOpen(true)}
                  />
                  <InputArea
                    onSubmit={handleSubmit}
                    disabled={credits <= 0 || isLoading}
                    onOpenTerms={(section) => {
                      setHelpSection(section === "terms" ? "privacy" : "privacy");
                    }}
                  />
                </>
              )}
            </main>
          </>
        ) : currentView === "account" ? (
          <AccountDashboard
            onBackToChat={() => setCurrentView("chat")}
            onUpgradeClick={() => {
              setCurrentView("chat");
              setUpgradeModalOpen(true);
            }}
          />
        ) : (
          <HelpFAQPage 
            onBackToChat={() => setCurrentView("chat")} 
            initialSection={helpSection}
          />
        )}
      </div>

      {/* Dialogs */}
      {selectedJobForAction && (
        <>
          <ShareDialog
            isOpen={shareDialogOpen}
            onClose={() => setShareDialogOpen(false)}
            jobTitle={selectedJobForAction.title}
            jobId={selectedJobForAction.id}
          />
          <RenameDialog
            isOpen={renameDialogOpen}
            onClose={() => setRenameDialogOpen(false)}
            currentTitle={selectedJobForAction.title}
            onRename={handleRenameSubmit}
          />
        </>
      )}

      <Toaster position="top-center" />
      <HelpWidget 
        onNavigateToHelp={(section) => {
          setHelpSection(section);
          setCurrentView("help");
        }} 
      />
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        currentPlan={user && user.status !== "user" ? user.status : "guest"}
      />
      <LoginDialog
        isOpen={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </div>
  );
}

// Helper function to generate a smart summary title (max 35 characters)
function generateJobSummary(text: string): string {
  // Remove extra whitespace and trim
  const cleaned = text.trim().replace(/\s+/g, ' ');
  
  if (cleaned.length <= 30) {
    return cleaned;
  }
  
  // Try to truncate at a word boundary within 30 characters
  const truncated = cleaned.substring(0, 30);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If there's a space and it's not too early in the string, cut there
  if (lastSpaceIndex > 20) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  // Otherwise, just cut at 27 chars and add "..."
  return cleaned.substring(0, 27) + '...';
}

// Mock AI response generator
function generateAIResponse(
  userInput: string,
  applianceDetails?: {
    model: ApplianceModel;
    serialNumber: string;
  },
): ChatMessageData {
  const responses = {
    faucet: {
      content:
        "I'd be happy to help you fix that leaky faucet! First, let me ask a few questions to make sure we tackle this correctly:\n\nIs the leak coming from the spout when the faucet is off, or is it leaking from the base/handle area? Also, what type of faucet do you have - is it a compression faucet (with separate hot and cold handles), a ball-type, cartridge, or ceramic disk faucet?\n\nFor now, I'll guide you through fixing the most common issue - a dripping spout caused by worn washers or O-rings. This is a straightforward fix that most homeowners can handle in about 30-45 minutes. The key is turning off the water supply first and keeping track of the parts as you disassemble the faucet.\n\nBefore we start, do you have a bucket and some towels handy? You'll want to protect your sink and catch any water that might drip out.",
      steps: [
        {
          title: "Safety First - Prepare Your Workspace",
          description:
            "Before starting any plumbing work, ensure you have proper safety gear including gloves and safety glasses. Clear the area under the sink and lay down towels to protect surfaces. Make sure you know where your main water shut-off is in case of emergency. Never proceed if you're unsure about any step - consult a licensed professional when in doubt.",
          imageUrl:
            "https://images.unsplash.com/photo-1581166418878-11f0dde922c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHBhcnRzJTIwdG9vbHN8ZW58MXx8fHwxNzY2MDU3NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          title: "Turn off the water supply",
          description:
            "Locate the shut-off valves under the sink and turn them clockwise to stop water flow. Then open the faucet to drain any remaining water. If you can't find shut-off valves under the sink, you may need to turn off the main water supply to your home.",
          imageUrl:
            "https://images.unsplash.com/photo-1581720604719-ee1b1a4e44b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHNodXQlMjBvZmYlMjB2YWx2ZXxlbnwxfHx8fDE3NjYwNTc2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          title: "Remove the faucet handle",
          description:
            "Use a screwdriver to remove the decorative cap (usually marked 'H' or 'C'). Unscrew the handle screw underneath and gently pull the handle off to expose the valve stem. If it's stuck, try wiggling it gently or use a handle puller tool.",
          imageUrl:
            "https://images.unsplash.com/photo-1606619523891-baaf3c312e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXVjZXQlMjBoYW5kbGUlMjByZW1vdmFsfGVufDF8fHx8MTc2NjA1NzY0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          title: "Replace the O-ring and washer",
          description:
            "Remove the old O-ring and washer from the valve stem. Take them to a hardware store to find exact replacements - size matters! Apply a thin coat of plumber's grease to the new O-ring before installation to ensure a good seal.",
          imageUrl:
            "https://images.unsplash.com/photo-1581166418878-11f0dde922c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHBhcnRzJTIwdG9vbHN8ZW58MXx8fHwxNzY2MDU3NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          title: "Reassemble and test",
          description:
            "Put the faucet back together in reverse order, making sure everything is hand-tight (don't over-tighten!). Turn the water supply back on slowly and check for leaks. Let it run for a minute, then turn it off and wait to see if the drip returns.",
          imageUrl:
            "https://images.unsplash.com/photo-1662405964427-0e5e4c483a7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5rJTIwZmF1Y2V0JTIwcmVwYWlyfGVufDF8fHx8MTc2NjA1NzY0MHww&ixlib=rb-4.1.0&q=80&w=1080",
        },
      ],
      materials: [
        {
          name: "Replacement O-rings",
          quantity: "2-3 assorted sizes",
          link: "https://www.homedepot.com",
        },
        {
          name: "Replacement washers",
          quantity: "2-3 assorted sizes",
          link: "https://www.homedepot.com",
        },
        {
          name: "Plumber's grease",
          quantity: "1 tube",
          link: "https://www.homedepot.com",
        },
        {
          name: "Teflon tape",
          quantity: "1 roll",
          link: "https://www.homedepot.com",
        },
      ],
      tools: [
        {
          name: "Adjustable wrench",
          link: "https://www.homedepot.com",
        },
        {
          name: "Phillips screwdriver",
          link: "https://www.homedepot.com",
        },
        {
          name: "Flathead screwdriver",
          link: "https://www.homedepot.com",
        },
        { name: "Towel or rag" },
        { name: "Bucket" },
        {
          name: "Safety glasses",
          link: "https://www.homedepot.com",
        },
      ],
    },
    fan: {
      content:
        "Installing a ceiling fan is a great DIY project! I'll guide you through the process safely. First, make sure you have the right electrical box rated for ceiling fans (it should support at least 50 lbs).",
      steps: [
        {
          title: "Turn off power at the breaker",
          description:
            "Safety first! Turn off the circuit breaker for the room where you'll be working. Use a voltage tester to confirm power is off.",
        },
        {
          title:
            "Remove old fixture and install mounting bracket",
          description:
            "Take down the existing light fixture. Install the ceiling fan mounting bracket according to the manufacturer's instructions.",
        },
        {
          title: "Wire the ceiling fan",
          description:
            "Connect the wires: black to black (hot), white to white (neutral), green or bare copper to ground. Use wire nuts and electrical tape.",
        },
        {
          title: "Attach the fan and test",
          description:
            "Mount the fan motor to the bracket, attach the blades, and install the light kit if included. Turn power back on and test all functions.",
        },
      ],
      materials: [
        { name: "Ceiling fan kit", quantity: "1" },
        { name: "Wire nuts", quantity: "4-6" },
        { name: "Electrical tape", quantity: "1 roll" },
      ],
      tools: [
        "Voltage tester",
        "Wire strippers",
        "Phillips screwdriver",
        "Ladder",
        "Adjustable wrench",
      ],
    },
    drywall: {
      content:
        "Patching a hole in drywall is easier than you think! The method depends on the hole size. For small holes (less than 1 inch), you can use spackling paste. For larger holes, you'll need a patch.",
      steps: [
        {
          title: "Clean the area and cut a square",
          description:
            "Remove any loose debris around the hole. For holes larger than 1 inch, use a drywall saw to cut a clean square or rectangle around the damage.",
        },
        {
          title: "Install backing support",
          description:
            "Cut a piece of wood slightly longer than the hole. Insert it through the hole and secure it with drywall screws on both sides.",
        },
        {
          title: "Cut and attach patch",
          description:
            "Cut a drywall patch to fit the hole. Screw it into the backing board. The patch should be flush with the surrounding wall.",
        },
        {
          title: "Apply joint compound and sand",
          description:
            "Apply joint compound over the patch and mesh tape. Let it dry, then sand smooth. Apply 2-3 coats, sanding between each. Prime and paint to match.",
        },
      ],
      materials: [
        { name: "Drywall patch piece", quantity: "1" },
        { name: "Joint compound", quantity: "1 container" },
        { name: "Mesh tape", quantity: "1 roll" },
        {
          name: "Sandpaper (120 and 220 grit)",
          quantity: "assorted",
        },
        { name: "Primer and paint", quantity: "as needed" },
      ],
      tools: [
        "Drywall saw",
        "Putty knife (4-inch and 6-inch)",
        "Drill/driver",
        "Sanding block",
      ],
    },
    appliance: {
      content: applianceDetails
        ? `Great! I can help you with your ${applianceDetails.model.brand} ${applianceDetails.model.productName} (Model: ${applianceDetails.model.modelNumber}). Having the model number helps me provide specific guidance for your appliance.\n\nWhat seems to be the problem you're experiencing? Common issues with ${applianceDetails.model.category.toLowerCase()}s include:\n- Not turning on or no power\n- Unusual noises\n- Poor performance\n- Error codes or lights\n- Leaking (if applicable)\n\nLet me know the specific issue, and I'll walk you through troubleshooting and repair steps tailored to your model.`
        : "I can help you with your home appliance! To provide the most accurate guidance, it would be helpful to know:\n\n- What type of appliance (refrigerator, washer, dryer, etc.)?\n- What's the specific problem you're experiencing?\n- When did it start happening?\n\nWith this information, I can give you targeted troubleshooting steps and solutions.",
      steps: [
        {
          title: "Safety First - Unplug the Appliance",
          description:
            "Before starting any repair work, ensure you have proper safety gear including gloves and safety glasses. Always unplug the appliance from the power outlet or turn off the circuit breaker. For gas appliances, turn off the gas supply. Never proceed if you're unsure about any step - consult a licensed professional when in doubt.",
        },
        {
          title: "Identify the problem",
          description:
            "Carefully observe the symptoms. Check for error codes in the manual, unusual sounds, or visible damage.",
        },
        {
          title: "Check basic issues first",
          description:
            "Verify power supply, check if filters need cleaning, ensure doors/lids close properly, and look for any obvious obstructions.",
        },
        {
          title: "Consult the manual",
          description:
            "Review your appliance manual's troubleshooting section for model-specific guidance and part numbers.",
        },
      ],
      materials: [
        {
          name: "Replacement parts (as needed)",
          quantity: "varies",
        },
        { name: "Cleaning supplies", quantity: "as needed" },
      ],
      tools: [
        "Screwdriver set",
        "Multimeter (for electrical issues)",
        "Flashlight",
        "Cleaning brushes",
      ],
    },
    default: {
      content:
        "Great question! I can help you with that DIY project. Let me provide you with some general guidance to get started. For more specific help, feel free to provide additional details about your project.",
      steps: [
        {
          title: "Assess the situation",
          description:
            "Take a close look at the area or item you need to work on. Document with photos if helpful.",
        },
        {
          title: "Research and plan",
          description:
            "Look up specific requirements for your project. Check local building codes if applicable.",
        },
        {
          title: "Gather materials and tools",
          description:
            "Make a comprehensive list of everything you'll need before starting the project.",
        },
        {
          title: "Execute carefully",
          description:
            "Follow instructions step by step. Don't rush, and ask for help if needed.",
        },
      ],
      materials: [
        {
          name: "Project-specific materials",
          quantity: "as needed",
        },
      ],
      tools: ["Basic hand tools", "Safety equipment"],
    },
  };

  // Determine which response to use based on input
  let selectedResponse = responses.default;
  const lowerInput = userInput.toLowerCase();

  if (applianceDetails || lowerInput.includes("appliance")) {
    selectedResponse = responses.appliance;
  } else if (
    lowerInput.includes("faucet") ||
    lowerInput.includes("leak")
  ) {
    selectedResponse = responses.faucet;
  } else if (
    lowerInput.includes("fan") ||
    lowerInput.includes("ceiling")
  ) {
    selectedResponse = responses.fan;
  } else if (
    lowerInput.includes("drywall") ||
    lowerInput.includes("hole") ||
    lowerInput.includes("wall") ||
    lowerInput.includes("patch")
  ) {
    selectedResponse = responses.drywall;
  }

  return {
    id: Date.now().toString(),
    role: "assistant",
    content: selectedResponse.content,
    timestamp: new Date(),
    steps: selectedResponse.steps,
    materials: selectedResponse.materials,
    tools: selectedResponse.tools,
  };
}
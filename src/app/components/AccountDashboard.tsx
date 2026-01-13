import { User, CreditCard, Download, Edit, ChevronRight, ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { EditAccountInfoModal } from "./EditAccountInfoModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import bannerImage from "figma:asset/750698acde75d713c4811ae9a9ed807c76cfc619.png";

interface AccountDashboardProps {
  onBackToChat: () => void;
  onUpgradeClick: () => void;
}

type MenuSection = "profile" | "billing";

export function AccountDashboard({
  onBackToChat,
  onUpgradeClick,
}: AccountDashboardProps) {
  const [activeSection, setActiveSection] = useState<MenuSection>("profile");
  const [editAccountInfoOpen, setEditAccountInfoOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Mock billing data
  const billingHistory = [
    { id: 1, package: "Plus plan - Annually", amount: "$240", date: "15 Jan, 2028" },
    { id: 2, package: "Pro plan - Annually", amount: "$240", date: "15 Jan, 2028" },
    { id: 3, package: "Enterprise - Monthly", amount: "$999", date: "15 Jan, 2028" },
  ];

  const currentPlan = {
    package: user?.status === "free" ? "Free plan" : `${user?.status} plan - Annually`,
    amount: user?.status === "free" ? "$0" : user?.status === "plus" ? "$240" : "$480",
    purchasedOn: "15 Jan, 2028",
    status: "Active",
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 p-6 flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Back to Chat Button */}
        <Button
          variant="ghost"
          onClick={onBackToChat}
          className="w-full justify-start mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Chat
        </Button>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 mb-3 px-3">Main Menu</p>
          <button
            onClick={() => {
              setActiveSection("profile");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeSection === "profile"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <User className="h-4 w-4" />
            Profile and security
          </button>
          <button
            onClick={() => {
              setActiveSection("billing");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeSection === "billing"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Billing & Plans
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Menu Button */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {activeSection === "profile" ? "Profile & Security" : "Billing & Plans"}
          </h1>
        </div>

        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {activeSection === "profile" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="relative bg-gradient-to-r from-purple-500 to-purple-400 rounded-2xl p-6 sm:p-8 overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    Welcome to Homefixi
                  </h2>
                  <p className="text-white/90 mb-4 text-sm sm:text-base">
                    Create Content Smarter, Faster, and Effortlessly with AI Agent.
                  </p>
                  <Button
                    variant="outline"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-lg"
                  >
                    Learn more
                  </Button>
                </div>
                <div className="absolute right-0 top-0 h-full w-32 sm:w-64 opacity-50 sm:opacity-100">
                  <img
                    src={bannerImage}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* My Profile */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h3>
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                    <h4 className="font-semibold text-gray-900">Personal Information</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 self-start sm:self-auto"
                      onClick={() => setEditAccountInfoOpen(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">First Name</label>
                      <p className="text-gray-900">{user?.name?.split(" ")[0] || "John"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Last Name</label>
                      <p className="text-gray-900">{user?.name?.split(" ")[1] || "Doe"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm text-gray-600 mb-1 block">Email address</label>
                      <p className="text-gray-900 break-all">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Security</h3>
                <div className="space-y-4">
                  {/* Two Factor Authentication */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">Two factor authentication</h4>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                            Enabled
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Two-factor authentication adds an additional layer of security to your account by
                          requiring more than just a password to log in.
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto whitespace-nowrap">
                        Disable Two-factor authentication
                      </Button>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h4 className="font-semibold text-gray-900">Change your Password</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 self-start sm:self-auto"
                        onClick={() => setChangePasswordOpen(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "billing" && (
            <div className="space-y-6">
              {/* Billings */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Billings</h3>
                <p className="text-sm text-gray-600 mb-4">Invoices & payments informations</p>
                
                {/* Desktop Table */}
                <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Package</th>
                        <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Amount</th>
                        <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Purchased On</th>
                        <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {billingHistory.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 text-gray-900">{item.package}</td>
                          <td className="px-6 py-4 text-gray-900">{item.amount}</td>
                          <td className="px-6 py-4 text-gray-600">{item.date}</td>
                          <td className="px-6 py-4">
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {billingHistory.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">Package</label>
                          <p className="text-gray-900 font-medium">{item.package}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Amount</label>
                            <p className="text-gray-900">{item.amount}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Purchased On</label>
                            <p className="text-gray-600">{item.date}</p>
                          </div>
                        </div>
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Plan */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Current Plan</h3>
                <p className="text-sm text-gray-600 mb-4">Here is your activated current plan</p>
                
                {/* Desktop Table */}
                <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Package</th>
                        <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Amount</th>
                        <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Purchased On</th>
                        <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 text-gray-900">{currentPlan.package}</td>
                        <td className="px-6 py-4 text-gray-900">{currentPlan.amount}</td>
                        <td className="px-6 py-4 text-gray-600">{currentPlan.purchasedOn}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                            {currentPlan.status}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                    <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Cancel Subscription
                    </Button>
                    <Button
                      onClick={() => {
                        onBackToChat();
                        onUpgradeClick();
                      }}
                      className="bg-purple-600 text-white hover:bg-purple-700 rounded-lg"
                    >
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Upgrade Plan
                    </Button>
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-4 space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Package</label>
                      <p className="text-gray-900 font-medium">{currentPlan.package}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Amount</label>
                        <p className="text-gray-900">{currentPlan.amount}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Purchased On</label>
                        <p className="text-gray-600">{currentPlan.purchasedOn}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Status</label>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        {currentPlan.status}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-gray-200 flex flex-col gap-2">
                    <Button
                      onClick={() => {
                        onBackToChat();
                        onUpgradeClick();
                      }}
                      className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-lg"
                    >
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Upgrade Plan
                    </Button>
                    <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <EditAccountInfoModal
        isOpen={editAccountInfoOpen}
        onClose={() => setEditAccountInfoOpen(false)}
      />
      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </div>
  );
}
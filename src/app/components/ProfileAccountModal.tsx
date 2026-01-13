import { X, User, CreditCard, Download, Edit, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import bannerImage from "figma:asset/750698acde75d713c4811ae9a9ed807c76cfc619.png";

interface ProfileAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeClick: () => void;
}

type MenuSection = "profile" | "billing";

export function ProfileAccountModal({
  isOpen,
  onClose,
  onUpgradeClick,
}: ProfileAccountModalProps) {
  const [activeSection, setActiveSection] = useState<MenuSection>("profile");
  const { user } = useAuth();

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex-shrink-0">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 mb-3 px-3">Main Menu</p>
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeSection === "profile"
                  ? "bg-white text-gray-900 font-medium shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User className="h-4 w-4" />
              Profile and security
            </button>
            <button
              onClick={() => setActiveSection("billing")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeSection === "billing"
                  ? "bg-white text-gray-900 font-medium shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Billing & Plans
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8">
            {activeSection === "profile" && (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <div className="relative bg-gradient-to-r from-purple-500 to-purple-400 rounded-2xl p-8 overflow-hidden">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/80 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                      Welcome to Homefixi
                    </h2>
                    <p className="text-white/90 mb-4">
                      Create Content Smarter, Faster, and Effortlessly with AI Agent.
                    </p>
                    <Button
                      variant="outline"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-lg"
                    >
                      Learn more
                    </Button>
                  </div>
                  <div className="absolute right-0 top-0 h-full w-64">
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
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-semibold text-gray-900">Personal Information</h4>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">First Name</label>
                        <p className="text-gray-900">{user?.name?.split(" ")[0] || "John"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Last Name</label>
                        <p className="text-gray-900">{user?.name?.split(" ")[1] || "Doe"}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm text-gray-600 mb-1 block">Email address</label>
                        <p className="text-gray-900">{user?.email || "user@example.com"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Security</h3>
                  <div className="space-y-4">
                    {/* Two Factor Authentication */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
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
                        <Button variant="outline" size="sm" className="ml-4">
                          Disable Two-factor authentication
                        </Button>
                      </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">Change your Password</h4>
                        <Button variant="ghost" size="sm" className="text-gray-600">
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
                  
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
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
                </div>

                {/* Current Plan */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Current Plan</h3>
                  <p className="text-sm text-gray-600 mb-4">Here is your activated current plan</p>
                  
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
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
                          onClose();
                          onUpgradeClick();
                        }}
                        className="bg-purple-600 text-white hover:bg-purple-700 rounded-lg"
                      >
                        <ChevronRight className="h-4 w-4 mr-1" />
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

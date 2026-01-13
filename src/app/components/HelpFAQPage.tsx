import { ArrowLeft, HelpCircle, Book, MessageCircle, Phone, ChevronDown, Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface HelpFAQPageProps {
  onBackToChat: () => void;
  initialSection?: "faq" | "guides" | "contact" | "about" | "privacy";
}

type MenuSection = "faq" | "guides" | "contact" | "about" | "privacy";

export function HelpFAQPage({ onBackToChat, initialSection = "faq" }: HelpFAQPageProps) {
  const [activeSection, setActiveSection] = useState<MenuSection>(initialSection);
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [termsOpen, setTermsOpen] = useState<boolean>(true);
  const [privacyOpen, setPrivacyOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const faqs = [
    {
      question: "How does Homefixi work?",
      answer: "Homefixi uses AI to provide step-by-step guidance for your DIY home improvement projects. Simply describe your project or upload an image, and our AI will guide you through the process with detailed instructions, material lists, and visual guides.",
    },
    {
      question: "What types of projects can Homefixi help with?",
      answer: "Homefixi can assist with a wide range of home improvement tasks including plumbing repairs, electrical work, painting, drywall repair, appliance troubleshooting, furniture assembly, and much more.",
    },
    {
      question: "How do credits work?",
      answer: "Each AI response consumes one credit. Free users get 50 credits, Plus members get 500 credits per month, and Pro members get unlimited credits. Credits reset at the beginning of each billing cycle.",
    },
    {
      question: "Can I save my projects?",
      answer: "Yes! All your conversations are automatically saved as 'Jobs' in the sidebar. You can access, rename, and organize them anytime.",
    },
    {
      question: "Is the advice provided by Homefixi safe?",
      answer: "While Homefixi provides helpful guidance, always exercise caution when working on home improvement projects. For complex electrical, plumbing, or structural work, we recommend consulting with licensed professionals.",
    },
    {
      question: "Can I use voice input?",
      answer: "Yes! Click the microphone icon in the input area to use voice input for your questions.",
    },
    {
      question: "How do I upgrade my plan?",
      answer: "Click on your profile in the sidebar or header, navigate to Billing & Plans, and click 'Upgrade Plan' to see available membership options.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from the Billing & Plans section in your account dashboard. Your access will continue until the end of your billing period.",
    },
  ];

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
          <p className="text-xs font-semibold text-gray-500 mb-3 px-3">Help Center</p>
          <button
            onClick={() => {
              setActiveSection("faq");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeSection === "faq"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            FAQ
          </button>
          <button
            onClick={() => {
              setActiveSection("guides");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeSection === "guides"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Book className="h-4 w-4" />
            Help
          </button>
          <button
            onClick={() => {
              setActiveSection("contact");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeSection === "contact"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            Contact Support
          </button>
          <button
            onClick={() => {
              setActiveSection("about");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeSection === "about"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Phone className="h-4 w-4" />
            About Homefixi
          </button>
          <button
            onClick={() => {
              setActiveSection("privacy");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeSection === "privacy"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Shield className="h-4 w-4" />
            Terms & Privacy
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
            {activeSection === "faq" && "FAQ"}
            {activeSection === "guides" && "Help"}
            {activeSection === "contact" && "Contact Support"}
            {activeSection === "about" && "About"}
            {activeSection === "privacy" && "Terms & Privacy"}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {activeSection === "faq" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mb-8">
                  Find answers to common questions about using Homefixi.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 text-left">{faq.question}</h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
                          openFaqIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "guides" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Getting Started with Homefixi
                </h2>
                <p className="text-gray-600 mb-8">
                  Learn how to make the most of your Homefixi experience.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Create Your First Job</h3>
                  <p className="text-gray-600 mb-4">
                    Click the "New Job" button in the sidebar or start typing your question in the input area.
                    Describe your home improvement project in detail for the best results.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                    <li>Use clear, specific descriptions</li>
                    <li>Include relevant details like materials and measurements</li>
                    <li>Upload images for visual context</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Choose Your Job Type</h3>
                  <p className="text-gray-600 mb-4">
                    Select from various job categories to get specialized assistance:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                    <li>Home Appliances - Get help with appliance repairs and troubleshooting</li>
                    <li>Plumbing - Fix leaks, install fixtures, and more</li>
                    <li>Electrical - Handle basic electrical repairs safely</li>
                    <li>Painting & Drywall - Learn proper techniques for finishing work</li>
                    <li>General DIY - Any other home improvement project</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Follow AI Guidance</h3>
                  <p className="text-gray-600 mb-4">
                    Our AI will provide you with:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                    <li>Step-by-step instructions tailored to your project</li>
                    <li>Visual guides (click "Visual Guide" button to generate)</li>
                    <li>Complete materials and tools list</li>
                    <li>Helpful video resources</li>
                    <li>Safety warnings and best practices</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Save and Organize Projects</h3>
                  <p className="text-gray-600">
                    All your conversations are automatically saved. Use the three-dot menu next to each job to
                    rename, pin, share, or delete projects. Pinned jobs stay at the top of your sidebar for
                    easy access.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Contact Support
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Have questions or need assistance? We're here to help! Reach out to our support team and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Describe your issue or question..."
                    />
                  </div>

                  <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-xl px-8 py-6 text-base">
                    Send Message
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Email Support</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Get help via email
                  </p>
                  <p className="text-purple-600 font-medium">support@homefixi.com</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Mon-Fri, 9AM-6PM EST
                  </p>
                  <p className="text-purple-600 font-medium">1-800-HOMEFIXI</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "about" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  About Homefixi
                </h2>
                <p className="text-gray-600 mb-8">
                  Your AI-powered DIY assistant for home improvement projects.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Homefixi empowers homeowners to tackle DIY projects with confidence. We believe that with
                  the right guidance, anyone can maintain and improve their home. Our AI-powered platform
                  provides step-by-step instructions, visual guides, and expert advice for a wide range of
                  home improvement tasks.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h3>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>AI-powered guidance for thousands of home improvement projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Multi-modal input support (text, voice, and images)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Detailed material lists and tool recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Visual step-by-step guides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Appliance-specific troubleshooting and repairs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Project history and organization tools</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety First</h3>
                <p className="text-gray-600 leading-relaxed">
                  While Homefixi provides comprehensive DIY guidance, we always prioritize safety. For
                  complex electrical, plumbing, or structural work, we recommend consulting with licensed
                  professionals. Always follow local building codes and safety regulations.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-3">Ready to Get Started?</h3>
                <p className="mb-4 text-white/90">
                  Join thousands of homeowners who are successfully completing DIY projects with Homefixi.
                </p>
                <Button
                  onClick={onBackToChat}
                  className="bg-white text-purple-600 hover:bg-gray-100 rounded-xl"
                >
                  Start Your First Project
                </Button>
              </div>
            </div>
          )}

          {activeSection === "privacy" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Terms of Service & Privacy Policy
                </h2>
                <p className="text-gray-600 mb-8">
                  Learn about how we handle your data and our terms of service.
                </p>
              </div>

              {/* Terms & Conditions Section - First */}
              <div id="terms" className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setTermsOpen(!termsOpen)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Terms & Conditions
                  </h2>
                  <ChevronDown 
                    className={`h-6 w-6 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
                      termsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {termsOpen && (
                  <div className="px-8 pb-8 border-t border-gray-200">
                    <div className="pt-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h3>
                        <p className="text-gray-600 leading-relaxed">
                          By accessing and using Homefixi, you accept and agree to be bound by the terms and provision
                          of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Use of Service</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Homefixi provides AI-powered guidance for DIY home improvement projects. By using our service,
                          you agree to:
                        </p>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Provide accurate information when creating your account</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Use the service only for lawful purposes</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Not attempt to gain unauthorized access to any portion of the service</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Not use the service to transmit any harmful or malicious code</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Disclaimer of Warranties</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Homefixi provides DIY guidance "as is" without warranty of any kind. While we strive to
                          provide accurate and helpful information, we do not guarantee the accuracy, completeness,
                          or usefulness of any information provided. You assume all responsibility and risk for the
                          use of this service and the information it provides.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Homefixi and its affiliates shall not be liable for any direct, indirect, incidental,
                          special, or consequential damages resulting from the use or inability to use our service,
                          including damages for loss of profits, data, or other intangible losses. You acknowledge
                          that DIY projects involve inherent risks, and you assume all responsibility for any
                          projects you undertake based on our guidance.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Advice Disclaimer</h3>
                        <p className="text-gray-600 leading-relaxed">
                          The information provided by Homefixi is for general informational purposes only and should
                          not be considered professional advice. For complex electrical, plumbing, structural, or
                          other specialized work, we strongly recommend consulting with licensed professionals.
                          Always follow local building codes and safety regulations.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscription and Billing</h3>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Subscriptions are billed on a recurring basis (monthly or annually)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>You may cancel your subscription at any time</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Refunds are provided on a case-by-case basis within 30 days of purchase</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>We reserve the right to modify pricing with 30 days notice to subscribers</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h3>
                        <p className="text-gray-600 leading-relaxed">
                          All content on Homefixi, including text, graphics, logos, and software, is the property of
                          Homefixi or its licensors and is protected by copyright and intellectual property laws.
                          You may not reproduce, distribute, or create derivative works without our express written
                          permission.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Termination</h3>
                        <p className="text-gray-600 leading-relaxed">
                          We reserve the right to terminate or suspend your account and access to the service at our
                          sole discretion, without notice, for conduct that we believe violates these Terms or is
                          harmful to other users, us, or third parties, or for any other reason.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h3>
                        <p className="text-gray-600 leading-relaxed">
                          We reserve the right to modify these terms at any time. We will notify users of any
                          material changes via email or through the service. Your continued use of Homefixi after
                          such modifications constitutes your acceptance of the updated terms.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <p className="text-gray-600 leading-relaxed">
                          For questions about these Terms & Conditions, please contact us at{" "}
                          <a href="mailto:legal@homefixi.com" className="text-purple-600 font-medium">legal@homefixi.com</a>.
                        </p>
                      </div>

                      <p className="text-sm text-gray-500 pt-6 border-t border-gray-200">
                        Last updated: January 12, 2026
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Privacy Policy Section - Second */}
              <div id="privacy" className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setPrivacyOpen(!privacyOpen)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Privacy Policy
                  </h2>
                  <ChevronDown 
                    className={`h-6 w-6 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
                      privacyOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {privacyOpen && (
                  <div className="px-8 pb-8 border-t border-gray-200">
                    <div className="pt-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Homefixi is committed to protecting the privacy of our users. This Privacy Policy outlines
                          the types of information we collect, how we use it, and the measures we take to protect
                          your privacy.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h3>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Personal Information: Name, email address, and phone number</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Usage Data: How you interact with our platform, including project descriptions and images</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Payment Information: Credit card details (processed securely by third-party providers)</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h3>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Provide and improve our services</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Communicate with you about your projects and account</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Process payments and manage subscriptions</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Send you updates, promotional materials, and service announcements</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h3>
                        <p className="text-gray-600 leading-relaxed">
                          We implement a variety of security measures to protect your information, including
                          encryption, secure servers, and regular security audits. However, no method of transmission
                          over the internet or electronic storage is 100% secure, and we cannot guarantee absolute
                          security.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h3>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Access your personal data</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Correct or update your personal data</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Delete your personal data</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Opt-out of marketing communications</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
                        <p className="text-gray-600 leading-relaxed">
                          If you have any questions about this Privacy Policy or our data practices, please contact
                          us at <a href="mailto:privacy@homefixi.com" className="text-purple-600 font-medium">privacy@homefixi.com</a>.
                        </p>
                      </div>

                      <p className="text-sm text-gray-500 pt-6 border-t border-gray-200">
                        Last updated: January 12, 2026
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
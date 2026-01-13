import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleGoogleLogin = () => {
    // Handle Google OAuth login
    console.log("Google login clicked");
  };

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Continue with email:", email);
      setStep("password");
    }
  };

  const handlePasswordContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() && agreedToTerms) {
      console.log("Create account with:", { email, password });
      // Handle account creation
      onClose();
    }
  };

  const handleEditEmail = () => {
    setStep("email");
  };

  const handleOpenTerms = () => {
    // Navigate to terms page
    console.log("Open terms");
  };

  const handleOpenPrivacy = () => {
    // Navigate to privacy page
    console.log("Open privacy");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0">
        {/* Hidden accessibility elements */}
        <DialogTitle className="sr-only">{step === "email" ? "Log in or sign up" : "Create a password"}</DialogTitle>
        <DialogDescription className="sr-only">
          {step === "email" ? "Create an account or sign in to get smarter responses" : "Create a password for your account"}
        </DialogDescription>

        {/* Content */}
        <div className="p-8 pt-12">
          {step === "email" ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                  Log in or sign up
                </h2>
                <p className="text-gray-600">
                  You'll get smarter responses and can upload files, images, and more.
                </p>
              </div>

              {/* Google button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors mb-4"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z" fill="#4285F4"/>
                  <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
                  <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                  <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
                </svg>
                <span className="text-gray-900 font-medium">Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Email form */}
              <form onSubmit={handleEmailContinue} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-auto px-4 py-3.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />

                <Button
                  type="submit"
                  className="w-full h-auto bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-full font-medium"
                >
                  Continue
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Password Step Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                  Create a password
                </h2>
                <p className="text-gray-600">
                  You'll use this password to log in to Homefixi
                </p>
              </div>

              <form onSubmit={handlePasswordContinue} className="space-y-6">
                {/* Email field (read-only with Edit button) */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Email address</label>
                  <div className="relative">
                    <Input
                      type="email"
                      value={email}
                      disabled
                      className="w-full h-auto px-4 py-3.5 border border-gray-300 rounded-full bg-gray-50 text-gray-900 pr-14"
                    />
                    <button
                      type="button"
                      onClick={handleEditEmail}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 font-medium text-sm hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Password field with eye toggle */}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-auto px-4 py-3.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent pr-14"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms-agreement"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <label htmlFor="terms-agreement" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={handleOpenTerms}
                      className="text-blue-600 hover:underline"
                    >
                      Terms of Use
                    </button>
                    { " " }and{" " }
                    <button
                      type="button"
                      onClick={handleOpenPrivacy}
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={!agreedToTerms}
                  className="w-full h-auto bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
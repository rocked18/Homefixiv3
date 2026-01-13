import { createContext, useContext, useState, ReactNode } from "react";

export type UserStatus = "user" | "free" | "plus" | "pro";

interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (status: UserStatus) => void;
  logout: () => void;
  updateUserStatus: (status: UserStatus) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (status: UserStatus) => {
    // Create a test user based on status
    const testUser: User = {
      id: "test-user-123",
      name: status === "user" ? "Guest" : "John Doe",
      email: status === "user" ? "" : "john.doe@example.com",
      status,
    };
    setUser(testUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserStatus = (status: UserStatus) => {
    if (user) {
      setUser({ ...user, status });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null && user.status !== "user",
        login,
        logout,
        updateUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
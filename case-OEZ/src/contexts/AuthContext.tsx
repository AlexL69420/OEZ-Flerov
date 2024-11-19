// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, email: string, password: string) => void;
  logout: () => void;
  userEmail: string | null;
  userPassword: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userEmail: null,
  userPassword: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPassword, setUserPassword] = useState<string | null>(null);

  const login = (token: string, email: string, password: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserPassword(password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserPassword(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userEmail, userPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

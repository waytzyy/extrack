import React, { createContext, useState, useEffect } from 'react';
import { AuthService, LoginResponse } from '../services/apiService';

interface AuthContextType {
  token: string | null;
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const login = async (username: string, password: string) => {
    try {
      const data: LoginResponse = await AuthService.login(username, password);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  useEffect(() => {
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import api from "../api/axiosClient";
import { User, StudentProfile, AuthResponse, LoginCredentials, RegisterCredentials } from "../types";

interface AuthContextType {
  user: User | null;
  studentProfile: StudentProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        setStudentProfile(data.studentProfile);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
        setStudentProfile(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data } = await api.post("/auth/login", { email, password } as LoginCredentials);
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);
      // After login, fetch full user data including _id and studentProfile
      const meRes = await api.get("/auth/me");
      setUser(meRes.data.user);
      setStudentProfile(meRes.data.studentProfile);
      setIsAuthenticated(true);
      return { success: true, user: meRes.data.user };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data } = await api.post("/auth/register", { name, email, password } as RegisterCredentials);
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      const meRes = await api.get("/auth/me");
      setUser(meRes.data.user);
      setStudentProfile(meRes.data.studentProfile);
      setIsAuthenticated(true);
      return { success: true, user: meRes.data.user };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    try {
      await api.post("/auth/change-password", { currentPassword, newPassword });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Password change failed",
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    setStudentProfile(null);
    setIsAuthenticated(false);
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      studentProfile,
      isAuthenticated,
      loading,
      login,
      register,
      changePassword,
      logout,
      setStudentProfile,
    }),
    [user, studentProfile, isAuthenticated, loading, login, register, changePassword, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
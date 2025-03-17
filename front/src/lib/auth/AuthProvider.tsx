// src/lib/auth/AuthProvider.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../core/domain/entities/User";
import {
  AuthStatus,
  LoginCredentials,
  RegisterData,
} from "../../core/types/auth";
import { userService } from "../../infrastructure/services/UserServiceImpl";

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  initialUser?: User | null;
  children: React.ReactNode;
}> = ({ initialUser = null, children }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [status, setStatus] = useState<AuthStatus>(
    initialUser ? "authenticated" : "unauthenticated"
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  console.log("User", user);
  console.log("status", status);

  // Verificar o usuário atual quando o componente for montado
  useEffect(() => {
    const checkUser = async () => {
      if (status !== "loading") {
        setStatus("loading");
        try {
          const currentUser = await userService.getCurrentUser();
          setUser(currentUser);
          setStatus(currentUser ? "authenticated" : "unauthenticated");
        } catch {
          setStatus("unauthenticated");
          setUser(null);
        }
      }
    };

    if (!initialUser) {
      checkUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUser]);

  const login = async (credentials: LoginCredentials) => {
    setStatus("loading");
    setError(null);
    try {
      const loggedUser = await userService.login(credentials);
      setUser(loggedUser);
      setStatus("authenticated");
      router.push("/dashboard");
    } catch {
      setStatus("unauthenticated");
      setError("Falha na autenticação. Verifique suas credenciais.");
    }
  };

  const register = async (data: RegisterData) => {
    setStatus("loading");
    setError(null);
    try {
      const newUser = await userService.register(data);
      setUser(newUser);
      setStatus("authenticated");
      router.push("/dashboard");
    } catch {
      setStatus("unauthenticated");
      setError("Falha no registro. Verifique os dados fornecidos.");
    }
  };

  const logout = async () => {
    setStatus("loading");
    try {
      await userService.logout();
      setUser(null);
      setStatus("unauthenticated");
      router.push("/login");
    } catch {
      setError("Falha ao sair. Tente novamente.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, status, login, register, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

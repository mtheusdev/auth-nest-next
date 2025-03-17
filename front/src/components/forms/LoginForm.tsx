// src/components/forms/LoginForm.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../lib/auth/AuthProvider";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, status } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          {status === "loading" ? "Carregando..." : "Entrar"}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm">
          Não tem uma conta ainda?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-800">
            Registre-se
          </Link>
        </p>
      </div>
    </form>
  );
}

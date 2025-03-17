"use client";

import { useAuth } from "@/lib/auth/AuthProvider";

export default function DashboardWelcome() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Bem-vindo, {user?.name} !
        </h2>
        <p className="text-gray-600 mb-2">Email: {user?.email}</p>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

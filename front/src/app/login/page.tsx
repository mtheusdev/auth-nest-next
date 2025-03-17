// src/app/login/page.tsx
import LoginForm from "@/components/forms/LoginForm";
import { redirectIfAuthenticated } from "../../lib/auth/auth";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login</h1>ap
          <p className="text-gray-600">Entre com sua conta</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

import RegisterForm from "@/components/forms/RegisterForm";
import { redirectIfAuthenticated } from "../../lib/auth/auth";

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Criar Conta</h1>
          <p className="text-gray-600">Registre-se para acessar o sistema</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}

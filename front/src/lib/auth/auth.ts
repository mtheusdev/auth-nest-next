// src/lib/auth/auth.ts
import { redirect } from "next/navigation";
import { User } from "../../core/domain/entities/User";
import { userService } from "../../infrastructure/services/UserServiceImpl";

// Função para verificar autenticação no servidor
export async function getServerSession(): Promise<{ user: User | null }> {
  try {
    // No server-side, podemos verificar diretamente usando nosso serviço
    const user = await userService.getCurrentUser();
    return { user };
  } catch {
    return { user: null };
  }
}

// Middleware para páginas protegidas
export async function requireAuth(redirectTo: string = "/login") {
  const { user } = await getServerSession();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

// Middleware para páginas de autenticação (redireciona se já estiver logado)
export async function redirectIfAuthenticated(
  redirectTo: string = "/dashboard"
) {
  const { user } = await getServerSession();

  if (user) {
    redirect(redirectTo);
  }
}

// Para Client Components que precisam de informações de autenticação
export async function clientAuth() {
  "use server";
  return await getServerSession();
}

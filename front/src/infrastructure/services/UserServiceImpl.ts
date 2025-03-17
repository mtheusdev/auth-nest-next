import { UserService } from "@/core/domain/services/UserService";
import { User } from "../../core/domain/entities/User";
import { LoginCredentials, RegisterData } from "../../core/types/auth";
import { apiClient } from "../http/client";

export class UserServiceImpl implements UserService {
  async getCurrentUser(): Promise<User | null> {
    try {
      return await apiClient.get<User>("/auth/user");
    } catch {
      // Se houver erro, assumimos que o usuário não está autenticado
      return null;
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    return await apiClient.post<User>("/auth/login", credentials);
  }

  async register(data: RegisterData): Promise<User> {
    return await apiClient.post<User>("/auth/register", data);
  }

  async logout(): Promise<void> {
    await apiClient.post<void>("/auth/logout");
  }
}

// Exportando uma instância para uso pela aplicação
export const userService = new UserServiceImpl();

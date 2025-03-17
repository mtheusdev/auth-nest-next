import { User } from "@/core/domain/entities/User";
import { LoginCredentials, RegisterData } from "@/core/types/auth";

export interface UserService {
  getCurrentUser(): Promise<User | null>;
  login(credentials: LoginCredentials): Promise<User>;
  register(data: RegisterData): Promise<User>;
  logout(): Promise<void>;
}

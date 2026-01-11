import { apiClient } from "../core/apiClient";

class AuthService {
  async login(username: string, password: string) {
    return apiClient.post("/auth/login", { username, password });
  }
}

export const authService = new AuthService();

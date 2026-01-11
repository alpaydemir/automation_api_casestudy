import { apiClient } from "../core/apiClient";
import {
  validUserData,
  CreateUserPayload,
  updatePutUserData,
  updatePatchUserData
} from "../models/user.data";

class UserService {
  // Positive Case
  async createValidUser() {
    return apiClient.post("/users/add", validUserData);
  }

  // Negative create user cases
  async createUser(payload: CreateUserPayload) {
    return apiClient.post("/users/add", payload);
  }

  // GET single user
  async getSingleUser(id: number) {
    return apiClient.get(`/users/${id}`);
  }

  // GET pagination
  async getUsers(limit: number, skip: number) {
    return apiClient.get(`/users?limit=${limit}&skip=${skip}`);
  }

  // PUT 
  async updateUserPut(id: number) {
    return apiClient.put(`/users/${id}`, updatePutUserData);
  }

  // PATCH 
  async updateUserPatch(id: number) {
    return apiClient.patch(`/users/${id}`, updatePatchUserData);
  }

  // Delete
  async deleteUser(id: number) {
    return apiClient.delete(`/users/${id}`);
  }
}

export const userService = new UserService();

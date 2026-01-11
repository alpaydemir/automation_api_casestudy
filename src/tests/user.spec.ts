import { test, expect } from "@playwright/test";
import { userService } from "../services/user.service";
import {
  missingFirstNameUser,
  emptyFirstNameUser
} from "../models/user.data";

/**
 * CREATE - POSITIVE
 */
test("create user success @smoke @regression", async () => {
  const response = await userService.createValidUser();

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body).toHaveProperty("id");
  expect(body.firstName).toBe("Test");
  expect(body.lastName).toBe("User");
});

/**
 * CREATE - NEGATIVE (missing field)
 */
test("create user missing parameter @regression", async () => {
  const response = await userService.createUser(missingFirstNameUser);
  expect(response.status()).not.toBe(200);
});

/**
 * CREATE - NEGATIVE (empty field)
 */
test("create user with empty parameter @regression", async () => {
  const response = await userService.createUser(emptyFirstNameUser);
  expect(response.status()).not.toBe(200);
});

/**
 * GET - SINGLE USER
 */
test("get single user @smoke @regression", async () => {
  const response = await userService.getSingleUser(1);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body).toHaveProperty("firstName");
  expect(body).toHaveProperty("lastName");
});

/**
 * GET - PAGINATION
 */
test("get user list pagination @smoke @regression", async () => {
  const response = await userService.getUsers(10, 0);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.limit).toBe(10);
  expect(body.skip).toBe(0);
  expect(Array.isArray(body.users)).toBe(true);
});

/**
 * UPDATE - PUT
 */
test("update with PUT @regression", async () => {
  const response = await userService.updateUserPut(1);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.firstName).toBe("Updated");
  expect(body.lastName).toBe("User");
});

/**
 * UPDATE - PATCH
 */
test("update with PATCH @smoke @regression", async () => {
  const response = await userService.updateUserPatch(1);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.firstName).toBe("Updates");
});

/**
 * DELETE
 */
test("delete user @smoke @regression", async () => {
  const response = await userService.deleteUser(1);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty("isDeleted");
  expect(body.isDeleted).toBe(true);
});

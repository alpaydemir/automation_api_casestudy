export type CreateUserPayload = {
  firstName?: string;
  lastName?: string;
};

// --- Create (Positive) ---
export const validUserData: CreateUserPayload = {
  firstName: "Test",
  lastName: "User"
};

// --- Create (Negative) ---
export const missingFirstNameUser: CreateUserPayload = {
  lastName: "User"
};

export const emptyFirstNameUser: CreateUserPayload = {
  firstName: "",
  lastName: "User"
};

// --- Update payloads ---
export const updatePutUserData = {
  firstName: "Updated",
  lastName: "User"
};

export const updatePatchUserData = {
  firstName: "Updates"
};

import { apiClient, handleError, handleResponse } from "../helpers/apiHelpers";

// Account Signup
export async function signup({
  fullname,
  email,
  password,
  passwordConfirm,
  role,
}) {
  try {
    const response = await apiClient.post("/users/signup", {
      fullname,
      email,
      password,
      passwordConfirm,
      role,
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// Account OTP Verification
export async function otpVerify({ otp, otpToken }) {
  try {
    const response = await apiClient.post(`/users/verify-otp/${otpToken}`, {
      otp,
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// Account Email Verification
export async function emailVerify({ token }) {
  try {
    const response = await apiClient.get(`/users/verify/${token}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// Account Login
export async function login({ email, password }) {
  try {
    const response = await apiClient.post("/users/login", { email, password });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// Account Protection
export async function getCurrentUser() {
  try {
    const response = await apiClient.get("/users/me");

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// Account Logout
export async function logout() {
  try {
    const response = await apiClient.get("/users/logout");

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// Forgot Account Password
export async function forgotPassword({ email }) {
  try {
    const response = await apiClient.post("/users/forgot-password", { email });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// Reset Account Password
export async function resetPassword({ password, passwordConfirm, token }) {
  try {
    const response = await apiClient.patch(`/users/reset-password/${token}`, {
      password,
      passwordConfirm,
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deactivateAccount(id, data) {
  try {
    const response = await apiClient.patch(
      `/users/account-deactivation/${id}`,
      data
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function activateAccount(id) {
  try {
    const response = await apiClient.patch(`/users/account-activation/${id}`);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

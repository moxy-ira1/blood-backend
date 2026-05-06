/**
 * API Helper for Blood Donation Management System
 * 
 * Configuration:
 * Set NEXT_PUBLIC_API_URL in your .env.local file:
 * NEXT_PUBLIC_API_URL=http://localhost:3001/api
 * 
 * The backend should be running and accessible at this URL.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  fullName: string;
  role: "DONOR" | "WORKER" | "BTD";
  email?: string;
  phone?: string;
  identifier: string;
  eligibilityStatus?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DonorRegistrationData {
  fullName: string;
  identifier: string;
  email?: string;
  phone?: string;
}

export interface DonorLoginData {
  fullName: string;
  identifier: string;
}

export interface WorkerOtpData {
  phone: string;
}

export interface WorkerVerifyOtpData {
  phone: string;
  otp: string;
}

export interface BtdLoginData {
  email: string;
  password: string;
}

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get("content-type");
  
  if (!contentType || !contentType.includes("application/json")) {
    if (!response.ok) {
      throw new ApiError("Server error occurred", response.status);
    }
    return { success: true };
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || data.error || "Request failed",
      response.status
    );
  }
  
  return {
    success: true,
    data: data.data || data,
    message: data.message,
  };
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  if (!API_URL) {
    throw new ApiError(
      "Cannot connect to backend. Please set NEXT_PUBLIC_API_URL environment variable.",
      0
    );
  }

  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        "Cannot connect to backend. Please check API URL or server status.",
        0
      );
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0
    );
  }
}

// Auth API functions
export const authApi = {
  // Donor Registration
  registerDonor: (data: DonorRegistrationData) =>
    apiRequest<AuthResponse>("/auth/register/donor", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Donor Login
  loginDonor: (data: DonorLoginData) =>
    apiRequest<AuthResponse>("/auth/login/donor", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Worker - Send OTP
  sendOtp: (data: WorkerOtpData) =>
    apiRequest<{ message: string }>("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Worker - Verify OTP
  verifyOtp: (data: WorkerVerifyOtpData) =>
    apiRequest<AuthResponse>("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // BTD Login
  loginBtd: (data: BtdLoginData) =>
    apiRequest<AuthResponse>("/auth/login/btd", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Logout
  logout: () =>
    apiRequest<void>("/auth/logout", {
      method: "POST",
    }),

  // Get current user
  getCurrentUser: () =>
    apiRequest<User>("/auth/me", {
      method: "GET",
    }),
};

// Check backend connection
export async function checkBackendConnection(): Promise<boolean> {
  if (!API_URL) {
    console.error("[BloodBank] NEXT_PUBLIC_API_URL is not set");
    return false;
  }
  
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
      credentials: "include",
    });
    
    if (response.ok) {
      console.log("[BloodBank] Backend connected successfully");
      return true;
    }
    
    console.error("[BloodBank] Backend health check failed");
    return false;
  } catch {
    console.error("[BloodBank] Cannot connect to backend at:", API_URL);
    return false;
  }
}

export { ApiError };
export default apiRequest;

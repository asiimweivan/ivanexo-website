const API_BASE = "http://212.224.86.99:8080/api/v1";

export const tokenStorage = {
  getAccess: () => localStorage.getItem("ivanexo_access_token"),
  getRefresh: () => localStorage.getItem("ivanexo_refresh_token"),
  getUser: () => {
    const raw = localStorage.getItem("ivanexo_user");
    return raw ? JSON.parse(raw) : null;
  },
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem("ivanexo_access_token", access);
    localStorage.setItem("ivanexo_refresh_token", refresh);
  },
  setUser: (user: any) => localStorage.setItem("ivanexo_user", JSON.stringify(user)),
  clear: () => {
    localStorage.removeItem("ivanexo_access_token");
    localStorage.removeItem("ivanexo_refresh_token");
    localStorage.removeItem("ivanexo_user");
  },
};

export interface User {
  id: string;
  phone: string;
  fullName: string;
  email: string | null;
  role: string;
  businessId?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.getAccess();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    tokenStorage.clear();
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  const text = await response.text();
  let data: any;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!response.ok) throw new Error(data?.message || `Error ${response.status}`);
  return data as T;
}

export const api = {
  get:    <T>(url: string) => apiRequest<T>(url, { method: "GET" }),
  post:   <T>(url: string, body?: any) => apiRequest<T>(url, { method: "POST", body: JSON.stringify(body) }),
  patch:  <T>(url: string, body?: any) => apiRequest<T>(url, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(url: string) => apiRequest<T>(url, { method: "DELETE" }),
};

export const authService = {
  async login(phone: string, password: string): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", { phone, password });
    tokenStorage.setTokens(res.accessToken, res.refreshToken);
    tokenStorage.setUser(res.user);
    return res;
  },
  async getMe(): Promise<User> {
    return api.get<User>("/auth/me");
  },
  logout() {
    tokenStorage.clear();
    window.location.href = "/admin/login";
  },
};

export const agentService = {
  getMyProfile: () => api.get("/agents/me"),
  getEarnings: () => api.get("/agents/me/earnings"),
  getCommissions: () => api.get<any[]>("/agents/me/commissions"),
  getSubscribers: () => api.get<any[]>("/agents/me/subscribers"),
};

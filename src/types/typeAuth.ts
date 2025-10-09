export interface User {
  id: number;
  email: string;
  username: string;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  email: string;
  password: string
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string, username: string) => Promise<AuthResponse>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}
export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt: string;
}

export interface StoredUser extends Omit<User, 'id' | 'createdAt'> {
  readonly id: string;
  readonly passwordHash: string;
  readonly createdAt: string;
}

export interface AuthError {
  readonly code: string;
  readonly message: string;
}

export interface AuthResult {
  readonly success: boolean;
  readonly error?: AuthError;
  readonly user?: User;
}

export interface AuthContextType {
  readonly user: User | null;
  readonly isLoading: boolean;
  readonly isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (user:SignUpParams) => Promise<AuthResult>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface AuthProviderProps {
  readonly children: React.ReactNode;
}

export interface SignUpParams {
  name: string,
  email: string,
  password: string,
}
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { AUTH_ERRORS } from '../constants/errors';
import { generateUserId, hashPassword } from '../utils/auth';
import type {
  User,
  StoredUser,
  AuthResult,
  AuthContextType,
  AuthProviderProps,
  SignUpParams,
} from '../types/auth';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticating: false,
  login: async () => ({
    success: false,
    error: AUTH_ERRORS.NOT_IMPLEMENTED,
  }),
  signup: async () => ({
    success: false,
    error: AUTH_ERRORS.NOT_IMPLEMENTED,
  }),
  logout: async () => { },
  clearError: () => { },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const clearError = useCallback(() => {
    // This can be used to clear errors in UI components
  }, []);

  const loadUserFromStorage = async (): Promise<void> => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (storedUser) {
        const userData = JSON.parse(storedUser) as User;
        if (userData.id && userData.email && userData.name) {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } finally {
      setIsLoading(false);
    }
  };

  const getRegisteredUsers = async (): Promise<StoredUser[]> => {
    try {
      const usersData = await AsyncStorage.getItem(
        STORAGE_KEYS.REGISTERED_USERS,
      );
      if (!usersData) {
        return [];
      }

      const users = JSON.parse(usersData) as StoredUser[];
      return Array.isArray(users) ? users : [];
    } catch (error) {
      console.error('Error getting registered users:', error);
      return [];
    }
  };

  const saveRegisteredUsers = async (users: StoredUser[]): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.REGISTERED_USERS,
        JSON.stringify(users),
      );
      return true;
    } catch (error) {
      console.error('Error saving registered users:', error);
      return false;
    }
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    setIsAuthenticating(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      if (!trimmedEmail || !trimmedPassword) {
        return { success: false, error: AUTH_ERRORS.REQUIRED_FIELDS };
      }

      const users = await getRegisteredUsers();
      const passwordHash = hashPassword(trimmedPassword);

      const foundUser = users.find(
        user =>
          user.email.toLowerCase() === trimmedEmail &&
          user.passwordHash === passwordHash,
      );

      if (!foundUser) {
        return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
      }

      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        createdAt: foundUser.createdAt,
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(userData),
      );
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: AUTH_ERRORS.STORAGE_ERROR };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (userData: SignUpParams): Promise<AuthResult> => {
    setIsAuthenticating(true);

    try {
      const { name, email, password } = userData;
      const trimmedName = name.trim();
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        return { success: false, error: AUTH_ERRORS.REQUIRED_FIELDS };
      }
      const users = await getRegisteredUsers();
      const existingUser = users.find(
        user => user.email.toLowerCase() === trimmedEmail,
      );

      if (existingUser) {
        return { success: false, error: AUTH_ERRORS.USER_EXISTS };
      }

      const userId = generateUserId();
      const createdAt = new Date().toISOString();
      const passwordHash = hashPassword(trimmedPassword);

      const newStoredUser: StoredUser = {
        id: userId,
        name: trimmedName,
        email: trimmedEmail,
        passwordHash,
        createdAt,
      };

      const newUser: User = {
        id: userId,
        name: trimmedName,
        email: trimmedEmail,
        createdAt,
      };

      const usersSaved = await saveRegisteredUsers([...users, newStoredUser]);
      if (!usersSaved) {
        return { success: false, error: AUTH_ERRORS.STORAGE_ERROR };
      }

      await AsyncStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(newUser),
      );
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: AUTH_ERRORS.STORAGE_ERROR };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Failed to logout');
    }
  };

  const contextValue = {
    user,
    isLoading,
    isAuthenticating,
    login,
    signup,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export type { User, AuthResult, AuthError } from '../types/auth';
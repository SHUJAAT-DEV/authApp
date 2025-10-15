import type {AuthError} from '../types/auth';

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'Invalid email or password',
  },
  USER_EXISTS: {
    code: 'USER_EXISTS',
    message: 'An account with this email already exists',
  },
  WEAK_PASSWORD: {
    code: 'WEAK_PASSWORD',
    message:
      'Password must be at least 8 characters with uppercase, lowercase, and numbers',
  },
  INVALID_EMAIL: {
    code: 'INVALID_EMAIL',
    message: 'Please enter a valid email address',
  },
  REQUIRED_FIELDS: {
    code: 'REQUIRED_FIELDS',
    message: 'All fields are required',
  },
  STORAGE_ERROR: {
    code: 'STORAGE_ERROR',
    message: 'Failed to save data. Please try again',
  },
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Network error. Please check your connection',
  },
  INVALID_NAME: {
    code: 'INVALID_NAME',
    message: 'Name must be at least 2 characters',
  },
  NOT_IMPLEMENTED: {
    code: 'NOT_IMPLEMENTED',
    message: 'Context not initialized',
  },
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  },
} as const satisfies Record<string, AuthError>;

export type AuthErrorCode = keyof typeof AUTH_ERRORS;
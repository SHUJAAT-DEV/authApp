export const STORAGE_KEYS = {
  CURRENT_USER: '@auth_user_v2',
  REGISTERED_USERS: '@registered_users_v2',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
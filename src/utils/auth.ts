export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const hashPassword = (password: string): string => {
  const CryptoJS = require('crypto-js');
  const salt = 'user_auth_app_salt_2024';
  return CryptoJS.SHA256(password + salt).toString();
};
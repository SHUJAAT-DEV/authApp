import type {TextInputProps, TouchableOpacityProps} from 'react-native';

export interface BaseInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface InputProps extends BaseInputProps {
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  maxLength?: number;
  multiline?: boolean;
  testID?: string;
}

export interface PasswordInputProps extends BaseInputProps {
  showPasswordRequirements?: boolean;
  testID?: string;
}


export interface ErrorMessageProps {
  error?: string | null;
  visible?: boolean;
}

export interface PasswordRequirement {
  text: string;
  test: (password: string) => boolean;
}

export type ValidationRule = {
  test: (value: string) => boolean;
  message: string;
};

export interface FormFieldProps {
  children: React.ReactNode;
  style?: object;
}
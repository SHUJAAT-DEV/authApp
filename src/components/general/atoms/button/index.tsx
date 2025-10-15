
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { responsiveSize } from '../../../../utils/responsive';
import theme from '../../../../constants/theme';

interface ButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  children: React.ReactNode;
  loaderColor?: string
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  loading = false,
  disabled = false,
  buttonStyle,
  children,
  loaderColor=theme.color.neutral[100],
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        disabled && styles.disabledButton,
      ]}
      onPress={!loading ? onPress: undefined}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.color.primary[500],
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(20),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.3,
  },
});

export default Button;

import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import theme from '../../../../constants/theme';
import { responsiveSize } from '../../../../utils/responsive';

interface InputFieldProps extends TextInputProps {
  addonLeft?: React.ReactNode;
  addonRight?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const Input = forwardRef<TextInput, InputFieldProps>(
  ({ addonLeft, addonRight, containerStyle, inputStyle, style, editable, ...textInputProps }, ref) => {
    return (
      <View style={[styles.container, !editable && styles.disabledInput, containerStyle]}>
        {addonLeft && <View style={styles.addon}>{addonLeft}</View>}
        <TextInput
          ref={ref}
          style={[styles.input, inputStyle]}
          placeholderTextColor={theme.color.neutral[400]}
          editable={editable}   
          {...textInputProps}
        />
        {addonRight && <View style={styles.addon}>{addonRight}</View>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.color.neutral[400],
    borderRadius: responsiveSize(10),
    paddingHorizontal: responsiveSize(10),
    backgroundColor: theme.color.neutral[300],
  },
  input: {
    flex: 1,
    fontSize: responsiveSize(16),
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(8),
    height: responsiveSize(56),
  },
  disabledInput: {
    backgroundColor: theme.color.tertiary[100],
  },
  addon: {
    marginHorizontal: responsiveSize(5),
  },
});

export default Input;
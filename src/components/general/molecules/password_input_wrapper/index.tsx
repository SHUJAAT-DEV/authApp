import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import theme from '../../../../constants/theme';
import { B2 } from '../../atoms/body';
import Input from '../../atoms/input';
import { EyeClosedIcon, EyeOpenIcon } from '../../../../../assets/svg';
import { responsiveSize } from '../../../../utils/responsive';

type Properties = {
  label?: string,
  value?: string,
  onChangeText?: (p: string) => void,
  placeholder?: string,
  error?: {
    [key: string]: string
  },
  validateField?: (p1: {
    name: string,
    value_: string,
    event?: 'change' | 'blur',
  }) => void,
  name?: string,
}

const red = theme.color.red[200];
const PasswordInputWrapper = ({
  value, onChangeText, label, placeholder="Enter password",
  error, name, validateField,
}: Properties) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const errorMessage = error?.[name || ''];
  const [value_, setValue_] = useState('')

  const onBlur = () => {
    if (name) {
      validateField?.({ name, value_}) || '';
    }
  }
  const handleChange = (value: string) => {
    setValue_(value);
    if (name) {
      validateField?.({ name, value_: value, event: 'change'}) || '';
    }
  };

  return (
    <View>
      {label && <B2 type="regular" style={styles.label} text={label} />}
      <Input
        inputStyle={styles.input}
        secureTextEntry={!isPasswordVisible}
        value={name ? value_ : value}
        onChangeText={name ? handleChange : onChangeText}
        placeholder={placeholder}
        addonRight={(
          <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </Pressable>
        )}
        containerStyle={{
          ...styles.inputContainer,
          ...(errorMessage ? { borderColor: red } : {})
        }}
        onBlur={onBlur}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  )
}

export default PasswordInputWrapper;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: theme.color.tertiary[100],
  },
  input: {
    height: responsiveSize(56),
  },
  label: {
    marginBottom: responsiveSize(6),
  },
  error: {
    lineHeight: responsiveSize(15),
    fontSize: responsiveSize(12),
    marginTop: responsiveSize(6),
    color: red,
  },
});
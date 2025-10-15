import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useState } from "react";
import Input from "../../atoms/input";
import { responsiveSize } from "../../../../utils/responsive";
import theme from "../../../../constants/theme";
import { B2 } from "../../atoms/body";
import { ErrorIcon } from "../../../../../assets/svg";

interface Properties extends TextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (p: string) => void;
  placeholder: string;
  error?: {
    [key: string]: string;
  };
  validateField?: (p1: {
    name: string;
    value_: string;
    event?: "blur" | "change";
  }) => void;
  name?: string;
  containerStyle?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
}

const red = theme.color.red[200];
const TextInputWrapper = ({
  label,
  onChangeText,
  value,
  placeholder,
  error,
  validateField,
  name,
  containerStyle,
  keyboardType,
  ...remaining
}: Properties) => {
  const errorMessage = error?.[name || ""];
  const [value_, setValue_] = useState("");
  const onBlur = () => {
    if (name) {
      validateField?.({ name, value_ }) || "";
    }
  };

  const handleChange = (value: string) => {
    setValue_(value);
    if (name) {
      validateField?.({ name, value_: value, event: "change" }) || "";
    }
  };

  return (
    <View style={containerStyle}>
      {label && <B2 type="regular" style={styles.label} text={label} />}
      <Input
        autoCapitalize="none"
        value={name ? value_ : value}
        onChangeText={name ? handleChange : onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        addonRight={errorMessage ? <ErrorIcon /> : undefined}
        containerStyle={{
          ...styles.inputContainer,
          ...(errorMessage ? { borderColor: red } : {}),
        }}
        onBlur={onBlur}
        {...remaining}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default TextInputWrapper;

const styles = StyleSheet.create({
  label: {
    marginBottom: responsiveSize(6),
  },
  inputContainer: {
    backgroundColor: theme.color.tertiary[100],
  },
  error: {
    lineHeight: responsiveSize(15),
    fontSize: responsiveSize(12),
    marginTop: responsiveSize(6),
    color: red,
  },
});

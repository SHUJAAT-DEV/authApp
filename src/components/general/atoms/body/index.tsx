import React from 'react'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { responsiveSize } from '../../../../utils/responsive';
import theme from '../../../../constants/theme';

type Properties = {
  text: string,
  type: 'medium' | 'regular',
  style?: TextStyle,
}

export const B1 = ({ text, type, style }: Properties) => {
  return (<Text style={[styles.b1, styles[type], style]}>{text || ''}</Text>)
}

interface B2Props extends TextProps {
  children?: React.ReactNode;
  text: string,
  type: 'medium' | 'regular',
  style?: StyleProp<TextStyle>;
}

export const B2 = ({ children,text, type = 'regular', style, ...props }: B2Props) => {
  return (
    <Text
      style={[styles.b2, styles[type], style]}
      {...props}
    >
      {text || children || ""}
    </Text>
  );
};


export const B3 = ({ text, type, style }: Properties) => {
  return (<Text style={[styles.b3, styles[type], style]}>{text || ''}</Text>)
}


const styles = StyleSheet.create({
  b1: {
    fontSize: responsiveSize(16),
    lineHeight: responsiveSize(22),
    color: theme.color.neutral[900]
  },
  b2: {
    fontSize: responsiveSize(14),
    lineHeight: responsiveSize(20),
    color: theme.color.neutral[900]
  },
  b3: {
    fontSize: responsiveSize(12),
    lineHeight: responsiveSize(18),
    color: theme.color.neutral[700]
  },
  regular: {
    fontWeight: 400,
  },
  medium: {
    fontWeight: 500,
  },
})
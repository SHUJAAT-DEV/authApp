import React from 'react'
import { StyleSheet, Text, TextStyle } from "react-native";
import theme from '../../../../constants/theme';
import { responsiveSize } from '../../../../utils/responsive';

type Properties = {
  text: string,
  type: 'medium' | 'regular',
  style?: TextStyle,
  onPress: () => void,
  disabled?: boolean,
}

export const Url = ({ text, type, style, onPress, disabled }: Properties) => {
  return (
    <Text 
      onPress={!disabled ? onPress : undefined}
      style={[
        styles.url, styles[type], style, disabled ? styles.disadled : '',
      ]}
    >
      {text}
    </Text>)
}

const styles = StyleSheet.create({
  url: {
    fontSize: responsiveSize(14),
    lineHeight: responsiveSize(24),
    color: theme.color.neutral[1000],
    textDecorationLine: 'underline',
  },
  regular: {
    fontWeight: 400,
  },
  medium: {
    fontWeight: 500,
  },
  disadled: {
    color: theme.color.neutral[400],
  }
})
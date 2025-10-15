import React from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { responsiveSize } from '../../../../utils/responsive';
import theme from '../../../../constants/theme';

interface Properties extends TextProps {
  text: string | number,
  type: 'medium' | 'regular' | 'semibold' | 'bold',
  style?: TextStyle,
}

export const H1 = ({ text, type, style, ...props }: Properties) => {
  return (<Text  allowFontScaling={false} style={[styles.h1, styles[type], style]} {...props}>{text || ''}</Text>)
}

export const H2 = ({ text, type, style, ...props }: Properties) => {
  return (<Text   allowFontScaling={false} style={[styles.h2, styles[type], style]} {...props}>{text || ''}</Text>)
}

export const H3 = ({ text, type, style, ...props }: Properties) => {
  return (<Text  allowFontScaling={false} style={[styles.h3, styles[type], style]} {...props}>{text || ''}</Text>)
}

export const H4 = ({ text, type, style, ...props }: Properties) => {
  return (<Text  allowFontScaling={false} style={[styles.h4, styles[type], style]} {...props}>{text || ''}</Text>)
}

export const H5 = ({ text, type, style, ...props}: Properties) => {
  return (
    <Text
      allowFontScaling={false}
      style={[styles.h5, styles[type], style]}
      {...props}
    >
      {text || ''}
    </Text>
  )
}

export const H6 = ({ text, type, style }: Properties) => {
  return (<Text  allowFontScaling={false} style={[styles.h6, styles[type], style]}>{text || ''}</Text>)
}


const styles = StyleSheet.create({
  h1: {
    fontSize: responsiveSize(32),
    lineHeight: responsiveSize(39),
    color: theme.color.neutral[900]
  },
  h2: {
    fontSize: responsiveSize(24),
    lineHeight: responsiveSize(29),
    color: theme.color.neutral[900]
  },
  h3: {
    fontSize: responsiveSize(20),
    lineHeight: responsiveSize(24),
    color: theme.color.neutral[900]
  },
  h4: {
    fontSize: responsiveSize(18),
    lineHeight: responsiveSize(22),
    color: theme.color.neutral[900]
  },
  h5: {
    fontSize: responsiveSize(16),
    lineHeight: responsiveSize(19),
    color: theme.color.neutral[900]
  },
  h6: {
    fontSize: responsiveSize(14),
    lineHeight: responsiveSize(17),
    color: theme.color.neutral[900]
  },
  regular: {
    fontWeight: 400,
  },
  medium: {
    fontWeight: 500,
  },
  semibold: {
    fontWeight: 600,
  },
  bold: {
    fontWeight: 700,
  },
})
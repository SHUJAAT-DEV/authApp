import theme from '@/src/constants/theme';
import  { responsiveSize } from '@/src/utils/responsive';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

interface Properties extends TextProps {
  text?: string | number;
  type: 'medium' | 'regular' | 'semibold' | 'bold';
  children?: React.ReactNode;
  style?: TextStyle;
}

export const Span = ({
  text,
  type,
  style,
  children,
  ...remaining
}: Properties) => {
  return (
    <Text
      allowFontScaling={true}
      maxFontSizeMultiplier={1.5}
      style={[styles.base, styles[type], style]}
      {...remaining}
    >
      {text ?? children}
    </Text>
  );
};


const styles = StyleSheet.create({
  base: {
    color: theme.color.neutral[1000],
    fontSize: responsiveSize(13)
  },
  regular: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

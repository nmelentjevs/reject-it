// just copy this code from the driving repo :)
import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { theme } from '../../constants';

const Typography = ({
  h1,
  h2,
  h3,
  title,
  body,
  caption,
  small,
  size,
  transform,
  align,
  // styling
  regular,
  bold,
  semibold,
  medium,
  weight,
  light,
  center,
  right,
  spacing,
  // letter-spacing
  height,
  // line-height
  // colors
  color,
  accent,
  primary,
  secondary,
  tertiary,
  black,
  quatro,
  white,
  gray,
  gray2,
  style,
  children,
  ...props
}) => {
  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    title && styles.title,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    size && { fontSize: size },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    regular && styles.regular,
    bold && styles.bold,
    semibold && styles.semibold,
    medium && styles.medium,
    light && styles.light,
    center && styles.center,
    right && styles.right,
    color && styles[color],
    color && !styles[color] && { color },
    // color shortcuts
    accent && styles.accent,
    quatro && styles.quatro,
    primary && styles.primary,
    secondary && styles.secondary,
    tertiary && styles.tertiary,
    black && styles.black,
    white && styles.white,
    gray && styles.gray,
    gray2 && styles.gray2,
    style // rewrite predefined styles
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const {
  black,
  accent,
  tertiary,
  primary,
  secondary,
  gray,
  gray2,
  white,
  quatro
} = theme.colors;

const { h1, h2, h3, title, body, caption, small } = theme.fonts;

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: theme.sizes.font,
    color: black
  },
  // variations
  regular: {
    fontWeight: 'normal'
  },
  bold: {
    fontWeight: 'bold'
  },
  semibold: {
    fontWeight: '500'
  },
  medium: {
    fontWeight: '500'
  },
  light: {
    fontWeight: '200'
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  accent: { color: accent },
  primary: { color: primary },
  secondary: { color: secondary },
  tertiary: { color: tertiary },
  black: { color: black },
  white: { color: white },
  gray: { color: gray },
  gray2: { color: gray2 },
  quatro: { color: quatro },
  // fonts
  h1,
  h2,
  h3,
  title,
  body,
  caption,
  small
});

export default Typography;

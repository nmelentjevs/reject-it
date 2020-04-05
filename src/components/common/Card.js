import React from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';
import { theme } from '../../constants';

const Card = ({ color, style, children, ...props }) => {
  const cardStyles = [styles.card, style];

  return (
    <Block color={color || theme.colors.white} style={cardStyles} {...props}>
      {children}
    </Block>
  );
};

const { radius, base } = theme.sizes;

export const styles = StyleSheet.create({
  card: {
    borderRadius: radius,
    padding: base + 4,
    marginBottom: base
  }
});

export default Card;

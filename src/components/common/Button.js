import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants';

const Button = ({
  style,
  opacity,
  gradient,
  color,
  startColor,
  endColor,
  end,
  start,
  locations,
  shadow,
  children,
  ...props
}) => {
  const buttonStyles = [
    styles.button,
    shadow && styles.shadow,
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    style
  ];

  if (gradient) {
    return (
      <TouchableOpacity style={buttonStyles} activeOpacity={opacity} {...props}>
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          style={buttonStyles}
          colors={[startColor, endColor]}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity || 0.8}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const {
  primary,
  secondary,
  white,
  black,
  tertiary,
  accent,
  gray,
  gray2,
  gray3,
  gray4
} = theme.colors;

const { radius, base, padding } = theme.sizes;

Button.defaultProps = {
  startColor: primary,
  endColor: secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: white
};

const styles = StyleSheet.create({
  button: {
    borderRadius: radius,
    height: base * 3,
    justifyContent: 'center',
    marginVertical: padding / 3
  },
  shadow: {
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  accent: { backgroundColor: accent },
  primary: { backgroundColor: primary },
  secondary: { backgroundColor: secondary },
  tertiary: { backgroundColor: tertiary },
  black: { backgroundColor: black },
  white: { backgroundColor: white },
  gray: { backgroundColor: gray },
  gray2: { backgroundColor: gray2 },
  gray3: { backgroundColor: gray3 },
  gray4: { backgroundColor: gray4 }
});

export default Button;

import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import { theme } from '../../constants';

const { gray, accent, black } = theme.colors;
const { radius, base, font } = theme.sizes;

const Input = ({
  secure,
  label,
  error,
  email,
  phone,
  number,
  style,
  rightLabel,
  rightStyle,
  onRightPress,
  customRef,
  ...props
}) => {
  const [toggleSecure, setToggleSecure] = useState(false);

  const renderLabel = () => {
    return (
      <Block flex={false}>
        {label ? (
          <Text black={!error} accent={error}>
            {label}
          </Text>
        ) : null}
      </Block>
    );
  };

  const renderToggle = () => {
    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => setToggleSecure(!toggleSecure)}
      >
        {rightLabel ? (
          rightLabel
        ) : (
          <Ionicons
            color={gray}
            size={font * 1.35}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )}
      </Button>
    );
  };

  const renderRight = () => {
    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  };

  const isSecure = toggleSecure ? false : secure;

  const inputStyles = [styles.input, error && { borderColor: accent }, style];

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  return (
    <Block flex={false} margin={[base, 0]}>
      {renderLabel()}
      <TextInput
        style={inputStyles}
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        ref={customRef}
        {...props}
      />
      {renderToggle()}
      {renderRight()}
    </Block>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: black,
    borderRadius: radius,
    fontSize: font,
    fontWeight: '500',
    color: black,
    height: base * 3
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: base * 2,
    height: base * 2,
    top: base,
    right: 0
  }
});

export default Input;

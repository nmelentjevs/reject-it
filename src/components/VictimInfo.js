import React, { useState, useRef, createRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  CheckBox,
  ActivityIndicator
} from 'react-native';
import { Block, Button, Text, Input, Switch } from './common';
import { theme } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import validateMail from '../utils/validateMail';

const PersonalInfo = ({ data, setData, setPage }) => {
  const [first, setFirst] = useState(data.victim.firstName || '');
  const [last, setLast] = useState(data.victim.lastName || '');
  const [email, setEmail] = useState(data.victim.email || '');
  const [date, setDate] = useState(data.victim.birthdate || new Date());
  const [address, setAddress] = useState(data.victim.address || '');
  const [phone, setPhone] = useState(data.victim.phone || '');

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const addressInput = useRef(null);
  const phoneInput = useRef(null);

  const handlePersonalInfo = () => {
    Keyboard.dismiss();
    setLoading(true);

    let errors = [];

    if (!email || !validateMail(email)) {
      errors.push('email');
    }
    if (!first) {
      errors.push('first');
    }
    if (!last) {
      errors.push('last');
    }

    if (!address) {
      errors.push('address');
    }

    if (!phone) {
      errors.push('phone');
    }

    let victim = {
      firstName: first,
      lastName: last,
      email,
      birthdate: date,
      address,
      phone
    };

    if (!errors.length) {
      setData({ ...data, victim });
      setPage(1);
    }

    setLoading(false);
    setErrors(errors);
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView indicatorStyle="black">
        <Block padding={[10, theme.sizes.padding * 1.2]}>
          <Text h1 left bold>
            Personal Details
          </Text>
          <Block left middle>
            <Text h4 gray style={{ marginTop: theme.sizes.padding / 2 }}>
              Please make sure your details are accurate.
            </Text>
          </Block>
          <Block middle>
            <Input
              placeholderTextColor={theme.colors.gray2}
              returnKeyType="next"
              label="Firstname"
              error={hasErrors('first')}
              style={[styles.input, hasErrors('first')]}
              value={data.victim.firstName || first}
              onChangeText={setFirst}
              placeholder="John"
              onSubmitEditing={() => lastNameInput.current.focus()}
            />
            <Input
              placeholderTextColor={theme.colors.gray2}
              returnKeyType="next"
              customRef={lastNameInput}
              label="Lastname"
              error={hasErrors('last')}
              style={[styles.input, hasErrors('last')]}
              value={data.victim.lastName || last}
              onChangeText={setLast}
              placeholder="Johnson"
              onSubmitEditing={() => emailInput.current.focus()}
            />
            <Input
              placeholderTextColor={theme.colors.gray2}
              autoCapitalize="none"
              returnKeyType="next"
              customRef={emailInput}
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              value={data.victim.email || email}
              onChangeText={setEmail}
              placeholder="me@gmail.com"
              onSubmitEditing={() => addressInput.current.focus()}
            />
            <Text>Birthdate</Text>
            <DatePicker date={date} onDateChange={setDate} mode="date" />
            <Input
              placeholderTextColor={theme.colors.gray2}
              customRef={addressInput}
              returnKeyType="next"
              label="Address"
              error={hasErrors('address')}
              style={[styles.input, hasErrors('address')]}
              value={data.victim.address || address}
              onChangeText={setAddress}
              placeholder="Unter den Linden 7, 10117 Berlin, Germany"
              onSubmitEditing={() => phoneInput.current.focus()}
            />
            <Input
              placeholderTextColor={theme.colors.gray2}
              customRef={phoneInput}
              phone
              label="Phone"
              error={hasErrors('phone')}
              style={[styles.input, hasErrors('phone')]}
              value={data.victim.phone || phone}
              onChangeText={setPhone}
              placeholder="001-541-754-3010	"
            />
            <Button gradient onPress={handlePersonalInfo}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Next
                </Text>
              )}
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 0.9,
    justifyContent: 'center'
  },
  inner: {
    flex: 0.9
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});

export default PersonalInfo;

import React, { useState, useRef } from 'react';
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
import Proofs from './Proofs';

const SuspectInfo = ({ data, setData, setPage }) => {
  const [first, setFirst] = useState(data.suspect.firstName || '');
  const [last, setLast] = useState(data.suspect.lastName || '');
  const [email, setEmail] = useState(data.suspect.email || '');
  const [date, setDate] = useState(data.suspect.birthdate || new Date());
  const [address, setAddress] = useState(data.suspect.address || '');
  const [phone, setPhone] = useState(data.suspect.phone || '');
  const [additional, setAdditional] = useState(data.suspect.additional || '');

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const addressInput = useRef(null);
  const phoneInput = useRef(null);

  const handleSuspectInfo = () => {
    Keyboard.dismiss();
    setLoading(true);

    let errors = [];

    if (email && !validateMail(email)) {
      errors.push('email');
    }

    let suspect = {
      firstName: first,
      lastName: last,
      email,
      birthdate: date,
      address,
      phone,
      additional
    };

    if (!errors.length) {
      setData({ ...data, suspect });
      setPage(2);
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
            Suspect Details
          </Text>
          <Block left middle>
            <Text h4 gray style={{ marginTop: theme.sizes.padding / 2 }}>
              Please make sure your details are correct.
            </Text>
            <Text h4 gray style={{ marginTop: theme.sizes.padding / 2 }}>
              Provide as much information as possible. The more details you
              provide the more likely claim will be successful.
            </Text>
          </Block>
          <Block middle>
            <Input
              placeholderTextColor={theme.colors.gray2}
              returnKeyType="next"
              label="Firstname"
              error={hasErrors('first')}
              style={[styles.input, hasErrors('first')]}
              value={data.suspect.firstName || first}
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
              value={data.suspect.lastName || last}
              onChangeText={setLast}
              placeholder="Johnson"
              onSubmitEditing={() => emailInput.current.focus()}
            />
            <Input
              placeholderTextColor={theme.colors.gray2}
              customRef={emailInput}
              returnKeyType="next"
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              value={data.suspect.email || email}
              onChangeText={setEmail}
              placeholder="me@gmail.com"
              autoCapitalize="none"
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
              value={data.suspect.address || address}
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
              style={[styles.textarea, hasErrors('phone')]}
              value={data.suspect.phone || phone}
              onChangeText={setPhone}
              placeholder="001-541-754-3010	"
            />

            <Proofs data={data} setData={setData} />
            <Block
              left
              padding={[10, 0]}
              marginTop={data.evidence.length > 0 ? 0 : 45}
            >
              <Text h4 black>
                Additional info
              </Text>
            </Block>
            <View style={styles.textAreaContainer}>
              <TextInput
                placeholderTextColor={theme.colors.gray2}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Any additional information like social network profiles, relationship history, etc. The more details you provide the faster case is going to be resolved."
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                value={data.suspect.additional || additional}
                onChangeText={setAdditional}
              />
            </View>
            <Button gradient onPress={handleSuspectInfo}>
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
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textarea: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  textAreaContainer: {
    borderColor: theme.colors.gray2,
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start'
  }
});

export default SuspectInfo;

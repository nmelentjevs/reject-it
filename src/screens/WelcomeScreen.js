import React, { useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import { Block, Button, Text, Input } from '../components/common';
import Terms from '../components/Terms';

import { theme } from '../constants';
import zeit from '../api/zeit';
const { width, height } = Dimensions.get('window');

import { BallIndicator } from 'react-native-indicators';
import validateMail from '../utils/validateMail';

const WelcomeScreen = ({ navigation: { navigate } }) => {
  const [showTerms, setShowTerms] = useState(false);

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [enterEmail, setEnterEmail] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  const handleCreateCase = () => {
    navigate('Form');
  };

  const handleHistoryClick = () => {
    setEnterEmail(true);
  };

  const handleConfirmCode = () => {
    if (!email || !validateMail(email)) {
      setErrors('email');
    } else {
      setConfirmEmail(true);
      setErrors('');
    }
  };

  const handleCheckHistory = async () => {
    if (!code) {
      setErrors('code');
    } else {
      setLoading(true);

      zeit
        .get(
          `/claims?victim/email=${email}&confirmationCode=${code}&select=victim,suspect,paid,status,information,createdAt`
        )
        .then(({ data: { success, data } }) => {
          navigate('History', { claims: data });
          setErrors([]);
          setLoading(false);
          setConfirmEmail(false);
          setCode('');
        })
        .catch(err => {
          setErrors('email, code');
          setLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
      behavior="padding"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Block>
          <Block
            center
            top={height > 667 ? false : confirmEmail && isKeyboardVisible}
            middle={
              height > 667 ? enterEmail && isKeyboardVisible : confirmEmail
            }
            bottom={
              height > 667
                ? !isKeyboardVisible
                : !isKeyboardVisible && !confirmEmail
            }
            flex={0.4}
          >
            <Text h1 center bold accent>
              Reject It.
            </Text>
            <Text h2 black style={{ marginTop: theme.sizes.padding / 2 }}>
              We all love justice
            </Text>
          </Block>
          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
            <Button gradient onPress={handleCreateCase}>
              <Text center semibold white>
                Start new claim
              </Text>
            </Button>
            {enterEmail ? (
              <>
                <Input
                  email
                  label="Email"
                  error={hasErrors('email')}
                  style={[styles.input, hasErrors('email')]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="me@gmail.com"
                  placeholderTextColor={theme.colors.gray2}
                />
                {hasErrors('email') ? (
                  <Text h4 accent>
                    Check email capitalization
                  </Text>
                ) : null}
                {confirmEmail ? (
                  <>
                    <Input
                      label="Confirmation Code"
                      error={hasErrors('code')}
                      style={[styles.input, hasErrors('code')]}
                      value={code}
                      onChangeText={setCode}
                      placeholder="XXXXXXXX"
                      placeholderTextColor={theme.colors.gray2}
                    />
                  </>
                ) : null}
                <Button
                  shadow
                  onPress={
                    !confirmEmail ? handleConfirmCode : handleCheckHistory
                  }
                >
                  {!loading ? (
                    <Text center semibold>
                      {!confirmEmail ? 'Check ongoing' : 'Confirm Code'}
                    </Text>
                  ) : (
                    <BallIndicator color={theme.colors.primary} size={20} />
                  )}
                </Button>
              </>
            ) : (
              <Button shadow onPress={handleHistoryClick}>
                <Text center semibold>
                  Ongoing claims
                </Text>
              </Button>
            )}
            <TouchableOpacity onPress={() => setShowTerms(true)}>
              <Text center caption gray>
                Terms of service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:picblocklegal@gmail.com')}
            >
              <Text center caption gray>
                Contact us
              </Text>
            </TouchableOpacity>
          </Block>
          <Terms showTerms={showTerms} setShowTerms={setShowTerms} />
        </Block>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

WelcomeScreen.navigationOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});

export default WelcomeScreen;

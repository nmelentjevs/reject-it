import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { theme } from '../constants';

import {
  FormScreen,
  ConfirmationScreen,
  WelcomeScreen,
  CaseHistory
} from '../screens';

const screens = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Form: FormScreen,
    Confirmation: ConfirmationScreen,
    History: CaseHistory
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.white,
        borderBottomColor: 'transparent',
        elevation: 0 // for android
      },
      headerBackTitle: ' ',
      headerBackImage: () => (
        <Image
          style={{ marginLeft: 20 }}
          source={require('../../assets/icons/back.png')}
        />
      ),
      title: 'Claim form'
    }
  }
);

export default createAppContainer(screens);

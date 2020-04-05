import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Linking
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import HistoryItem from './HistoryItem';
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';

const SwipeableHistoryItem = ({ claim }) => {
  const RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0]
    });

    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() =>
          Linking.openURL(
            `mailto:picblocklegal@gmail.com?subject=Case #${claim._id}`
          )
        }
      >
        <Animated.Text
          style={{
            color: 'black',
            paddingHorizontal: 10,
            fontWeight: '600',
            transform: [{ scale }]
          }}
        >
          <MaterialIcons name="contact-mail" size={55} color="black" />
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={RightActions}>
      <HistoryItem claim={claim} />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  firstLeftAction: {
    padding: 10,
    backgroundColor: 'pink'
  },
  secondLeftAction: {
    padding: 10,
    backgroundColor: 'black'
  }
});

export default SwipeableHistoryItem;

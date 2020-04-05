import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { Block, Text } from './common';

import moment from 'moment';
import { colors } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const HistoryItem = ({ claim }) => {
  return (
    <TouchableOpacity style={styles.claim}>
      <Block center card>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.5,
            marginBottom: 10
          }}
        >
          <Text h3 black>
            Date submitted:
          </Text>
          <Text h4>{moment(claim.createdAt).format('DD/MM/YYYY')}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.5
          }}
        >
          <Text h3 black>
            Status:
          </Text>
          <Text
            style={
              claim.status == 'won'
                ? styles.won
                : claim.status == 'lost'
                ? styles.lost
                : styles.pending
            }
          >
            {claim.status}
          </Text>
        </View>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  claim: {
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    marginVertical: 5,
    width: width - 60,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  won: {
    color: colors.primary,
    alignSelf: 'flex-start'
  },
  lost: {
    color: colors.accent,
    alignSelf: 'flex-start'
  },
  pending: {
    color: colors.tertiary,
    alignSelf: 'flex-start'
  },
  half: {
    flex: 0.5
  }
});

export default HistoryItem;

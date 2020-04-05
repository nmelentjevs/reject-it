import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { colors, sizes } from '../constants/theme';
import SwipeableHistoryItem from '../components/Swipeable';
import { Card, Block, Text, Badge } from '../components/common';
import rgba from 'hex-to-rgba';
import moment from 'moment';

const CaseHistory = ({ navigation: { getParam } }) => {
  const claims = getParam('claims');

  const renderClaim = claim =>
    console.log(claim) || (
      <Card shadow key={`claim-${claim._id}`}>
        <Block row space="between" style={{ marginBottom: sizes.base }}>
          <Text spacing={0.5} caption>
            {moment(claim.createdAt).format('YYYY/MM/DD')}
          </Text>
          <Text
            spacing={0.5}
            caption
            medium
            tertiary={claim.status === 'pending'}
            quatro={claim.status === 'won'}
          >
            {claim.status}
          </Text>
          <Text spacing={0.5} caption quatro={claim.paid === 'Paid'}>
            {claim.paid ? 'Paid' : 'Not paid'}
          </Text>
        </Block>
        <Block row center>
          <Badge
            color={rgba(colors.primary, '0.2')}
            size={14}
            style={{ marginRight: 8 }}
          >
            <Badge color={colors.primary} size={8} />
          </Badge>
          <Text spacing={0.5} color="gray">
            {claim.victim.firstName + ' ' + claim.victim.lastName}
          </Text>
        </Block>

        <Block row center style={{ paddingVertical: 4 }}>
          <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
        </Block>

        <Block row center>
          <Badge
            color={rgba(colors.accent, '0.2')}
            size={14}
            style={{ marginRight: 8 }}
          >
            <Badge color={colors.accent} size={8} />
          </Badge>
          <Text spacing={0.5} color="gray">
            {(claim.suspect.firstName || 'Unknown') +
              ' ' +
              (claim.suspect.lastName || '')}
          </Text>
        </Block>
      </Card>
    );

  return (
    <ScrollView style={styles.history}>
      <Block style={{ marginBottom: sizes.base }}>
        <Text spacing={0.4} transform="uppercase">
          Recent claims
        </Text>
      </Block>
      {claims.map(renderClaim)}
      <Block style={{ marginBottom: 50 }} />
    </ScrollView>
  );
};

CaseHistory.navigationOptions = {
  title: 'Claim History'
};

const styles = StyleSheet.create({
  history: {
    flex: 1,
    paddingVertical: sizes.padding,
    paddingHorizontal: sizes.padding,
    backgroundColor: colors.gray4
  }
});

export default CaseHistory;

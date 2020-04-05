import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants';

const BottomLines = ({ page }) => {
  return (
    <View style={styles.bottomLinesContainer}>
      <View style={styles.bottomLines}>
        {page === 0 ? (
          <>
            <View style={[styles.dot, styles.active]} />
            <View style={[styles.dot, styles.innactive]} />
            <View style={[styles.dot, styles.innactive]} />
          </>
        ) : page === 1 ? (
          <>
            <View style={[styles.dot, styles.innactive]} />
            <View style={[styles.dot, styles.active]} />
            <View style={[styles.dot, styles.innactive]} />
          </>
        ) : (
          <>
            <View style={[styles.dot, styles.innactive]} />
            <View style={[styles.dot, styles.innactive]} />
            <View style={[styles.dot, styles.active]} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomLines: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  dot: {
    height: 5,
    width: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 50
  },
  active: {
    backgroundColor: theme.colors.secondary
  },
  innactive: {
    backgroundColor: theme.colors.black
  }
});

export default BottomLines;

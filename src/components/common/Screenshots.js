import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import Text from './Text';
import { theme } from '../../constants';

const Screenshots = ({ data, showLabel = true }) => {
  return (
    <>
      {showLabel ? <Text h4>Evidence attached: </Text> : null}
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: item.photo.uri }}
              style={{
                width: 50,
                height: 50,
                marginRight: 5,
                borderWidth: 1,
                borderColor: theme.colors.gray2
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Screenshots;

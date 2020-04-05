import React, { useState, useEffect, cloneElement } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import PersonalInfo from '../components/VictimInfo';
import CrimeInfo from '../components/SuspectInfo';
import Confirm from '../components/Confirm';
import BottomLines from '../components/common/BottomLines';
import { theme } from '../constants';
const { weight, height } = Dimensions.get('window');

const FormScreen = () => {
  const [data, setData] = useState({ victim: {}, suspect: {}, evidence: [] });
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 ? (
        <PersonalInfo data={data} setData={setData} setPage={setPage} />
      ) : page === 1 ? (
        <CrimeInfo data={data} setData={setData} setPage={setPage} />
      ) : (
        <Confirm data={data} setData={setData} setPage={setPage} />
      )}
      <View style={styles.container}>
        <BottomLines page={page} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: height / 2,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default FormScreen;

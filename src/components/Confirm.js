import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  ScrollView,
  Platform
} from 'react-native';
import { Block, Button, Text, Input } from './common';
import { theme } from '../constants';
import RNFS from 'react-native-fs';
import { BallIndicator } from 'react-native-indicators';
import moment from 'moment';
import Terms from '../components/Terms';
import { navigate } from '../navigationRef';
import zeit from '../api/zeit';
import Screenshots from './common/Screenshots';

const Confirm = ({ data, setData, setPage }) => {
  const [loading, setLoading] = useState(false);

  const [showTerms, setShowTerms] = useState(false);

  const handleEmailSend = async () => {
    setLoading(true);
    let promises = [];

    data.evidence.forEach(({ name, photo }) => {
      promises.push(
        RNFS.readFile(photo.uri, 'base64')
          .then(data => {
            return {
              file: data,
              name,
              type: 'image/png'
            };
          })
          .catch(err => console.log(err))
      );
    });

    const attachments = await Promise.all(promises);
    delete data.evidence;

    const mail = JSON.stringify({ ...data, attachments });

    console.log({ ...data, attachments });

    zeit
      .post('/claims/send', mail, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setLoading(false);
          setData({
            ...data,
            evidence: []
          });
          Alert.alert(
            'Claim send',
            'Your claim has been submitted. Wait for us to contact you on the email provided!',
            [
              { text: 'Confirm', onPress: () => navigate('Welcome') },
              {
                cancelable: true,
                onDismiss: () => {
                  //move the object
                  navigate('Welcome');
                }
              }
            ]
          );
        } else {
          Alert.alert('Claim failed', 'Something went wrong!', [
            { text: 'Confirm', onPress: () => navigate('Welcome') },
            {
              cancelable: true,
              onDismiss: () => {
                //move the object
                navigate('Welcome');
              }
            }
          ]);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={{ flex: 1 }}>
      <Block padding={[10, theme.sizes.padding * 1.2]}>
        <Text h1 left bold>
          Submit Case
        </Text>
        <Text h3 gray style={{ marginTop: theme.sizes.padding / 2 }}>
          Please make sure all of the details below are accurate.
        </Text>

        <ScrollView
          persistentScrollbar
          style={{ marginTop: 20 }}
          indicatorStyle="black"
        >
          <Block
            padding={[10, 20]}
            margin={[10, 0]}
            style={{ borderLeftColor: theme.colors.gray, borderLeftWidth: 1 }}
          >
            <Text h1 bold>
              Your details:
            </Text>
            <Text h3 black style={styles.fields}>
              Name: {data.victim.firstName} {data.victim.lastName}
            </Text>
            <Text h3 black style={styles.fields}>
              Email: {data.victim.email}
            </Text>
            <Text h3 black style={styles.fields}>
              Birthdate: {moment(data.victim.birthdate).format('DD/MM/YYYY')}
            </Text>
            <Text h3 black style={styles.fields}>
              Address: {data.victim.address}
            </Text>
            <Text h3 black style={styles.fields}>
              Phone: {data.victim.phone}
            </Text>
          </Block>
          <Block padding={[0, 20]}>
            <Button shadow onPress={() => setPage(0)} disabled={loading}>
              <Text bold center>
                Edit personal details
              </Text>
            </Button>
          </Block>
          <Block
            padding={[10, 20]}
            margin={[10, 0]}
            style={{ borderLeftColor: theme.colors.gray, borderLeftWidth: 1 }}
          >
            <Text h1 bold>
              Suspect details:
            </Text>
            <Text h3 black style={styles.fields}>
              Name: {data.suspect.firstName} {data.suspect.lastName}
            </Text>
            <Text h3 black style={styles.fields}>
              Email: {data.suspect.email}
            </Text>
            <Text h3 black style={styles.fields}>
              Birthdate: {moment(data.suspect.birthdate).format('DD/MM/YYYY')}
            </Text>
            <Text h3 black style={styles.fields}>
              Address: {data.suspect.address}
            </Text>
            <Text h3 black style={styles.fields}>
              Phone: {data.suspect.phone}
            </Text>
            <Text h3 black style={styles.fields}>
              Information:
            </Text>
            {data.suspect.additional ? (
              <Text h3 black style={styles.fields}>
                {data.suspect.additional}
              </Text>
            ) : null}
            <Text h3 black style={styles.fields}>
              Evidence:
            </Text>
            <Screenshots data={data.evidence} showLabel={false} />
          </Block>
          <Block padding={[0, 20]}>
            <Button shadow onPress={() => setPage(1)} disabled={loading}>
              <Text bold center>
                Edit suspect details
              </Text>
            </Button>
          </Block>
          <Block center>
            <Text caption gray style={{ marginTop: theme.sizes.padding / 2 }}>
              By clicking submit application you are accepting
            </Text>
            <TouchableOpacity onPress={() => setShowTerms(true)}>
              <Text caption gray>
                Terms and Conditions.
              </Text>
            </TouchableOpacity>
          </Block>
          <Block middle padding={[10, 20]}>
            <Button gradient onPress={handleEmailSend} disabled={loading}>
              {loading ? (
                <BallIndicator size={20} color="white" />
              ) : (
                <Text bold white center>
                  Submit application
                </Text>
              )}
            </Button>
          </Block>
        </ScrollView>
      </Block>
      <Terms showTerms={showTerms} setShowTerms={setShowTerms} />
    </View>
  );
};

const styles = StyleSheet.create({
  fields: {
    padding: 5
  }
});

export default Confirm;

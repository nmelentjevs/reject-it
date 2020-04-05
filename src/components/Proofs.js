import React from 'react';
import { View, StyleSheet, Button, FlatList, Image } from 'react-native';
import { Block, Text } from '../components/common';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import { theme } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Screenshots from './common/Screenshots';

const Proofs = ({ data, setData }) => {
  const handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.openPicker({
      multiple: true
    })
      .then(images => {
        let attachments = [];
        if (images) {
          images.forEach((image, imageIndex) => {
            ImageResizer.createResizedImage(
              `file://${image.path}`,
              600,
              300,
              'PNG',
              50
            )
              .then(resizedImageUri => {
                // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
                attachments.push({
                  name: `Proof #${imageIndex + 1}`,
                  // photo: { ...response, uri: `file://${resizedImageUri}` }
                  photo: resizedImageUri,
                  type: 'image/png'
                });
              })
              .catch(err => {
                // Oops, something went wrong. Check that the filename is correct and
                // inspect err to get more details.
                console.log(JSON.stringify(err));
              });
          });
        }
        return attachments;
      })
      .then(attachments =>
        setTimeout(() => {
          setData({
            ...data,
            evidence: attachments
          });
        }, 500)
      )
      .catch(err => console.log(err));
  };
  return (
    <View>
      <Block left></Block>
      <Block row left padding={[10, 0]}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Text h4 color="#147efb">
            Upload Screenshot Evidence
            <Text gray> (maximum 5)</Text>
          </Text>
        </TouchableOpacity>
      </Block>
      <Screenshots data={data.evidence} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Proofs;

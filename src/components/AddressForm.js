import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { Input, Button } from 'react-native-elements';
import axios from 'axios';
const google = {};
import useDebounce from '../hooks/useDebounce';

const autocompleteAddress = async (query) => {
  const addresses = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${google.key}&input=${query}`
  );
  // console.log(addresses.data);
  return addresses.data.predictions;
};

const AddressForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // State and setter for search results
  const [results, setResults] = useState([]);
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      autocompleteAddress(debouncedSearchTerm).then((results) => {
        Keyboard.dismiss();
        setIsSearching(false);
        setResults(results);
      });
    } else {
      if (searchTerm) {
        setResults([{ description: region.street }]);
      }
    }
  }, [debouncedSearchTerm]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Input
          placeholder="Search address"
          onChangeText={setSearchTerm}
          value={searchTerm}
          autoCorrect={false}
          autoCapitalize="none"
          inputContainerStyle={{ marginBottom: 10 }}
        />
        {results ? (
          <FlatList
            keyExtractor={(item) => JSON.stringify(item.description)}
            data={results}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.street}
                onPress={() => console.log(item.description)}
              >
                <Text style={styles.street}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  street: {
    padding: 10,
    backgroundColor: 'transparent',
    color: 'black',
    borderLeftWidth: 1,
    marginBottom: 2.5,
  },
  button: {
    padding: 10,
    backgroundColor: 'pink',
    borderRadius: 0,
    marginBottom: 10,
  },
});

export default AddressForm;

import React, { useState} from 'react';
import { View, Text, StyleSheet, TextInput,Pressable } from 'react-native';
import car_list from '../car_list.json';
import {Picker} from '@react-native-picker/picker';

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Search({navigation}){
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [productionFrom, setProductionFrom] = useState('');
  const [productionTo, setProductionTo] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleBrandChange = (brand) => {
  setSelectedBrand(brand);
  setModels(car_list.find(item => item.brand === brand).models);
  setSelectedModel('');
  }

  const searchOffers = async () => {
    const db = firebase.firestore();
    let query = db.collection("offers");
    // Filtrowanie po roku
    if (productionFrom && productionTo) {
      let productionResults = await query.where("rok", ">=", parseInt(productionFrom))
                                          .where("rok", "<=", parseInt(productionTo))
                                          .get();
      query = db.collection("offers").where("rok", "in", productionResults.docs.map(doc => doc.data().rok));
    }

    // Filtrowanie po cenie
    if (priceFrom && priceTo) {
      let priceResults = await query.where("cena", ">=", parseInt(priceFrom))
                                    .where("cena", "<=", parseInt(priceTo))
                                    .get();
      query = db.collection("offers").where("cena", "in", priceResults.docs.map(doc => doc.data().cena));
    }

    //Filtrowanie po przebiegu
    if (mileageFrom&&mileageTo) {
      let mileageResults = await query.where("przebieg", ">=", parseInt(mileageFrom))
                                    .where("przebieg", "<=", parseInt(mileageTo))
                                    .get();
      query = db.collection("offers").where("przebieg", "in", mileageResults.docs.map(doc => doc.data().przebieg));
    }

    // Filtrowanie po innych kryteriach
    if (selectedBrand) {
      query = query.where("marka", "==", selectedBrand);
    }
    if (selectedModel) {
      query = query.where("model", "==", selectedModel);
    }
    if (selectedFuelType) {
      query = query.where("paliwo", "==", selectedFuelType);
    }

    const searchResults = await query.get();
    if (searchResults) {
      const cars = searchResults.docs.map(doc => doc.data());
      setSearchResults(cars);
      navigation.navigate('Notice', { cars });
    }
    console.log(searchResults.docs.map(doc => doc.data()));
  }


  return (
  <View style={styles.container}>
    <View style={styles.picker}>
      <Picker
        selectedValue={selectedBrand}
        style={{
          height: '100%',
          width: '100%',
          color: 'black',
        }}
        onValueChange={(itemValue) => handleBrandChange(itemValue)}
        >
      <Picker.Item label="Wybierz markę" value="" />
        {car_list.map(item => (
          <Picker.Item key={item.value} label={item.brand} value={item.brand} />
        ))}
      </Picker>
    </View>
    <View style={styles.picker}>
      <Picker
        selectedValue={selectedModel}
        style={{
          height: '100%',
          width: '100%',
          color: 'black'
        }}
        onValueChange={(itemValue) => setSelectedModel(itemValue)}
        enabled={selectedBrand !== ''}
      >
      <Picker.Item label="Wybierz model" value="" />
        {models.map(model => (
          <Picker.Item key={model} label={model} value={model} />
        ))}
    </Picker>
    </View>
    <View style={styles.picker}>
      <Picker
        selectedValue={selectedFuelType}
        style={{
          height: '100%',
          width: '100%',
          color: 'black'
        }}
        onValueChange={itemValue => setSelectedFuelType(itemValue)}>
        <Picker.Item label="Wybierz paliwo" value="" />
        <Picker.Item label="Diesel" value="diesel" />
        <Picker.Item label="Benzyna" value="benzyna" />
        <Picker.Item label="Benzyna/Gaz" value="benzyna/gaz" />
        <Picker.Item label="Elektryczny" value="elektryczny" />
      </Picker>
    </View>
    <View style={{flexDirection: 'row', height: 130,width: '98%'}}>
      <View style={{width: '50%', flexDirection: 'column'}}>
        <View style={{height: '33%', flexDirection: 'row'}}>
          <View style={{width: '50%', alignItems: 'center'}}><Text>Przebieg od:</Text></View>
          <View style={{width: '50%'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setMileageFrom(text)}
              value={mileageFrom}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={{height: '33%', flexDirection: 'row'}}>
          <View style={{width: '50%', alignItems: 'center'}}><Text>Cena od:</Text></View>
          <View style={{width: '50%'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setPriceFrom(text)}
              value={priceFrom}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={{height: '33%', flexDirection: 'row'}}>
          <View style={{width: '50%', alignItems: 'center'}}><Text style={{textAlign: 'center'}}>Rok produkcji od:</Text></View>
          <View style={{width: '50%'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setProductionFrom(text)}
              value={setProductionFrom}
              keyboardType='numeric'
            />
          </View>
        </View>
      </View>
      <View style={{width: '50%', flexDirection: 'column'}}>
        <View style={{height: '33%', flexDirection: 'row'}}>
          <View style={{width: '50%', alignItems: 'center'}}><Text>Przebieg do:</Text></View>
          <View style={{width: '50%'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setMileageTo(text)}
              value={mileageTo}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={{height: '33%', flexDirection: 'row'}}>
          <View style={{width: '50%', alignItems: 'center'}}><Text>Cena do:</Text></View>
          <View style={{width: '50%'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setPriceTo(text)}
              value={priceTo}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={{height: '33%', flexDirection: 'row'}}>
          <View style={{width: '50%', alignItems: 'center'}}><Text style={{textAlign: 'center'}}>Rok produkcji do:</Text></View>
          <View style={{width: '50%'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setProductionTo(text)}
              value={setProductionTo}
              keyboardType='numeric'
            />
          </View>
        </View>
        <Pressable onPress={()=>{
            searchOffers();
          }} >
        <Text style={styles.log}>Szukaj</Text>
      </Pressable>
      </View>
    </View>
  </View>
  );

}
;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    picker: {
      borderWidth: 1,
      borderRadius: 30,
      height: '10%',
      width: '80%',
      marginBottom: 10
  },
    textInput: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    margin: 1,
    padding: 1
  },
    textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  log: {
    height: 50,
    borderRadius: 30,
    width: 100,
    margin: 12,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#37EB2B',
  }
});

export default Search;

import * as React from 'react';
import {  View, Text, TextInput, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { firebase } from '../firebase-config';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

const Notice = ({navigation}) => {
  const [oferty , setOferty] = useState([]);
  const offersRef = firebase.firestore().collection('offers');

  const route = useRoute();
  const cars = route.params.cars;

  const handleSnapshot = (querySnapshot) => {
    const oferty = [];
    querySnapshot.forEach((doc) => {
      const {
        marka,
        miejscowosc,
        model,
        paliwo,
        przebieg,
        rok,
        wojewodztwo,
        cena,
      } = doc.data();
      oferty.push({
        id: doc.id,
        marka,
        miejscowosc,
        model,
        paliwo,
        przebieg,
        rok,
        wojewodztwo,
        cena,
      });
    });
    setOferty(oferty);
  };

  useEffect(() => {
    offersRef.onSnapshot(handleSnapshot);
    return () => {
      offersRef.off(handleSnapshot);
    };
  }, []);

  return (
    <Pressable onPress={() => navigation.navigate('DetailsScreen')}>
    <View>
      <FlatList
        style={{height: '100%'}}
        data={route.params.cars}
        numColumns={1}
        renderItem={({item})=>(
          <View style={[styles.container, styles.elevation]}>
            <Image style={styles.photo} source={require('../assets/samochod.png')}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.detail}>Cena: {item.cena}</Text>
              <Text style={styles.detail}>Marka: {item.marka}</Text>
              <Text style={styles.detail}>Model: {item.model}</Text>
              <Text style={styles.detail}>Rodzaj paliwa: {item.paliwo}</Text>
              <Text style={styles.detail}>Przebieg: {item.przebieg}</Text>
              <Text style={styles.detail}>Rok produkcji: {item.rok}</Text>
            </View>
          </View>
        )}

        />
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container:{
   margin: 15,
    marginTop: 20,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  elevation: {
    elevation: 10,
    shadowColor: '#52006A',
  },
  detail:{
    fontSize: 15,
    marginLeft: 20,
    marginTop: 10
  },
  photo: {
    borderRadius: 20,
    alignSelf : 'center',
    width: '50%',
    height: 100
  },
});

export default Notice;


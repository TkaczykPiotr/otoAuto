import * as React from 'react';
import {  View, Text, TextInput, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

function Offer({ navigation }) {
    return (
      <ScrollView >
        <Text style={styles.headers}>Volkswagen Garbus</Text>
          <Image
          style={styles.photo}
          source={require('../assets/samochod.png')}
          />
        
        <Text style={{fontSize: 25, marginTop: 20, textAlign: 'center'}}>1000 PLN</Text>
        <Text style={styles.headers}>Details</Text>
          <Text style={styles.detail}>Marka: .........</Text>
          <Text style={styles.detail}>Model: .........</Text>
          <Text style={styles.detail}>Rok produkcji: .........</Text>
          <Text style={styles.detail}>Przebieg: .........</Text>
          <Text style={styles.detail}>Pojemność skokowa: .........</Text>
          <Text style={styles.detail}>Moc silnika: .........</Text>
          <Text style={styles.detail}>Rodzaj paliwa: .........</Text>

        <Text style={styles.headers}>Description</Text>
          <Text style={styles.detail}>.................OPIS................</Text>

        <Text style={styles.headers}>Kontakt ze sprzedającym</Text>
          <Text style={styles.detail}>Nrumer telefonu: ...........</Text>
          <Text style={styles.detail}>Adres e-mail: ...........</Text>
          <Text style={styles.detail}>Adres zamieszkania: ...........</Text>
      
      
      <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.logm}>Przejdź do aplikacji</Text>
      </Pressable>
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    logm: {
      height: 50,
      borderRadius: 30,
      width: 200,
      margin: 12,
      padding: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: '#FFFFFF',
    },
    button: {
      justifyContent: "center",
      alignItems:"center"
    },
    headers:{
      fontSize: 25,
      fontWeight: 'bold', 
      marginLeft: 20, 
      marginTop: 20
    },
    detail:{
      fontSize: 16,
      marginLeft: 20, 
      marginTop: 10
    },
    photo: {
      borderRadius: 20,
      alignSelf : 'center',
      marginTop: 20,
      width: '80%',
      height: 200
    },
  });
  export default Offer;


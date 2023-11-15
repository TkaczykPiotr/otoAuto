import * as React from 'react';
import {  View, Text, TextInput, SafeAreaView, StyleSheet, Pressable, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const Account = ({navigation}) => {
  const [text,onChangeText,imie,nazwisko,miejscowosc,wojewodztwo, e_mail] = React.useState(" ");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <Text style={{flex:0, alignItems: 'center',padding:3}}> Imie</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={imie}
          placeholder="Imie"
        />
      <Text style={{flex:0, alignItems: 'center',padding:1}}> Nazwisko</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={nazwisko}
          placeholder="Nazwisko"
        />
      <Text style={{flex:0, alignItems: 'center',padding:1}}> Miejscowość</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={miejscowosc}
          placeholder="Miejscowość"
        />
      <Text style={{flex:0, alignItems: 'center',padding:1}}> Województwo</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={wojewodztwo}
          placeholder="Województwo"
        />
      <Text style={{flex:0, alignItems: 'center',padding:1}}> E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={e_mail}
          placeholder="E-mail"
        />
      <Text style={{flex:0, alignItems: 'center',padding:1}}> Numer telefonu</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Numer telefonu"
          keyboardType="numeric"
        />
      <View style= {{flexDirection: "row",alignItems: 'center'}}>
<Text style={{flex:0, alignItems: 'center',padding:30}}> Zdjecie: </Text>
        <Pressable onPress={() => navigation.navigate('Camera')}>

      <Image
        style={styles.photo}
        source={require('../assets/camera.png')}

      />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Choose_Photo')}>
           <Image
          style={styles.photo}
          source={require('../assets/photo.png')}
         />
         </Pressable>

        </View>
          <View style= {{flexDirection: "row",alignItems: 'center'}}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.anu}>Anuluj</Text>
            </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.zap}>Zapisz</Text>
          </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  log: {
    height: 50,
    borderRadius: 30,
    width: 100,
    margin: 12,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    ImageBackground:require('../assets/camera.png'),
  },
  camera: {
    height:50,
    width:80,
  },
  photo: {
    height:30,
    width:65,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center"
  },
  anu: {
    height: 40,
    borderRadius: 30,
    width: 80,
    margin: 12,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#37EB2B',
  },
  zap: {
    height: 40,
    borderRadius: 30,
    width: 80,
    margin: 12,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#3399FF',
  },
});

export default Account;

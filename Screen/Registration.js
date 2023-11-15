import React, { useState, useEffect } from 'react';
import {  View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Registration({ navigation }) {
  const [names, setNames] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mail, setMail] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);
    // async function addUser() {
    //     const db = firebase.firestore();
    //     await db.collection("Users").add({
    //         uuid: uuid,
    //         marka: marka,
    //         paliwo: paliwo,
    //         cena: parseInt(cena),
    //         przebieg: parseInt(przebieg),
    //         miejscowosc: miejscowosc,
    //         rok: parseInt(rok),
    //         model: model
    //
    //     })
    // }
  const handleSignUp =  () => {
    console.log(names, password, confirmPassword, mail)

    if(password == confirmPassword){
      firebase.auth().createUserWithEmailAndPassword(mail, password)
        .then(() => {
          console.log("zarejestrowano")
          navigation.navigate('Login')
        })
        .catch((error) => {
          alert(error.message)
        });
    }
    else{
      alert("Password are different")
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Text style={[styles.header, { opacity: fadeAnim }]}>
        Rejestracja
      </Animated.Text>

      <Text style={styles.headers}>Nazwa użytkownika</Text>
      <TextInput style={styles.input} onChangeText={text => setNames(text)} />
      <Text style={styles.headers}>Hasło</Text>
      <TextInput  secureTextEntry={true} style={styles.input} onChangeText={text => setPassword(text)} />
      <Text style={styles.headers}>Powtórz hasło</Text>
      <TextInput  secureTextEntry={true} style={styles.input} onChangeText={text => setConfirmPassword(text)} />
      <Text style={styles.headers}>Adres Email</Text>
      <TextInput style={styles.input} onChangeText={text => setMail(text)} />
      <TouchableOpacity style={styles.buttonPrimary} onPress={()=>handleSignUp()}>
        <Text style={styles.buttonTextPrimary}>Zarejestruj</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTextPrimary}>Powrót</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 15,
    textAlign: 'center'
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
  },
  buttonPrimary: {
    backgroundColor: '#2F2F4F',
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
    headers: {
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default Registration;


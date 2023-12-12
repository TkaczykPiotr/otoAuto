import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Login({navigation}) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, []);

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(mail, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.uid);
                navigation.navigate('DrawerPanel');
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.Text style={[styles.header, {opacity: fadeAnim}]}>
                Logowanie
            </Animated.Text>
            <Text style={styles.headers}>Email</Text>
            <TextInput
                style={styles.input}
                value={mail}
                onChangeText={text => setMail(text)}
            />
            <Text style={styles.headers}>Password</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => handleLogin()}>
                <Text style={styles.buttonTextPrimary}>Zaloguj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Registration')}>
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

export default Login;

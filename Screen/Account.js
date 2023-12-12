import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, Animated} from 'react-native';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Account = ({navigation}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newSecondPassword, setNewSecondPassword] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, []);
    const handleChangePassword = () => {
        const user = firebase.auth().currentUser;

        const credentials = firebase.auth.EmailAuthProvider.credential(
            user.email,
            oldPassword
        );

        if (!isGoodPassword()) {
            alert("Hasło musi mieć co najmniej 8 znaków, zawierać przynajmniej 1 cyfrę i 1 dużą literę.")
        } else if (newPassword === newSecondPassword) {
            user.reauthenticateWithCredential(credentials)
                .then(() => {
                    user.updatePassword(newPassword)
                        .then(() => {
                            Alert.alert('Sukces', 'Hasło zostało zmienione.');
                            navigation.goBack();
                        })
                        .catch((error) => {
                            Alert.alert('Błąd', error.message);
                        });
                })
                .catch((error) => {
                    Alert.alert('Błąd', 'Nieprawidłowe stare hasło.');
                });
        } else {
            Alert.alert('Błąd', 'Hasła nie są takie same');
        }
    };

    const isGoodPassword = () => {
        const passwordRegex = /^(?=.*[A-Z\d]).{8,}$/;
        return passwordRegex.test(newPassword);
    }

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.header, {opacity: fadeAnim}]}>
                Zmiana hasła
            </Animated.Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Stare hasło"
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nowe hasło"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Powtórz nowe hasło"
                    secureTextEntry
                    value={newSecondPassword}
                    onChangeText={(text) => setNewSecondPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleChangePassword}>
                <Text style={styles.buttonTextPrimary}>ZMIEŃ HASŁO</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        padding: 15,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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
        marginTop: 20
    },
    buttonTextPrimary: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Account;

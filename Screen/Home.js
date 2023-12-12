import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Home({navigation}) {

    const handleSignout = async () => {
        await firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Signed Out");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('NoticeAll')}>
                <Text style={styles.buttonTextPrimary}>Ogloszenia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.buttonTextPrimary}>Wyszukaj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('MyNotice')}>
                <Text style={styles.buttonTextPrimary}>Moje ogłoszenia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Account')}>
                <Text style={styles.buttonTextPrimary}>Moje konto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPrimary}
                              onPress={() => handleSignout().then(r => navigation.navigate('Login'))}>
                <Text style={styles.buttonTextPrimary}>Wyloguj</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
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
});

export default Home;

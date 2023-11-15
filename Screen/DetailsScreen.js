import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function DetailsScreen({navigation}) {

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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: "30%"}}>
            <Pressable onPress={() => navigation.navigate('Wyszukiwarka')}>
                <Text style={styles.log}>Wyszukiwarka</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Moje ogłoszenia')}>
                <Text style={styles.log}>Moje ogłoszenia</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Ogłoszenia')}>
                <Text style={styles.log}>Lista ogłoszeń</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Dodaj ogłoszenie')}>
                <Text style={styles.logao}>Dodaj ogłoszenie</Text>
            </Pressable>
            <View style={{flex: 1, marginLeft: "55%", marginTop: "30%"}}>
                <Pressable onPress={() => {
                    handleSignout().then(r => navigation.navigate('Login'));
                }}>
                    <Text style={styles.logao}>Wyloguj </Text>
                </Pressable>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderRadius: 30,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    log: {
        height: 50,
        borderRadius: 30,
        width: 150,
        margin: 12,
        padding: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#37EB2B',
    },
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
    reg: {
        height: 40,
        borderRadius: 30,
        width: 100,
        margin: 12,
        padding: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#81FF78',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    tekstNaglowki: {
        fontSize: 20,
        fontWeight: "bold"
    },
    logao: {
        height: 50,
        borderRadius: 30,
        width: 150,
        margin: 12,
        padding: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#37EB2B',
    },
});

export default DetailsScreen;

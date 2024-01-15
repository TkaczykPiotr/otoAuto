import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Animated,
    TouchableOpacity
} from 'react-native';

;

function Main({navigation}) {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <ImageBackground source={require('../assets/obrazek.png')} style={styles.image}>
            <View style={styles.container}>
                <Animated.Text style={[styles.header, {opacity: fadeAnim}]}>
                    Witaj
                </Animated.Text>
                <Animated.Text style={[styles.header, {opacity: fadeAnim}]}>
                    W Naszym Serwisie Ogłoszeń Samochodowych
                </Animated.Text>
                <Animated.Text style={[styles.description, {opacity: fadeAnim}]}>
                    Znajdź najlepsze oferty samochodów w jednym miejscu!
                </Animated.Text>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('NoticeAll')}>
                    <Text style={styles.buttonTextPrimary}>Zobacz ogłoszenia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonTextPrimary}>Zaloguj się</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.buttonTextPrimary}>Zarejestruj się</Text>
                </TouchableOpacity>
                <Text style={styles.copy}>Copyright© 2024, Tkaczyk Piotr</Text>
            </View>
        </ImageBackground>

    )
        ;
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
    image: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        padding: 15,
        textAlign: 'center',
        color: 'white'
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        padding: 30,
        color: 'white'
    },
    copy: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        padding: 30
    }
});

export default Main;

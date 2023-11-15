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
            duration: 1000, // czas trwania animacji w milisekundach
            useNativeDriver: false, // Ustawienie na "false" jest potrzebne do obsługi animacji na niektórych platformach
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
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Offer')}>
                    <Text style={styles.buttonTextPrimary}>Zobacz ogłoszenia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonTextPrimary}>Zaloguj się</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.buttonTextPrimary}>Zarejestruj się</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

)
    ;
}

const styles = StyleSheet.create({
    buttonPrimary: {
        backgroundColor: '#2F2F4F',
        padding: 15,
        borderRadius: 50, // Zaokrąglenie, aby uzyskać kształt okręgu
        marginBottom: 10,
        width: 200, // Szerokość przycisków (możesz dostosować)
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
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        padding: 30,
    },
});

export default Main;

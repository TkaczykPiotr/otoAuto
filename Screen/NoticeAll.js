import * as React from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, ScrollView, Image} from 'react-native';
import {useState, useEffect} from 'react';
import {firebase} from '../firebase-config';
import {FlatList} from 'react-native-gesture-handler';

const NoticeAll = ({navigation}) => {
    const [oferty, setOferty] = useState([]);
    const offersRef = firebase.firestore().collection('offers');
    const [imageData, setImageData] = useState({});

    useEffect(() => {
        const handleSnapshot = (snapshot) => {
            const oferty = [];
            snapshot.forEach((doc) => {
                const {id, idOffer, idUser, opis, wojewodztwo, marka, paliwo, cena, przebieg, miejscowosc, rok, model, numer, url} = doc.data();
                oferty.push({id: doc.id, idOffer, idUser, opis, wojewodztwo, marka, paliwo, cena, przebieg, miejscowosc, rok, model, numer, url});
            });
            setOferty(oferty);
        };

        offersRef.onSnapshot(handleSnapshot);
    }, []);

    useEffect(() => {
    const fetchImages = async (url, index)  => {
            try {
                setImageData((prevData) => ({ ...prevData, [index]: url }));
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        // Pobierz obrazy po zamontowaniu komponentu
        oferty.forEach((item, index) => {
            fetchImages(item.url, index).then(r => '');
        });
    }, [oferty]);

    return (
        <Pressable onPress={() => navigation.navigate('DetailsScreen')}>
            <View>
                <FlatList
                    style={{height: '100%'}}
                    data={oferty}
                    numColumns={1}
                    renderItem={({item, index}) => (
                        <View style={[styles.container, styles.elevation]}>
                            <Image style={styles.photo} source={{ uri: imageData[index] }}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.detail}>Opis: {item.opis}</Text>
                                <Text style={styles.detail}>Cena: {item.cena}</Text>
                                <Text style={styles.detail}>Marka: {item.marka}</Text>
                                <Text style={styles.detail}>Model: {item.model}</Text>
                                <Text style={styles.detail}>Rodzaj paliwa: {item.paliwo}</Text>
                                <Text style={styles.detail}>Przebieg: {item.przebieg}</Text>
                                <Text style={styles.detail}>Rok produkcji: {item.rok}</Text>
                                <Text style={styles.detail}>Numer telefonu: {item.numer}</Text>
                            </View>
                        </View>
                    )}

                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
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
    detail: {
        fontSize: 15,
        marginLeft: 20,
        marginTop: 10
    },
    photo: {
        borderRadius: 20,
        alignSelf: 'center',
        width: '50%',
        height: 100
    },
});

export default NoticeAll;


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
                const {
                    id,
                    idOffer,
                    idUser,
                    opis,
                    wojewodztwo,
                    marka,
                    paliwo,
                    cena,
                    przebieg,
                    miejscowosc,
                    rok,
                    model,
                    numer,
                    url
                } = doc.data();
                oferty.push({
                    id: doc.id,
                    idOffer,
                    idUser,
                    opis,
                    wojewodztwo,
                    marka,
                    paliwo,
                    cena,
                    przebieg,
                    miejscowosc,
                    rok,
                    model,
                    numer,
                    url
                });
            });
            setOferty(oferty);
        };

        offersRef.onSnapshot(handleSnapshot);
    }, []);

    useEffect(() => {
        const fetchImages = async (url, index) => {
            try {
                setImageData((prevData) => ({...prevData, [index]: url}));
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        oferty.forEach((item, index) => {
            fetchImages(item.url, index).then(r => '');
        });
    }, [oferty]);

    return (

            <View>
                <FlatList
                    style={{height: '100%'}}
                    data={oferty}
                    numColumns={1}
                    renderItem={({item, index}) => (
                        <Pressable onPress={() => navigation.navigate('DetailsScreen', { dataFromParent: item })}>
                        <View style={[styles.container]}>
                            <Image style={styles.image} source={{uri: imageData[index]}}/>
                            <View style={styles.textContainer}>
                            <View style={styles.textColumn}>
                                    <Text style={styles.title}>{item.opis}</Text>
                                    <Text style={styles.subtitle}>Rok: {item.rok}   Przebieg: {item.przebieg}   Paliwo: {item.paliwo}</Text>
                                    <Text style={styles.subtitlePrize}>Cena: {item.cena}</Text>
                                </View>
                            </View>
                        </View>
                        </Pressable>
                    )}
                />
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        margin: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    textColumn: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#888888',
    },
    subtitlePrize: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#CC0033',
    }
});

export default NoticeAll;


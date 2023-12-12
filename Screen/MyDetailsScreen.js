import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

function DetailsScreen({navigation}) {
    const [marka, setMarka] = useState();
    const [model, setModel] = useState();
    const [paliwo, setPaliwo] = useState();
    const [rok, setRok] = useState();
    const [wojewodztwo, setWojewodztwo] = useState();
    const [miasto, setMiasto] = useState();
    const [przebieg, setPrzebieg] = useState();
    const [cena, setCena] = useState();
    const [numer, setNumer] = useState();
    const [opis, setOpis] = useState();
    const route = useRoute();
    const [item, setItem] = useState(route.params?.dataFromParent || 'Default Value');
    const [itemUpdate, setItemUpdate] = useState(item);
    const db = firebase.firestore();


    useEffect(() => {
        console.log(item);
        console.log("item id:", item.id);
    }, [item, itemUpdate]);

    const deleteItem = () => {
        const docRef = db.collection("offers").doc(item.id);
        docRef.delete()
            .then(() => {
                console.log('Usunięto element z bazy danych.');
                navigation.navigate('MyNotice');
            })
            .catch((error) => {
                console.error('Błąd podczas usuwania elementu z bazy danych:', error);
            });
    }

    const updateItem = async () => {
        try {
            const docRef = db.collection("offers").doc(item.id);
            await docRef.update(itemUpdate);
            console.log('Dokument zaktualizowany.', docRef);
            navigation.navigate('MyNotice');
        } catch (error) {
            console.error('Błąd podczas aktualizacji dokumentu w Firestore:', error);
        }

    }

    const updateCena = (text) => {
        console.log("cena: ", text);
        setItemUpdate((prevItem) => ({
            ...prevItem,
            cena: text,
        }));
    };
    const updateOpis = (text) => {
        setItemUpdate((prevItem) => ({
            ...prevItem,
            opis: text,
        }));
    };
    const updateMarka = (text) => {
        setItemUpdate((prevItem) => ({
            ...prevItem,
            marka: text,
        }));
    };
    const updatePrzebieg = (text) => {
        setItemUpdate((prevItem) => ({
            ...prevItem,
            przebieg: text,
        }));
    };
    const updateWoj = (text) => {
        setItemUpdate((prevItem) => ({
            ...prevItem,
            wojewodztwo: text,
        }));
    };
    const updateMiasto = (text) => {
        setItemUpdate((prevItem) => ({
            ...prevItem,
            miasto: text,
        }));
    };

    const updateNumer = (text) => {
        setItemUpdate((prevItem) => ({
            ...prevItem,
            numer: text,
        }));
    };

    const updateModel = (text) => {
        setItemUpdate((prevItem) => ({
            ...prevItem,
            model: text,
        }));
    };


    const updateRok = (text) => {
        setItemUpdate((prevItem) => ({
            ...prevItem,
            rok: text,
        }));
    };

    return (
        <View style={{paddingTop: 50}}>
            <ScrollView style={{height: '100%'}}>

                <View>
                    <View style={[styles.container]}>
                        <Image style={styles.image} source={{uri: item.url}}/>
                        <View style={styles.textContainer}>
                            <View style={styles.textColumn}>
                                <Text style={styles.title}>{item.opis}</Text>
                                <Text style={styles.subtitle}>
                                    Rok: {item.rok} Przebieg: {item.przebieg} Paliwo: {item.paliwo}
                                </Text>
                                <Text style={styles.subtitlePrize}>Cena: {item.cena}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.header}>SZCZEGÓŁY</Text>
                        <View style={styles.details}>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Cena:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updateCena(text)}
                                    value={cena}
                                    placeholder={`${item.cena}`}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Opis:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updateOpis(text)}
                                    value={opis}
                                    placeholder={`${item.opis}`}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Województwo:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updateWoj(text)}
                                    value={wojewodztwo}
                                    placeholder={`${item.wojewodztwo}`}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Miasto:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updateMiasto(text)}
                                    value={miasto}
                                    placeholder={`${item.miasto}`}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Przebieg:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updatePrzebieg(text)}
                                    value={przebieg}
                                    placeholder={`${item.przebieg}`}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Rok:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updateRok(text)}
                                    value={rok}
                                    placeholder={`${item.rok}`}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Marka:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updateMarka(text)}
                                    value={marka}
                                    placeholder={`${item.marka}`}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Model:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updateModel(text)}
                                    value={model}
                                    placeholder={`${item.model}`}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailItem}>
                                    Numer:
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => updateNumer(text)}
                                    value={numer}
                                    placeholder={`${item.numer}`}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.rowButton}>
                    <TouchableOpacity style={styles.buttonPrimaryCancel} onPress={deleteItem}>
                        <Text style={styles.buttonTextPrimary}>Usuń</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPrimary} onPress={updateItem}>
                        <Text style={styles.buttonTextPrimary}>Zmień</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        overflow: 'hidden'
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
    },
    container2: {
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
        flex: 1,
        padding: 20,
        marginBottom: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    details: {
        padding: 10,
    },
    detailItem: {
        fontSize: 16,
        marginBottom: 10,
        marginRight: 20,
    },
    detailValue: {
        fontWeight: 'bold',
    },
    buttonPrimary: {
        backgroundColor: '#37EB2B',
        padding: 15,
        borderRadius: 50,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonPrimaryCancel: {
        backgroundColor: '#a61010',
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
    rowButton: {
        flexDirection: "row",
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 10,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        padding: 10,
        textAlign: "left",
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        textAlign: "center",
    }
});

export default DetailsScreen;

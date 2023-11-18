import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

function DetailsScreen({navigation}) {
    const route = useRoute();
    const item = route.params?.dataFromParent || 'Default Value';

    useEffect(() => {
        console.log(item);
    }, [item]);

    return (
        <View>
            <ScrollView style={{height: '100%', paddingTop: 50}}>

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
                            <Text style={styles.detailItem}>
                                Cena: <Text style={styles.detailValue}>{item.cena}</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Oferta od: <Text style={styles.detailValue}>Prywatne</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Marka pojazdu: <Text style={styles.detailValue}>{item.marka}</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Model: <Text style={styles.detailValue}>{item.model}</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Paliwo: <Text style={styles.detailValue}>{item.paliwo}</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Rok produkcji: <Text style={styles.detailValue}>{item.rok}</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Przebieg: <Text style={styles.detailValue}>{item.przebieg} km.</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Województwo: <Text style={styles.detailValue}>{item.wojewodztwo}</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Miescowość: <Text style={styles.detailValue}>{item.miejscowosc}</Text>
                            </Text>
                            <Text style={styles.detailItem}>
                                Numer telefonu: <Text style={styles.detailValue}>{item.numer}</Text>
                            </Text>
                        </View>
                    </View>
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
    },
    detailValue: {
        fontWeight: 'bold',
    },
});

export default DetailsScreen;

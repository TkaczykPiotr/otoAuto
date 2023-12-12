import * as React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {useEffect} from "react";

const Notice = ({navigation}) => {
    const route = useRoute();
    const items = route.params.cars;

    useEffect(() => {
    }, [items]);

    return (

        <View style={{paddingTop: 25}}>
            <FlatList
                style={{height: '100%'}}
                data={items}
                numColumns={1}
                renderItem={({item, index}) => (
                    <Pressable onPress={() => navigation.navigate('DetailsScreen', {dataFromParent: item})}>
                        <View style={[styles.container]}>
                            <Image style={styles.image} source={{uri: item.url}}/>
                            <View style={styles.textContainer}>
                                <View style={styles.textColumn}>
                                    <Text style={styles.title}>{item.opis}</Text>
                                    <Text
                                        style={styles.subtitle}>Rok: {item.rok} Przebieg: {item.przebieg} Paliwo: {item.paliwo}</Text>
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
    }
});

export default Notice;


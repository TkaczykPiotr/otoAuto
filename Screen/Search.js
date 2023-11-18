import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity} from 'react-native';
import car_list from '../car_list.json';
import {Picker} from '@react-native-picker/picker';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Search({navigation}) {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [models, setModels] = useState([]);
    const [selectedFuelType, setSelectedFuelType] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [productionFrom, setProductionFrom] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleBrandChange = (brand) => {
        setSelectedBrand(brand);
        setModels(car_list.find(item => item.brand === brand).models);
        setSelectedModel('');
    }

    const searchOffers = async () => {
        const db = firebase.firestore();
        let query = db.collection("offers");
        // Filtrowanie po roku
        if (productionFrom && productionTo) {
            let productionResults = await query.where("rok", ">=", parseInt(productionFrom))
                .where("rok", "<=", parseInt(productionTo))
                .get();
            query = db.collection("offers").where("rok", "in", productionResults.docs.map(doc => doc.data().rok));
        }

        // Filtrowanie po cenie
        if (priceTo) {
            let priceResults = await query.where("cena", "<=", parseInt(priceTo))
                .get();
            query = db.collection("offers").where("cena", "in", priceResults.docs.map(doc => doc.data().cena));
        }

        // Filtrowanie po innych kryteriach
        if (selectedBrand) {
            query = query.where("marka", "==", selectedBrand);
        }
        if (selectedModel) {
            query = query.where("model", "==", selectedModel);
        }
        if (selectedFuelType) {
            query = query.where("paliwo", "==", selectedFuelType);
        }

        const searchResults = await query.get();
        console.log("rozmiar: " + searchResults.size);
        if (searchResults) {
            const cars = searchResults.docs.map(doc => doc.data());
            setSearchResults(cars);
            navigation.navigate('Notice', {cars: cars});
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedBrand}
                    style={{
                        height: '100%',
                        width: '100%',
                        color: 'black',
                    }}
                    onValueChange={(itemValue) => handleBrandChange(itemValue)}
                >
                    <Picker.Item label="Wybierz markę" value=""/>
                    {car_list.map(item => (
                        <Picker.Item key={item.value} label={item.brand} value={item.brand}/>
                    ))}
                </Picker>
            </View>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedModel}
                    style={{
                        height: '100%',
                        width: '100%',
                        color: 'black'
                    }}
                    onValueChange={(itemValue) => setSelectedModel(itemValue)}
                    enabled={selectedBrand !== ''}
                >
                    <Picker.Item label="Wybierz model" value=""/>
                    {models.map(model => (
                        <Picker.Item key={model} label={model} value={model}/>
                    ))}
                </Picker>
            </View>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedFuelType}
                    style={{
                        height: '100%',
                        width: '100%',
                        color: 'black'
                    }}
                    onValueChange={itemValue => setSelectedFuelType(itemValue)}>
                    <Picker.Item label="Wybierz paliwo" value=""/>
                    <Picker.Item label="Diesel" value="diesel"/>
                    <Picker.Item label="Benzyna" value="benzyna"/>
                    <Picker.Item label="Benzyna/Gaz" value="benzyna/gaz"/>
                    <Picker.Item label="Elektryczny" value="elektryczny"/>
                </Picker>
            </View>
            <View style={styles.picker}>
                <Picker
                    selectedValue={priceTo}
                    style={{
                        height: '100%',
                        width: '100%',
                        color: 'black'
                    }}
                    onValueChange={itemValue => setPriceTo(itemValue)}>
                    <Picker.Item label="Cena do" value=""/>
                    <Picker.Item label="2000" value="2000"/>
                    <Picker.Item label="4000" value="4000"/>
                    <Picker.Item label="10000" value="10000"/>
                    <Picker.Item label="30000" value="30000"/>
                    <Picker.Item label=">50000" value="1000000"/>
                </Picker>
            </View>
            <View style={styles.picker}>
                <Picker
                    selectedValue={productionFrom}
                    style={{
                        height: '100%',
                        width: '100%',
                        color: 'black'
                    }}
                    onValueChange={itemValue => setProductionFrom(itemValue)}>
                    <Picker.Item label="Rok produkcji od" value=""/>
                    <Picker.Item label="1990" value="1990"/>
                    <Picker.Item label="2000" value="2000"/>
                    <Picker.Item label="2001" value="2001"/>
                    <Picker.Item label="2002" value="2002"/>
                    <Picker.Item label="2003" value="2003"/>
                    <Picker.Item label="2004" value="2004"/>
                    <Picker.Item label="2005" value="2005"/>
                    <Picker.Item label="2006" value="2006"/>
                    <Picker.Item label="2007" value="2007"/>
                    <Picker.Item label="2008" value="2008"/>
                    <Picker.Item label="2009" value="2009"/>
                    <Picker.Item label="2010" value="2010"/>
                    <Picker.Item label="2011" value="2011"/>
                    <Picker.Item label="2012" value="2012"/>
                    <Picker.Item label="2013" value="2013"/>
                    <Picker.Item label="2014" value="2014"/>
                    <Picker.Item label="2015" value="2015"/>
                    <Picker.Item label="2016" value="2016"/>
                    <Picker.Item label="2017" value="2017"/>
                    <Picker.Item label="2018" value="2018"/>
                    <Picker.Item label="2019" value="2019"/>
                </Picker>
            </View>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => {
                searchOffers()
            }}>
                <Text style={styles.buttonTextPrimary}>Wyszukaj</Text>
            </TouchableOpacity>
        </View>
    );

}
;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        borderWidth: 1,
        borderRadius: 30,
        height: '10%',
        width: '80%',
        marginBottom: 10
    },
    textInput: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        margin: 1,
        padding: 1
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    log: {
        height: 50,
        borderRadius: 30,
        width: 100,
        margin: 12,
        padding: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#37EB2B',
    },
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

export default Search;

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity, Alert
} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import car_list from '../car_list.json';
import {db, storage, auth} from "../firebase-config";
import {collection, query, orderBy, limit, where, getDocs, addDoc} from "firebase/firestore";


function Add_Off({navigation}) {
    const [marka, setMarka] = useState();
    const [model, setModel] = useState();
    const [paliwo, setPaliwo] = useState();
    const [rok, setRok] = useState();
    const [wojewodztwo, setWojewodztwo] = useState();
    const [miejscowosc, setMiejscowosc] = useState();
    const [przebieg, setPrzebieg] = useState();
    const [cena, setCena] = useState();
    const [numer, setNumer] = useState();
    const [opis, setOpis] = useState();
    const [models, setModels] = useState([]);
    const [idUser, setIdUser] = useState(auth.currentUser.uid);
    const [idOffer, setIdOffer] = useState();
    const [url, setUrl] = useState('');
    const [errorRok, setErrorRok] = useState('');
    const [errorNumer, setErrorNumer] = useState('');

    useEffect(() => {
        const getLastItem = async () => {
            const objRef = collection(db, 'offers');
            const q = query(objRef, orderBy('id', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const lastItem = querySnapshot.docs[0].data();
                setIdOffer(lastItem.id + 1)
            } else {
                console.log('Brak rekordów w kolekcji');
            }
        }
        getLastItem().then(r => 'pobrano dane z offers')
    }, []);
    const handleBrandChange = (brand) => {
        setMarka(brand);
        setModels(car_list.find(item => item.brand === brand).models);
        setModel('');
    };

    const handleInputChangeRok = (text) => {
        if (/^\d{4}$/.test(text)) {
            setRok(text);
            setErrorRok('');
        } else {
            setRok(text);
            setErrorRok('Wprowadź poprawną datę.');
        }
    };

    const handleInputChangeNumer = (text) => {
        if (/^\d{9}$/.test(text)) {
            setNumer(text);
            setErrorNumer('');
        } else {
            setNumer(text);
            setErrorNumer('Wprowadź poprawny numer telefonu');
        }
    };

    const handleDataFromPhoto = (data) => {
        setUrl(data);
    }

    async function add() {
        console.log(opis);
        try {
            if (!opis || !wojewodztwo || !marka || !paliwo || !cena || !przebieg || !miejscowosc || !rok || !model || !numer) {
                Alert.alert('Błąd', 'Nie podano wszystkich informacji.');
            } else {
                const docRef = await addDoc(collection(db, "offers"), {
                    idOffer: idOffer,
                    idUser: idUser,
                    opis: opis,
                    wojewodztwo: wojewodztwo,
                    marka: marka,
                    paliwo: paliwo,
                    cena: parseInt(cena),
                    przebieg: parseInt(przebieg),
                    miejscowosc: miejscowosc,
                    rok: parseInt(rok),
                    model: model,
                    numer: numer,
                    url: url
                });
                console.log("document saved correctly", docRef.id);
                clear();
                navigation.navigate('NoticeAll');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const back = () => {
        clear();
        navigation.goBack();
    }

    const clear = () => {
        setMarka(null);
        setModel(null);
        setCena(null);
        setNumer(null);
        setOpis(null);
        setRok(null);
        setPrzebieg(null);
        setMiejscowosc(null);
        setWojewodztwo(null);
        setPaliwo(null);
        setUrl(null);
        setIdUser(null);
        setIdOffer(null);
    }


    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.headerForm}>Opis</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setOpis(text)}
                        value={opis}
                        placeholder="Opis"
                    />
                    <Picker
                        selectedValue={marka}
                        style={styles.picker}

                        onValueChange={(itemValue) => handleBrandChange(itemValue)}
                    >
                        <Picker.Item label="Wybierz markę" value=""/>
                        {car_list.map(item => (
                            <Picker.Item key={item.value} label={item.brand} value={item.brand}/>
                        ))}
                    </Picker>

                    <Picker
                        selectedValue={model}
                        style={styles.picker}

                        onValueChange={(itemValue) => setModel(itemValue)}
                        enabled={marka !== ''}
                    >
                        <Picker.Item label="Wybierz model" value=""/>
                        {models.map(model => (
                            <Picker.Item key={model} label={model} value={model}/>
                        ))}
                    </Picker>

                    <Picker
                        style={styles.picker}
                        selectedValue={paliwo}
                        onValueChange={itemValue => setPaliwo(itemValue)}>
                        <Picker.Item label="Wybierz paliwo" value=""/>
                        <Picker.Item label="Diesel" value="diesel"/>
                        <Picker.Item label="Benzyna" value="benzyna"/>
                        <Picker.Item label="Benzyna/Gaz" value="benzyna/gaz"/>
                        <Picker.Item label="Elektryczny" value="elektryczny"/>
                    </Picker>


                    <Text style={styles.headerForm}>Rok Produkcji</Text>
                    <TextInput
                        style={[styles.input, errorRok && styles.errorInput]}
                        onChangeText={handleInputChangeRok}
                        value={rok}
                        placeholder="Rok produkcji"
                        keyboardType="numeric"
                    />
                    {errorRok ? <Text style={styles.errorText}>{errorRok}</Text> : null}
                    <Text style={styles.headerForm}> Przebieg</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setPrzebieg(text)}
                        value={przebieg}
                        placeholder="Przebieg"
                        keyboardType="numeric"
                    />
                    <Text style={styles.headerForm}>Województwo</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setWojewodztwo(text)}
                        value={wojewodztwo}
                        placeholder="Województwo"
                    />
                    <Text style={styles.headerForm}>Miejscowość</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setMiejscowosc(text)}
                        value={miejscowosc}
                        placeholder="Miejscowość"
                    />
                    <Text style={styles.headerForm}>Cena</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setCena(text)}
                        value={cena}
                        placeholder="Cena"
                        keyboardType="numeric"
                    />
                    <Text style={styles.headerForm}>Numer Telefonu</Text>
                    <TextInput
                        style={[styles.input, errorNumer && styles.errorInput]}
                        onChangeText={handleInputChangeNumer}
                        value={numer}
                        placeholder="Numer"
                        keyboardType="numeric"
                    />
                    {errorNumer ? <Text style={styles.errorText}>{errorNumer}</Text> : null}


                    <TouchableOpacity style={styles.button}
                                      onPress={() => navigation.navigate('ChoosePhoto', {dataUrl: handleDataFromPhoto})}>
                        <FontAwesome5 name="camera" size={24} color="white"/>
                        <Text style={styles.buttonText}>Dodaj zdjęcie</Text>
                    </TouchableOpacity>

                    <View style={styles.rowButton}>
                        <TouchableOpacity style={styles.buttonPrimaryCancel}
                                          onPress={back}>
                            <Text style={styles.buttonTextPrimary}>Anuluj</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPrimary} onPress={() => add()} disabled={!!errorRok}>
                            <Text style={styles.buttonTextPrimary}>Dodaj ogłoszenie</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20, // Zaokrąglenie pól wejściowych
        marginBottom: 10,
        padding: 10,
    },

    label: {
        fontSize: 18,
        marginBottom: 10,
    },

    picker: {
        width: 300,
        height: 50,
        borderColor: '#F5CCB0',
        borderWidth: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderStyle: 'solid'
    },
    buttonx: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },

    rowButton: {
        flexDirection: "row",
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    headerForm: {
        fontSize: 20,
        fontWeight: "bold"
    },
    buttonPrimary: {
        backgroundColor: '#2F2F4F',
        padding: 15,
        borderRadius: 50, // Zaokrąglenie, aby uzyskać kształt okręgu
        marginBottom: 10,
        width: 200, // Szerokość przycisków (możesz dostosować)
        alignItems: 'center',
        marginTop: 20
    },
    buttonPrimaryCancel: {
        backgroundColor: '#37EB2B',
        padding: 15,
        borderRadius: 50, // Zaokrąglenie, aby uzyskać kształt okręgu
        marginBottom: 10,
        width: 180, // Szerokość przycisków (możesz dostosować)
        alignItems: 'center',
        marginTop: 20
    },
    buttonTextPrimary: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3498db',
        flexDirection: 'row', // Aby wyświetlić ikonę obok tekstu
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10, // Zaokrąglenie przycisku
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10, // Odstęp między ikoną a tekstem
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
});


export default Add_Off;

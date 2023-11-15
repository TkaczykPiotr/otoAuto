import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {addDoc, collection, getDocs, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {db, storage} from "../firebase-config";


export default function ChoosePhoto({navigation}) {
    const [image, setImage] = useState(null);
    const [isSelect, setSelect] = useState(false);
    const [files, setFiles] = useState([]);
    const route = useRoute();


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("New file", change.doc.data());
                    setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
                }
            });
        });
        return () => unsubscribe();
    }, []);


    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [500, 500],
            quality: 1,
        });

        if (!result.canceled) {
            setSelect(true)
            console.log(result.assets[0].uri)
            setImage(result.assets[0].uri);
        }
    };

    const goNext = async () => {
        await uploadImage(image, "image");

        navigation.goBack();
    }

    async function uploadImage(uri, fileType) {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, "image/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob);

        // listen for events
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
                // handle error
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // save record
                    const dataUrl = route.params?.dataUrl;

                    if (dataUrl) {
                        dataUrl(downloadURL)
                    }
                    await saveRecord(fileType, downloadURL, new Date().toISOString());
                    setImage(null);
                });
            }
        );


    }

    async function saveRecord(fileType, url, createdAt) {
        try {
            const docRef = await addDoc(collection(db, "files"), {
                fileType: fileType,
                url: url,
                createdAt: createdAt,
            });
            console.log("document saved correctly", docRef.id);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <View style={styles.container}>
            {image && (
                <Image source={{uri: image}} style={styles.image}/>
            )}
            {!isSelect && (
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => pickImage()}>
                    <Text style={styles.buttonTextPrimary}>Wybierz zdjęcie</Text>
                </TouchableOpacity>

            )}
            {isSelect && (
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => goNext()}>
                    <Text style={styles.buttonTextPrimary}>OK</Text>
                </TouchableOpacity>

            )}

            <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonTextPrimary}>Powrót</Text>
            </TouchableOpacity>

        </View>
    );
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
        width: 380,
        height: 390,
        margin: 10,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

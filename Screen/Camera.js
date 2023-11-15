import { Camera, CameraType } from 'expo-camera';
import {useEffect, useRef, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-gesture-handler';

export default function CameraScreen({navigation}) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [image, setImage] = useState("")
    const camera = useRef(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

     function takePhoto() {
        camera.current.takePictureAsync()
        .then((picture)=> {
            console.log(picture)
        setImage(picture.uri);
        })
       .catch(err => console.error("error: " + err));
      }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={camera}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Obróć kamerę</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Text style={styles.text}>Zrób zdjęcie</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <View style={{flex:1}}>
                <Image style={{width: 400, height: 400, marginLeft:10, marginTop: 10}}
                       source={{
                           uri:image
                       }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
//import { Feather } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'

const ImageUpload = ({ onSaveImage }) => {

    const [image, setImage] = useState(null)
    const [permissions, setPermissions] = useState(false)

    useEffect(() => {
        (async () => {
            const status1 = await (await ImagePicker.requestCameraRollPermissionsAsync()).status
            const { status } = await ImagePicker.requestCameraPermissionsAsync()
            if (status !== 'granted' || status1 !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            } else {
                setPermissions(true)
            }
        })();
    }, []);


    const pickImageCameraRoll = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
        onSaveImage(result.uri)
    };


    const pickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
        onSaveImage(result.uri)
    };



    return (
        <View style={styles.container}>
            {
                permissions ?
                    <View style={styles.iconsView}>
                        <TouchableOpacity
                            onPress={pickImageCamera}
                        >
                            <View style={styles.icon}>
                                <Feather name="camera" size={40} color="white" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={pickImageCameraRoll}
                        >
                            <View style={styles.icon}>
                                <Feather name="image" size={40} color="white" />
                            </View>
                        </TouchableOpacity>

                    </View>
                    : <Text style={styles.err}>Sorry, we need camera permissions to make this work!</Text>
            }
            {image && <Image source={{ uri: image }} style={styles.img} />}
        </View>
    )
}

export default ImageUpload

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        backgroundColor: '#085C06',
        padding: 10,
        borderRadius: 25,
        margin: 10
    },
    iconsView: {
        flexDirection: 'row'
    },
    img: {
        width: 300,
        height: 200,
        borderRadius: 10
    },
    err: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center'
    }
})
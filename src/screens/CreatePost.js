import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { db, auth } from '../firebase/config';
import {Ionicons, FontAwesome6} from '@expo/vector-icons';

export default function CreatePost({ navigation }) {
    const [description, setDescription] = useState('')
    const [error, setError] = useState('');

    const onSubmit = () => {

        if (description === '') {
            setError('La descripción no puede estar vacía')
            return
        }
        db.collection('posts')
            .add({
                owner: auth.currentUser.email,
                description: description,
                createdAt: Date.now(),
                likes: [],
            })

            .then(() => {
                setDescription('')
                navigation.navigate('StackHome')
            })
            .catch(e => console.log(e))
    }


    return (
        <View style={styles.container}>

            <View style={styles.topFila}>
                <Ionicons name="person-circle-sharp" size={50} color="black" />
                <View style={styles.rightCol}>
                    <Text style={styles.userName}>{auth.currentUser.email}</Text>
                    <TextInput
                        style={styles.textoInput}
                        placeholder="¿Qué quieres postear?"
                        onChangeText={text => setDescription(text)}
                        value={description}
                        //falta el keyboardtype?
                    />
                    {error !== '' && <Text>{error}</Text>}

                    <Pressable style={styles.postBtn} onPress={() => onSubmit()}>
                        <Text style={styles.postBtnTexto}> <FontAwesome6 name="arrow-up" size={13} color="white" />  Postear</Text>
                    </Pressable>
                </View>

            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    topFila: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    rightCol: {
        flex: 1,
        marginLeft: 12,
    },
    userName: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#1a1a1a',
        marginBottom: 10,
        marginTop: 10,
    },
    textoInput: {
        fontSize: 13,
        color: 'black',
        borderWidth: 1,
        borderColor: '#bbc5cb',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 16,
    },
    postBtn: {
        backgroundColor: '#1d9bf0',
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 18,
        alignSelf: 'flex-start',
    },
    postBtnTexto: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    
    },
})
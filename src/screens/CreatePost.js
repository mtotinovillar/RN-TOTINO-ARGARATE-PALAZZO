import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import {useState} from 'react';
import{db, auth} from '../firebase/config';

export default function CreatePost({navigation}){
    const[description, setDescription] = useState('')

    const onSubmit = () => {
        db.collection('posts')
        .add({
            owner: auth.currentUser.email,
            description: description,
            createdAt: Date.now(),
            likes: [],
            image: ''
        })

        .then(( ) => {
            navigation.navigate('Feed')
        })
        .catch(e => console.log (e))
    }


    return(
        <View style={styles.container}>
            <Text>Crear post</Text>

            <TextInput
                style = {styles.desc}
                placeholder = 'Descripción'
                onChangeText = {text => setDescription(text)}
                value = {description}
            />

            <Pressable onPress={()=>onSubmit()}>
               <Text>Publicar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    desc: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12
    }
})
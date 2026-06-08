import { View, Text, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function PostItem({ post, navigation }) {
    const userEmail = auth.currentUser.email;
    const likes = post.data.likes;
    const likeado = likes.filter(like => like === userEmail).length > 0;

    const onSubmit = () => {
        db.collection('posts')
            .doc(post.id)
            .update({
                likes: likeado ? firebase.firestore.FieldValue.arrayRemove(userEmail)
                    : firebase.firestore.FieldValue.arrayUnion(userEmail)
            })
            .then(() => {
                console.log('Like actualizado');
            })
    }

    return (
        <View style={styles.card}>

            <View style={styles.header}>
                <Ionicons name="person-circle-sharp" size={30} color="black" style={styles.iconoprofile} />
                <Text style={styles.owner}>{post.data.owner}</Text>
            </View>

            <Text style={styles.descripcion}>{post.data.description}</Text>

            <View style={styles.acciones}>
                <View style={styles.acciones}>
                    <Pressable onPress={onSubmit}>
                        <Text style={styles.like}>{likeado ? <FontAwesome name="heart" size={18} color="red" /> : <FontAwesome name="heart" size={18} color='rgba(0, 0, 0, 0.47)' />}({likes.length}) </Text>
                    </Pressable>
                </View>

                <Pressable onPress={() => navigation.navigate('Comments', { post })}>
                    <FontAwesome name="commenting" size={22} color='rgba(0, 0, 0, 0.47)' />
                </Pressable>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 12,
        paddingRight: 70,
        paddingBottom: 12,
        paddingTop: 12,
        marginBottom: 10,
        marginTop: 5,
        borderRadius: 8,
        maxWidth: '100vw',

    },
    owner: {
        paddingLeft: 8,
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    descripcion: {
        fontSize: 14,
        marginBottom: 8,
        maxWidth: '100%',
        wordWrap: 'break-word',

    },
    acciones: {
        flexDirection: 'row',
    },
    like: {
        fontSize: 16,
        marginRight: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    comments: {
        fontSize: 14,
        color: 'blue',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    acciones: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
})


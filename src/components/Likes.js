import { View, Text, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default function Likes({ post, navigation }) {
    const userEmail = auth.currentUser.email;
    const likes = post.likes;
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
            <Text style={styles.owner}>{post.owner}</Text>
            <Text style={styles.description}>{post.description}</Text>

            <View style={styles.acciones}>
                <Pressable onPress={onSubmit}>
                    <Text style={styles.like}>{likeado ? '❤️' : '🤍'}({likes.length}) </Text>
                </Pressable>
            </View>

            <Pressable onPress={() => navigation.navigate('Comments', { post })}>
                <Text style={styles.comments}>Ver comentarios</Text>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 10,
    },
    owner: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
    },
    acciones: {
        flexDirection: 'row',
    },
    like: {
        fontSize: 16,
        marginRight: 16,
    },
    comments: {
        fontSize: 14,
        color: 'blue',
    },
})


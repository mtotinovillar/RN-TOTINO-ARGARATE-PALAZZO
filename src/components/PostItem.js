import {View,Text, Pressable, StyleSheet} from 'react-native';
import {db, auth} from '../firebase/config';
import firebase from 'firebase';

export default function PostItem ({post, nav}){
    const userEmail = auth.currentUser.email;
    const likes = post.likes;
    const likeado = likes.filter(like =>like === useEmail).length > 0;

    const onSubmit = () => {
        db.collection('posts')
        .doc(post.id)
        .update({
            likes: likeado ? firebase.firestore.FieldValue.arrayRemove(userEmail)
            : firebase.firestore.FieldValue.arrayUnion(userEmail)
        })
    }

    return(
        <View>
            <Text>{post.owner}</Text>
            <Text>{post.description}</Text>

            <View>
                <Pressable onPress={onSubmit}>
                    <Text>{likeado ? '❤️' : '🤍'}({likes.length}) </Text>
                </Pressable>
            </View>

            <Pressable></Pressable>
        </View>
        
    )
}

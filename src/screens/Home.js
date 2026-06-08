import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import { db } from '../firebase/config';
import Likes from '../components/Likes';

export default function Home({ navigation }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const unsubscribe = db
            .collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {

                let postsArray = [];

                docs.forEach(doc => {
                    postsArray.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setPosts(postsArray);
            });

        return () => unsubscribe();

    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <Likes
                        post={item}
                        navigation={navigation}
                    />
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
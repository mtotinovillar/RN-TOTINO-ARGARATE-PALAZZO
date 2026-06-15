import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { db } from '../firebase/config';
import Likes from '../components/PostItem';


export default function Home(props) {

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
                
          <Text style={styles.titulo}>SinFiltro</Text>

            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <Likes
                        post={item}
                        navigation={props.navigation}
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
        backgroundColor: 'rgb(201, 232, 255.1)',
        maxWidth: '100%',
    },

    titulo: {
        fontSize: 40,
        display: 'flex',
        alignItems: 'Left',
        fontWeight: 'bold',
        margin: 20,
    },
});
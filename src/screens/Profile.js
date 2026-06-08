import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostItem from '../components/PostItem'

export default function Profile({ navigation }) {
    const [userName, setUserName] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push(
                        {
                            id: doc.id,
                            data: doc.data()
                        }
                    );
                });
                setUserName(users[0].data.userName);
            }
        )

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let myPosts = [];
                docs.forEach(doc => {
                    myPosts.push(
                        {
                            id: doc.id, data: doc.data()
                        });
                });
                setPosts(myPosts);
            })

    }, []);

    const logout = () => {
        auth.signOut()
            .then(() => navigation.navigate('Login'))
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Ionicons name="person-circle-sharp" size={50} color="black" />
                <Text style={styles.title}>My Profile</Text>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.email}>{auth.currentUser.email}</Text>

                <Pressable
                    style={styles.button}
                    onPress={() => logout()}>
                    <Text style={styles.buttonText}>Desloguearse</Text>
                </Pressable>
            </View>


            <Text style={styles.postsTitle}>Mis posts</Text>

            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <PostItem post={item} navigation={navigation} />
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 16,
        backgroundColor: 'rgb(201, 232, 255.1)',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        marginTop: 8,
    },
    userName: {
        fontSize: 20,
        fontWeight: '500',
        color: '#1a1a1a',
        marginBottom: 8,
        marginTop: 6,
    },
    email: {
        fontSize: 14,
        color: 'gray',
        marginTop: 6,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#e74c3c',
        padding: 12,
        borderRadius: 8,
        alignSelf: 'center',
        paddingHorizontal: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    postsTitle: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 12,
        color: '#1a1a1a',
        borderBottomWidth: 0.5,
        borderBottomColor: '#abd0f8',
        paddingBottom: 8,
    },
    postCard: {
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    postText: {
        fontSize: 14,
        color: '#1a1a1a',
    }
})

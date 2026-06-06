import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile({navigation}) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
      docs => {
        let users = [];
        docs.forEach(doc => {
          users.push(
            {id: doc.id,
              data: doc.data()
            }
          );
        });
        setUserName(users[0].data.userName);
      }
    )
  }, []);

  const logout = () => {
    auth.signOut()
    .then (() => navigation.navigate('Login'))
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
     <Ionicons name="person-circle-sharp" size={50} color="black" style={styles.iconoprofile}/>
      <Text style={styles.title}>Profile</Text>
      </View>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.email}>{auth.currentUser.email}</Text>

        <Pressable
         style={styles.button}
         onPress={() => logout()}>
              <Text style={styles.buttonText}>Desloguearse</Text>
            </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
 
});
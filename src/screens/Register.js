import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth } from '../firebase/config';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

    const [register, setRegister] = useState('');
    const [registerError, setRegisterError] = useState('');


  const onSubmit = () => {
    console.log('Email:', email);
    console.log('Username:', userName);
    console.log('Password:', password);

    auth.createUserWithEmailAndPassword(email, password)
      .then(response => { 
        setRegister(true);
        console.log("me registre");
        props.navigation.navigate('Login')
      })
      .catch(error => {
        console.log('error create', error)
        setRegisterError('Fallo en el registro')
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <View style={styles.container2}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          placeholder="Ingrese su email"
        />

        <Text>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          keyboardType='default'
          value={userName}
          onChangeText={text => setUserName(text)}
          placeholder="Ingrese su usuario"
        />

        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          keyboardType='number-pad'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Ingrese su contraseña"
        />

        <Pressable style={styles.buttonInput} onPress={onSubmit}>
          <Text style={styles.buttonTextInput}>Registrate</Text>
        </Pressable>

        <View style={{ marginTop: 20 }}>
          <Text>Email: {email}</Text>
          <Text>Username: {userName}</Text>
          <Text>Password: {password}</Text>
        </View>

      </View>

      <Pressable
        style={styles.button}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Ya tengo cuenta</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container2: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ffa8fcff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 10,
  },
  buttonInput: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#28a745',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonTextInput: {
    color: '#fff',
  },

});
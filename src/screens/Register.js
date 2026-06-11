import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState('');
  const [registerError, setRegisterError] = useState('');


  const onSubmit = () => {
    if (!email || !password || !userName) {
      setUserNameError('Todos los campos son obligatorios')
      return
    }
    
    console.log('Users:', userName, email);
    console.log('Password:', password); 

    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        db.collection('users').add({
          email: response.user.email,
          userName: userName
        })
        .then(()=>{
          props.navigation.navigate('Login')
        })
      
      })
        .catch(error => {
          console.log('error create', error)
          setRegisterError(error.message)
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
          onChangeText={text => {setEmail(text), setRegisterError('')}}
          keyboardType="email-address"
          placeholder="Ingrese su email"
        />

        <Text>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          keyboardType='default'
          value={userName}
          onChangeText={text => {setUserName(text), setRegisterError('')}}
          placeholder="Ingrese su usuario"
        />

        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          keyboardType='number-pad'
          value={password}
          onChangeText={text => {setPassword(text), setRegisterError('')}}
          secureTextEntry={true}
          placeholder="Ingrese su contraseña"
        />

        {registerError !== '' ? <Text>{registerError}</Text> : null}

        <Pressable style={styles.buttonInput} onPress={onSubmit}>
          <Text style={styles.buttonTextInput}>Registrate</Text>
        </Pressable>

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
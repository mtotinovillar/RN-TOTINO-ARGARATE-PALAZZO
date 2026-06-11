import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth } from '../firebase/config';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, setLogin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('HomeMenu')
      }
    })
  }, []);

  const onSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email.includes('@')) {
      setError('Email mal formateado');
      return;
    }

    if (password.length < 6) {
      setError('La password debe tener una longitud mínima de 6 caracteres');
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        setLogin(true);
        props.navigation.navigate('HomeMenu')
      })
      .catch(error => {
        setError('Credenciales incorrectas')
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Login</Text>

      <View style={styles.container2}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          placeholder="Ingrese su email"
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
        
        {
  error !== ''
    ? <Text style={styles.error}>{error}</Text>
    : null
}

        <Pressable style={styles.buttonInput} onPress={onSubmit}>
          <Text style={styles.buttonTextInput}>Login</Text>
        </Pressable>

      </View>
<Text>¿No tenés cuenta?</Text>
      <Pressable
        style={styles.button}
        onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
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

  error: {
    color: 'red',
    marginVertical: 10,
  },

});
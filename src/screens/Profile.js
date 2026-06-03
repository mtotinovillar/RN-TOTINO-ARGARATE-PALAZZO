import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

        <Pressable
         style={styles.button}
         onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Desloguearse</Text>
            </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 25,
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
});
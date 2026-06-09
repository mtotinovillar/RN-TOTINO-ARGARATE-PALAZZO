import { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/config'

export default function Comments({ route }) {
  const { postId } = route.params

  const [comentario, setComentario] = useState('')
  const [comentarios, setComentarios] = useState([])

  useEffect(() => {
    db.collection('comments')
      .where('postId', '==', postId)
      .onSnapshot(docs => {
        let lista = []
        docs.forEach(doc => {
          lista.push({ id: doc.id, data: doc.data() })
        })
        setComentarios(lista)
      })
  }, [])

  const agregarComentario = () => {
    db.collection('comments').add({
      postId: postId,
      owner: auth.currentUser.email,
      text: comentario,
      createdAt: Date.now(),
    })
      .then(() => setComentario(''))
      .catch(e => console.log(e))
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={comentarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.comentarioItem}>
            <Text style={styles.user}>{item.data.owner}</Text>
            <Text style={styles.texto}>{item.data.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Escribí un comentario..."
          value={comentario}
          onChangeText={setComentario}
        />
        <Pressable style={styles.boton} onPress={agregarComentario}>
          <Text style={styles.botonTexto}>Enviar</Text>
        </Pressable>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  comentarioItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  user: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  texto: {
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  boton: {
    backgroundColor: '#6200ea',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
})


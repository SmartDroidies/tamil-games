import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { API, graphqlOperation } from 'aws-amplify'
import { createVarthai } from '../../graphql/mutations'
import { listVarthais } from '../../graphql/queries'

const initialState = { varthai: '', hint: '' }


const CreateJumbleComponent = () => {
  const [formState, setFormState] = useState(initialState)
  const [varthais, setVarthais] = useState([])

  useEffect(() => {
    fetchVarthais()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchVarthais() {
    try {
      const varthaiData = await API.graphql(graphqlOperation(listVarthais))
      const varthais = varthaiData.data.listVarthais.items
      setVarthais(varthais)
    } catch (err) { console.log('error fetching varthais') }
  }

  async function addVarthai() {
    try {
      const varthai = { ...formState }
      setVarthais([...varthais, varthai])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createVarthai, {input: varthai}))
    } catch (err) {
      console.log('error creating varthai:', err)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={val => setInput('varthai', val)}
        style={styles.input}
        value={formState.name} 
        placeholder="Varthai"
      />
      <TextInput
        onChangeText={val => setInput('hint', val)}
        style={styles.input}
        value={formState.description}
        placeholder="Hint"
      />
      <Button title="Create Vathai" onPress={addVarthai} />
      {
        varthais.map((varthai, index) => (
          <View key={varthai.id ? varthai.id : index} style={styles.varthai}>
            <Text style={styles.varthaiName}>{varthai.varthai}</Text>
            <Text>{varthai.hint}</Text>
          </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  varthai: {  marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  varthaiName: { fontSize: 18 }
})

export default CreateJumbleComponent;

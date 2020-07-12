import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { API, graphqlOperation } from 'aws-amplify'
import { listVarthais } from '../../graphql/queries'
import { TouchableHighlight } from 'react-native-gesture-handler';

const initialState = { varthai: 'HANISH', hint: '' }
const JumbleComponent = () => {
    const [varthais, setVarthais] = useState([])
    const [varthai,setVarthai] = useState(initialState)
    const [finalVarthai, setFinalVarthai]= useState('')
    useEffect(() => {
      fetchVarthais()
    }, [])
    
    function tapOnLetters(letter,i){
      if(varthai.varthai.length>=finalVarthai){
       setFinalVarthai(finalVarthai+''+letter);
      }
    }
    function shuffle(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        
        return array;
    }

    async function fetchVarthais() {
      try {
        const varthaiData = await API.graphql(graphqlOperation(listVarthais))
        const varthais = varthaiData.data.listVarthais.items
        setVarthais(varthais)
        //setVarthai(varthais[0])
        
      } catch (err) { console.log('error fetching varthais') }
    }
    
    return(
        <View style={styles.container}>
          <View style={styles.varthaiWrapper}>
         {
           ([...finalVarthai].map((letter,i)=>(
             <View key={i}>
               <Text style={styles.finalLetterText}>{letter}</Text>
             </View>
           )
           for(int i=finalVarthai.length;i<varthai.varthai.length;i++){

           }
           )
         }
        
      </View>

       <View style={styles.varthaiWrapper}>
         {
           [...varthai.varthai].map((letter,i)=>(
             <View key={i}>
               <View style={styles.textInputUnderLine}></View>
             </View>
           ))
         }
      </View>
          <View style={styles.varthaiWrapper}>
            {
              (shuffle([...varthai.varthai])).map((letter,i)=>(
                <TouchableHighlight key={i} style={styles.letterWrapper} onPress={()=>tapOnLetters(letter)}>
                  <Text style={styles.letterText}>{letter}</Text>  
                </TouchableHighlight>    
              ))
            }
            </View>
          <View style={styles.varthaiWrapper}>
            <Button title='DELETE'></Button>
            <Button title='CLEAR'></Button>
          </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', flexDirection:'column'},
    varthaiWrapper: { width:'100%', justifyContent:'space-evenly' , flexDirection:'row' ,padding: 10},
    textInputUnderLine : { width :50, height:5, backgroundColor : 'black'},
    letterWrapper: {  width :50, height:50, backgroundColor: '#0000ff' ,borderRadius: 50},
    letterText :{ fontSize: 25, height:'100%' ,color:'#ffffff' ,textAlign : 'center' , textAlignVertical:'center'},
    finalLetterText :{ fontSize: 25, height:'100%' ,color:'#000000' ,textAlign : 'center' , textAlignVertical:'center'}

});
export default JumbleComponent;
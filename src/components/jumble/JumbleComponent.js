import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { API, graphqlOperation } from 'aws-amplify'
import { listVarthais } from '../../graphql/queries'
import { TouchableHighlight } from 'react-native-gesture-handler';

const initialState = { varthai: 'HANISH', hint: '' }
const JumbleComponent = () => {
    const [varthai,setVarthai] = useState(initialState)
    const [shuffledVarthai,setShuffledVarthai] = useState([])
    const [finalVarthai, setFinalVarthai]= useState([])
    useEffect(() => {
      //fetchVarthais()
      console.log('Shuffle Varthai Loaded')
      let shuffledVarthaiArray=[];
      shuffle([...varthai.varthai]).forEach((letter,i)=>{
        shuffledVarthaiArray.push({'letterText':letter,'state':false});
      });
     // console.log(shuffledVarthaiArray);
      setShuffledVarthai(shuffledVarthaiArray)
    }, [varthai])//change it on change of varthai
    
    function tapOnLetters(letter,i){
      if(varthai.varthai.length>=finalVarthai.length){
       setFinalVarthai([...finalVarthai,letter.letterText])
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
        //const varthaiData = await API.graphql(graphqlOperation(listVarthais))
        //const varthais = varthaiData.data.listVarthais.items
        //setVarthais(varthais)
        //setVarthai(varthais[0])
        
      } catch (err) { console.log('error fetching varthais') }
    }
    
    return(
        <View style={styles.container}>
          <View style={styles.varthaiWrapper}>
         {
           finalVarthai.map((letter,i)=>(
            <View key={i} style={styles.finalLetterWrapper} >
              <Text style={styles.finalLetterText}>{finalVarthai[i]}</Text>  
            </View>    
          ))
         }
      </View>

       <View style={styles.varthaiWrapper}>
         {
           [...varthai.varthai].map((letter,i)=>(
             <View key={i} style={styles.textInputUnderLineWrapper}>
               <View style={styles.textInputUnderLine}></View>
             </View>
           ))          
         }
         {
          <View style={styles.clearButtonWrapper}>
            <Text style={styles.clearButton}>X</Text>
          </View>
        }
      </View>
          <View style={styles.varthaiWrapper}>
              {
                (shuffledVarthai).map((letter,i)=>{
                  console.log( " Shuffled Varthai  i="+i+", Letter="+letter.letterText);
                  return (<TouchableHighlight key={i} className={'letterWrapper '+letter.state} style={styles.letterWrapper } onPress={()=>{tapOnLetters(letter)}}>
                    <Text style={styles.letterText}>{letter.letterText}</Text>  
                  </TouchableHighlight>);    
                })
              }
              {
              <View>
                <Text style={styles.clearButton}></Text>
              </View>
              }
          </View>
         
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', flexDirection:'column'},
    varthaiWrapper: { width:'100%', justifyContent:'space-evenly' , flexDirection:'row' ,padding: 10},
    textInputUnderLine : { width :30, height:5, marginTop:25,backgroundColor : 'black'},
    textInputUnderLineWrapper:{width :30, height:30},
    clearButton : { width :30, height:30,marginLeft: 16, color : 'red' ,fontSize:13 },
    clearButtonWrapper: {  width :25, height:25,borderRadius: 25 , borderColor:'red',borderWidth:2, 
     alignItems:'center'},
    letterWrapper: {  width :30, height:30, backgroundColor: '#0000ff' ,borderRadius: 30},
    letterText :{ fontSize: 15, height:'100%' ,color:'#ffffff' ,textAlign : 'center' , textAlignVertical:'center'},
    finalLetterWrapper: {  width :30, height:30},
    finalLetterText :{ fontSize: 15, height:'100%' ,color:'#000000' ,textAlign : 'center' , textAlignVertical:'center'}

});
export default JumbleComponent;
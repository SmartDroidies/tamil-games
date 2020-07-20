import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const JumbledWord = (props) => {
    const [shuffledVarthai,setShuffledVarthai] = useState([props.varthai])
    return (
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
    );
}



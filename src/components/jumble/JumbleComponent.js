import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { render } from 'react-dom';

const initialState = { varthai: 'HANISH', hint: '' }
export default class JumbleComponent extends Component {
   // const [varthai,setVarthai] = useState(initialState);
    //const [shuffledVarthai,setShuffledVarthai] = useState(buildShuffledVarthai(shuffle([...varthai.varthai])))
    //const [finalVarthai, setFinalVarthai]= useState([])
    state = {
      'varthai' : initialState,
      'shuffledVarthai' : this.buildShuffledVarthai(
        this.shuffle([...initialState.varthai])) ,
      'finalVarthai' : []
    };
    componentDidMount(){
      this.fetchVarthais();
    }
  
    
   tapOnLetters(letter){
      //console.log("onPress",letter);
      if(!letter.pushed&&this.state.varthai.varthai.length>=this.state.finalVarthai.length){
       this.setState({'finalVarthai':[...this.state.finalVarthai,letter.letterText]});
       letter.pushed=true;
       this.setState({'shuffledVarthai':this.state.shuffledVarthai});
      }
    }
   buildShuffledVarthai(shuffledVarthaiArray){
      var shuffledVarthaiTmp=[];
      shuffledVarthaiArray.map((letter,i)=>{
        shuffledVarthaiTmp.push({'letterText':letter,'pushed':false});
      });
      return shuffledVarthaiTmp;
  }
   shuffle(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
    }

    fetchVarthais() {
      try {
        //const varthaiData = await API.graphql(graphqlOperation(listVarthais))
        //const varthais = varthaiData.data.listVarthais.items
        //setVarthais(varthais)
        //setVarthai(varthais[0])
        this.setState({'shuffledVarthai':this.buildShuffledVarthai(this.shuffle([...this.state.varthai.varthai]))});
      } catch (err) { console.log('error fetching varthais') }
    }
  render(){
    return(
        <View style={styles.outterContainer}>
          <View style={styles.container}>
            <View style={styles.varthaiWrapper}>
              {
                this.state.shuffledVarthai.map((letter,i)=>(
                  <View key={i} style={styles.finalLetterWrapper}>
                    <Text style={styles.finalLetterText}>{this.state.finalVarthai.length<=this.state.shuffledVarthai.length?this.state.finalVarthai[i]:' '}</Text>
                  </View>
                ))
              }
            </View>
            <View style={styles.varthaiWrapper}>
              {
                this.state.shuffledVarthai.map((letter,i)=>(
                  <View key={i}>
                    <View style={styles.textInputUnderLine}></View>
                  </View>
                ))
              }
            </View>
            <View style={styles.varthaiWrapper}>
              {
                this.state.shuffledVarthai.map((letter,i)=>{
                  console.log("onshuffledVarathai Change",letter.letterText,letter.pushed);
                  return (<TouchableHighlight key={i} 
                    style={(letter.pushed?styles.letterWrapperPushed:styles.letterWrapper)} 
                  onPress={()=>this.tapOnLetters(letter)}>
                    <Text style={styles.letterText}>{letter.letterText}</Text>  
                  </TouchableHighlight>);    
                })
              }
              </View>
          </View>
          <View style={styles.buttonContainer}>
            <Text>X</Text>
          </View>
          </View>
    );
  }
}
const styles = StyleSheet.create({
    outterContainer: { flex:1,justifyContent: 'flex-start', flexDirection:'row'},
    container: { justifyContent: 'center', flexDirection:'column'},
    buttonContainer:{ justifyContent: 'center', flexDirection:'column'},
    varthaiWrapper: { width:'100%', justifyContent:'space-evenly' , flexDirection:'row' ,padding: 10},
    textInputUnderLine : { width :50, height:5, backgroundColor : 'black'},
    letterWrapper: {  
        width :50, height:50, 
        backgroundColor: '#0000ff',
        borderRadius: 50,  
        shadowOffset:{width:0 ,height:1},
        shadowColor:'#000000',
        shadowRadius:2 , 
        shadowOpacity:0.8 ,
        elevation:5},
    letterWrapperPushed:{  
        width :50, height:50, 
        backgroundColor: '#f000f0',
        borderRadius: 50,
        shadowOffset:{width:0 ,height:1},
        shadowColor:'#000000',
        shadowRadius:2 , 
        shadowOpacity:0.8 ,
        elevation:5},
    letterText :{ fontSize: 25, height:'100%' ,color:'#ffffff' ,textAlign : 'center' , textAlignVertical:'center'},
    finalLetterWrapper: {  width :50, height:50},
    finalLetterText :{ fontSize: 25, height:'100%' ,color:'#000000' ,textAlign : 'center' , textAlignVertical:'center'}
});
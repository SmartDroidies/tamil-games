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
       letter.pushed=true;
       let shuffledVarthaiArray=[...this.state.shuffledVarthai];
       let stateTmp={'finalVarthai':[...this.state.finalVarthai,letter.letterText],
       'shuffledVarthai':shuffledVarthaiArray};
       //{'finalVarthai':[...this.state.finalVarthai,letter.letterText]}
       this.setState(stateTmp);
      }
    }
   clearAnswer(){
    let shuffledVarthaiArray=[];
    this.state.shuffledVarthai.map((varthai,i)=>(shuffledVarthaiArray.push({...varthai,'pushed':false})));
    let stateTmp={'shuffledVarthai':shuffledVarthaiArray,
    'finalVarthai':[]}
    this.setState(stateTmp);
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
                  //console.log("onshuffledVarathai Change",letter.letterText,letter.pushed);
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
            <TouchableHighlight style={styles.buttonWrapper}>
              <Text style={styles.buttonText} onPress={()=>this.clearAnswer()}>X</Text>
            </TouchableHighlight>
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    outterContainer: { flex:1,justifyContent: 'flex-start', flexDirection:'row'},
    container: { width:'85%',justifyContent: 'center', flexDirection:'column'},
    buttonContainer:{ width:'15%', justifyContent: 'center', flexDirection:'column'},
    varthaiWrapper: { width:'100%', justifyContent:'space-evenly' , flexDirection:'row' ,padding: 10},
    buttonWrapper: {  
      width :40, height:40, 
      backgroundColor: '#ffffff',
      borderRadius: 40, 
      shadowOffset:{width:0 ,height:1},
      shadowColor:'#000000',
      shadowRadius:2 , 
      shadowOpacity:0.8 ,
      elevation:5},
    buttonText:{color:'red',fontSize:25,fontWeight:'bold',textAlign : 'center' , textAlignVertical:'center'},
    textInputUnderLine : { width :40, height:5, backgroundColor : 'black'},
    letterWrapper: {  
        width :40, height:40, 
        backgroundColor: '#0000ff',
        borderRadius: 40,  
        shadowOffset:{width:0 ,height:1},
        shadowColor:'#000000',
        shadowRadius:2 , 
        shadowOpacity:0.8 ,
        elevation:5},
    letterWrapperPushed:{  
        width :40, height:40, 
        backgroundColor: '#f000f0',
        borderRadius: 40,
        shadowOffset:{width:0 ,height:1},
        shadowColor:'#000000',
        shadowRadius:2 , 
        shadowOpacity:0.8 ,
        elevation:5},
    letterText :{ fontSize: 23, height:'100%' ,color:'#ffffff' ,textAlign : 'center' , textAlignVertical:'center'},
    finalLetterWrapper: {  width :40, height:40},
    finalLetterText :{ fontSize: 23, height:'100%' ,color:'#000000' ,textAlign : 'center' , textAlignVertical:'center'}
});
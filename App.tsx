import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LinearGradient from "react-native-linear-gradient";






function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(true) 
  const [upperCase, setupperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [enteredNo, setEnteredNo] = useState<number | undefined>(undefined); 

  useEffect(() =>{
    console.log("useEffect",enteredNo);
    
  },[enteredNo])

  const enteredNoOrDefault = enteredNo !== undefined ? enteredNo : 0; 

    function generatePasswordString(passwordLength : number){

    let characterList = '';
    
    
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList,passwordLength )

    setPassword(passwordResult)
    setIsPassGenerated(true)
  }
 

  function createPassword(characters: string, passwordLength: number){
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }


  function resetPasswordState(){
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(false)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)
  }
  


  const handleChangeText = (text: string) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue)) {
      setEnteredNo(numericValue);
      
    } else {
      setEnteredNo(undefined); // Reset enteredNo to undefined if the text couldn't be parsed as a number
    }
  };

    
  
  

  return (
    <>
      <LinearGradient colors={["#1c92d2","#f2fcfe"]} style={Styles.container}>
        <View style={{ alignItems: "center", margin :20, padding :10, borderRadius :50 }}>
        <Text style={Styles.title}>Password generator</Text>
        </View>
        <View style={Styles.inputContainer}>
          <Text style={{color :"white",fontWeight :"700",fontSize :15, fontFamily : ""}}>Enter your password</Text>
    
          <View >
            <TextInput onChangeText={handleChangeText} style={Styles.input} placeholder="Ex - 8" placeholderTextColor={"grey"} />
          </View>
        </View>
        <View style={Styles.passCat}>
          <View style={{margin :10, flexDirection :"row", justifyContent :"space-between"}}>
            <Text style={{color :"black"}}>Include lowerCase</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={lowerCase}
            unfillColor="grey"
            onPress={() => {setLowerCase(!lowerCase)}}
            fillColor='#29AB87'
            />
          </View>
          <View style={{margin :10, flexDirection :"row", justifyContent :"space-between"}}>
            <Text style={{color :"black"}}>Include upperCase</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={upperCase}
            unfillColor="grey"
            onPress={() => {setupperCase(!upperCase)}}
            fillColor='#FED85D'
            />
          </View>
          <View style={{margin :10, flexDirection :"row", justifyContent :"space-between"}}>
            <Text style={{color :"black"}}>Include specialChars</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={symbols}
            unfillColor="grey"
            onPress={() => {setSymbols(!symbols)}}
            fillColor='#C9A0DC'
            />
          </View>
          <View style={{margin :10, flexDirection :"row", justifyContent :"space-between"}}>
            <Text style={{color :"black"}}>Include number</Text>
            <BouncyCheckbox
            disableBuiltInState
            unfillColor="grey"
            isChecked={numbers}
            onPress={() => {setNumbers(!numbers)}}
            fillColor='#FC80A5'
            />
          </View>
        </View>
        <View style={Styles.btns}>
          <TouchableOpacity  onPress={() => generatePasswordString(enteredNoOrDefault)}>
            <LinearGradient style={Styles.btn} colors={["#0575E6","#021B79"]}>
              <Text style={{fontSize:15, fontWeight : "500", color :"white"}}>Generate Password</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => resetPasswordState()}>
            <LinearGradient style={Styles.btn} colors={["#0575E6","#021B79"]}>
              <Text style={{fontSize:15, fontWeight : "500", color :"white"}}>Reset</Text>
            </LinearGradient> 
          </TouchableOpacity>
        </View>
        {isPassGenerated ? (
        <LinearGradient  colors={["#021B79","#0575E6"]} style={[Styles.card,Styles.cardElevated]}>
          <Text style={Styles.description}> long press to copy </Text>
          <Text selectable style={Styles.generatedPassword}>{password}</Text>
        </LinearGradient>
      ) : null}
      </LinearGradient>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  btns: {
    justifyContent :"center",
    flexDirection :"row",
    
  },
  btn : {
    padding :15,
    borderRadius :50,
    margin :10
  },
  title: {
    color :"white",
    fontSize: 30,
    fontFamily:"sans-serif-condensed",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 40,
    alignItems: "center",
  },
  input : {
    width: 80,
    borderWidth: 1,
    borderColor: "black",
    height:35,
    padding : 5,
    borderRadius :10,
    color  : "black"
  },
  passCat: {
    margin : 20,
  },
  generatedPassword: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 12,
        color:'#fff'
  },
  cardElevated: {
        backgroundColor: '#265078',
        elevation: 1,
        shadowOffset: {
          width: 1,
          height: 1,
        }
  },
  card: {
    margin: 15,
        padding: 12,
        borderRadius: 100,
        marginHorizontal: 12,
        alignItems :"center"
  },
  subTitle: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 2,
        color : "white"
  },
  description: {
        color: 'white',
        fontSize:15,
        fontWeight:"500",
        fontFamily:"sans-serif-light",
        marginBottom: 8,
  }
});

export default App;



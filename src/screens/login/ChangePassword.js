import React, { useState } from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity,Modal,TouchableHighlight,Alert} from 'react-native'
import {colors} from '../../globals/style'
import { AntDesign,Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';

const ChangePassword = ({navigation}) => {
  const [passwordFocus, setPasswordFocus] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [password,setPassword]= useState(null)
  return (
   <View style={styles.container}>
     <Text style={styles.title}>Change Password</Text>
   <View style={styles.inputout}>
            <AntDesign name="lock" size={24}  />
            <TextInput style={styles.input} secureTextEntry={showPassword===true? false : true} placeholder='Enter new Password'
             placeholderTextColor={passwordFocus===true ? colors.white : colors.dark }
               onChangeText={e=>setPassword(e)}
               value={password}></TextInput>
             <Ionicons name={showPassword ==false? "eye-off" : 'eye'} size={24}  color={passwordFocus===true ? colors.white : colors.dark}
             onPress={()=>(setShowPassword(!showPassword))}/>
        </View>
        <TouchableOpacity  style={styles.btn} ><Text style={styles.btnText}>Submit</Text></TouchableOpacity>
   </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        
      },
      title:{
        fontSize: 50,
        color:colors.primary,
        textAlign:'center',
        marginVertical:10,
        fontWeight:'300',  
       },
       inputout:{
        flexDirection:'row',
        width:'80%',
        marginVertical:40,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:10,
        elevation:20,
        backgroundColor:colors.secondary,
       },
       input:{
        fontSize:18,
        marginLeft:10,
        width:'80%',
        color:'white',
       },
       btn:{
        marginVertical:30,
        marginHorizontal:10,
        backgroundColor:colors.primary,
        borderRadius:10,
        elevation:20,
        width:'80%',
        height:45,
        justifyContent:'center',
        alignItems:'center',
       },
       btnText:{
        fontSize:22,
        color:colors.white,
        fontWeight:'bold',
       },
       
})
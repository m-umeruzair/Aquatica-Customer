import { StyleSheet, Text, View, Image,TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../globals/style'
import { AntDesign,SimpleLineIcons,Ionicons } from '@expo/vector-icons';

const Profile = () => {
    const [editable,setEditable] = useState(false)

    const [showModal, setShowModal]= useState(false)
    const [transparency, setTrasparency] = useState(false)
    

    const[fullName,setFullName] = useState(null)
    const[password,setPassword]= useState(null)
    const[email,setEmail]= useState(null)
    const[phoneNumber,setPhoneNumber]= useState(null)
    const[address,setAddress] = useState(null)
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        
        <Image style={styles.image} source={require('../../assets/profile.png')}></Image>
        <Text style={styles.name}>Dua Muhammad</Text>
      </View>
      {editable==false ?<View style={styles.inputout}>
            <AntDesign name="user" size={24} color={editable===true ? colors.white : colors.dark } />
            <Text style={styles.input}>Dua Muhammad</Text>
        </View>:<View style={styles.inputout}>
            <AntDesign name="user" size={24} color={editable===true ? colors.white : colors.dark } />
            <TextInput style={styles.input} placeholderTextColor={editable===true ? colors.white : colors.dark } placeholder='Dua Muhammad'
            value={fullName} onChangeText={e=>{setFullName(e)}}></TextInput>
        </View>
        }

      <View style={styles.inputout}>
            <AntDesign name="mail" size={24} color={editable===true ? colors.white : colors.dark } />
            {editable==false?      <Text style={styles.input}>dua@hotmail.com</Text>:  
         <TextInput style={styles.input}  placeholder='Email' placeholderTextColor={editable===true ? colors.white : colors.dark }
         onChangeText={e=>setEmail(e)}
         value={email}></TextInput>}
        </View>
    
        <View style={styles.inputout}>
            <AntDesign name="lock" size={24} color={editable===true ? colors.white : colors.dark } />
         {editable==false?  <Text style={styles.input}>*********</Text>:
             <TextInput style={styles.input}  placeholder='Password' placeholderTextColor={editable===true ? colors.white : colors.dark } 
           onChangeText={e=>setPassword(e)}
           value={password}></TextInput>}
        </View>
        <View style={styles.inputout}>
            <AntDesign name="phone" size={24} color={editable===true ? colors.white : colors.dark } />
          {editable==false?   <Text style={styles.input}>033318782</Text>:
          <TextInput style={styles.input} placeholder='033318782' placeholderTextColor={editable===true ? colors.white : colors.dark } 
          value={phoneNumber} onChangeText={e=>setPhoneNumber(e)}></TextInput>}
        </View>
        <View style={styles.inputout}>
            <SimpleLineIcons name="location-pin" size={24} color={editable===true ? colors.white : colors.dark } />
           {editable==false? <Text style={styles.input}>Apartment 2, clifton, karachi</Text>:
           <TextInput style={styles.input} placeholder='Apartment 2' placeholderTextColor={editable===true ? colors.white : colors.dark } 
           value={address} onChangeText={e=>setAddress(e)}></TextInput> }
        </View>
        <TouchableOpacity onPress={()=>{setEditable(!editable)}}  style={styles.btn}><Text style={styles.btnText}>{editable==true ? 'Update':"Edit Profile"}</Text></TouchableOpacity>
    </View>
  )

}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        width:'100%'
      },
      view1:{
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:colors.primary,
        width:'100%',
        height:180
      },
      image:{
        resizeMode:'contain',
        width:'20%',
        height:'50%',
        
      },
      name:{
        fontSize:24,
        marginTop:10,
        fontWeight:600,
        color:colors.white
      },    
        inputout:{
        flexDirection:'row',
        width:'90%',
        marginVertical:10,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:10,
        elevation:20,
        backgroundColor:colors.secondary,
       },
       input:{
        fontSize:22,
        marginLeft:10,
        width:'80%',
        color:'black',
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
        alignItems:'center'
       },
    btnText:{
        fontSize:22,
        color:colors.white,
        fontWeight:'bold',
       },
      
})

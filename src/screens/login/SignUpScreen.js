import React, { useState } from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity,Modal,TouchableHighlight,Alert} from 'react-native'
import {colors,hr80} from '../../globals/style'
import logo from '../../../assets/logo.png'
import { AntDesign,Ionicons,SimpleLineIcons,MaterialCommunityIcons } from '@expo/vector-icons'; 
import axios from 'axios';
import * as Location from 'expo-location';




const  SignUpScreen = ({navigation}) => {
    
    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [confirmPasswordFocus, setConfirmPasswordFocus]= useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [mobileFocus, setMobileFocus]= useState(false)
    const [nameFocus, setNameFocus] =  useState(false)
    const [locationFocus, setLocationFocus] = useState(false)
    const [showModal, setShowModal]= useState(false)
    const [transparency, setTransparency] = useState(false)
    

    const[fullName,setFullName] = useState(null)
    const[password,setPassword]= useState(null)
    const[password2,setPassword2]= useState(null)
    const[email,setEmail]= useState(null)
    const[phoneNumber,setPhoneNumber]= useState(null)
    const[otp,setOtp] = useState(null)
    const[otp2,setOtp2] = useState(null)
    const[address,setAddress] = useState(null)
    const[addressText,setaddressText] = useState(null)
    const [latitude,setLatitude] = useState(null)
    const [longitude, setLongitude]= useState(null)
    
    
    const handleIconPress = async () => {
      // Check if permission to access location is granted
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    
      try {
        // Get the user's current location
        const location = await Location.getCurrentPositionAsync({});
     //   setCurrentLocation(location.coords)
      //  console.log(currentLocation)
       
        const { latitude, longitude } = location.coords;
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7AAsgR3TknpA52QdTJzhUBqVfbGwzGuY`).then(res=>{
          setAddress(res.data.results[0].formatted_address)
          setLatitude(latitude)
          setLongitude(longitude)
          console.log(res.data.results[0].formatted_address)
        })
    
        console.log('User location:', latitude, longitude);
        // Use latitude and longitude for further processing
      } catch (error) {
        console.log('Error retrieving location:', error);
      }
    };
 
    const showAlert1 = () =>{
      Alert.alert(
         'OTP Verified and Sign Up is successfull'
      )
      setShowModal(false)
   }

   const showAlert2 = () =>{
    Alert.alert(
       'Wrong OTP'
    )}

    const showAlert4 = () =>{
      Alert.alert(
         'Invalid Email Address'
      )
    }

    const showAlert5 = () =>{
      Alert.alert(
         'Invalid or Missing Fields'
      )
    }

    const showAlert6 = () =>{
      Alert.alert(
         'Password and confirm password do not match'
      )
    }

 
    
 
   function signup2(){
    console.log("1:"+otp)
    console.log("2:"+otp2)
    
    if(otp==otp2){
      showAlert1()
      setTransparency(false)
      axios({
        method:"POST",
        url:'http://192.168.18.133:5000/sign-up',
        data:{
          password:password,
          email:email,
          phoneNumber:phoneNumber,
          fullName:fullName,
          address:address,
          longitude:longitude,
          latitude:latitude
        }
       }).then(navigation.navigate('signin')).catch(error=> console.log(error))
    }
    else{
        showAlert2()
        
    }
   }
    
   function signUp(e){
       e.preventDefault()
       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
       if(reg.test(email)==false){
        showAlert4()
       }
       else if(password==null || email==null || password2==null || fullName==null || address==null){
       showAlert5()
       }
       else if(password!=password2){
        showAlert6()
       }
       else{
       axios({
        method:"POST",
        url:'http://192.168.18.133:5000/verification',
        data:{
          email:email
        }
       }).then((response)=>{
             setOtp2(response.data)
             setShowModal(true)
             setTransparency(true)
       }).catch(error => console.log(error)) }
   } 

  return (
    <View style={[styles.container,transparency===true? {opacity:0.1}:{opacity:1}]}>
      <Modal  transparent={true} animationType = {"slide"}   visible = {showModal}>
        <View style={styles.modal}>
          <Text style={styles.modalHeading}>Email Verification</Text>
          <View style={styles.modalInner}>
         <Text style={[styles.modalText,]}>Enter OTP:</Text>
         <TextInput keyboardType='numeric' style={[styles.modalText,{borderBottomColor:colors.dark,borderBottomWidth:1,height:55,width:'50%'}]}  placeholder="Enter OTP"
          onChangeText={e=>setOtp(e)}></TextInput>
         </View>
         <View style={{flexDirection:'row',gap:5}}>
         <TouchableHighlight onPress = {signup2}>  
          <Text style = {styles.modalVerify}>Verify OTP</Text>
          </TouchableHighlight>
         <TouchableHighlight onPress = {() => {setShowModal(false)+setTransparency(false)}}>  
          <Text style = {styles.modalClose}>Close Modal</Text>
          </TouchableHighlight></View>
          </View>
      </Modal>
     <Text style={styles.title}>Sign Up</Text>
     <View style={styles.inputout}>
            <AntDesign name="user" size={24} color={nameFocus===true ? colors.white : colors.dark } />
            <TextInput style={styles.input}  placeholder='Full Name' placeholderTextColor={nameFocus===true ? colors.white : colors.dark }
            onFocus={()=>{ setNameFocus(true)+setEmailFocus(false)+setPasswordFocus(false)+setConfirmPasswordFocus(false)+setMobileFocus(false)+setLocationFocus(false)}}
            onChangeText={e=>setFullName(e)}
            value={fullName}
            ></TextInput>
        </View>
        <View style={styles.inputout}>
            <MaterialCommunityIcons name="email" size={24} color={emailFocus===true ? colors.white : colors.dark } />
            <TextInput style={styles.input}  placeholder='Email' placeholderTextColor={emailFocus===true ? colors.white : colors.dark }
            onFocus={()=>{ setEmailFocus(true)+setPasswordFocus(false)+setConfirmPasswordFocus(false)+setMobileFocus(false)+setLocationFocus(false)+setNameFocus(false)}}
            onChangeText={e=>setEmail(e)}
            value={email}
            ></TextInput>
        </View>
        <View style={styles.inputout}>
        <AntDesign name="lock" size={24}  color={passwordFocus===true ? colors.white : colors.dark} />
            <TextInput style={styles.input} secureTextEntry={showPassword===true? false : true} placeholder='Password'
             placeholderTextColor={passwordFocus===true ? colors.white : colors.dark }
               onFocus={()=>{ setPasswordFocus(true)+setEmailFocus(false) + setConfirmPasswordFocus(false) + setMobileFocus(false)+setLocationFocus(false)+setNameFocus(false)}}
               onChangeText={e=>setPassword(e)}
               value={password}></TextInput>
             <Ionicons name={showPassword ==false? "eye-off" : 'eye'} size={24}  color={passwordFocus===true ? colors.white : colors.dark}
             onPress={()=>(setShowPassword(!showPassword))}/>
        </View>

        <View style={styles.inputout}>
        <AntDesign name="lock" size={24}  color={confirmPasswordFocus===true ? colors.white : colors.dark} />
            <TextInput style={styles.input} secureTextEntry={showPassword2===true? false : true} placeholder='Confirm Password'
             placeholderTextColor={confirmPasswordFocus===true ? colors.white : colors.dark }
               onFocus={()=>{ setConfirmPasswordFocus(true)+setPasswordFocus(false)+setEmailFocus(false)+setMobileFocus(false)+setLocationFocus(false)+setNameFocus(false)}}
               onChangeText={e=>setPassword2(e)}value={password2} ></TextInput>
             <Ionicons name={showPassword2 ==false? "eye-off" : 'eye'} size={24}  color={confirmPasswordFocus===true ? colors.white : colors.dark}
             onPress={()=>(setShowPassword2(!showPassword2))}/>
        </View>

        <View style={styles.inputout}>
        <AntDesign name="phone" size={24}  color={mobileFocus===true ? colors.white : colors.dark} />
            <TextInput name='number' keyboardType={'phone-pad'} style={styles.input}  placeholder='Mobile Number'
             placeholderTextColor={mobileFocus===true ? colors.white : colors.dark }
               onFocus={()=>{setMobileFocus(true)+ setConfirmPasswordFocus(false)+setPasswordFocus(false)+setEmailFocus(false)}}
               onChangeText={e=>setPhoneNumber(e)}
                value={phoneNumber} ></TextInput>
            
        </View>
   
       
      
        <TouchableOpacity style={styles.inputout}  onPress={handleIconPress}>
        <SimpleLineIcons name="location-pin" size={24}  color={locationFocus===true ? colors.white : colors.dark} />
            <Text name='location' k style={styles.input}  placeholder='Address'
             placeholderTextColor={locationFocus===true ? colors.white : colors.dark }
               onFocus={()=>{setLocationFocus(true)+setMobileFocus(false)+ setConfirmPasswordFocus(false)+setPasswordFocus(false)+setEmailFocus(false)+setNameFocus(false)}}
               onChangeText={e=>setAddress(e)}
                value={address} >{address}</Text>
               </TouchableOpacity>
       
     
       
        <TouchableOpacity style={styles.btn} onPress={signUp}><Text style={styles.btnText}>Sign Up</Text></TouchableOpacity>

    </View>
  )
}

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

       inputgroup:{
        flexDirection:'row',
        width:'80%',
       
       },
       inputout:{
        flexDirection:'row',
        width:'80%',
        marginVertical:10,
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
        alignItems:'center'
       },
       btnText:{
        fontSize:22,
        color:colors.white,
        fontWeight:'bold',
       },
       modal:{
        marginTop:'50%',
        backgroundColor:colors.white,
        opacity:1,
        justifyContent:'center',
        alignItems:'center',
        width:'70%',
        alignSelf:'center',
        margin:20,
        padding:20,
        elevation:1,
        borderRadius:10,
        borderColor:colors.primary,
        borderWidth:2
        
        // backgroundColor:colors.secondary
       },
       modalText:{
        fontSize:20,
        textAlign:'center'
       },
       modalHeading:{
        fontSize:25,
        color:colors.primary,
        borderBottomColor:colors.secondary,
        borderBottomWidth:2,
        textAlign:'center'
       },
       modalInner:{
        width:"100%",
        height:70,
        borderWidth:1,
        padding:10,
        borderColor:colors.secondary,
        flexDirection:'row',
        margin:20,
        textAlign:'center',
        alignContent:'center',
        alignItems:'center'
       },
       modalClose:{
           fontSize:20,
           fontWeight:600,
           padding:5,
           backgroundColor:colors.primary,
           color:colors.white
       },
       modalVerify:{
        fontSize:20,
        fontWeight:600,
        padding:5,
        backgroundColor:colors.secondary,
        color:colors.white
    }
})

export default SignUpScreen
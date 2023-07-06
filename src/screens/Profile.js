import { StyleSheet, Text, View, Image,TextInput,TouchableOpacity, Modal,TouchableHighlight, Alert} from 'react-native'
import React, { useState, useEffect} from 'react'
import { colors } from '../globals/style'
import { AntDesign,SimpleLineIcons,Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';
const Profile = ({route}) => {
    const params = route.params
    var user= params.user
    //console.log(user._id)
   
    const [editable,setEditable] = useState(false)

    const [showModal, setShowModal]= useState(false)
    const [transparency, setTrasparency] = useState(false)
    

    const[fullName,setFullName] = useState(null)
    const[password,setPassword]= useState(null)
    const[email,setEmail]= useState(null)
    const[phoneNumber,setPhoneNumber]= useState(null)
    const[address,setAddress] = useState(null)
    const[otp,setOtp] = useState(null)
    const[otp2,setOtp2] = useState(null)


    const[fullName2,setFullName2] = useState(null)
    const[password2,setPassword2]= useState(null)
    const[email2,setEmai2]= useState(null)
    const[phoneNumber2,setPhoneNumber2]= useState(null)
    const[address2,setAddress2] = useState(null)
    
    const [shouldUpdate, setShouldUpdate]= useState(false)

 
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

    const x= user._id
    const showAlert = () =>{
      Alert.alert(
         'Updated Successfully!'
      )}

      const showAlert1 = () =>{
        Alert.alert(
           'Update failed!'
        )}

    const showAlert2 = () =>{
      Alert.alert(
         'No fields to update!'
      )}

      const showAlert3 = () =>{
        Alert.alert(
           'Wrong OTP'
        )}
  function update2(e){
         e.preventDefault()
          if(otp!=otp2){
        setEditable(false)
          showAlert3()
       }else{
        axios({
          method:"POST",
          url:'http://192.168.18.133:5000/updateProfile',
          data:{
            email:email,
            fullName:fullName,
            phoneNumber:phoneNumber,
            address:address,
            password:password,
            longitude:longitude,
            latitude:latitude,
            id:x
          }
         }).then((response)=>{
          if(response.status==200){
            user=response.data.user
              
            setFullName2(user.fullName)
            setAddress2(user.address)
            setPhoneNumber2(user.phoneNumber)
            setEmai2(user.email)
            setEmail(null)
            setFullName(null)
            setAddress(null)
            setPassword(null)
            setPhoneNumber(null)
            setLongitude(null)
            setLatitude(null)
            showAlert();
            setEditable(false)
            setShouldUpdate(true)
          }else{
            showAlert1();
            setEditable(false)
            setEmail(null)
            setFullName(null)
            setAddress(null)
            setPassword(null)
            setPhoneNumber(null)
            setLongitude(null)
            setLatitude(null)
          }
         }).catch(error=>{
          showAlert1();
          setEditable(false)
          console.log(error)
         })
  }
}
    function update(e){
      if(email==null && fullName==null && password==null && address==null && phoneNumber==null && longitude==null && latitude==null){
        showAlert2()
        setEditable(false)
      }
      else if(email!=null){
          e.preventDefault()
       axios({
        method:"POST",
        url:'http://192.168.18.133:5000/verification',
        data:{
          email:email
        }
       }).then((response)=>{
             setOtp2(response.data)
             setShowModal(true)
             setTrasparency(true)
             
             user=response.data.user
             
       }).catch(error => 
        console.log(error)+
        setEditable(false)) 
        }
        else{
        
          axios({
            method:"POST",
            url:'http://192.168.18.133:5000/updateProfile',
            data:{
              email:email,
              fullName:fullName,
              phoneNumber:phoneNumber,
              address:address,
              password:password,
              longitude:longitude,
              latitude:latitude,
              id:x
            }
           }).then((response)=>{
            

            if(response.status==200){
             
              user=response.data.user
              setEmail(null)
              setFullName(null)
              setAddress(null)
              setPassword(null)
              setPhoneNumber(null)
              setLongitude(null)
              setLatitude(null)
              setFullName2(user.fullName)
              setAddress2(user.address)
              setPhoneNumber2(user.phoneNumber)
              setEmai2(user.email)
             
              showAlert();
              setEditable(false)
              setShouldUpdate(true)
               
            }else{
              setEmail(null)
              setFullName(null)
              setAddress(null)
              setPassword(null)
              setPhoneNumber(null)
              setLongitude(null)
              setLatitude(null)
              showAlert1();
              setEditable(false)
            }
           }).catch(error=>{
            setEmail(null)
            setFullName(null)
            setAddress(null)
            setPassword(null)
            setPhoneNumber(null)
            setLongitude(null)
            setLatitude(null)
            showAlert1();
            setEditable(false)
            console.log(error)
           })
        }
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
         <TouchableHighlight onPress = {update2}>  
          <Text style = {styles.modalVerify}>Verify OTP</Text>
          </TouchableHighlight>
         <TouchableHighlight onPress = {() => {setShowModal(false)+setTrasparency(false)}}>  
          <Text style = {styles.modalClose}>Close Modal</Text>
          </TouchableHighlight></View>
          </View>
      </Modal>

      <View style={styles.view1}>
        
        <Image style={styles.image} source={require('../../assets/profile.png')}></Image>
        <Text style={styles.name}>{shouldUpdate==false ? user.fullName: fullName2}</Text>
      </View>
      {editable==false ?<View style={styles.inputout}>
            <AntDesign name="user" size={24} color={editable===true ? colors.white : colors.dark } />
            <Text style={styles.input}>{shouldUpdate==false ? user.fullName: fullName2}</Text>
        </View>:<View style={styles.inputout}>
            <AntDesign name="user" size={24} color={editable===true ? colors.white : colors.dark } />
            <TextInput style={styles.input} placeholderTextColor={editable===true ? colors.white : colors.dark } placeholder={shouldUpdate==false ? user.fullName: fullName2}
            value={fullName} onChangeText={e=>{setFullName(e)}}></TextInput>
        </View>
        }

      <View style={styles.inputout}>
            <AntDesign name="mail" size={24} color={editable===true ? colors.white : colors.dark } />
            {editable==false?      <Text style={styles.input}>{shouldUpdate==false? user.email:email2}</Text>:  
         <TextInput style={styles.input}  placeholder={shouldUpdate==false? user.email:email2} placeholderTextColor={editable===true ? colors.white : colors.dark }
         onChangeText={e=>setEmail(e)}
         value={email}></TextInput>}
        </View>
    
        <View style={styles.inputout}>
            <AntDesign name="lock" size={24} color={editable===true ? colors.white : colors.dark } />
         {editable==false?  <Text style={styles.input}>*********</Text>:
             <TextInput style={styles.input}  placeholder='Type new Password' placeholderTextColor={editable===true ? colors.white : colors.dark } 
           onChangeText={e=>setPassword(e)}
           value={password}></TextInput>}
        </View>
        <View style={styles.inputout}>
            <AntDesign name="phone" size={24} color={editable===true ? colors.white : colors.dark } />
          {editable==false?   <Text style={styles.input}>{shouldUpdate==false? user.phoneNumber:phoneNumber2}</Text>:
          <TextInput style={styles.input} placeholder={shouldUpdate==false?user.phoneNumber:phoneNumber2} placeholderTextColor={editable===true ? colors.white : colors.dark } 
          value={phoneNumber} onChangeText={e=>setPhoneNumber(e)}></TextInput>}
        </View>
        <TouchableOpacity style={styles.inputout}>
            <SimpleLineIcons onPress={handleIconPress} name="location-pin" size={24} color={editable===true ? colors.white : colors.dark } />
           {editable==false? <Text style={styles.input}>{shouldUpdate==false?user.address:address2}</Text>:
           <Text style={styles.input} placeholder={shouldUpdate==false?user.address:address2} placeholderTextColor={editable===true ? colors.white : colors.dark } 
           value={address} onChangeText={e=>setAddress(e)}>{shouldUpdate==false?user.address:address2}</Text> }
        </TouchableOpacity>
        {editable==false?
        <TouchableOpacity onPress={()=>{setEditable(!editable)}}  style={styles.btn}><Text style={styles.btnText}>Edit Profile</Text></TouchableOpacity>
         :<TouchableOpacity onPress={update}  style={styles.btn}><Text style={styles.btnText}>Update</Text></TouchableOpacity> }
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

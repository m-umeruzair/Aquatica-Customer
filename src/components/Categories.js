import { StyleSheet, Text, View, ScrollView,ImageBackground, TouchableOpacity,Image } from 'react-native'
import {colors,hr80} from '../globals/style'
import React from 'react'
import tanker from '../../assets/home/tanker.jpg'
import water from '../../assets/home/water.jpg'
import dispenser from '../../assets/home/dispenser.jpg'
import axios from 'axios'


const Categories = ({navigation}) => {
  
  return (
    

    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('products',{productType:'Water tanker'})}> 
      <View  style={styles.main_card}>
        <Image source={tanker} resizeMode='cover' style={{
            height: 80,
            width: '60%',
            
          }}>
        </Image>
        <Text style={styles.text}>Water Tanker</Text>
        
      </View>
      </TouchableOpacity>
      <View style={{flexDirection:'row'}}>
      <View  style={styles.main_card2}>
        <TouchableOpacity onPress={()=>navigation.navigate('products',{productType:'Dispenser Bottle'})}>
        <Image source={dispenser} style={{
            resizeMode: 'contain',
            height: 80,
            width: 100,
          }}>
    
        </Image>
        <Text style={styles.text}>Dispenser Bottles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main_card2}>
      <TouchableOpacity onPress={()=>navigation.navigate('products',{productType:'Water bottle'})}>
        <Image source={water} style={{
            resizeMode: 'contain',
            height: 100,
            width: 165,
          }}>
    
        </Image>
        <Text style={styles.text}>Water Bottles</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    container: {
      height:'40%',
      backgroundColor: colors.white,
      width:'95%',
      elevation:10,
      borderRadius:10,
      marginTop:10,
      
    }, 
    head:{
       color:colors.primary,
       fontSize:25,
       fontWeight:'300',
       margin:10,
       alignSelf:'center',
       paddingBottom:5,
       borderBottomColor:colors.secondary,
       borderBottomWidth:1
    },
    main_card:{
      flexDirection:'row',
      backgroundColor:colors.white,
      width:'95%', 
    
      borderRadius:10,
      elevation:20,
       margin:10,
      padding:3,
      paddingLeft:0,
      alignItems:'center',
      alignSelf:'center',
      gap:15
      
    },
    main_card2:{
      backgroundColor:colors.white,
      width:'45%',   
      borderRadius:10,
      elevation:20,
      margin:10,
      padding:10,
      paddingBottom:0,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
    },
    text:{
      fontSize:20,
      color:colors.primary,
      marginTop:10,
      textAlign:'center',
     
    }
})
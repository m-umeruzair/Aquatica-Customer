import React, { useState } from 'react'
import { StyleSheet, Text, View,Image,ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { colors } from '../globals/style'
import water from '../../assets/home/water.jpg'

const Card = (props) => {

    const [quantity,setQuantity]= useState(0)
  return (
    <View style={styles.card}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={water}></Image>
    </View>
    <View style={styles.divider}/>
    <View style={styles.textc1}>
    <Text style={styles.text}>{props.productName}</Text>
    <Text style={styles.text2}>{props.productCompany}</Text>
    <Text style={{fontSize:10}}>This is a small description of product that we can enter here so that users can see.</Text>
    </View>
    <View  style={styles.textc2}>
      <Text style={{fontWeight:'700'}}>{props.productPrice}</Text>
    <View style={styles.quantityCounter}>
      <TouchableOpacity onPress={()=>setQuantity(quantity+1)}><Text style={[styles.quantityControl]}>+</Text></TouchableOpacity>
      <Text style={styles.quantityBox}>{quantity}</Text>
      <TouchableOpacity><Text  onPress={()=>setQuantity(quantity-1)} style={[styles.quantityControl,{fontSize:20}]} >-</Text></TouchableOpacity>
    </View>
      <TouchableOpacity>
    <Text style={styles.btn} >Add To Cart</Text>
    </TouchableOpacity>
    </View>
 </View>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.white,
        alignItems: 'center',
        width:'100%',
        height:'90%'
      },
      scrollview:{
        width:'95%',
        margin:10,
        borderRadius:10,
        flexGrow:0,
        borderRadius:10,
        backgroundColor:colors.primary
      },
    card:{
        width:'95%',
        height:120,
        elevation:20,
        margin:10,
        padding:5,
        borderRadius:10,
        backgroundColor:colors.white,  
        flexDirection:'row'
    },
    imageContainer:{
        width:'20%',
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
      width:'100%',
      height:'100%',
      resizeMode:'contain',
    },
    divider:{
     width:1,
     height:'90%',
     backgroundColor:colors.secondary,
     opacity:.5,
     marginTop:5
    },
    text:{
      color:colors.secondary,
      fontSize:17,
      fontWeight:500
    },
    text2:{
      color:colors.primary,
      fontSize:15,
      fontWeight:500
    },
    textc1:{
     width:'55%',
     flexDirection:'column',
     padding:10,
     gap:3
    },
    textc2:{
      padding:10,
      flexDirection:'column',
      gap:10,
      alignItems:'center'
    },
    btn:{
      color:colors.white,
      fontSize:13,
      textAlign:'center',
      padding:5,
      fontWeight:'700',
      backgroundColor:colors.primary,
      borderRadius:5,
     },
     quantityCounter:{
      flexDirection:'row',
      gap:10,
      fontSize:12
     },
     quantityBox:{
      borderColor:colors.dark,
      borderRadius:5,
      padding:3,
      borderWidth:1,
      textAlign:'center'
     },
     quantityControl:{
      fontSize:18
     }
})
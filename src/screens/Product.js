import React, { useState } from 'react'
import { StyleSheet, Text, View,Image,ScrollView } from 'react-native'
import water from '../../assets/home/water.jpg'
import { colors } from '../globals/style'
import HomeHeadNav from '../components/HomeHeadNav'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import Card from '../components/card'
const Product = ({route,navigation}) => {
   const [quantity,setQuantity]= useState(0)
   const params= route.params
  //  console.log(params.productType)

   const [data,setData]= useState(null)
   axios.get('http://192.168.0.104:5000/readProduct',{
    params:{
      productType:params.productType
    }
   }).then((response)=>{
   setData(response.data)
   })
   
  return (
    <View style={styles.container}>
        <HomeHeadNav/>
        <ScrollView style={styles.scrollview}>
        {data?.map((el,i)=>(
          <Card  productName={el.productName} productCompany={el.productCompany} productPrice={el.productPrice} />
        
        ))}

        </ScrollView>

    </View>
  )
}

export default Product

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
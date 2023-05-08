import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import nestle from  '../../assets/home/swiper/nestle.jpg' 

const OfferSlider = () => {
  

  return (
    <View>
      <View style={styles.offerSlider}>
        <Swiper autoplay={true} autoplayTimeout={5} shows Buttons={true}>
          <View style={styles.slide}>
            <Image style={styles.image} source={nestle}>
            </Image>
          </View>
          <View style={styles.slide}>
            <Image style={styles.image} source={nestle}>
            </Image>
          </View>
          <View style={styles.slide}>
            <Image style={styles.image} source={nestle}>
            </Image>
          </View>
        </Swiper>
      </View>
    </View>
   
  )
}

export default OfferSlider

const styles = StyleSheet.create({
  offerSlider:{
    width:'100%',
    height:200,
    paddingHorizontal:10,
    marginVertical:10,
    alignItems:'center',
    justifyContent:'center'
  },
  slide:{
    width:'100%',
    height:200,
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    width:'100%',
    height:'100%',
    borderRadius:20
  }
})
import { View, Text, StyleSheet,StatusBar,TextInput } from 'react-native'
import React from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../globals/style'


const HomeScreen = ({navigation,route}) => {
  const params=route.params
  const user=params.user
  //console.log(params.user)
  return (
    <View style={styles.container}>
        <StatusBar />
        <HomeHeadNav user={user} navigation={navigation}/>
        {/* <View style={styles.searchbox}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput style={styles.searchInput} placeholder='search'></TextInput>
        
        </View> */}
       <Categories user={user} navigation={navigation}/>
       <OfferSlider/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        width:'100%'
      },
      searchbox:{
        flexDirection:'row',
        width:'90%',
        backgroundColor:colors.secondary,
        borderRadius:30,
        alignItems:'center',
        padding:10,
        margin:20,
        elevation:10
      },
      searchInput:{
        marginLeft:10,
        width:'90%',
        fontSize:18,
        color:colors.white
      } 
})

export default HomeScreen
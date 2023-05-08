import React from 'react'
import { View, Text, StyleSheet,StatusBar,TextInput } from 'react-native'
import { Fontisto,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import { colors } from '../globals/style';




function HomeHeadNav() {
  return (
    <View style={styles.container}>
      <Fontisto name="nav-icon-list-a" size={24} color={colors.primary} />
      <View style={styles.containerin}>
        <Text style={{fontSize:25,color:colors.secondary}}>Aquatica</Text>
        {/* <MaterialCommunityIcons name="cup-water" size={24} color={colors.primary}  /> */}
      </View>
      <FontAwesome name="user-circle-o" size={24} color={colors.primary}  /> 
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      padding:10,
      alignItems:'center',
      backgroundColor:colors.white,
      elevation:20,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20
    },
    containerin:{
        flexDirection:'row',
        alignItems:'center'
    },

   
})

export default HomeHeadNav
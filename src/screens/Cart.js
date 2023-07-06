import { StyleSheet, Text, View, FlatList, Touchable, TouchableOpacity, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeHeadNav from '../components/HomeHeadNav';
import { colors } from '../globals/style';
import CartCard from '../components/CartCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Cart = ({route,navigation}) => {
  var i
  const params = route.params
  var user= params.user
  
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);
  
  const showAlert1 = () =>{
    Alert.alert(
       'Your order has been placed. A Rider will contact you soon'
    )
 }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const existingArray = await AsyncStorage.getItem('@cart');
        const parsedArray = JSON.parse(existingArray);
        setData(parsedArray);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setIsEmpty(false);
      setTotal(data.reduce((sum, el) => sum + parseInt(el.productPrice), 0));
    }
  }, [data]);
  useEffect(() => {
    if (data && data.length > 0) {
      setIsEmpty(false);
      setTotal(data.reduce((sum, el) => sum + parseInt(el.productPrice), 0));
    } else {
      setIsEmpty(true);
    }
  }, [data]);

 function order(){
  const date = new Date();
  
  axios({
    method:"POST",
    url:'http://192.168.18.133:5000/createOrder',
    data:{
      orderStatus:'Order Placed',
      orderPlacedby:user._id,
      orderDate:date,
      orderItems:data,
      latitude:user.latitude,
      longitude:user.longitude,
      customerName:user.fullName,
      customerNumber:user.phoneNumber,
      orderAmount:total+50+100

    }
   }).then(showAlert1()+AsyncStorage.removeItem('@cart')+setIsEmpty(true)+navigation.navigate('home',{user:user}))
   .catch(error=> console.log(error))
}
 

  return (
    <View style={styles.container}>
      <HomeHeadNav navigation={navigation}/>

      <FlatList
        style={styles.scrollview}
        data={data}
        keyExtractor={(item, index) => `${item._id}_${index}`}
        renderItem={(el) => {
         var i=Math.random()
         i=i*10000
          
          return (
            <CartCard
           
              setData={setData}
              el={el.item}
              data={data}
              productName={el.item.productName}
              productCompany={el.item.productCompany}
              productPrice={el.item.productPrice}
            />
          );
        }}
       
      />

      <View style={styles.total}>
        {isEmpty ? (
          <Text style={styles.totalText}>Your cart is empty</Text>
        ) : (
          <View style={{gap:20}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.totalText}>Sub Total:</Text>
            <Text style={styles.text2}>{total + ' RS'}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.totalText}>Delivery Charges:</Text>
            <Text style={styles.text2}>100 RS</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.totalText}>Platform Charges:</Text>
            <Text style={styles.text2}>50 RS</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.totalText}>Grand Total:</Text>
            <Text style={styles.text2}>{total + 100 + 50 + ' RS'}</Text>
            </View>
            <TouchableOpacity onPress={order}>
            <Text style={styles.btn}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    width: '100%',
    height: '90%',
  },
  scrollview: {
    width: '95%',
    margin: 10,
    borderRadius: 10,
    flexGrow: 0,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  total: {
    width: '90%',
    padding: 10,
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius:5,
  },
  totalText: {
    fontSize: 20,
  },
  text2: { fontSize: 20, textAlign: 'right' },
  btn:{
    color:colors.white,
    fontSize:20,
    textAlign:'center',
    padding:5,
    fontWeight:'700',
    backgroundColor:colors.primary,
    borderRadius:5,
   },
});
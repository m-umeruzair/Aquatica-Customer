import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useEffect } from 'react-native';
import Navigation from './src/screens/Navigation';


export default function App() {
  
  
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

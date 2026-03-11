import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';

export default function App() {
  useEffect(()=>{
    setTimeout(()=>router.push('home'),5000)
    
  },[])
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash-screen-bg.png')}
      style={{width:'100%', height:'100%'}}/>
      <View style={{position: 'absolute', top: 0}}>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

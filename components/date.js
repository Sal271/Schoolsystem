import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


 export default function HeaderDate() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Class: 3A</Text>
      <Text style={styles.text}>Date: 12/12/21</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4778c2', // Blue color
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    height:50,

  },
  text: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop:7,
  },
});


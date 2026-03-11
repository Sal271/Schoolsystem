import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function Link({ fileName }) {
  return (
    <View style={styles.container}>
      
    

      {/* Gray Preview Placeholder */}
      <View style={styles.previewBox} />

   
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 30,
    alignItems: 'center',
   
  },

  previewBox: {
    backgroundColor: '#C4C4C4', // The gray placeholder color
    width: '70%',
    height: 180, // Adjust height based on your needs
    marginBottom: 30,
    
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
  },
});


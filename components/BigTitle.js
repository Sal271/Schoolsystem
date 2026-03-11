import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function BigTitle({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 60,
    alignSelf: 'center',
    justifyContent:'center',
    
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0C46C4",
  },
});
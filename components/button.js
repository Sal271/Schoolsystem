import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function Button({ title, onPress }) {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    alignItems: "center", // always center horizontally
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0C46C4",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 200, // optional: ensures a consistent width
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
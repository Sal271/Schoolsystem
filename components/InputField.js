import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function InputField({ label, value, onChangeText, placeholder, secureTextEntry }) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder || `Enter ${label}`}
        placeholderTextColor="#6b6b6b"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    color: "#0b0b0b",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 6,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 14,
    color: "#000",
  },
});s
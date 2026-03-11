import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export default function Header({ title, image }) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        {image && <Image source={image} style={styles.image} />}
        {title && <Text style={styles.text1}>{title}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0C46C4",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  logo: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingLeft: 15,
    flexDirection: "row",
    alignSelf: "flex-start",
  },

  image: {
    width: "14%",
    padding: 2,
  },

  text1: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    padding: 15,
    fontFamily: "arial",
    paddingLeft: 20,
    fontWeight: "bold",
  },
});
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function WelcomeCard({ message }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Message</Text>
        <Feather
          name="arrow-right"
          size={21}
          color="white"
          style={{ marginLeft: 10 }}
        />
      </View>

      <Text style={styles.description}>
        {message.split("\n")[0]}
        {"\n"}
        <Text style={styles.descriptionLight}>{message.split("\n")[1]}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "#0C46C4",
    width: "75%",
    height: 150,
    marginTop: 30,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Arial",
  },
  description: {
    fontSize: 13,
    color: "white",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    fontFamily: "Arial",
    lineHeight: 20,
  },
  descriptionLight: {
    opacity: 0.75,
  },
});
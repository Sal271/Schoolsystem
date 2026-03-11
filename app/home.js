import { Alert, Appearance, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, useColors } from "../constants/colors";
import ActionButton from "../components/action_button";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/home/home-screen-bg.png")}
        style={{ width: "100%", height: "100%" }}
      />
      <View style={styles.content}>
        <View style={styles.buttonsWrapper}>
          <ActionButton
            icon={require(`../assets/home/Student Male-light.png`)}
            text="Student"
            style={{ minWidth: "50%" }}
            onPress={()=>router.push('LoginPage')}
          />
          <ActionButton
            icon={require(`../assets/home/Tuition.png`)}
            text="Teacher"
            style={{ minWidth: "50%" }}
             onPress={()=>router.push('LoginPage')}
          />
          <ActionButton
            icon={require(`../assets/home/Person.png`)}
            text="Guest"
            style={{ minWidth: "50%", marginTop: 80 }}
            onPress={()=>router.push('Guest/Guest')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 280
    // top: 0
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    
  },
});

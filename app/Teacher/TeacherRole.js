import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export default function TeacherDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../../assets/icon/Logo.png")}
          style={styles.background}
          resizeMode="contain"
        />
        {/* Welcome Card */}
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Message , Teacher</Text>
            <Feather
              name="arrow-right"
              size={21}
              color="white"
              style={{ marginLeft: 10 }}
            />
          </View>

          <Text style={styles.description}>
            The standard Lorem Ipsum passage.{"\n"}
            <Text style={styles.descriptionLight}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqu."
            </Text>
          </Text>
        </View>

        {/* Menu Grid */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Teacher/Attendance")}
          >
            <View style={styles.iconBox}>
              <Feather name="calendar" size={40} color="#0C46C4" />
            </View>
            <Text style={styles.menuText}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Teacher/Homework")}
          >
            <View style={styles.iconBox}>
              <Feather name="book-open" size={40} color="#0C46C4" />
            </View>
            <Text style={styles.menuText}>Homework</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Teacher/Result")}
          >
            <View style={styles.iconBox}>
              <Feather name="bar-chart" size={40} color="#0C46C4" />
            </View>
            <Text style={styles.menuText}>Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Teacher/AddMark")}
          >
            <View style={styles.iconBox}>
              <Feather name="edit" size={40} color="#0C46C4" />
            </View>
            <Text style={styles.menuText}>Grades</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Teacher/Solution")}
          >
            <View style={styles.iconBox}>
              <Feather name="help-circle" size={40} color="#0C46C4" />
            </View>
            <Text style={styles.menuText}>Solution</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Teacher/Quiz")}
          >
            <View style={styles.iconBox}>
              <Feather name="file-text" size={40} color="#0C46C4" />
            </View>
            <Text style={styles.menuText}>Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Teacher/AddAccount")}
          >
            <View style={styles.iconBox}>
              <Feather name="user-plus" size={40} color="#0C46C4" />
            </View>
            <Text style={styles.menuText}>Add Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff", // fallback color (visible during image load)
  },

  background: {
    width: 400,
    height: 150,
    alignSelf: "center",
  },

  scrollContent: {
    alignItems: "center",
    paddingBottom: 40, // extra space at bottom
  },

  card: {
    borderRadius: 15,
    backgroundColor: "#0C46C4",
    width: "75%",
    height: 150,
    marginTop: 20,
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
    fontFamily: "Arial",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 55,
    width: 355,
    paddingHorizontal: 10,
  },

  menuItem: {
    alignItems: "center",
    width: "33%", // ≈ 3 items per row on most phones
    marginBottom: 30,
  },

  iconBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 15,
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    // subtle shadow (optional)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  menuText: {
    color: "#000",
    fontFamily: "Arial",
    fontSize: 14,
    fontWeight: "500",
    paddingTop: 8,
    textAlign: "center",
  },
});
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function StudentDashboard() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const username = params.username || ""; // safe fallback

  console.log("StudentDashboard username:", username);

  // Helper to navigate with username
  const goToScreen = (screen) => {
    router.push({
      pathname: screen,
      params: { username },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/icon/Logo.png")}
          style={styles.background}
          resizeMode="contain"
        />

        {/* Welcome Card */}
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
            The standard Lorem Ipsum passage.{"\n"}
            <Text style={styles.descriptionLight}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            </Text>
          </Text>
        </View>

        {/* Menu Grid */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Attendance")}
          >
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/icon/Attendance.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.menuText}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Homework")}
          >
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/icon/Attendance.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.menuText}>Homework</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Result")}
          >
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/icon/Attendance.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.menuText}>Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Question")}
          >
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/icon/Attendance.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.menuText}>Exam Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Solution")}
          >
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/icon/Attendance.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.menuText}>Solution</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Quiz")}
          >
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/icon/Attendance.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.menuText}>Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Quiz1")}
          >
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/icon/Attendance.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.menuText}>Quiz1</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  background: { width: 400, height: 150, alignSelf: "center" },
  scrollContent: { alignItems: "center", paddingBottom: 40 },
  card: {
    borderRadius: 15,
    backgroundColor: "#0C46C4",
    width: "75%",
    height: 150,
    marginTop: 30,
    overflow: "hidden",
  },
  header: { flexDirection: "row", alignItems: "center", paddingTop: 15, paddingLeft: 20 },
  title: { fontSize: 18, fontWeight: "bold", color: "white", fontFamily: "Arial" },
  description: {
    fontSize: 13,
    color: "white",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    fontFamily: "Arial",
    lineHeight: 20,
  },
  descriptionLight: { opacity: 0.75 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 55, width: 355, paddingHorizontal: 10 },
  menuItem: { alignItems: "center", width: "33%", marginBottom: 30 },
  iconBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 15,
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: { width: 50, height: 50, resizeMode: "contain" },
  menuText: { color: "#000", fontSize: 14, fontWeight: "500", paddingTop: 8, textAlign: "center" },
});
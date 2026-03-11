import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from "expo-router";

// Profile Tab
const ProfileTab = ({ route }) => {
  const { username, fullname, className, section, rollNo, email } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.profileText}>Profile Information for {fullname}</Text>

        {/* Profile Information */}
        <View style={styles.profileCard}>
          <Text style={styles.profileLabel}>Username:</Text>
          <Text style={styles.profileText}>{username}</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileLabel}>Full Name:</Text>
          <Text style={styles.profileText}>{fullname}</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileLabel}>Class:</Text>
          <Text style={styles.profileText}>{className}</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileLabel}>Section:</Text>
          <Text style={styles.profileText}>{section}</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileLabel}>Roll No:</Text>
          <Text style={styles.profileText}>{rollNo}</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileText}>{email}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Home Tab
const HomeTab = ({ route }) => {
  const { fullname } = route.params;
  const router = useRouter();  // Initialize the router

  // Helper to navigate with username
  const goToScreen = (screen) => {
    router.push({
      pathname: screen,
      params: { username: fullname },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/icon/Logo.png")}
          style={styles.background}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <Text style={styles.title}>Welcome, {fullname}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Attendance")}
          >
            <View style={styles.iconBox}>
              <Image source={require("../../assets/icon/Attendance.png")} style={styles.icon} />
            </View>
            <Text style={styles.menuText}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Homework")}
          >
            <View style={styles.iconBox}>
              <Image source={require("../../assets/icon/Attendance.png")} style={styles.icon} />
            </View>
            <Text style={styles.menuText}>Homework</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Result")}
          >
            <View style={styles.iconBox}>
              <Image source={require("../../assets/icon/Attendance.png")} style={styles.icon} />
            </View>
            <Text style={styles.menuText}>Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Solution")}
          >
            <View style={styles.iconBox}>
              <Image source={require("../../assets/icon/Attendance.png")} style={styles.icon} />
            </View>
            <Text style={styles.menuText}>Solution</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => goToScreen("/Student/Quiz")}
          >
            <View style={styles.iconBox}>
              <Image source={require("../../assets/icon/Attendance.png")} style={styles.icon} />
            </View>
            <Text style={styles.menuText}>Quiz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Tab Navigation Setup
const Tab = createBottomTabNavigator();

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const { username } = useLocalSearchParams();  // Get the username from params

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        // Get student data from AsyncStorage
        const storedData = await AsyncStorage.getItem('students');
        console.log('Loaded student data:', storedData); // Log the data for debugging

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const currentStudentData = parsedData[username]; // Get data for the logged-in user
          
          if (currentStudentData) {
            setStudentData(currentStudentData); // Set the student data for the logged-in user
          } else {
            console.log("No student data found for this username");
          }
        } else {
          console.log("No data found in AsyncStorage");
        }
      } catch (error) {
        console.log("Error loading student data from AsyncStorage: ", error);
      }
    };

    loadStudentData();
  }, [username]); // Dependency array ensures this runs when `username` changes

  if (!studentData) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#0C46C4",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        initialParams={{ fullname: studentData.fullname }} // passing fullname to Home tab
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        initialParams={{
          username: studentData.username,
          fullname: studentData.fullname,
          className: studentData.className,
          section: studentData.section,
          rollNo: studentData.rollNo,
          email: studentData.email,
        }} // passing student data to Profile tab
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
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
  title: { fontSize: 18, fontWeight: "bold", color: "white", fontFamily: "Arial" },
  profileText: { fontSize: 20, fontWeight: 'bold', color: "#0C46C4", marginTop: 20, textAlign: 'center' },
  profileCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileLabel: { fontSize: 16, fontWeight: "600", color: "#333" },
  profileText: { fontSize: 16, color: "#555", marginTop: 5 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 55,
    width: 355,
    paddingHorizontal: 10,
  },
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
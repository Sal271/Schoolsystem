import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header"; // Your header component
import { useLocalSearchParams } from "expo-router"; // Import to get username from params

export default function StudentResultDashboard() {
  const [studentData, setStudentData] = useState(null);

  // Get the username from the route params (passed dynamically)
  const { username } = useLocalSearchParams(); // This is the logged-in student's username

  // Load student data when the component mounts
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const data = await AsyncStorage.getItem("students");
        const parsedStudents = JSON.parse(data);

        // Find the current logged-in student based on username
        const currentStudent = parsedStudents[username];
        
        if (currentStudent) {
          setStudentData(currentStudent);
        } else {
          Alert.alert("Error", "Student data not found.");
        }
      } catch (error) {
        console.error("Error loading student data:", error);
        Alert.alert("Error", "Failed to load student data.");
      }
    };

    loadStudentData();
  }, [username]); // Dependency on username ensures that we load data for the correct user

  if (!studentData) {
    return <Text>Loading...</Text>; // Show a loading state while the data is being fetched
  }

  return (
    <View style={styles.safeArea}>
      <Header title="Student Dashboard" image={require("../../assets/home/Person.png")} />

      {/* Combined Card for Student Information and Result */}
      <ScrollView style={styles.cardContainer}>
        <View style={styles.card}>
          {/* Student Information */}
          <View style={styles.studentInfo}>
            <Text style={styles.studentInfoText}>Name: {studentData.fullname}</Text>
            <Text style={styles.studentInfoText}>Class: {studentData.className}</Text>
            <Text style={styles.studentInfoText}>Section: {studentData.section}</Text>
            <Text style={styles.studentInfoText}>Roll No: {studentData.rollNo}</Text>
            <Text style={styles.studentInfoText}>Email: {studentData.email}</Text>
          </View>

          {/* Marks and Result */}
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Your Result</Text>
            <View style={styles.resultCard}>
              {/* Display Marks */}
              <Text style={styles.resultText}>
                {studentData.marks ? `Marks: ${studentData.marks}` : "Marks not available"}
              </Text>
              {/* Display Grade based on marks */}
              {studentData.marks && (
                <Text style={styles.resultText}>
                  {studentData.marks >= 90
                    ? "Grade: A"
                    : studentData.marks >= 75
                    ? "Grade: B"
                    : studentData.marks >= 60
                    ? "Grade: C"
                    : "Grade: D"}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#E9E9E9",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  studentInfo: {
    marginBottom: 20,
  },
  studentInfoText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  resultContainer: {
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F4FBF",
    marginBottom: 10,
  },
  resultCard: {
    padding: 20,
    backgroundColor: "#D3D3D3",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  resultText: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
  },
});
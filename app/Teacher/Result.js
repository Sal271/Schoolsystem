import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import TerminalCard from "../../components/TernimalCard"; // Make sure this path is correct
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from '../../components/header'
import { SafeAreaView } from "react-native-safe-area-context";

export default function Result() {
  const [students, setStudents] = useState([]);

  // Load students from AsyncStorage
  useEffect(() => {
    const loadStudents = async () => {
      const data = await AsyncStorage.getItem("students");
      if (data) {
        const parsedStudents = JSON.parse(data);
        setStudents(Object.values(parsedStudents)); // Set students
        console.log("Students loaded from AsyncStorage:", parsedStudents); // Log loaded students
      }
    };
    loadStudents();
  }, []);
 
  // Handle Publish Press (Update marks and publish to AsyncStorage)
  const handlePublishPress = async (studentName) => {
    console.log("Publishing result for:", studentName);

    // Get the students data from AsyncStorage
    const data = await AsyncStorage.getItem("students");
    const existingStudents = JSON.parse(data);

    // Update the student's result (marks)
    if (existingStudents[studentName]) {
      existingStudents[studentName].result = existingStudents[studentName].marks;
      console.log("Updated student data:", existingStudents[studentName]);
    }

    // Save the updated students back to AsyncStorage
    await AsyncStorage.setItem("students", JSON.stringify(existingStudents));

    console.log("Updated students data saved:", existingStudents);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <Header title="RESULT" image={require("../../assets/home/Person.png")} />
        <ScrollView >
   
      {students.map((student) => {
        return (
          <TerminalCard
            key={student.username}
            studentName={student.fullname}
            terminalName="Terminal 1"
            mark={student.marks || "Not Published"}  // Show "Not Published" if no result
            className={student.className}
            section={student.section}
            onPublishPress={handlePublishPress} // Trigger publish when button is pressed
          />
        );
      })}
    </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
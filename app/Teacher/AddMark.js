import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header";

export default function AddMarks() {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});

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

  const handleMarkChange = (username, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [username]: value,
    }));
    console.log("Marks updated:", marks); // Log updated marks for each student
  };

  const handleSaveMarks = async () => {
    try {
      const data = await AsyncStorage.getItem("students");
      const existingStudents = JSON.parse(data);
      
      console.log("Existing students before adding marks:", existingStudents); // Log existing students before saving marks

      // Save the marks in AsyncStorage
      Object.keys(marks).forEach((username) => {
        if (existingStudents[username]) {
          existingStudents[username].marks = marks[username];
        }
      });
      
      await AsyncStorage.setItem("students", JSON.stringify(existingStudents));
      console.log("Marks saved:", existingStudents); // Log the updated students with marks
      alert("Marks saved successfully!");
    } catch (error) {
      console.error("Error saving marks", error);
      alert("Failed to save marks");
    }
  };

  return (
    <View style={styles.safeArea}>
      <Header title="Add Marks" image={require('../../assets/home/Person.png')} />
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.classText}>Class: 3A</Text>
          <Text style={styles.dateText}>Date: 12/12/21</Text>
        </View>

        {/* Divider */}
        <View style={styles.blackDivider} />

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Student Name</Text>
          <Text style={styles.tableHeaderText1}>Marks</Text>
        </View>

        {/* Student List */}
        {students.map((student) => (
          <View key={student.username} style={styles.row}>
            <Text style={styles.nameText}>{student.fullname}</Text>
            <TextInput
              style={styles.markInput}
              placeholder="Enter Marks"
              value={marks[student.username] || ""}
              onChangeText={(value) => handleMarkChange(student.username, value)}
              keyboardType="numeric"
            />
          </View>
        ))}
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveMarks}>
        <Text style={styles.saveButtonText}>Save Marks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff", // Background color
  },
  container: {
    paddingTop:20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4778c2', // Blue color for header
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  classText: {
    color: '#FFFFFF', // White text for class
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#FFFFFF', // White text for date
    fontSize: 18,
    fontWeight: 'bold',
  },
  blackDivider: {
    height: 2,
    backgroundColor: '#ffffff',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#4778c2', // Blue matching header for table
    marginTop: 10,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
  },
  tableHeaderText1: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    marginRight: 34,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D3D3D3', // Light gray row background
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
  },
  nameText: {
    flex: 3,
    color: '#333', // Student name color
  },
  markInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#00CED1', // Teal border for input
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 4,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#1F4FBF', // Blue color for save button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
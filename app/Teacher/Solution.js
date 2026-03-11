import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header";

export default function TeacherSolutionScreen() {
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Load quiz questions and solutions
  useEffect(() => {
    const loadData = async () => {
      try {
        const quizData = await AsyncStorage.getItem("quizQuestions");
        if (quizData) {
          setQuizQuestions(JSON.parse(quizData));
        }
      } catch (error) {
        console.error("Error loading teacher solution data:", error);
      }
    };
    loadData();
  }, []);

  // Handle solution changes
  const handleSolutionChange = (index, value) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index].solution = value;
    setQuizQuestions(updatedQuestions);
  };

  // Delete solution
  const handleDeleteSolution = (index) => {
    Alert.alert("Delete Solution", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedQuestions = quizQuestions.filter((_, i) => i !== index);
          setQuizQuestions(updatedQuestions);
          AsyncStorage.setItem("quizQuestions", JSON.stringify(updatedQuestions));
        },
      },
    ]);
  };

  // Save solution to AsyncStorage
  const handleSaveSolution = async () => {
    try {
      await AsyncStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
      Alert.alert("Solution saved successfully!");
    } catch (error) {
      console.error("Error saving solution:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Teacher Solutions" image={require("../../assets/home/Person.png")} />
      <ScrollView style={styles.container}>
        {quizQuestions.map((question, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.inputLabel}>Question {index + 1}</Text>
            <Text style={styles.input}>{question.question}</Text>

            <Text style={styles.inputLabel}>Solution</Text>
            <TextInput
              style={styles.input}
              value={question.solution}
              onChangeText={(value) => handleSolutionChange(index, value)}
              placeholder="Enter solution"
            />

            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteSolution(index)}>
              <Text style={styles.deleteText}>Delete Solution</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSolution}>
          <Text style={styles.saveButtonText}>Save Solutions</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  container: { padding: 20, paddingTop: 100 },
  card: {
    backgroundColor: "#E9E9E9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  inputLabel: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
  input: { padding: 10, backgroundColor: "#f1f1f1", marginVertical: 5, borderRadius: 8, fontSize: 16 },
  deleteButton: { backgroundColor: "#FF4C4C", paddingVertical: 10, borderRadius: 8, marginTop: 10, alignItems: "center" },
  deleteText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  saveButton: { backgroundColor: "#1F4FBF", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
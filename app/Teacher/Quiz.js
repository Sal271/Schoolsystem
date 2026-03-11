import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header";

export default function TeacherQuizScreen() {
  const [quizQuestions, setQuizQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  // Load quiz questions from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const quizData = await AsyncStorage.getItem("quizQuestions");
        if (quizData) setQuizQuestions(JSON.parse(quizData));
      } catch (error) {
        console.error("Error loading quiz data:", error);
      }
    };
    loadData();
  }, []);

  // Add new blank question
  const handleAddQuestion = () => {
    const newQuestion = { question: "", options: ["", "", "", ""], correctAnswer: "" };
    setQuizQuestions((prev) => [...prev, newQuestion]);
  };

  // Update question, options, and correct answer
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index].question = value;
    setQuizQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index].correctAnswer = value;
    setQuizQuestions(updatedQuestions);
  };

  // Delete question
  const handleDeleteQuestion = (index) => {
    Alert.alert("Delete Question", "Are you sure?", [
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

  // Save quiz to AsyncStorage
  const handleSaveQuiz = async () => {
    try {
      await AsyncStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
      Alert.alert("Quiz saved successfully!");
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Teacher Quiz" image={require("../../assets/home/Person.png")} />
      <ScrollView style={styles.container}>
        {quizQuestions.map((question, index) => (
          <View key={index} style={styles.card}>
            {/* Editable Question */}
            <Text style={styles.inputLabel}>Question {index + 1}</Text>
            <TextInput
              style={styles.input}
              value={question.question}
              onChangeText={(value) => handleQuestionChange(index, value)}
              placeholder="Enter the question"
            />

            {/* Editable Options */}
            {question.options.map((option, optionIndex) => (
              <View key={optionIndex}>
                <Text style={styles.inputLabel}>Option {optionIndex + 1}</Text>
                <TextInput
                  style={styles.input}
                  value={option}
                  onChangeText={(value) => handleOptionChange(index, optionIndex, value)}
                  placeholder={`Enter option ${optionIndex + 1}`}
                />
              </View>
            ))}

            <Text style={styles.inputLabel}>Correct Answer</Text>
            <TextInput
              style={styles.input}
              value={question.correctAnswer}
              onChangeText={(value) => handleCorrectAnswerChange(index, value)}
              placeholder="Enter correct answer"
            />

            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteQuestion(index)}>
              <Text style={styles.deleteText}>Delete Question</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
          <Text style={styles.addButtonText}>+ Add New Question</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveQuiz}>
          <Text style={styles.saveButtonText}>Save Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  container: { padding: 20, paddingTop: 100 }, // Apply top padding of 100
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
  addButton: { backgroundColor: "#1F9F1F", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  saveButton: { backgroundColor: "#1F4FBF", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
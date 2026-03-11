import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header";
import Button from "../../components/button";

export default function StudentQuizScreen() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState({});

  // Load the quiz data for the student (from AsyncStorage)
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const quizData = await AsyncStorage.getItem("quizQuestions");
        if (quizData) {
          setQuizQuestions(JSON.parse(quizData));
        } else {
          alert("No quiz data found!");
        }
      } catch (error) {
        console.error("Error loading quiz data:", error);
      }
    };
    loadQuizData();
  }, []);

  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    setStudentAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    let score = 0;

    // Check student's answers against the correct answers
    quizQuestions.forEach((question, index) => {
      if (studentAnswers[index] === question.correctAnswer) {
        score++;
      }
    });

    // Store the student's result
    try {
      const studentResult = {
        studentAnswers,
        score,
      };
      await AsyncStorage.setItem("studentQuizResult", JSON.stringify(studentResult));
      alert(`Your score: ${score} out of ${quizQuestions.length}`);
    } catch (error) {
      console.error("Error saving student quiz result", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Student Quiz" image={require("../../assets/home/Person.png")} />
      <ScrollView style={styles.container}>
        {quizQuestions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                style={styles.optionButton}
                onPress={() => handleAnswerSelection(index, option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    studentAnswers[index] === option && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    padding: 20,
    paddingTop:100,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    backgroundColor: "#E9E9E9",
    marginVertical: 5,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#555",
  },
  selectedOptionText: {
    color: "#1F4FBF",
    fontWeight: "bold",
  },
});
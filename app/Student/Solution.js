import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header";

export default function StudentResultsScreen() {
  const [studentResult, setStudentResult] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resultData = await AsyncStorage.getItem("studentQuizResult");
        const quizData = await AsyncStorage.getItem("quizQuestions");

        if (resultData && quizData) {
          setStudentResult(JSON.parse(resultData));
          setQuizQuestions(JSON.parse(quizData));
        } else {
          alert("No quiz results found!");
        }
      } catch (error) {
        console.error("Error loading student data:", error);
      }
    };
    loadData();
  }, []);

  if (!studentResult || !quizQuestions.length) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Your Quiz Results" image={require("../../assets/home/Person.png")} />
      <ScrollView style={styles.container}>
        <Text style={styles.scoreText}>
          Your Score: {studentResult.score} / {quizQuestions.length}
        </Text>

        {quizQuestions.map((question, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.questionText}>{question.question}</Text>
            <Text style={styles.correctAnswerText}>
              Correct Answer: {question.correctAnswer}
            </Text>
            <Text style={styles.studentAnswerText}>
              Your Answer: {studentResult.studentAnswers[index]}
            </Text>
          </View>
        ))}
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
  scoreText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F4FBF",
    marginBottom: 20,
  },
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
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  correctAnswerText: {
    fontSize: 16,
    color: "green",
  },
  studentAnswerText: {
    fontSize: 16,
    color: "red",
  },
});
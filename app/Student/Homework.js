import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Sharing from "expo-sharing";

export default function StudentHomework() {
  const [homeworkList, setHomeworkList] = useState([]);
  const [username, setUsername] = useState("student1"); // Replace with logged-in username

  useEffect(() => {
    loadHomework();
  }, []);

  const loadHomework = async () => {
    const storedHomework = await AsyncStorage.getItem("homework");
    const list = storedHomework ? JSON.parse(storedHomework) : [];

    // Normalize homework: ensure each has a submitted array
    const normalizedList = list.map(hw => ({ ...hw, submitted: hw.submitted || [] }));
    setHomeworkList(normalizedList);
  };

  const markAsDone = async (index) => {
    const updatedList = [...homeworkList];
    const hw = updatedList[index];

    if (!hw.submitted.includes(username)) {
      hw.submitted.push(username);
      await AsyncStorage.setItem("homework", JSON.stringify(updatedList));
      setHomeworkList(updatedList);
    } else {
      Alert.alert("Already submitted", "You have already marked this homework as done.");
    }
  };

  const openFile = async (file) => {
    if (file && file.uri) {
      try {
        await Sharing.shareAsync(file.uri);
      } catch (e) {
        console.log("❌ Error opening file:", e);
        Alert.alert("Error", "Unable to open file");
      }
    } else {
      Alert.alert("No file", "This homework has no file attached.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Homework List" image={require("../../assets/home/Person.png")} />
      <ScrollView contentContainerStyle={styles.container}>
        {homeworkList.length === 0 && <Text style={styles.noData}>No homework assigned yet</Text>}

        {homeworkList.map((hw, index) => {
          const isDone = hw.submitted.includes(username); // safe now
          return (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>{hw.title}</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Subject:</Text> {hw.subject}</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Class:</Text> {hw.className}</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Due:</Text> {hw.dueDate}</Text>

              {hw.file && (
                <TouchableOpacity style={styles.fileButton} onPress={() => openFile(hw.file)}>
                  <Text style={styles.fileButtonText}>View File</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.submitButton, isDone && styles.doneButton]}
                onPress={() => markAsDone(index)}
                disabled={isDone}
              >
                <Text style={styles.submitButtonText}>
                  {isDone ? "Completed ✅" : "Mark as Done"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f4f6f8" },
  container: { padding: 20, paddingBottom: 50 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  title: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  detail: { marginBottom: 5 },
  bold: { fontWeight: "bold" },
  fileButton: { backgroundColor: "#e0e0e0", padding: 10, borderRadius: 8, alignItems: "center", marginTop: 10 },
  fileButtonText: { color: "#0C46C4", fontWeight: "bold" },
  submitButton: { backgroundColor: "#0C46C4", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  doneButton: { backgroundColor: "#28a745" },
  submitButtonText: { color: "#fff", fontWeight: "bold" },
  noData: { textAlign: "center", marginTop: 20, fontStyle: "italic" },
});
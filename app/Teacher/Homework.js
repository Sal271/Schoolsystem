import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import Header from "../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TeacherHomework() {
  const [homeworkList, setHomeworkList] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadHomework();
  }, []);

  const loadHomework = async () => {
    const storedHomework = await AsyncStorage.getItem("homework");
    setHomeworkList(storedHomework ? JSON.parse(storedHomework) : []);
  };

  const saveHomework = async (data) => {
    await AsyncStorage.setItem("homework", JSON.stringify(data));
    setHomeworkList(data);
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      console.log("📄 File pick result:", result);

      if (result.type === "success") {
        // New DocumentPicker returns 'assets' array
        const pickedFile = result.assets ? result.assets[0] : result;
        console.log("✅ Picked file:", pickedFile);
        setFile(pickedFile);
      }
    } catch (e) {
      console.log("❌ File pick error:", e);
      Alert.alert("Error", "File pick failed");
    }
  };

  const addHomework = () => {
    if (!title || !subject || !className || !dueDate) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newHomework = { title, subject, className, dueDate, file, submitted: [] };

    let updatedList;
    if (editingIndex !== null) {
      // Update existing homework
      updatedList = [...homeworkList];
      updatedList[editingIndex] = newHomework;
      setEditingIndex(null);
    } else {
      // Add new homework
      updatedList = [...homeworkList, newHomework];
    }

    saveHomework(updatedList);

    // reset form
    setTitle(""); setSubject(""); setClassName(""); setDueDate(""); setFile(null);
  };

  const deleteHomework = (index) => {
    const updatedList = homeworkList.filter((_, i) => i !== index);
    saveHomework(updatedList);

    // If deleting the one being edited, reset form
    if (editingIndex === index) {
      setEditingIndex(null);
      setTitle(""); setSubject(""); setClassName(""); setDueDate(""); setFile(null);
    }
  };

  const editHomework = (index) => {
    const hw = homeworkList[index];
    setTitle(hw.title);
    setSubject(hw.subject);
    setClassName(hw.className);
    setDueDate(hw.dueDate);
    setFile(hw.file || null);
    setEditingIndex(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Homework Management" image={require("../../assets/home/Person.png")} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title" />

        <Text style={styles.label}>Subject</Text>
        <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder="Enter subject" />

        <Text style={styles.label}>Class</Text>
        <TextInput style={styles.input} value={className} onChangeText={setClassName} placeholder="Enter class" />

        <Text style={styles.label}>Due Date</Text>
        <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD" />

        <TouchableOpacity style={styles.fileButton} onPress={pickFile}>
          <Text style={styles.fileButtonText}>{file ? `File: ${file.name}` : "Upload File"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={addHomework}>
          <Text style={styles.addButtonText}>
            {editingIndex !== null ? "Update Homework" : "Add Homework"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Assigned Homework</Text>
        {homeworkList.length === 0 && <Text style={styles.noData}>No homework added yet</Text>}

        {homeworkList.map((hw, index) => (
          <View key={index} style={[styles.row, index % 2 === 0 ? styles.even : styles.odd]}>
            <Text style={styles.cell}>{hw.title}</Text>
            <Text style={styles.cell}>{hw.subject}</Text>
            <Text style={styles.cell}>{hw.className}</Text>
            <Text style={styles.cell}>{hw.dueDate}</Text>
            {hw.file && <Text style={styles.fileText}>{hw.file.name}</Text>}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => editHomework(index)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteHomework(index)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f4f6f8" },
  container: { padding: 20 },
  label: { marginTop: 10, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 5 },
  fileButton: { marginTop: 10, backgroundColor: "#e0e0e0", padding: 10, borderRadius: 8, alignItems: "center" },
  fileButtonText: { color: "#333" },
  addButton: { backgroundColor: "#0C46C4", padding: 12, borderRadius: 8, marginTop: 15, alignItems: "center" },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginTop: 20, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10, flexWrap: "wrap" },
  even: { backgroundColor: "#ffffff", padding: 10, borderRadius: 8 },
  odd: { backgroundColor: "#eef6ff", padding: 10, borderRadius: 8 },
  cell: { flex: 1, textAlign: "center", padding: 5 },
  editText: { color: "green", marginRight: 10, fontWeight: "bold" },
  deleteText: { color: "red", fontWeight: "bold" },
  noData: { textAlign: "center", marginTop: 20, fontStyle: "italic" },
  fileText: { flex: 1, textAlign: "center", color: "#555" },
});
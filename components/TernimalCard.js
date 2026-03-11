import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TerminalCard({
  studentName,
  terminalName,
  result,
  mark, // Make sure you're receiving 'mark' prop here
  className,
  section,
  onPublishPress,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.topBar} />

      {/* Dynamic Title */}
      <Text style={styles.title}>{terminalName}</Text>

      {/* Content Box with student info */}
      <View style={styles.contentBox}>
        <Text style={styles.studentName}>Name: {studentName}</Text>
        <Text style={styles.resultText}>Mark: {mark}</Text>
        <Text style={styles.classText}>Class: {className}</Text> 
        <Text style={styles.sectionText}>Section: {section}</Text>
      </View>

      <TouchableOpacity style={styles.publishBtn} onPress={() => onPublishPress(studentName)}>
        <Text style={styles.publishText}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E9E9E9",
    borderRadius: 25,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 40,
    overflow: "hidden",
  },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 18,
    backgroundColor: "#1F4FBF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F4FBF",
    marginTop: 20,
    marginBottom: 20,
  },

  contentBox: {
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    padding: 15,
  },

  studentName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  resultText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },

  classText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },

  sectionText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },

  publishBtn: {
    marginTop: 15,
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  publishText: {
    color: "#1F4FBF",
    fontWeight: "600",
    fontSize: 14,
  },
});
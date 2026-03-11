import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import Header from "../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StudentAttendance() {
  const { username } = useLocalSearchParams();
  const [records, setRecords] = useState([]);
  const studentClass = "SD M16"; // Example class, can be dynamic

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const storedAttendance = await AsyncStorage.getItem("attendance");
      const attendanceData = storedAttendance ? JSON.parse(storedAttendance) : {};

      const result = [];

      Object.keys(attendanceData).forEach(date => {
        const status = attendanceData[date]?.[username];
        if (status) {
          result.push({
            date,
            status,
            username,
            class: studentClass
          });
        }
      });

      setRecords(result);
    } catch (error) {
      console.log("Attendance load error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="My Attendance"
        image={require("../../assets/home/Person.png")}
      />

      <ScrollView contentContainerStyle={styles.container}>

        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, { flex: 2 }]}>Name</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Class</Text>
          <Text style={[styles.cell, { flex: 2 }]}>Date</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Attendance</Text>
        </View>

        {/* No Data */}
        {records.length === 0 && (
          <View style={styles.row}>
            <Text style={styles.noData}>No attendance records</Text>
          </View>
        )}

        {/* Table Rows */}
        {records.map((item, index) => (
          <View
            key={index}
            style={[
              styles.row,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}
          >
            <Text style={[styles.cell, { flex: 2 }]}>{item.username}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.class}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.date}</Text>
            <View
              style={[
                styles.attendanceBadge,
                item.status.toLowerCase() === "present"
                  ? styles.present
                  : styles.absent,
              ]}
            >
              <Text
                style={[
                  styles.attendanceText,
                  item.status.toLowerCase() === "present"
                    ? styles.presentText
                    : styles.absentText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f4f6f8" },
  container: {  paddingBottom: 50 },

  row: { flexDirection: "row", alignItems: "center", paddingVertical: 5 },
  headerRow: { backgroundColor: "#5078cf" ,paddingRight:10,},
  cell: { textAlign: "center", paddingVertical: 18,  fontSize: 13 },
  evenRow: { backgroundColor: "#ffffff" },
  oddRow: { backgroundColor: "#eef6ff" },

  attendanceBadge: { paddingHorizontal: 40, paddingVertical: 12, borderRadius: 15 },
  present: { backgroundColor: "#d4f5d4" },
  absent: { backgroundColor: "#ffd6d6" },
  attendanceText: { fontWeight: "bold", fontSize: 13, },
  presentText: { color: "#2f9c2f" },
  absentText: { color: "#d13a3a" },

  headerCell: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  noData: { textAlign: "center", flex: 1, color: "#888", fontStyle: "italic", padding: 20 },
});
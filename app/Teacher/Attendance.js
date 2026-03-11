import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderDate from "../../components/date";

export default function Attendance() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {

      const storedStudents = await AsyncStorage.getItem("students");
      const studentsObj = storedStudents ? JSON.parse(storedStudents) : {};

      const studentList = Object.values(studentsObj);

      setStudents(studentList);

    } catch (error) {
      console.log("Load students error:", error);
    }
  };

  const markAttendance = (username, status) => {
    setAttendance({
      ...attendance,
      [username]: status
    });
  };

  const saveAttendance = async () => {

    const today = new Date().toISOString().split("T")[0];

    const storedAttendance = await AsyncStorage.getItem("attendance");
    const attendanceData = storedAttendance ? JSON.parse(storedAttendance) : {};

    attendanceData[today] = attendance;

    await AsyncStorage.setItem("attendance", JSON.stringify(attendanceData));

    alert("Attendance saved");
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <Header
        title="ATTENDANCE"
        image={require('../../assets/home/Person.png')}
      />

      <HeaderDate/>

      <ScrollView style={styles.container}>

        <View style={styles.table}>

          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Student Name</Text>
            <Text style={styles.headerText1}>Present</Text>
            <Text style={styles.headerText2}>Absent</Text>
          </View>

          {students.map((student, index) => {

            const isPresent = attendance[student.username] === "present";
            const isAbsent = attendance[student.username] === "absent";

            return (
              <View
                key={student.username}
                style={[
                  styles.dataRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
              >

                <Text style={styles.nameText}>
                  {student.fullname}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    isPresent && styles.checked
                  ]}
                  onPress={() =>
                    markAttendance(student.username, "present")
                  }
                />

                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    isAbsent && styles.checked
                  ]}
                  onPress={() =>
                    markAttendance(student.username, "absent")
                  }
                />

              </View>
            );
          })}

        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveAttendance}
        >
          <Text style={styles.saveText}>Save Attendance</Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea:{
    flex:1,
    backgroundColor:"#fff"
  },

  container:{
    flex:1
  },

  table:{
    borderWidth:1,
    borderColor:"#ddd"
  },

  headerRow:{
    flexDirection:"row",
    backgroundColor:"#75a5d4",
    paddingVertical:10
  },

  headerText:{
    flex:3,
    color:"#fff",
    fontWeight:"bold",
    paddingLeft:10
  },

  headerText1:{
    flex:1,
    color:"#fff",
    fontWeight:"bold",
    textAlign:"center"
  },

  headerText2:{
    flex:1,
    color:"#fff",
    fontWeight:"bold",
    textAlign:"center"
  },

  dataRow:{
    flexDirection:"row",
    paddingVertical:12,
    alignItems:"center",
    borderBottomWidth:1,
    borderBottomColor:"#ddd"
  },

  evenRow:{
    backgroundColor:"#F0F8FF"
  },

  oddRow:{
    backgroundColor:"#fff"
  },

  nameText:{
    flex:3,
    paddingLeft:10
  },

  checkbox:{
    width:22,
    height:22,
    borderWidth:1,
    borderColor:"#007BFF",
    marginHorizontal:25
  },

  checked:{
    backgroundColor:"#007BFF"
  },

  saveButton:{
    backgroundColor:"#0C46C4",
    padding:15,
    margin:20,
    borderRadius:8,
    alignItems:"center"
  },

  saveText:{
    color:"#fff",
    fontSize:16
  }

});
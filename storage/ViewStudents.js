import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    console.log("Loading students from AsyncStorage...");

    try {

      const data = await AsyncStorage.getItem("students");

      if (data) {

        const parsed = JSON.parse(data);

        console.log("Students found:", parsed);

        // convert object to array with key
        const list = Object.keys(parsed).map((key) => ({
          key,
          ...parsed[key],
        }));

        setStudents(list);

      } else {

        console.log("No students found");

      }

    } catch (error) {

      console.log("Load error:", error);

    }

  };

  const deleteStudent = async (key) => {

    console.log("Deleting student with key:", key);

    try {

      const data = await AsyncStorage.getItem("students");

      const students = JSON.parse(data);

      console.log("Before delete:", students);

      delete students[key];

      await AsyncStorage.setItem("students", JSON.stringify(students));

      console.log("After delete:", students);

      Alert.alert("Deleted", "Student removed");

      loadStudents();

    } catch (error) {

      console.log("Delete error:", error);

    }

  };

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <Text style={styles.name}>{item.fullname}</Text>

      <Text>Username: {item.username}</Text>

      <Text>Class: {item.className}</Text>

      <Text>Section: {item.section}</Text>

      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => Alert.alert("Edit", "Edit feature coming next")}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() =>
            Alert.alert(
              "Delete Student",
              "Are you sure?",
              [
                { text: "Cancel" },
                { text: "Delete", onPress: () => deleteStudent(item.key) }
              ]
            )
          }
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>

      </View>

    </View>

  );

  return (
    <View style={styles.container}>

      <FlatList
        data={students}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />

    </View>
  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#fff",
    padding:20
  },

  card:{
    backgroundColor:"#eee",
    padding:15,
    borderRadius:10,
    marginBottom:15
  },

  name:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:5
  },

  buttonRow:{
    flexDirection:"row",
    marginTop:10,
    gap:10
  },

  editBtn:{
    backgroundColor:"#2E86DE",
    padding:8,
    borderRadius:6
  },

  deleteBtn:{
    backgroundColor:"#E74C3C",
    padding:8,
    borderRadius:6
  },

  btnText:{
    color:"#fff",
    fontWeight:"bold"
  }

});
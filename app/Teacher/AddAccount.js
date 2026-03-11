import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddAccount() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [rollNo, setRollNo] = useState("");

  const AddAccount = async () => {
    try {

      const student = {
        username,
        password,
        fullname,
        email,
        className,
        section,
        rollNo,
      };

      const existing = await AsyncStorage.getItem("students");
      const students = existing ? JSON.parse(existing) : {};

      students[username] = student;

      await AsyncStorage.setItem("students", JSON.stringify(students));

      Alert.alert("Success", "Student account added!");

      setUsername("");
      setPassword("");
      setFullname("");
      setEmail("");
      setClassName("");
      setSection("");
      setRollNo("");

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save student");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Image
          source={require("../../assets/icon/Logo.png")}
          style={styles.background}
          resizeMode="contain"
        />

        <View style={styles.container}>

          <Text style={styles.text}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.text}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            value={fullname}
            onChangeText={setFullname}
          />

          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.text}>Class</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Class"
            value={className}
            onChangeText={setClassName}
          />

          <Text style={styles.text}>Section</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Section"
            value={section}
            onChangeText={setSection}
          />

          <Text style={styles.text}>Roll No</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Roll Number"
            value={rollNo}
            onChangeText={setRollNo}
          />

          <TouchableOpacity style={styles.addButton} onPress={AddAccount}>
            <Text style={styles.addButtonText}>Add Account</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea:{
    flex:1,
    backgroundColor:"#fff"
  },

  background:{
    width:400,
    height:150,
    alignSelf:"center"
  },

  container:{
    padding:20,
    width:'90%',
    alignSelf:'center',
    gap:10
  },

  text:{
    fontSize:15
  },

  input:{
    borderWidth:1,
    borderColor:'blue',
    height:55,
    paddingLeft:15
  },

  addButton:{
    backgroundColor:"#0C46C4",
    padding:12,
    borderRadius:8,
    alignItems:"center",
    marginTop:40
  },

  addButtonText:{
    color:"#fff",
    fontSize:17
  }

});
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ImageBackground, 
  TouchableOpacity,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // Trim username to remove leading/trailing spaces
      const trimmedUsername = username.trim();

      // Teacher Login
      if (trimmedUsername === "teacher" && password === "123") {
        router.push("/Teacher/TeacherRole");
        return;
      }

      // Load students from AsyncStorage
      const storedStudents = await AsyncStorage.getItem("students");
      const students = storedStudents ? JSON.parse(storedStudents) : {};

      const student = students[trimmedUsername]; // Use the trimmed username

      // Check student login
      if (student && student.password === password) {
        // Navigate to the student's role page and pass the username in params
        router.push({
          pathname: "/Student/StudentRole",
          params: { username: trimmedUsername }  // Pass the trimmed username here
        });
      } else {
        Alert.alert("Login Failed", "Invalid username or password");
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/home/DefaultScreen.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <Text style={styles.text}>Username</Text>

        <View style={styles.itemContainer}>
          <TextInput
            style={[styles.input, { paddingRight: 40 }]}
            placeholder="SteveJob123"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <FontAwesome
            name="user"
            size={24}
            color="#0C46C4"
            style={styles.inputIcon}
          />
        </View>

        <Text style={styles.text}>Password</Text>

        <View style={styles.itemContainer}>
          <TextInput
            style={[styles.input, { paddingRight: 40 }]}
            placeholder="*************"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.inputIcon}
          >
            <AntDesign
              name={showPassword ? "eye" : "eye-invisible"}
              size={24}
              color="#0C46C4"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}  // Trigger handleLogin on press
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.forgotPassword}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 20,
    borderRadius: 10,
    marginTop: 100
  },
  text: {
    fontSize: 15,
    fontFamily: "Arial",
    paddingBottom: 10,
    color: "#333"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative"
  },
  input: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "transparent"
  },
  inputIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }]
  },
  loginButton: {
    backgroundColor: "#0C46C4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  forgotPassword: {
    color: "#acaaaa",
    textAlign: "center",
    marginTop: 15
  }
});
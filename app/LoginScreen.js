import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (!userData) {
      Alert.alert("Error", "No account found. Please sign up first.");
      router.replace("/SignupScreen");
      return;
    }

    const user = JSON.parse(userData);
    if (user.email === email && user.password === password) {
      Alert.alert("Success", `Welcome back, ${user.name}!`);
      router.replace("/Dashboard");
    } else {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  // ✅ Skip button handler
  const handleSkip = () => {
    router.replace("/Dashboard");
  };

  return (
    <ImageBackground
      source={require("../assets/image/5.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>
          Login to continue your fitness journey
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/SignupScreen")}>
          <Text style={styles.link}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>

        {/* ✅ Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  container: { flex: 1, justifyContent: "center", padding: 28 },
  title: { color: "#fff", fontSize: 28, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#aaa", marginBottom: 20 },
  input: {
    backgroundColor: "rgba(26,26,26,0.8)",
    color: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  button: {
    backgroundColor: "#FF7A1A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#FF7A1A", textAlign: "center", marginTop: 10 },
  skipButton: {
    marginTop: 20,
    alignItems: "center",
  },
  skipText: {
    color: "#ccc",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

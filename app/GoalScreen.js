// app/GoalScreen.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function GoalScreen() {
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [height, setHeight] = useState("");
  const router = useRouter();

  const handleSetGoal = async () => {
    if (!currentWeight || !goalWeight || !height) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const data = {
      currentWeight: parseFloat(currentWeight),
      goalWeight: parseFloat(goalWeight),
      height: parseFloat(height),
    };

    await AsyncStorage.setItem("fitnessData", JSON.stringify(data));
    router.push("/ProgressScreen");
  };

  return (
    <ImageBackground
      source={require("../assets/image/5.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.wrapper}>
          {/* Header & Inputs */}
          <View style={styles.mainContent}>
            <View style={styles.header}>
              <Ionicons name="barbell-outline" size={40} color="#FF7A1A" />
              <Text style={styles.title}>Set Your Goal</Text>
              <Text style={styles.subtitle}>
                Define your journey and track progress like a pro 🚀
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Current Weight (kg)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g. 75"
                placeholderTextColor="#777"
                value={currentWeight}
                onChangeText={setCurrentWeight}
              />

              <Text style={styles.label}>Goal Weight (kg)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g. 65"
                placeholderTextColor="#777"
                value={goalWeight}
                onChangeText={setGoalWeight}
              />

              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g. 170"
                placeholderTextColor="#777"
                value={height}
                onChangeText={setHeight}
              />

              <TouchableOpacity style={styles.button} onPress={handleSetGoal}>
                <View style={styles.gradientButton}>
                  <Text style={styles.buttonText}>💾 Save Goal</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.push("/Dashboard")}
            >
              <Ionicons name="home" size={24} color="#9B9B9B" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.push("/WorkoutScreen")}
            >
              <Ionicons name="pie-chart-outline" size={24} color="#9B9B9B" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButtonActive}
              onPress={() => router.push("/GoalScreen")}
            >
              <Ionicons name="trophy-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.push("/ReportsScreen")}
            >
              <Ionicons name="bar-chart-outline" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.push("/Profile")}
            >
              <Ionicons name="person" size={24} color="#9B9B9B" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-between", // ✅ bottom nav fixed
  },
  mainContent: {
    flex: 1, // ✅ ensures inputs stay centered without breaking bottom nav
    justifyContent: "center",
    padding: 20,
  },

  header: { alignItems: "center", marginBottom: 30 },
  title: { color: "#fff", fontSize: 28, fontWeight: "800", marginTop: 10 },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#FF7A1A",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  label: {
    color: "#FF7A1A",
    fontSize: 14,
    marginTop: 12,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#fff",
    padding: 14,
    borderRadius: 12,
    marginTop: 6,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,122,26,0.4)",
  },

  button: { marginTop: 30 },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#FF7A1A",
    shadowColor: "#FF7A1A",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  /* Bottom Nav */
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // paddingVertical: 24, // ✅ ab properly apply hoga
     paddingBottom:34,
    paddingTop:20,
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  navButton: {
    padding: 10,
  },
  navButtonActive: {
    padding: 12,
    backgroundColor: "#FF7A1A",
    borderRadius: 50,
    shadowColor: "#FF7A1A",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
});

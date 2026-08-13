import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StartChallenge({ navigation }) {
  const [steps, setSteps] = useState(0);
  const goal = 200;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏃 Challenge In Progress</Text>
      <Text style={styles.steps}>{steps} / {goal} Steps</Text>

      {/* Dummy Button to Increase Steps (Test Purpose) */}
      <TouchableOpacity
        style={styles.addStep}
        onPress={() => setSteps((prev) => prev + 10)}
      >
        <Text style={styles.addText}>+10 Steps</Text>
      </TouchableOpacity>

      {steps >= goal && (
        <Text style={styles.completed}>🎉 Challenge Completed!</Text>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "#ff6600", marginBottom: 20 },
  steps: { fontSize: 20, color: "#fff", marginBottom: 20 },
  addStep: { backgroundColor: "#ff6600", padding: 15, borderRadius: 12, marginBottom: 20 },
  addText: { color: "#fff", fontWeight: "bold" },
  completed: { fontSize: 18, color: "lime", marginTop: 10 },
  backButton: { marginTop: 30, padding: 10, backgroundColor: "#333", borderRadius: 10 },
  backText: { color: "#fff" },
});

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function ChallengeInProgress() {
  const [steps, setSteps] = useState(0);
  const [progress] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prev) => {
        if (prev >= 200) {
          clearInterval(interval);
          setTimeout(() => router.replace("/ChallengeComplete"), 1500);
          return 200;
        }
        return prev + 20; // demo increment
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: steps / 200,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [steps]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <LinearGradient
      colors={["#000", "#111", "#1a1a1a"]}
      style={styles.container}
    >
      {/* Challenge Header */}
      <Text style={styles.title}>🔥 200 Step Challenge</Text>
      <Text style={styles.subTitle}>Complete today’s challenge & earn rewards</Text>

      {/* Steps Section */}
      <View style={styles.card}>
        <Text style={styles.cardText}>👣 Steps Taken</Text>
        <Text style={styles.counter}>{steps}</Text>
      </View>

      {/* Goal Section */}
      <View style={styles.card}>
        <Text style={styles.cardText}>🎯 Goal</Text>
        <Text style={styles.goal}>200 Steps</Text>
      </View>

      {/* Progress Circle */}
      <View style={styles.progressCircle}>
        <Text style={styles.counter}>{steps} / 200</Text>
        <Text style={styles.circleLabel}>Progress</Text>
      </View>

      {/* Progress Bar with Label */}
      <View style={styles.progressWrapper}>
        <Text style={styles.progressLabel}>📊 Overall Progress</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>
        <Text style={styles.percentText}>
          {Math.round((steps / 200) * 100)}%
        </Text>
      </View>

      {/* Motivation */}
      <Text style={styles.motivation}>
        {steps < 200
          ? "Keep pushing, you got this! 💪"
          : "Challenge Complete 🎉"}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { color: "#ff6600", fontSize: 26, fontWeight: "bold", marginBottom: 5 },
  subTitle: { color: "#aaa", fontSize: 15, marginBottom: 25 },

  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  cardText: { color: "#ffcc00", fontSize: 16, marginBottom: 5 },
  counter: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  goal: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  progressCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 10,
    borderColor: "#ff6600",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    backgroundColor: "#111",
  },
  circleLabel: { color: "#aaa", fontSize: 14, marginTop: 5 },

  progressWrapper: {
    width: "85%",
    alignItems: "center",
    marginBottom: 20,
  },
  progressLabel: { color: "#ddd", marginBottom: 8, fontSize: 15 },
  progressBar: {
    width: "100%",
    height: 16,
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff6600",
  },
  percentText: { color: "#ffcc00", marginTop: 8, fontSize: 15 },

  motivation: { color: "#fff", fontSize: 16, marginTop: 10 },
});

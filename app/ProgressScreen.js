// app/ProgressScreen.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function ProgressScreen() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem("fitnessData");
      if (saved) {
        setData(JSON.parse(saved));
      }
    };
    loadData();
  }, []);

  if (!data) {
    return (
      <ImageBackground
        source={require("../assets/image/builder.jpg")}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={{ color: "#fff" }}>⚠️ No data found. Please set your goal.</Text>
        </View>
      </ImageBackground>
    );
  }

  const { currentWeight, goalWeight, height } = data;
  const progress =
    ((currentWeight - goalWeight) / currentWeight) * 100 < 0
      ? 0
      : ((currentWeight - goalWeight) / currentWeight) * 100;

  // BMI
  const heightM = height / 100;
  const bmi = currentWeight / (heightM * heightM);

  let suggestion = "";
  let cardColor = "#333";

  if (bmi < 18.5) {
    suggestion = "⚠️ Underweight: You should gain some weight.";
    cardColor = "#007BFF";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    suggestion = "✅ Fit: Your weight is healthy!";
    cardColor = "#28A745";
  } else if (bmi >= 25 && bmi < 29.9) {
    suggestion = "⚠️ Overweight: Try to lose some weight.";
    cardColor = "#FF9800";
  } else {
    suggestion = "🚨 Obese: Strongly advised to lose weight.";
    cardColor = "#E53935";
  }

  return (
    <ImageBackground
      source={require("../assets/image/builder.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* 👇 Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>📊 Progress Overview</Text>

        <AnimatedCircularProgress
          size={180}
          width={12}
          fill={progress}
          tintColor="#FF7A1A"
          backgroundColor="#333"
          rotation={0}
          style={{ marginBottom: 20 }}
        >
          {(fill) => <Text style={styles.progressText}>{Math.round(fill)}%</Text>}
        </AnimatedCircularProgress>

        <View style={styles.card}>
          <Ionicons name="fitness-outline" size={22} color="#FF7A1A" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>Current Weight</Text>
            <Text style={styles.value}>{currentWeight} kg</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="trophy-outline" size={22} color="#FF7A1A" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>Goal Weight</Text>
            <Text style={styles.value}>{goalWeight} kg</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="body-outline" size={22} color="#FF7A1A" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>{height} cm</Text>
          </View>
        </View>

        <View style={[styles.suggestionCard, { backgroundColor: cardColor }]}>
          <Text style={styles.suggestionText}>{suggestion}</Text>
        </View>
      </ScrollView>

      {/* 👇 Bottom Navigation Fixed */}
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

        <TouchableOpacity style={styles.navButton}>
          <View style={styles.activeCircle}>
            <Ionicons name="trophy-outline" size={24} color="#fff" />
          </View>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.7)" },
  container: { alignItems: "center", padding: 20, paddingBottom: 100 }, // 👈 bottom space for nav
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 20 },
  progressText: { color: "#fff", fontSize: 22, fontWeight: "700" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 12,
    width: "95%",
    marginTop: 15,
  },
  label: { color: "#aaa", fontSize: 14 },
  value: { color: "#fff", fontSize: 18, fontWeight: "600" },
  suggestionCard: {
    marginTop: 25,
    padding: 18,
    borderRadius: 12,
    width: "95%",
    alignItems: "center",
    marginBottom: 40, // 👈 extra margin so it doesn’t hide behind nav
  },
  suggestionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingBottom: 34,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: { flex: 1, alignItems: "center", justifyContent: "center" },
  activeCircle: { backgroundColor: "#FF7A1A", padding: 12, borderRadius: 30 },
});

// app/ReportsScreen.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

export default function ReportsScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;

  const [workouts, setWorkouts] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // 🔥 Dummy data for graph
  const weeklyData = [20, 45, 28, 80, 99, 43, 50];
  const monthlyData = [200, 450, 300, 500];

  // Load saved stats (AsyncStorage)
  useEffect(() => {
    const loadStats = async () => {
      try {
        const w = await AsyncStorage.getItem("workouts");
        const c = await AsyncStorage.getItem("calories");
        const m = await AsyncStorage.getItem("minutes");
        if (w) setWorkouts(parseInt(w));
        if (c) setCalories(parseInt(c));
        if (m) setMinutes(parseInt(m));
      } catch (e) {
        console.log("Stats load error:", e);
      }
    };
    loadStats();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Reports (VIP)</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Ionicons name="flame" size={32} color="#ff6b00" />
            <Text style={styles.cardValue}>{calories}</Text>
            <Text style={styles.cardLabel}>Calories</Text>
          </View>
          <View style={styles.card}>
            <Ionicons name="barbell" size={32} color="#ff6b00" />
            <Text style={styles.cardValue}>{workouts}</Text>
            <Text style={styles.cardLabel}>Workouts</Text>
          </View>
          <View style={styles.card}>
            <Ionicons name="time" size={32} color="#ff6b00" />
            <Text style={styles.cardValue}>{minutes}m</Text>
            <Text style={styles.cardLabel}>Trained</Text>
          </View>
        </View>

        {/* Weekly Progress Chart */}
        <Text style={styles.sectionTitle}>Weekly Progress</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{ data: weeklyData }],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisSuffix="m"
          chartConfig={{
            backgroundColor: "#000",
            backgroundGradientFrom: "#000",
            backgroundGradientTo: "#000",
            color: () => "#ff6b00",
            labelColor: () => "#fff",
          }}
          bezier
          style={styles.chart}
        />

        {/* Monthly Activity */}
        <Text style={styles.sectionTitle}>Monthly Activity</Text>
        <BarChart
          data={{
            labels: ["W1", "W2", "W3", "W4"],
            datasets: [{ data: monthlyData }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#000",
            backgroundGradientFrom: "#000",
            backgroundGradientTo: "#000",
            color: () => "#ff6b00",
            labelColor: () => "#fff",
          }}
          style={styles.chart}
        />

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Ionicons name="trophy" size={40} color="#ff6b00" />
            <Text style={styles.badgeText}>10 Workouts</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="star" size={40} color="#ff6b00" />
            <Text style={styles.badgeText}>5000 Calories</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="medal" size={40} color="#ff6b00" />
            <Text style={styles.badgeText}>Consistency</Text>
          </View>
        </View>

        {/* VIP Lock */}
        <View style={styles.vipBox}>
          <Ionicons name="lock-closed" size={40} color="#ff6b00" />
          <Text style={styles.vipText}>
            Unlock full detailed reports with VIP Access 🚀
          </Text>
          <TouchableOpacity style={styles.vipBtn}>
            <Text style={styles.vipBtnText}>Go VIP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ✅ Bottom Navigation */}
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
          style={styles.navButton}
          onPress={() => router.push("/GoalScreen")}
        >
          <Ionicons name="trophy-outline" size={24} color="#9B9B9B" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtonActive}
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backBtn: { marginRight: 12 },
  title: { fontSize: 24, fontWeight: "700", color: "#ff6b00" },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    width: 100,
    borderWidth: 1,
    borderColor: "#ff6b00",
  },
  cardValue: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  cardLabel: { fontSize: 12, color: "#aaa", marginTop: 4 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff6b00",
    marginHorizontal: 16,
    marginTop: 20,
  },
  chart: { borderRadius: 16, marginVertical: 10, alignSelf: "center" },

  badges: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  badge: { alignItems: "center" },
  badgeText: { color: "#fff", marginTop: 6 },

  vipBox: {
    backgroundColor: "#111",
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff6b00",
  },
  vipText: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
  },
  vipBtn: {
    backgroundColor: "#ff6b00",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  vipBtnText: { color: "#000", fontWeight: "600" },

  /* ✅ Bottom Nav */
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // paddingVertical: 20,
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

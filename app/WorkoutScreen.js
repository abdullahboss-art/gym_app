// app/WorkoutScreen.js
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WorkoutScreen() {
  const router = useRouter();

  const categories = [
    { name: "Full Body", icon: "accessibility-outline", path: "/FullBody" },
    { name: "Chest", icon: "barbell-outline", path: "/Chest" },
    { name: "Back", icon: "fitness-outline", path: "/Back" },
    { name: "Shoulder", icon: "flash-outline", path: "/Shoulder" },
    { name: "Arms", icon: "hand-left-outline", path: "/Arms" },
    { name: "Legs", icon: "walk-outline", path: "/Legs" },
    { name: "Abs", icon: "body-outline", path: "/Abs" }, // 👈 extra example
    { name: "Cardio", icon: "heart-outline", path: "/Cardio" },
  ];

  return (
    <View style={styles.container}>
      {/* Content with Scroll */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>🏋️ Choose Your Workout</Text>

        <View style={styles.grid}>
          {categories.map((cat, index) => (
            <Pressable
              key={index}
              onPress={() => router.push(cat.path)}
              style={({ pressed }) => [
                styles.card,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
            >
              <LinearGradient
                colors={["#FF7A1A", "#FF791AB0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}
              >
                <View style={styles.iconGlow}>
                  <Ionicons name={cat.icon} size={36} color="#fff" />
                </View>
                <Text style={styles.cardText}>{cat.name}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* Dashboard */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/Dashboard")}
        >
          <Ionicons name="home" size={24} color="#bbb" />
        </TouchableOpacity>

        {/* WorkoutScreen - ACTIVE */}
        <TouchableOpacity style={styles.navButton} onPress={() => {}}>
          <LinearGradient
            colors={["#FF7A1A", "#FF9A4D"]}
            style={styles.activeCircle}
          >
            <Ionicons name="pie-chart-outline" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* GoalScreen */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/GoalScreen")}
        >
          <Ionicons name="trophy-outline" size={24} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity
                      style={styles.navButton}
                      onPress={() => router.push("/ReportsScreen")}
                    >
                      <Ionicons name="bar-chart-outline" size={24} color="#fff" />
                    </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/Profile")}
        >
          <Ionicons name="person" size={24} color="#bbb" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },

  scrollContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 100, // 👈 extra space so last card scroll ke niche chipke na
    alignItems: "center",
  },

  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 18,
  },

  card: {
    width: "42%",
    margin: 8,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 5,
  },

  gradientCard: {
    flex: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  iconGlow: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 16,
    borderRadius: 50,
    marginBottom: 12,
  },

  cardText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  /* 🔹 Bottom Nav Styles */
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(20,20,20,0.9)",
    // paddingVertical: 16,
     paddingBottom:34,
    paddingTop:20,
    borderTopWidth: 1,
    borderTopColor: "#222",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },

  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  activeCircle: {
    padding: 12,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});

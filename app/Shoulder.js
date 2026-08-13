// app/workouts/Shoulder.js
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Shoulder() {
  const router = useRouter();

  const exercises = [
    {
      name: "Overhead press",
      meta: "Standing dumbbell press for delts.",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/07/Barbell-Standing-Military-Press.gif",
    },
    {
      name: "Upright row",
      meta: "Works deltoid and traps.",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/02/barbell-uprightrow.gif",
    },
    {
      name: "Side lateral raise",
      meta: "Isolates medial delts.",
      image:
        "https://media.tenor.com/-OavRqpxSaEAAAAM/eleva%C3%A7%C3%A3o-lateral.gif",
    },
    {
      name: "Front raise",
      meta: "Targets anterior delts.",
      image:
        "https://i.pinimg.com/originals/dd/01/d7/dd01d7f4b5a021849ab0a3e1a7f54c49.gif",
    },
    {
      name: "Rear delt raise",
      meta: "Hits posterior delts.",
      image:
        "https://newlife.com.cy/wp-content/uploads/2019/08/03801301-Dumbbell-Rear-Lateral-Raise_Shoulders_360.gif",
    },
    {
      name: "Machine lateral raise",
      meta: "Isolation exercise for shoulders.",
      image:
        "https://www.inspireusafoundation.org/file/2023/07/lateral-raise-machine.gif",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>💪 Shoulder Workout</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Exercise List */}
      <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
        {exercises.map((ex, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.workoutCard,
              pressed && { backgroundColor: "#cc5200" },
            ]}
            onPress={() =>
              router.push({
                pathname: "/WorkoutDetail",
                params: {
                  exercises: JSON.stringify(exercises), // ✅ full list
                  startIndex: index, // ✅ selected exercise
                },
              })
            }
          >
            <Image source={{ uri: ex.image }} style={styles.workoutImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.workoutTitle}>{ex.name}</Text>
              <Text style={styles.workoutMeta}>{ex.meta}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6F00",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#e65c00",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  workoutCard: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  workoutImage: { width: 60, height: 60, borderRadius: 12 },
  workoutTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  workoutMeta: { color: "#9B9B9B", fontSize: 13, marginTop: 4 },
});

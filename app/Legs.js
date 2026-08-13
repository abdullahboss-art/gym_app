// app/workouts/Legs.js
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

export default function Legs() {
  const router = useRouter();

  const exercises = [
    {
      name: "Squat Backsquat",
      image: "https://media.tenor.com/Pfj8vy41k-0AAAAM/gym.gif",
      description:
        "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.",
    },
    {
      name: "Leg extension",
      image:
        "https://www.meridian-fitness.co.uk/wp-content/uploads/2025/02/Leg-Extention.gif",
      description:
        "The leg extension is a resistance weight training exercise that targets the quadriceps muscle in the legs.",
    },
    {
      name: "Single Leg Calf Raise",
      image:
        "https://www.inspireusafoundation.org/file/2024/01/single-leg-calf-raise.gif",
      description:
        "Single-Leg Calf Raises. Stand with your feet hip-width apart. Raise your left knee to hip level, toes pointed.",
    },
    {
      name: "Sumo deadlift",
      image:
        "https://www.inspireusafoundation.org/file/2022/05/sumo-deadlift-form.gif",
      description:
        "The sumo deadlift is usually performed anywhere between a 7 and a 9 on the modified Borg’s RPE scale.",
    },
    {
      name: "Leg press",
      image: "https://media.tenor.com/e0qeS17dv7QAAAAM/legpress45-leg-press.gif",
      description:
        "The leg press is a compound weight training exercise in which the individual pushes a weight away using legs.",
    },
    {
      name: "Sumo squat",
      image:
        "https://www.inspireusafoundation.org/file/2021/10/dumbbell-sumo-squat.gif",
      description:
        "A sumo squat is a leg exercise that targets the quadriceps, inner thigh and glutes.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>🦵 Legs Workout</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Content */}
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
                  exercises: JSON.stringify(exercises), // ✅ full list bhejna
                  startIndex: index, // ✅ konsa exercise se start karna h
                },
              })
            }
          >
            <Image source={{ uri: ex.image }} style={styles.workoutImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.workoutTitle}>{ex.name}</Text>
              <Text style={styles.workoutMeta} numberOfLines={1}>
                {ex.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FF6F00" },
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

// app/workouts/Chest.js
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

export default function Chest() {
  const router = useRouter();

  const exercises = [
    {
      name: "Decline push-up",
      meta: "Raise feet on a bench. Isolates upper chest.",
      image:
        "https://www.verywellfit.com/thmb/P2oe9IY1ISHqVgH4dSAlybK-Kzc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/91-3120037--Decline-PushupsGIF-eb1210abbdb04bbf94a05aafb644b24f.gif",
    },
    {
      name: "Push Ups",
      meta: "Hands slightly wider than shoulders, keep body straight.",
      image: "https://cdn.jefit.com/assets/img/exercises/gifs/47.gif",
    },
    {
      name: "Parallel Bar Dip",
      meta: "Bodyweight strength move for chest & triceps.",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dipisohold-1457046950.gif",
    },
    {
      name: "Dumbbell Pullover",
      meta: "Strength · Dumbbell · Compound movement.",
      image:
        "https://www.verywellfit.com/thmb/9TjZz5XCD7m55wzI1E61Bn_XBZY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/95--Dumbbell-PulloverGIF-0a01af6ebf634a7aba793eecf824a383.gif",
    },
    {
      name: "Squeeze Press",
      meta: "Reverse grip dumbbell squeeze press.",
      image: "https://burnfit.io/wp-content/uploads/2023/11/DB_SQUEEZE_PRESS.gif",
    },
    {
      name: "Cable Chest Press",
      meta: "Isolation · Cable · Beginner friendly.",
      image:
        "https://i.pinimg.com/originals/06/bc/08/06bc08f20343ec7179604d52c4e0e054.gif",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>💪 Chest Workout</Text>
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

// app/workouts/FullBody.js
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

export default function FullBody() {
  const router = useRouter();

  const exercises = [
    {
      name: "Push Ups",
      meta: "Strengthens chest, shoulders, and triceps.",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif",
      description: "Strengthens chest, shoulders, and triceps.",
    },
    {
      name: "Squats",
      meta: "Builds leg and glute strength.",
      image:
        "https://www.inspireusafoundation.org/file/2021/06/bodyweight-squat.gif",
      description: "Builds leg and glute strength.",
    },
    {
      name: "Lunges",
      meta: "Targets similar muscles as squats.",
      image:
        "https://www.inspireusafoundation.org/file/2023/08/split-squat.gif",
      description: "Lunges will target many of the same muscles as squats.",
    },
    {
      name: "Forearm plank",
      meta: "Full-body stability exercise.",
      image:
        "https://i.ytimg.com/vi/MKoMgfafp5U/maxresdefault.jpg",
      description:
        "Planks are a full-body exercise that can improve overall strength.",
    },
    {
      name: "Bench Press",
      meta: "Strengthens chest with weights.",
      image:
        "https://media.tenor.com/kpJH4zjuPF8AAAAM/supino.gif",
      description: "The bench press is a classic chest-building exercise.",
    },
    {
      name: "Astride Jumps",
      meta: "Strengthens chest with weights.",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/05/Astride-Jumps.gif",
      description: "The bench press is a classic chest-building exercise.",
    },
    {
      name: "Tuck Jump",
      meta: "Explosive fat-burning movement.",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/09/Tuck-Jump.gif",
      description: "Full body fat-burning movement.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>💪 Full Body Workout</Text>
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
                  exercises: JSON.stringify(exercises), // ✅ full list bhej di
                  startIndex: index, // ✅ konsa exercise click hua
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

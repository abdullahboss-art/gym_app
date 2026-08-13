// app/workouts/Arms.js
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

export default function Arms() {
  const router = useRouter();

  const exercises = [
    {
      name: "Jump Rope",
      meta: "Great bicep & forearm workout.",
      image:
        "https://www.inspireusafoundation.org/wp-content/uploads/2023/06/jump-rope-without-rope.gif",
      description:
        "The hammer curl with kettlebells is a great bicep and biceps brachialis exercise that also heavily taxes the forearms.",
    },
    {
      name: "Stationary Bike",
      meta: "Targets triceps with dumbbells.",
      image: "https://i.pinimg.com/originals/f1/55/97/f1559725611bf96c448c76629a9bc890.gif",
      description:
        "Stand with your feet hip-width apart, core engaged, holding a dumbbell in each hand.",
    },
    {
      name: "Rowing",
      meta: "Classic move for bigger biceps.",
      image: "https://www.meridian-fitness.co.uk/wp-content/uploads/2025/01/Rowing-Machine-Exercise.gif",
      description:
        "The rowing machine is another excellent option for a low-impact, full-body workout that can be done at home or in the gym.",
    },
    {
      name: "Swimming",
      meta: "Strength move for arms & triceps.",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/05/Swimming.gif",
      description:
        "Swimming. Swimming is a low to no-impact cardio exercise that can give you a great workout without putting much stress on your joints.",
    },
    {
      name: "Burpee",
      meta: "Triceps isolation with cable.",
      image:
        "https://www.inspireusafoundation.org/file/2022/01/burpee-movement.gif",
      description:
        "Burpees. Burpees are a piece of your HIIT workout that raise your heart rate and strengthen your muscles.",
    },
    {
      name: "Jumping jack",
      meta: "Grip strength builder.",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/05/Jumping-jack.gif",
      description: "Jumping jacks are a simple exercise that work a number of muscles. You'll work your glutes and your quads,",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>💪 Cardio Workout</Text>
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
                  startIndex: index, // ✅ konsa exercise tap hua
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

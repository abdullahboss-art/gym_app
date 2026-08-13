// app/workouts/Back.js
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

export default function Back() {
  const router = useRouter();

  const exercises = [
    {
      name: "One-arm dumbbell row",
      meta: "12 Tutorials · 60 Minutes",
      image:
        "https://i.pinimg.com/originals/a0/11/20/a01120423ce7cab0379e4c5a31d3bc37.gif",
      description:
        "Targets lats, traps and rhomboids. Great unilateral back exercise with dumbbells.",
    },
    {
      name: "Reverse grip bent-over row",
      meta: "8 Tutorials · 30 Minutes",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Dumbbell-Row.gif",
      description:
        "A bent-over row performed with reverse grip to hit lower lats and biceps.",
    },
    {
      name: "Dumbbell incline row",
      meta: "10 Tutorials · 45 Minutes",
      image:
        "https://static.wixstatic.com/media/00b9a7_7065598545e34acbabb4064f7bb57196~mv2.gif",
      description:
        "Rows done on an incline bench to isolate middle back and rear delts.",
    },
    {
      name: "Wide-grip lat pulldown",
      meta: "6 Tutorials · 25 Minutes",
      image: "https://media.tenor.com/PVR9ra9tAwcAAAAM/pulley-pegada-aberta.gif",
      description:
        "Classic wide grip lat pulldown for upper lats and width development.",
    },
    {
      name: "Straight-arm pulldown",
      meta: "7 Tutorials · 40 Minutes",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Straight-Arm-Pulldown.gif",
      description:
        "Isolation exercise for lats using cable straight-arm pulldowns.",
    },
    {
      name: "T-bar row with handle",
      meta: "5 Tutorials · 20 Minutes",
      image:
        "https://i.pinimg.com/originals/83/4f/63/834f63bd2938792b48da4079d942f4ae.gif",
      description:
        "Heavy compound movement for back thickness using T-bar row.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>💪 Back Workout</Text>
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
                  exercises: JSON.stringify(exercises), // full list
                  startIndex: index, // selected exercise
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

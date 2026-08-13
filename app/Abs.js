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
      name: "Crunch Frog",
      meta: "Great bicep & forearm workout.",
      image:
        "https://fitcron.com/wp-content/uploads/2024/05/35101301-Crunchy-Frog-on-Floor_Waist_720.gif",
      description:
        "The hammer curl with kettlebells is a great bicep and biceps brachialis exercise that also heavily taxes the forearms.",
    },
    {
      name: "Crunch Cruzado",
      meta: "Targets triceps with dumbbells.",
      image: "https://fitcron.com/wp-content/uploads/2024/05/02621301-Cross-Body-Crunch_waist_720.gif",
      description:
        "Stand with your feet hip-width apart, core engaged, holding a dumbbell in each hand.",
    },
    {
      name: "Crunch Inferior",
      meta: "Classic move for bigger biceps.",
      image: "https://fitcron.com/wp-content/uploads/2024/05/04431301-Elbow-to-Knee_waist_720.gif",
      description:
        "Bicep curls bend your arm at the elbow to increase biceps strength and size.",
    },
    {
      name: "Oblique V Ups",
      meta: "Strength move for arms & triceps.",
      image:
        "https://newlife.com.cy/wp-content/uploads/2019/12/17691301-Bodyweight-Side-Lying-Biceps-Curl_Upper-Arms_360.gif",
      description:
        "Triceps dip performed with assistance for controlled strength training.",
    },
    {
      name: "Obliques Workout",
      meta: "Triceps isolation with cable.",
      image:
        "https://i.pinimg.com/originals/fd/21/67/fd216722627b23cef752623a57cf406b.gif",
      description:
        "A push-down strengthens the triceps muscles in the back of the arm.",
    },
    {
      name: "Stop Doing Russian",
      meta: "Grip strength builder.",
      image:
        "https://www.kettlebellkings.com/cdn/shop/articles/russian-twist_cf5b5524-a334-4364-9cb9-54b5a04962d9.gif?v=1739267488",
      description: "A fun way to increase grip strength and forearm endurance.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>💪 Abs Workout</Text>
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

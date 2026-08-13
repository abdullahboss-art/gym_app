// app/Dashboard.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Customer Name");
  const [userImage, setUserImage] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Full Body");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          const user = JSON.parse(data);
          setUserName(user?.name || "Customer Name");
          setUserImage(user?.image || null);
          setUserLoggedIn(true);
        } else {
          setUserName("Customer Name");
          setUserImage(null);
          setUserLoggedIn(false);
        }
      } catch (error) {
        console.log("Error loading user:", error);
        setUserName("Customer Name");
        setUserImage(null);
        setUserLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "C";

  // Full recommended workouts list
  const workouts = [
    {
      title: "One-arm dumbbell row",
      meta: "12 Tutorials · 60 Minutes",
      image:
        "https://i.pinimg.com/originals/a0/11/20/a01120423ce7cab0379e4c5a31d3bc37.gif",
    },
    {
      title: "Reverse grip bent-over row",
      meta: "8 Tutorials · 30 Minutes",
      image:
        "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Dumbbell-Row.gif",
    },
    {
      title: "Dumbbell incline row",
      meta: "10 Tutorials · 45 Minutes",
      image:
        "https://static.wixstatic.com/media/00b9a7_7065598545e34acbabb4064f7bb57196~mv2.gif",
    },
    {
      title: "Squat Backsquat",
      meta: "15 Tutorials · 50 Minutes",
      image: "https://media.tenor.com/Pfj8vy41k-0AAAAM/gym.gif",
    },
    {
      title: "Leg extension",
      meta: "5 Tutorials · 20 Minutes",
      image:
        "https://www.meridian-fitness.co.uk/wp-content/uploads/2025/02/Leg-Extention.gif",
    },
    {
      title: "Hammer curl",
      meta: "5 Tutorials · 20 Minutes",
      image:
        "https://www.inspireusafoundation.org/file/2024/01/single-leg-calf-raise.gif",
    },
    {
      title: "Overhead Triceps Extension",
      meta: "5 Tutorials · 20 Minutes",
      image: "https://media.tenor.com/GRMSvKqfksMAAAAM/triceps.gif",
    },
    {
      title: "Bicep curl",
      meta: "5 Tutorials · 20 Minutes",
      image: "https://gymvisual.com/img/p/5/0/2/7/5027.gif",
    },
    {
      title: "Single Leg Calf Raise",
      meta: "7 Tutorials · 35 Minutes",
      image:
        "https://www.inspireusafoundation.org/file/2024/01/single-leg-calf-raise.gif",
    },
  ];

  const visibleWorkouts = showAll ? workouts : workouts.slice(0, 4);

  const categories = [
    { name: "Full Body", screen: "/FullBody" },
    { name: "Chest", screen: "/Chest" },
    { name: "Shoulder", screen: "/Shoulder" },
    { name: "Arms", screen: "/Arms" },
    { name: "Back", screen: "/Back" },
    { name: "Legs", screen: "/Legs" },
    { name: "Abs", screen: "/Abs" },
    { name: "Cardio", screen: "/Cardio" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              userLoggedIn ? router.push("/Profile") : router.push("/LoginScreen")
            }
          >
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarLetter}>{firstLetter}</Text>
              </View>
            )}
          </TouchableOpacity>

          <View>
            <Text style={styles.welcome}>Welcome Back</Text>
            <Text style={styles.username}>{userName}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push("/RemindersScreen")}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Challenge Card */}
        <View style={styles.challengeCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.challengeText}>We have new Challenge!</Text>
            <Text style={styles.challengeNumber}>200 Step</Text>
            <TouchableOpacity
              style={styles.challengeButton}
              onPress={() => router.push("/ChallengeDetails")}
            >
              <Text style={styles.challengeButtonText}>Join Challenge</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../assets/image/12.png")}
            style={styles.challengeImage}
          />
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryCarousel}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                activeCategory === cat.name && styles.activeCategoryButton,
              ]}
              onPress={() => {
                setActiveCategory(cat.name);
                router.push(cat.screen);
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat.name && styles.activeCategoryText,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended Workout */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Workout</Text>
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={styles.seeAll}>
              {showAll ? "Show Less" : "See All"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Workout Cards - SEND FULL ARRAY */}
        {visibleWorkouts.map((workout, index) => (
          <TouchableOpacity
            key={index}
            style={styles.workoutCard}
            onPress={() =>
              router.push({
                pathname: "/WorkoutDetail",
                params: {
                  exercises: JSON.stringify(workouts), // ✅ full list
                  startIndex: index, // ✅ selected workout
                },
              })
            }
          >
            <Image source={{ uri: workout.image }} style={styles.workoutImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.workoutMeta}>{workout.meta}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButtonActive}
          onPress={() => router.push("/Dashboard")}
        >
          <Ionicons name="home" size={24} color="#fff" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF7A1A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarLetter: { color: "#fff", fontSize: 18, fontWeight: "700" },
  welcome: { color: "#9B9B9B", fontSize: 12 },
  username: { color: "#fff", fontSize: 16, fontWeight: "600" },

  challengeCard: {
    flexDirection: "row",
    backgroundColor: "#FF7A1A",
    margin: 20,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
  },
  challengeText: { color: "#fff", fontSize: 14 },
  challengeNumber: { color: "#fff", fontSize: 28, fontWeight: "700" },
  challengeButton: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  challengeButtonText: { color: "#FF7A1A", fontWeight: "600" },
  challengeImage: { width: 100, height: 100, borderRadius: 12, marginLeft: 10 },

  categoryCarousel: { marginTop: 10 },
  categoryButton: {
    backgroundColor: "#FF7A1A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  categoryText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  activeCategoryButton: { backgroundColor: "#fff" },
  activeCategoryText: { color: "#000", fontWeight: "700" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  seeAll: { color: "#FF7A1A", fontSize: 14 },

  workoutCard: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    gap: 12,
  },
  workoutImage: { width: 60, height: 60, borderRadius: 12 },
  workoutTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  workoutMeta: { color: "#9B9B9B", fontSize: 13, marginTop: 4 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111",
    // paddingVertical: 24,
    paddingBottom:34,
    paddingTop:20,
  },
  navButtonActive: {
    backgroundColor: "#FF7A1A",
    padding: 12,
    borderRadius: 30,
  },
  navButton: { padding: 12 },
});

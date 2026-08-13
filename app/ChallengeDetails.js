import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChallengeDetails() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Banner with Text + Image Side by Side */}
      <LinearGradient colors={["#ff6600", "#ff9900"]} style={styles.banner}>
        {/* Left Side (75%) */}
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerTitle}>200 Step Challenge</Text>
          <Text style={styles.bannerSub}>
            Take 200 steps today and complete your first challenge!
          </Text>

          {/* Button inside Banner */}
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => router.push("/Dashboard")}
          >
            <Text style={styles.bannerBtnText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Right Side (25%) */}
        <View style={styles.bannerRight}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/4727/4727424.png" }}
            style={styles.bannerImg}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      {/* Progress Circle */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>0 / 200</Text>
        </View>
        <Text style={styles.motivation}>Keep going, every step counts!</Text>
      </View>

      {/* Glassmorphism Details Card */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Challenge Details</Text>
        <Text style={styles.detail}>⏳ Duration: Today Only</Text>
        <Text style={styles.detail}>🎯 Goal: 200 Steps</Text>
        <Text style={styles.detail}>🏆 Reward: Badge + XP Points</Text>
      </View>

      {/* Gradient Start Button */}
      <TouchableOpacity
        onPress={() => router.push("/ChallengeInProgress")}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#ff6600", "#ff9900"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.startButton}
        >
          <Text style={styles.startText}>🚀 Start Challenge</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  banner: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    margin:15,
    alignItems: "center",
  },
  bannerLeft: { flex: 0.75, paddingRight: 10 },
  bannerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  bannerSub: { marginTop: 8, fontSize: 14, color: "#fff" },
  bannerButton: {
    marginTop: 15,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  bannerBtnText: { color: "#ff6600", fontWeight: "bold", fontSize: 14 },

  bannerRight: { flex: 0.25, alignItems: "center" },
  bannerImg: { width: 70, height: 70 },

  progressWrapper: { alignItems: "center", marginVertical: 25 },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: "#ff6600",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  progressText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  motivation: { marginTop: 15, color: "#ffcc00", fontSize: 16, fontStyle: "italic", },

  detailsCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    margin:15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  detail: { color: "#ddd", fontSize: 15, marginBottom: 6 },

  startButton: {
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    margin:15,
    marginTop: 10,
  },
  startText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

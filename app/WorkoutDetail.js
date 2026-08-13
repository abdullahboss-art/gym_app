// app/WorkoutDetail.js
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function WorkoutDetail() {
  const { title, meta, image, exercises, startIndex } = useLocalSearchParams();
  const router = useRouter();

  const parsedExercises = exercises
    ? JSON.parse(exercises)
    : [
        {
          title: title || "Push Ups",
          meta:
            meta ||
            "Hands slightly wider than shoulders, keep body straight.",
          image:
            image ||
            "https://cdn.jefit.com/assets/img/exercises/gifs/47.gif",
        },
      ];

  const initialIndex = startIndex ? parseInt(startIndex) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentExercise = parsedExercises[currentIndex];

  // Timer setup
  const EXERCISE_TIME = 30;
  const REST_TIME = 5;
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState("idle"); // idle | exercise | rest
  const [message, setMessage] = useState("");
  const [sound, setSound] = useState();

  const [exitModal, setExitModal] = useState(false);

  // ✅ Play different sounds based on type
  async function playSound(type) {
    try {
      let soundFile;

      if (type === "start") {
        soundFile = require("../assets/image/lets.mp3"); // 👈 Exercise start sound
      } else if (type === "rest") {
        soundFile = require("../assets/image/rest.mp3"); // 👈 Rest start sound
      } else {
        soundFile = require("../assets/image/lets.mp3"); // fallback / default
      }

      const { sound } = await Audio.Sound.createAsync(soundFile);
      setSound(sound);
      await sound.playAsync();
    } catch (e) {
      console.log("Sound error:", e);
    }
  }

  // Cleanup
  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  // ✅ Timer effect
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);

            if (mode === "exercise") {
              playSound("rest"); // 👈 Rest start sound
              setMode("rest");
              setMessage("⏳ Rest Time");
              return REST_TIME;
            }

            if (mode === "rest") {
              playSound("start"); // 👈 Next exercise start sound
              if (currentIndex < parsedExercises.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setMode("exercise");
                setMessage("");
                return EXERCISE_TIME;
              } else {
                setMode("idle");
                setMessage("🎉 Workout Completed!");
                return 0;
              }
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isPaused, mode, currentIndex]);

  // Controls
  const startWorkout = () => {
    setMessage("");
    setMode("exercise");
    setTimeLeft(EXERCISE_TIME);
    setIsPaused(false);
    playSound("start");
  };

  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => setIsPaused(false);

  const restartTimer = () => {
    setMessage("");
    setMode("exercise");
    setTimeLeft(EXERCISE_TIME);
    setIsPaused(false);
    playSound("start");
  };

  const goToNextExercise = () => {
    if (currentIndex < parsedExercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setMode("exercise");
      setTimeLeft(EXERCISE_TIME);
      setIsPaused(false);
      setMessage("");
      playSound("start");
    } else {
      setMode("idle");
      setMessage("🎉 Workout Completed!");
    }
  };

  const exerciseTitle =
    currentExercise.title || currentExercise.name || "Workout";
  const exerciseDescription =
    currentExercise.description || currentExercise.meta || "";

  return (
    <View style={styles.container}>
      {/* Exit Modal */}
      <Modal visible={exitModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="warning" size={40} color="#FF7A1A" />
            <Text style={styles.modalTitle}>Cancel Workout?</Text>
            <Text style={styles.modalText}>
              Your timer is running. Are you sure you want to exit?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#FF3B30", paddingHorizontal:30 }]}
                onPress={() => router.back()}
              >
                <Text style={styles.modalBtnText}>Exit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#4CAF50", paddingHorizontal:30 }]}
                onPress={() => setExitModal(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Layout with Scroll + Footer */}
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Exercise Image */}
          <ImageBackground
            source={{ uri: currentExercise.image }}
            style={styles.imageBackground}
          >
            <View style={styles.overlay} />
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                  mode === "exercise" || mode === "rest"
                    ? setExitModal(true)
                    : router.back()
                }
              >
                <Ionicons name="arrow-back" size={26} color="#fff" />
              </TouchableOpacity>

              <View style={styles.rightIcons}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="share-social" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="heart" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          {/* Title & Description BELOW Image */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{exerciseTitle}</Text>
            <Text style={styles.description}>{exerciseDescription}</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Exercise {currentIndex + 1} of {parsedExercises.length}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer: Timer + Controls */}
        <View style={styles.footer}>
          {(mode === "exercise" || mode === "rest") && (
            <>
              <AnimatedCircularProgress
                size={150}
                width={10}
                fill={
                  mode === "exercise"
                    ? ((EXERCISE_TIME - timeLeft) / EXERCISE_TIME) * 100
                    : ((REST_TIME - timeLeft) / REST_TIME) * 100
                }
                tintColor={mode === "exercise" ? "#FF7A1A" : "#4CAF50"}
                backgroundColor="#333"
                rotation={0}
                lineCap="round"
              >
                {() => <Text style={styles.timerText}>{timeLeft}s</Text>}
              </AnimatedCircularProgress>

              <Text style={styles.modeText}>
                {mode === "exercise" ? "🏋️ Exercise" : "⏳ Rest"}
              </Text>

              <View style={styles.controlRow}>
                {isPaused ? (
                  <>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={resumeTimer}
                    >
                      <Ionicons name="play" size={18} color="#fff" />
                      <Text style={styles.controlText}>Resume</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={restartTimer}
                    >
                      <Ionicons name="refresh" size={18} color="#fff" />
                      <Text style={styles.controlText}>Restart</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={pauseTimer}
                  >
                    <Ionicons name="pause" size={18} color="#fff" />
                    <Text style={styles.controlText}>Pause</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}

          {message === "🎉 Workout Completed!" && (
            <>
              <Text style={styles.message}>{message}</Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  setCurrentIndex(0);
                  startWorkout();
                }}
              >
                <Ionicons name="refresh-circle" size={20} color="#fff" />
                <Text style={styles.startButtonText}>Restart Workout</Text>
              </TouchableOpacity>
            </>
          )}

          {mode === "idle" && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={startWorkout}
            >
              <Ionicons name="play-circle" size={20} color="#fff" />
              <Text style={styles.startButtonText}>
                {currentIndex === 0 ? "Start Workout" : "Restart Workout"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Next Exercise */}
          {message !== "🎉 Workout Completed!" &&
            currentIndex < parsedExercises.length - 1 && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={goToNextExercise}
                activeOpacity={0.9}
              >
                <Ionicons
                  name="arrow-forward-circle"
                  size={22}
                  color="#FF7A1A"
                />
                <Text style={styles.nextButtonText}>Next Exercise</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  imageBackground: { width: "100%", height: 320, justifyContent: "flex-end" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 50,
    marginHorizontal: 4,
  },
  rightIcons: { flexDirection: "row" },
  titleContainer: { padding: 20, backgroundColor: "#111" },
  title: { color: "#fff", fontSize: 28, fontWeight: "800", marginBottom: 8 },
  description: { color: "#bbb", fontSize: 15, lineHeight: 22 },
  progressContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "rgba(255,122,26,0.2)",
    borderRadius: 8,
  },
  progressText: {
    color: "#FF7A1A",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  timerText: { color: "#fff", fontSize: 26, fontWeight: "700", textAlign: "center" },
  modeText: { color: "#FF7A1A", fontSize: 18, marginTop: 10, fontWeight: "600" },
  message: {
    color: "#4CAF50",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  controlRow: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
    gap: 10,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7A1A",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  controlText: { color: "#fff", fontSize: 15, fontWeight: "600", marginLeft: 6 },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#FF7A1A",
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: "#FF7A1A",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 10,
  },
  startButtonText: { color: "#fff", fontSize: 16, fontWeight: "700", marginLeft: 8 },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    width: "90%",
    backgroundColor: "#ffffffff",
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: "#e6e6e6ff",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: "#FF7A1A",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 10 },
  modalText: { color: "#ccc", fontSize: 15, textAlign: "center", marginVertical: 10 },
  modalButtons: { flexDirection: "row", marginTop: 15, gap: 10 },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalBtnText: { color: "#fff", fontWeight: "700" },
});

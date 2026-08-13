import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function ChallengeComplete() {
  const shineAnim = useRef(new Animated.Value(0)).current;
  const xpAnim = useRef(new Animated.Value(0)).current;
  const [sound, setSound] = useState();
  const router = useRouter();

  // Badge shine animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(shineAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // XP Progress Bar animation + sound
  useEffect(() => {
    const loadAndPlaySound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/image/access.wav") // ✅ apni sound file "assets/image" folder me rakho
      );
      setSound(sound);
      await sound.playAsync();
    };

    // Animate XP bar from 0 → 100%
    Animated.timing(xpAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    loadAndPlaySound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const shineOpacity = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const xpWidth = xpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  // ✅ Save Award to AsyncStorage
  const saveAward = async () => {
    try {
      const existing = await AsyncStorage.getItem("awards");
      let awards = existing ? JSON.parse(existing) : [];
      awards.push({
        id: Date.now(),
        title: "200 Step Challenge",
        xp: 50,
      });
      await AsyncStorage.setItem("awards", JSON.stringify(awards));
      router.replace("/Profile"); // profile par redirect
    } catch (error) {
      console.log("Error saving award:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Confetti Animation 🎊 */}
      <ConfettiCannon count={120} origin={{ x: -10, y: 0 }} fadeOut={true} />

      <Text style={styles.title}>🎉 Congratulations!</Text>
      <Text style={styles.subText}>You completed the 200 Step Challenge</Text>

      {/* Shiny Badge Card */}
      <Animated.View style={[styles.rewardCard, { opacity: shineOpacity }]}>
        <Text style={styles.rewardText}>🏆 Badge Earned</Text>
        <Text style={styles.rewardText}>+50 XP Points</Text>
      </Animated.View>

      {/* XP Progress Bar */}
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: xpWidth }]} />
      </View>
      <Text style={{ color: "#fff", marginBottom: 20 }}>Level Up Progress</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={saveAward}
      >
        <Text style={styles.buttonText}>Claim Reward</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  title: { color: "#ff6600", fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subText: { color: "#fff", marginTop: 10, marginBottom: 20, fontSize: 16 },
  rewardCard: {
    backgroundColor: "#111",
    padding: 25,
    borderRadius: 20,
    marginBottom: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff6600",
    shadowColor: "#ff6600",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  rewardText: { color: "#fff", fontSize: 18, marginBottom: 5 },
  progressBar: {
    width: 250,
    height: 15,
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff6600",
    borderRadius: 10,
  },
  button: { backgroundColor: "#ff6600", padding: 15, borderRadius: 12, width: 200 },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
});

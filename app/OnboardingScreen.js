// app/OnboardingScreen.js
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");
SplashScreen.preventAutoHideAsync();

function CurvedLines() {
  return (
    <Svg
      height={height}
      width={width}
      style={{ position: "absolute" }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <Path
        d={`M0 ${height * 0.2} C${width * 0.3} ${height * 0.3}, ${
          width * 0.7
        } ${height * 0.1}, ${width} ${height * 0.2}`}
        stroke="rgba(255,122,26,0.3)"
        strokeWidth="2"
        fill="none"
      />
      <Path
        d={`M0 ${height * 0.4} C${width * 0.3} ${height * 0.5}, ${
          width * 0.7
        } ${height * 0.3}, ${width} ${height * 0.4}`}
        stroke="rgba(255,122,26,0.25)"
        strokeWidth="2"
        fill="none"
      />
      <Path
        d={`M0 ${height * 0.6} C${width * 0.3} ${height * 0.7}, ${
          width * 0.7
        } ${height * 0.5}, ${width} ${height * 0.6}`}
        stroke="rgba(255,122,26,0.2)"
        strokeWidth="2"
        fill="none"
      />
    </Svg>
  );
}

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <CurvedLines />

      <ImageBackground
        source={require("../assets/image/2-Photoroom.png")}
        style={styles.image}
        resizeMode="cover"
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />

        <View
          style={[
            styles.content,
            { paddingBottom: insets.bottom + 50 }, // ✅ safe area fix
          ]}
        >
          <View style={{ flex: 1 }} />

          <Animated.Text
            entering={FadeInUp.duration(800).springify().delay(200)}
            style={styles.title}
          >
            Make your{"\n"}
            <Text style={styles.title}>body healthier{"\n"}</Text>
            <Text style={[styles.title, styles.highlight]}>and stronger</Text>
          </Animated.Text>

          <Animated.Text
            entering={FadeInUp.duration(800).delay(400)}
            style={styles.subtitle}
          >
            Sport is a form of physical activity that is usually competitive
            with the aim of increasing physical abilities and skills
          </Animated.Text>

          <Animated.View
            entering={FadeInUp.duration(800).delay(600)}
            style={styles.footerRow}
          >
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={() => router.push("/LoginScreen")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <View style={styles.pagination}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { flex: 1, width, height, justifyContent: "flex-end" },
  imageStyle: { width, height },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10,10,10,0.65)" },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    color: "#fff",
    fontSize: width * 0.09, // ✅ responsive font
    lineHeight: width * 0.11,
    fontFamily: "Poppins_700Bold",
  },
  highlight: { color: "#FF7A1A", fontFamily: "Poppins_600SemiBold" },
  subtitle: {
    color: "#9B9B9B",
    fontSize: width * 0.035, // ✅ responsive font
    marginTop: 12,
    fontFamily: "Poppins_400Regular",
    lineHeight: width * 0.05,
  },
  footerRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#FF7A1A",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    minWidth: width * 0.4,
    alignItems: "center",
    shadowColor: "#FF7A1A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: width * 0.045, // ✅ responsive font
  },
  pagination: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: { width: 12, height: 8, borderRadius: 8, backgroundColor: "#FF7A1A" },
});

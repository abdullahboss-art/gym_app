// app/ProfileScreen.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  const router = useRouter();

  // ✅ Load user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setUser(null);
      router.replace("/Dashboard");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Profile Header with Gradient */}
        <LinearGradient
          colors={["#FF7A1A", "#ff5500"]}
          style={styles.headerGradient}
        >
          {/* 🔙 Back Button with circle */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/Dashboard")}
          >
            <View style={styles.backCircle}>
              <Ionicons name="arrow-back" size={20} color="#FF7A1A" />
            </View>
          </TouchableOpacity>

          <Image
            source={{
              uri:
                user?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2R1UnM0ylHT-t50Nv2mRDat_R9iAD5RsDtRIb2534-M8y8ZQY_z_ytdX5OZhKruolPxc&usqp=CAU",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name || "Customer Name"}</Text>
          <Text style={styles.email}>{user?.email || "guest@example.com"}</Text>
        </LinearGradient>

        {/* Menu Buttons */}
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setShowInfo(true)}
          >
            <Ionicons name="person-outline" size={22} color="#FF7A1A" />
            <Text style={styles.menuText}>Personal Info</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#aaa"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Settings")}
          >
            <Ionicons name="settings-outline" size={22} color="#FF7A1A" />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#aaa"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/ProgressScreen")}
          >
            <Ionicons name="barbell-outline" size={22} color="#FF7A1A" />
            <Text style={styles.menuText}>Progress</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#aaa"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setShowAwards(true)}
          >
            <Ionicons name="trophy-outline" size={22} color="#FF7A1A" />
            <Text style={styles.menuText}>Awards</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#aaa"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setShowHelp(true)}
          >
            <Ionicons name="help-circle-outline" size={22} color="#FF7A1A" />
            <Text style={styles.menuText}>Help</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#aaa"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logout]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={22} color="#fff" />
            <Text style={[styles.menuText, { color: "#fff" }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ✅ Personal Info Modal */}
      <Modal visible={showInfo} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Personal Info</Text>
            <Text style={styles.modalText}>
              👤 Name: {user?.name || "Customer Name"}
            </Text>
            <Text style={styles.modalText}>
              📧 Email: {user?.email || "guest@example.com"}
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowInfo(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ✅ Awards Modal */}
      <Modal visible={showAwards} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>🏆 Awards</Text>
            <Text style={styles.modalText}>
              🎖️ Completed 200 Steps Challenge
            </Text>
            <Text style={styles.modalText}>⭐ Earned 50 XP</Text>
            <Text style={styles.modalText}>🥇 Beginner Fitness Badge</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowAwards(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ✅ Help Modal */}
      <Modal visible={showHelp} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>💡 Gym Guide</Text>
            <Text style={styles.modalText}>
              👉 Warm up before workouts.{"\n"}
              👉 Focus on form, not heavy weights.{"\n"}
              👉 Eat protein-rich meals.{"\n"}
              👉 Stay consistent & track progress.{"\n"}
              👉 Rest & recovery are important.
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowHelp(false)}
            >
              <Text style={styles.closeText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ✅ Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/Dashboard")}
        >
          <Ionicons name="home" size={24} color="#bbb" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/WorkoutScreen")}
        >
          <Ionicons name="pie-chart-outline" size={24} color="#bbb" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/GoalScreen")}
        >
          <Ionicons name="trophy-outline" size={24} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity
                      style={styles.navButton}
                      onPress={() => router.push("/ReportsScreen")}
                    >
                      <Ionicons name="bar-chart-outline" size={24} color="#fff" />
                    </TouchableOpacity>

        <TouchableOpacity style={styles.navButtonActive}>
          <Ionicons name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },

  // 🔹 Header
  headerGradient: {
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 30,
    elevation: 8,
    position: "relative",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 12,
  },
  name: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  email: { color: "#f5f5f5", fontSize: 14 },

  // 🔹 Back Button
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 20,
  },
  backCircle: {
    backgroundColor: "#ffffffff",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#FF7A1A",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },

  // 🔹 Menu
  menu: { padding: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  menuText: { color: "#fff", fontSize: 16, marginLeft: 12 },
  logout: {
    backgroundColor: "#FF7A1A",
    justifyContent: "center",
  },

  // 🔹 Modals
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 24,
    width: "80%",
    elevation: 10,
    borderWidth: 1,
    borderColor: "#FF7A1A",
  },
  modalTitle: {
    color: "#FF7A1A",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  modalText: { color: "#fff", fontSize: 14, marginBottom: 8 },
  closeBtn: {
    backgroundColor: "#FF7A1A",
    padding: 12,
    borderRadius: 12,
    marginTop: 14,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "700" },

  // 🔹 Bottom Nav
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // paddingVertical: 18,
     paddingBottom:34,
    paddingTop:20,
    backgroundColor: "#1a1a1a",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
  },
  navButton: { padding: 10 },
  navButtonActive: {
    padding: 12,
    backgroundColor: "#FF7A1A",
    borderRadius: 50,
    shadowColor: "#FF7A1A",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
});

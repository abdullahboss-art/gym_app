// app/Settings.js
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    autoProceed: false,
    voiceTrainer: true,
    voiceEngine: false,
    lockOrientation: true,
    musicAutoPlay: true,
    shufflePlayback: false,
    repeatOption: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/Profile")}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>General</Text>
            <Text style={styles.headerSubtitle}>Settings</Text>
          </View>
        </View>

        {/* Exercises Section */}
        <Text style={styles.sectionTitle}>EXERCISES</Text>
        <Option
          icon="repeat"
          title="Auto proceed"
          subtitle="Switch to the next exercise automatically when the «Rest» countdown is completed."
          active={settings.autoProceed}
          onPress={() => toggleSetting("autoProceed")}
        />
        <Option
          icon="volume-high"
          title="Voice trainer"
          subtitle="Voice support during exercise."
          active={settings.voiceTrainer}
          onPress={() => toggleSetting("voiceTrainer")}
        />
        <Option
          icon="people"
          title="Voice engine"
          subtitle="Switch between different voice guidance speech engines."
          active={settings.voiceEngine}
          onPress={() => toggleSetting("voiceEngine")}
        />
        <Option
          icon="phone-landscape"
          title="Lock orientation"
          subtitle="Orientation will persist during the exercise ignoring device sensor."
          active={settings.lockOrientation}
          onPress={() => toggleSetting("lockOrientation")}
        />

        {/* Music Section */}
        <Text style={styles.sectionTitle}>MUSIC</Text>
        <Option
          icon="musical-notes"
          title="Music auto play"
          subtitle="Start music playback once the exercise begins."
          active={settings.musicAutoPlay}
          onPress={() => toggleSetting("musicAutoPlay")}
        />
        <Option
          icon="shuffle"
          title="Shuffle playback"
          subtitle="Change the playback order to sequential or random mode."
          active={settings.shufflePlayback}
          onPress={() => toggleSetting("shufflePlayback")}
        />
        <Option
          icon="repeat"
          title="Repeat option"
          subtitle="Playback one | Playback all"
          active={settings.repeatOption}
          onPress={() => toggleSetting("repeatOption")}
        />
      </ScrollView>
    </View>
  );
}

function Option({ icon, title, subtitle, active, onPress }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#FF7A1A" style={{ width: 28 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
      {active ? (
        <MaterialIcons name="check-circle" size={22} color="#FF7A1A" />
      ) : (
        <MaterialIcons name="radio-button-unchecked" size={22} color="#555" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  headerSubtitle: { color: "#999", fontSize: 13 },
  sectionTitle: {
    color: "#999",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
  },
  optionTitle: { color: "#fff", fontSize: 15, fontWeight: "500" },
  optionSubtitle: { color: "#777", fontSize: 12, marginTop: 2 },
});

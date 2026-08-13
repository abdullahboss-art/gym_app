import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";

/* --------------------------
   Notification handler setup
   -------------------------- */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const STORAGE_KEY = "REMINDERS_APP_V1";

/* weekdays for UI and mapping */
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Javascript: 0=Sun,1=Mon,... convert UI index to JS weekday number:
const UI_TO_JS_WEEKDAY = [1, 2, 3, 4, 5, 6, 0];

export default function RemindersScreen({ navigation }) {
  const [reminders, setReminders] = useState([]); // repeat alarms
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("time"); // "time" or "date" or "datetime"
  const [editing, setEditing] = useState(null); // {type: 'reminder', id: null|id}
  const [tempDate, setTempDate] = useState(new Date());
  const mounted = useRef(false);
  
  // Animation values
  const bellAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    mounted.current = true;
    (async () => {
      await ensureNotificationPermission();
      await createNotificationChannel();
      await loadAll();
    })();
    
    // Start bell animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bellAnimation, {
          toValue: 1,
          duration: 300,
          easing: Easing.elastic(1.5),
          useNativeDriver: true,
        }),
        Animated.timing(bellAnimation, {
          toValue: 0,
          duration: 300,
          easing: Easing.elastic(1.5),
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    return () => {
      mounted.current = false;
    };
  }, []);

  // Save to storage when lists change
  useEffect(() => {
    if (!mounted.current) return;
    saveAll();
  }, [reminders]);

  /* ---------------------------
     Notification & Storage Utils
     --------------------------- */

  async function ensureNotificationPermission() {
    if (!Device.isDevice) {
      // emulator warnings but continue
      return;
    }
    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing !== "granted") {
      await Notifications.requestPermissionsAsync();
    }
  }

  async function createNotificationChannel() {
    if (Platform.OS === "android") {
      try {
        await Notifications.setNotificationChannelAsync("reminders-channel", {
          name: "Reminders",
          importance: Notifications.AndroidImportance.MAX,
          sound: "default",
        });
      } catch (error) {
        console.log("Notification channel creation skipped in Expo Go");
      }
    }
  }

  async function scheduleNotificationForReminder(reminder) {
    // Expo Go mein remote notifications support nahi hai
    // Isliye hum fake IDs return karenge
    console.log("Scheduling reminder (Expo Go limitation - using mock notifications)");
    
    // Fake scheduled IDs return karein
    const scheduledIds = [];
    for (const day of reminder.repeatDays) {
      scheduledIds.push(`mock-id-${Date.now()}-${day}`);
    }
    return scheduledIds;
  }

  async function cancelNotificationsByIds(ids = []) {
    // Expo Go mein cancel karna bhi skip karein
    console.log("Cancelling notifications (skipped in Expo Go)");
  }

  async function saveAll() {
    try {
      const payload = { reminders };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      console.log("Reminders saved successfully");
    } catch (e) {
      console.warn("Save failed", e);
    }
  }

  async function loadAll() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) {
        console.log("No reminders found in storage");
        return;
      }
      const parsed = JSON.parse(raw);
      console.log("Loaded reminders:", parsed.reminders?.length || 0);
      setReminders(parsed.reminders || []);
    } catch (e) {
      console.warn("Load failed", e);
    }
  }

  /* ---------------------------
     Helpers: time/date formatting
     --------------------------- */
  function formatTimeFromParts(hour, minute) {
    const dt = new Date();
    dt.setHours(hour, minute, 0, 0);
    return formatTimeFromDate(dt);
  }

  function formatTimeFromDate(d) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function nextWeekdayDate(jsWeekday, hour, minute) {
    const now = new Date();
    const target = new Date(now);
    target.setHours(hour, minute, 0, 0);
    const today = now.getDay();
    let diff = (jsWeekday - today + 7) % 7;
    if (diff === 0 && target <= now) diff = 7;
    target.setDate(now.getDate() + diff);
    return target;
  }

  /* ---------------------------
     CRUD operations for reminders
     --------------------------- */

  function openAddReminder() {
    setEditing({ type: "reminder", id: null });
    const d = new Date();
    d.setMinutes(d.getMinutes() + 1);
    setTempDate(d);
    setPickerMode("time");
    setShowPicker(true);
  }

  async function handlePickerChange(event, selected) {
    // On Android, we need to hide the picker when done
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    // If user cancelled the picker
    if (event.type === 'dismissed') {
      setEditing(null);
      return;
    }
    
    // If no date was selected
    if (!selected) {
      if (Platform.OS === 'ios') {
        setShowPicker(false);
      }
      setEditing(null);
      return;
    }
    
    setTempDate(selected);

    if (!editing) return;

    try {
      if (editing.type === "reminder") {
        if (!editing.id) {
          const hour = selected.getHours();
          const minute = selected.getMinutes();
          const newRem = {
            id: Date.now().toString(),
            hour,
            minute,
            active: true,
            repeatDays: ["Mon"],
            scheduledIds: [],
          };
          const ids = await scheduleNotificationForReminder(newRem);
          newRem.scheduledIds = ids;
          setReminders((s) => [newRem, ...s]);
          console.log("New reminder added:", newRem);
          
          // Show alert for Expo Go limitation
          Alert.alert(
            "Reminder Added",
            "Note: In Expo Go, notifications are simulated. For real notifications, use a development build.",
            [{ text: "OK" }]
          );
        } else {
          // edit existing
          const arr = [...reminders];
          const idx = arr.findIndex((r) => r.id === editing.id);
          if (idx !== -1) {
            const old = arr[idx];
            await cancelNotificationsByIds(old.scheduledIds || []);
            arr[idx] = { ...old, hour: selected.getHours(), minute: selected.getMinutes(), scheduledIds: [] };
            const ids = await scheduleNotificationForReminder(arr[idx]);
            arr[idx].scheduledIds = ids;
            setReminders(arr);
            console.log("Reminder updated:", arr[idx]);
          }
        }
      }
    } catch (error) {
      console.error("Error handling picker change:", error);
      Alert.alert("Error", "Failed to save the reminder");
    }

    setEditing(null);
    if (Platform.OS === 'ios') {
      setShowPicker(false);
    }
  }

  async function toggleReminderActive(id) {
    const arr = [...reminders];
    const idx = arr.findIndex((r) => r.id === id);
    if (idx === -1) return;
    const r = arr[idx];
    if (r.active) {
      await cancelNotificationsByIds(r.scheduledIds || []);
      arr[idx] = { ...r, active: false, scheduledIds: [] };
    } else {
      const ids = await scheduleNotificationForReminder(r);
      arr[idx] = { ...r, active: true, scheduledIds: ids };
      
      // Show info for Expo Go
      if (Platform.OS === 'android') {
        Alert.alert(
          "Info", 
          "Notifications are simulated in Expo Go. For real notifications, build the app with development client.",
          [{ text: "OK" }]
        );
      }
    }
    setReminders(arr);
    console.log("Reminder toggled:", arr[idx].active ? "ON" : "OFF");
  }

  async function deleteReminder(id) {
    const found = reminders.find((r) => r.id === id);
    Alert.alert("Delete Reminder", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          if (found) await cancelNotificationsByIds(found.scheduledIds || []);
          setReminders((s) => s.filter((r) => r.id !== id));
          console.log("Reminder deleted:", id);
        },
      },
    ]);
  }

  /* Repeat day toggle for a reminder */
  async function toggleRepeatDay(reminderId, day) {
    const arr = [...reminders];
    const idx = arr.findIndex((r) => r.id === reminderId);
    if (idx === -1) return;
    const r = arr[idx];
    let newDays;
    if (r.repeatDays.includes(day)) newDays = r.repeatDays.filter((d) => d !== day);
    else newDays = [...r.repeatDays, day];

    await cancelNotificationsByIds(r.scheduledIds || []);
    const updated = { ...r, repeatDays: newDays, scheduledIds: [] };
    const ids = updated.active ? await scheduleNotificationForReminder(updated) : [];
    updated.scheduledIds = ids;
    arr[idx] = updated;
    setReminders(arr);
    console.log("Repeat days updated:", newDays);
  }

  /* Edit existing items */
  function startEditReminder(id) {
    const r = reminders.find((x) => x.id === id);
    if (!r) return;
    setEditing({ type: "reminder", id });
    const d = new Date();
    d.setHours(r.hour, r.minute, 0, 0);
    setTempDate(d);
    setPickerMode("time");
    setShowPicker(true);
  }

  // Animate button press
  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Safe navigation back function
  const handleBackPress = () => {
    animateButtonPress();
    // Use setTimeout to allow animation to complete
    setTimeout(() => {
      if (navigation && typeof navigation.navigate === 'function') {
        navigation.navigate('Dashboard');
      } else if (navigation && typeof navigation.goBack === 'function') {
        navigation.goBack();
      } else {
        console.log("Navigation not available");
      }
    }, 150);
  };

  /* ---------------------------
     Render helpers / UI pieces
     --------------------------- */

  function renderReminderCard({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.iconAndTime}>
            <View style={styles.bellCircle}>
              <Ionicons name="notifications" size={20} color="#FF7A1A" />
            </View>
            <Text style={styles.reminderTime}>{formatTimeFromParts(item.hour, item.minute)}</Text>
          </View>

          <View style={styles.rightControls}>
            <TouchableOpacity onPress={() => startEditReminder(item.id)} style={styles.smallIconBtn}>
              <Ionicons name="pencil" size={18} color="#FF7A1A" />
            </TouchableOpacity>

            <Switch
              value={!!item.active}
              onValueChange={() => toggleReminderActive(item.id)}
              trackColor={{ false: "#555", true: "#FF7A1A" }}
              thumbColor={item.active ? "#fff" : "#fff"}
            />
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.repeatRow}>
          {WEEK_DAYS.map((d) => {
            const active = item.repeatDays.includes(d);
            return (
              <TouchableOpacity
                key={d}
                onPress={() => toggleRepeatDay(item.id, d)}
                style={[styles.dayChip, active && styles.dayChipActive]}
              >
                <Text style={[styles.dayText, active && styles.dayTextActive]}>{d}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.trashBtn} onPress={() => deleteReminder(item.id)}>
            <Ionicons name="trash" size={18} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* ---------------------------
     Main Render
     --------------------------- */
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleBackPress}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
            <Ionicons name="arrow-back" size={22} color="#FF7A1A" />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminders</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Expo Go limitation notice */}
        {Platform.OS === 'android' && (
          <View style={styles.warningBox}>
            <Ionicons name="warning" size={20} color="#FFCC00" />
            <Text style={styles.warningText}>
              Expo Go has limited notification support. For full functionality, build with development client.
            </Text>
          </View>
        )}

        {/* Subscribe block */}
        <View style={styles.subscribeRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.subscribeTitle}>SUBSCRIBE{"\n"}TO NOTIFICATION</Text>
            <Text style={styles.subscribeDesc}>
              Get up and awaken your senses by getting your workout in. Set your daily reminders to get active.
            </Text>
          </View>
          <Animated.Image
            source={require("../assets/image/bell-emoji.png")}
            style={[styles.bellImage, {
              transform: [
                {
                  rotate: bellAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-15deg', '15deg']
                  })
                }
              ]
            }]}
          />
        </View>

        {/* Reminder Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reminder</Text>
          <TouchableOpacity 
            onPress={() => {
              animateButtonPress();
              setTimeout(openAddReminder, 100);
            }} 
            style={styles.addBtn}
            activeOpacity={0.8}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
              <Ionicons name="add-circle" size={28} color="#FF7A1A" />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Reminder list */}
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderCard}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-off" size={40} color="#555" />
              <Text style={styles.emptyText}>No reminders yet — add one.</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />

        {/* DateTime Picker */}
        {showPicker && (
          <DateTimePicker
            value={tempDate}
            mode={pickerMode}
            is24Hour={false}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handlePickerChange}
            themeVariant="dark"
            minimumDate={new Date()} // Prevent selecting past dates
          />
        )}
      </ScrollView>
    </View>
  );
}

/* ---------------------------
   Styles (black & #FF7A1A)
   --------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 30,
  },
  headerRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 8,
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#FF7A1A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#FF7A1A",
    textShadowColor: 'rgba(255, 122, 26, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10
  },
  headerSpacer: {
    width: 40,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#332B00',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FFCC00'
  },
  warningText: {
    color: '#FFCC00',
    marginLeft: 10,
    flex: 1,
    fontSize: 12
  },
  subscribeRow: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FF7A1A",
  },
  subscribeTitle: { 
    fontSize: 18, 
    fontWeight: "800", 
    color: "#FF7A1A", 
    letterSpacing: 0.6,
    textShadowColor: 'rgba(255, 122, 26, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5
  },
  subscribeDesc: { 
    fontSize: 12, 
    color: "#ccc", 
    marginTop: 6, 
    lineHeight: 18, 
    maxWidth: "70%" 
  },
  bellImage: {
    width: 78,
    height: 78,
    resizeMode: "contain",
    marginLeft: 10,
  },

  sectionHeader: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    marginTop: 6,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: "800", 
    color: "#FF7A1A",
    textShadowColor: 'rgba(255, 122, 26, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5
  },
  addBtn: { 
    padding: 4,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 10,
  },
  emptyText: { 
    color: "#888", 
    marginVertical: 10, 
    fontSize: 16,
    textAlign: "center"
  },

  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    shadowColor: "#FF7A1A",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  iconAndTime: { flexDirection: "row", alignItems: "center" },
  bellCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#FF7A1A22",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#FF7A1A55",
  },
  reminderTime: { fontSize: 20, fontWeight: "900", color: "#fff" },

  rightControls: { flexDirection: "row", alignItems: "center" },
  smallIconBtn: { padding: 8, marginRight: 6 },

  separator: { 
    height: 1, 
    backgroundColor: "#333", 
    marginTop: 12, 
    marginBottom: 12,
    marginHorizontal: -5,
  },

  repeatRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  dayChip: {
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  dayChipActive: { 
    backgroundColor: "#FF7A1A", 
    borderColor: "#FF7A1A",
    shadowColor: "#FF7A1A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  dayText: { fontSize: 12, color: "#ccc", fontWeight: "600" },
  dayTextActive: { color: "#000", fontWeight: "800" },
  trashBtn: { 
    marginLeft: "auto", 
    padding: 6,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
  },
});
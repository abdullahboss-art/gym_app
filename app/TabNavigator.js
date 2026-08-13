import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import EquipmentScreen from "../app/EquipmentScreen";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          height: 70,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Equipment") {
            iconName = "barbell"; // ✅ Gym Equipment icon
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? "#fff" : "#9B9B9B"}
              style={{
                backgroundColor: focused ? "#FF7A1A" : "transparent",
                padding: 10,
                borderRadius: 30,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Equipment" component={EquipmentScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

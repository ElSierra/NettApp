import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RoutePropArg, TabStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import HomeScreen from "../screens/home/Home";
import { COLORS } from "../common/colors";
import Sync from "../screens/sync/Sync";
import Settings from "../screens/settings/Settings";
import { useAuth } from "../context/auth/AuthContext";
import { useTheme } from "../context/theme/ThemeContext";

const TabStack = createBottomTabNavigator<TabStackParamList>();

export default function TabsNavigator() {
  const { currrRoute, setCurrRoute } = useAuth();
  const { isDarkMode } = useTheme();

  function screenOptions({ route }: RoutePropArg): BottomTabNavigationOptions {
    const colorToUse = isDarkMode ? COLORS.lightText : COLORS.darkNeutral;

    return {
      tabBarIcon: ({ focused, size }) => {
        switch (route.name) {
          case "Home":
            return (
              <Ionicons
                name="home-outline"
                size={size}
                color={focused ? COLORS.primary : colorToUse}
                style={styles.tabBarIcon}
              />
            );

          case "Sync":
            return (
              <Ionicons
                name="sync-outline"
                size={size + 10}
                color={focused ? COLORS.primary : colorToUse}
                style={styles.tabBarIcon}
              />
            );

          case "Settings":
            return (
              <Ionicons
                name="ios-settings-outline"
                size={size}
                color={focused ? COLORS.primary : colorToUse}
                style={styles.tabBarIcon}
              />
            );

          default:
            return null;
        }
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: isDarkMode
        ? COLORS.lightText
        : COLORS.darkNeutral,
      tabBarShowLabel: true,
      tabBarLabelStyle: styles.label,

      headerStyle: {
        backgroundColor: isDarkMode ? "rgba(31, 31, 31, 0.99)" : "#FFF",
      },
      tabBarStyle: {
        display: "flex",
        borderTopWidth: isDarkMode ? 0 : 0.8,
        borderColor: Platform.OS === "android" ? "#dbdbdb" : "999",
        backgroundColor: isDarkMode ? "#181818" : "#FFF",
        height: Platform.OS === "android" ? 60 : 80,
      },
    };
  }

  return (
    <TabStack.Navigator
      initialRouteName={"Home"}
      screenOptions={screenOptions}
      screenListeners={({ route }) => ({
        tabPress: () => {
          setCurrRoute(route.name);
        },
      })}
    >
      <TabStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarItemStyle:
            currrRoute === "Home"
              ? {
                  borderTopWidth: 2,
                  borderColor: COLORS.primary,
                }
              : {},
        }}
      />

      <TabStack.Screen
        name="Sync"
        component={Sync}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarItemStyle:
            currrRoute === "Sync"
              ? {
                  borderTopWidth: 2,
                  borderColor: COLORS.primary,
                }
              : {},
        }}
      />

      <TabStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarItemStyle:
            currrRoute === "Settings"
              ? {
                  borderTopWidth: 2,
                  borderColor: COLORS.primary,
                }
              : {},
        }}
      />
    </TabStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    fontSize: Platform.OS === "ios" ? 22 : 25,
    paddingTop: Platform.OS === "ios" ? 5 : 0,
  },
  tabBarIconSec: {
    paddingTop: Platform.OS === "ios" ? 2 : 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabBarIconFocused: {
    borderTopWidth: 1,
  },
});

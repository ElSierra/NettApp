import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Switch,
  Platform,
} from "react-native";
import { COLORS } from "../../common/colors";
import { useState } from "react";
import { useTheme } from "../../context/theme/ThemeContext";

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(isDarkMode);

  function toggleSwitch() {
    setIsEnabled(!isEnabled);
    toggleTheme();
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={`mx-3 ${Platform.OS === "android" && "mt-12"}`}
      >
        <Text className="text-3xl font-bold text-darkNeutral dark:text-lightText">
          Settings
        </Text>

        <View className="flex-row justify-between items-center mt-10">
          <Text className="text-darkNeutral dark:text-lightText text-xl">
            Light / Dark Mode
          </Text>
          <Switch
            trackColor={{
              false: "#767577",
              true: COLORS.primary,
            }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onChange={toggleSwitch}
            value={isEnabled}
            // style={styles.switch}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

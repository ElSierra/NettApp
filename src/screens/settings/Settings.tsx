import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Switch,
  Platform,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../common/colors";
import { useState } from "react";
import { useTheme } from "../../context/theme/ThemeContext";
import Header from "../../components/header/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useModal } from "../../context/modal/ModalContext";

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(isDarkMode);
  const { showModalAndContent } = useModal();

  function toggleSwitch() {
    setIsEnabled(!isEnabled);
    toggleTheme();
  }

  function handleLogout() {
    showModalAndContent({
      title: "Log Out",
      message: "Do you want to Log out of your account?",
      action: "LogOut",
      actionBtnText: "Yes",
      param: "none",
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={`mx-3 ${Platform.OS === "android" && "mt-12"}`}
      >
        {/* <Text className="text-3xl font-bold text-darkNeutral dark:text-lightText">
          Settings
        </Text> */}

        <View className="flex-col justify-center items-center">
          <View className="h-20 w-20 rounded-full bg-secondary flex-col items-center justify-center">
            <Text className="text-white text-5xl font-bold">AO</Text>
          </View>
          <Text className="text-2xl mt-2 font-semibold text-darkNeutral dark:text-lightText">
            Adijat Oladele
          </Text>
          <Text className="text-base text-darkNeutral dark:text-lightText">
            adijat_oladele@nubiaville.onmicrosoft.com
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-10 bg-white dark:bg-darkNeutral rounded-lg shadow-sm p-3 border border-gray-200 dark:border-dark">
          <View>
            <Text className=" dark:text-lightText text-[18px] text-primary font-bold">
              Theme
            </Text>
            <Text className="text-darkNeutral dark:text-lightText text-sm mt-1">
              Switch between Light and Dark Mode
            </Text>
          </View>
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

        <View className="flex-row justify-between items-center mt-2 bg-white dark:bg-darkNeutral rounded-lg shadow-lg p-3 border border-gray-200 dark:border-dark">
          <View>
            <Text className=" dark:text-lightText text-[18px] text-primary font-bold">
              Logout
            </Text>
            <Text className="text-darkNeutral dark:text-lightText text-sm mt-1">
              Logout of your account
            </Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons
              name="logout"
              size={30}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

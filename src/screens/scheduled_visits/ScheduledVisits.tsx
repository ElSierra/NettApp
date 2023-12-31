import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/header/Header";
import CustomButton from "../../common/button";
import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../../context/theme/ThemeContext";
import { COLORS } from "../../common/colors";
import TuesdaySchedule from "./week_days/TuesdaySchedule";
import MondaySchedule from "./week_days/MondaySchedule";
import WednesdaySchedule from "./week_days/WednesdaySchedule";
import ThursdaySchedule from "./week_days/ThursdaySchedule";
import FridaySchedule from "./week_days/FridaySchedule";
import { useModal } from "../../context/modal/ModalContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import {
  getLocalData,
  saveDataLocally,
} from "../../helpers/local.data.handler";
import { showLogs } from "../../helpers/logger";
import { httpRequest } from "../../lib";

const Tab = createMaterialTopTabNavigator();

export default function ScheduledVisits() {
  const { isDarkMode } = useTheme();
  const { showModalAndContent } = useModal();
  const [userOutlets, setUserOutlets] = useState([]);
  const { state } = useAuth();
  const { refresh, setRefresh } = useTheme();
  let localData;

  useEffect(() => {
    async function getUserOutlets() {
      // const userIsOnline = (await getUserNetworkStatus()).isInternetReachable;
      localData = await getLocalData("UserSchedule");
      if (localData) {
        setUserOutlets(localData);
        // showLogs("DATA IS FROM LOCAL DB (Schedules)", localData);
      } else {
        const dbResponse = await httpRequest.post("/getSchedules", {
          userCode: state.user,
        });

        setUserOutlets(dbResponse.data);
        showLogs("DATA IS FROM API", "");
        if (!localData) {
          await saveDataLocally("UserSchedule", dbResponse.data);
        }
      }
    }

    getUserOutlets();
  }, [localData, refresh]);

  function handleAddVisit() {
    showModalAndContent({
      title: "Add Visit",
      message: "",
      action: "AddVisit",
      actionBtnText: "Save",
      param: "true",
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />

      <View className="border-b-4 border-b-[#D9D9D9] dark:border-gray-800 relative mb-3 mx-3">
        <Text className="text-2xl text-secondary text-center font-bold mb-1">
          Scheduled Outlets
        </Text>
        <View className="absolute bg-secondary border-2 w-48 border-secondary top-8 left-[68px]" />
      </View>

      <View className="flex justify-end items-end mt-4 mr-3">
        <TouchableOpacity
          onPress={handleAddVisit}
          className="bg-secondary p-3 rounded-lg"
        >
          <View className="flex-row items-center justify-center gap-1">
            <Text className="text-white font-bold text-[16px]">Add Visit</Text>
            <AntDesign name="plus" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: isDarkMode ? COLORS.lightText : "#222",
          tabBarInactiveTintColor: isDarkMode ? COLORS.lightText : "#222",

          tabBarStyle: {
            backgroundColor: isDarkMode ? COLORS.darkTheme : "#fff",
            marginHorizontal: 10,
            paddingTop: 40,
            shadowColor: isDarkMode ? COLORS.darkNeutral : "white",
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 15,
          },
          tabBarIndicatorStyle: {
            borderBottomColor: COLORS.secondary,
            borderBottomWidth: 2,
          },
        }}
      >
        <Tab.Screen
          name="MondaySchedule"
          component={MondaySchedule}
          options={{
            title: "MON",
          }}
        />
        <Tab.Screen
          name="TuesdaySchedule"
          component={TuesdaySchedule}
          options={{
            title: "TUE",
          }}
        />
        <Tab.Screen
          name="WednesdaySchedule"
          component={WednesdaySchedule}
          options={{
            title: "WED",
          }}
        />
        <Tab.Screen
          name="ThursdaySchedule"
          component={ThursdaySchedule}
          options={{
            title: "THU",
          }}
        />
        <Tab.Screen
          name="FridaySchedule"
          component={FridaySchedule}
          options={{
            title: "FRI",
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

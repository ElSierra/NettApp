import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { routes } from "./routes";
import { generateIcon } from "../../helpers/generate.icon";
import Header from "../../components/header/Header";
import { useAuth } from "../../context/auth/AuthContext";
import {
  getLocalData,
  saveDataLocally,
} from "../../helpers/local.data.handler";
import { useEffect, useState } from "react";
import { Outlet } from "../../types/outlets";
import { getUserNetworkStatus } from "../../helpers/get.network.status";
import { showLogs } from "../../helpers/logger";
import { httpRequest } from "../../lib";

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  const [userOutlets, setUserOutlets] = useState<Outlet[]>([]);

  useEffect(() => {
    async function getUserOutlets() {
      const userIsOnline = (await getUserNetworkStatus()).isInternetReachable;
      const localData = await getLocalData("UserOutlets");
      if (userIsOnline && localData) {
        setUserOutlets(localData);
        showLogs("DATA IS FROM LOCAL DB", "");
      } else {
        const dbResponse = await httpRequest.post("/getAllOutlet", {
          userCode: state.user,
        });

        setUserOutlets(dbResponse.data);
        showLogs("DATA IS FROM API", "");
        if (!localData) {
          await saveDataLocally("UserOutlets", dbResponse.data);
        }
      }
    }

    getUserOutlets();
  }, []);

  async function handleNavigation(route: string) {
    switch (route) {
      case "View Outlets":
        navigation.navigate("ViewOutlets");
        return;
      case "Create a New Outlet":
        navigation.navigate("CreateOutlet");
        return;
      case "Completed Visits":
        navigation.navigate("CompletedVisits");
        return;
      case "Scheduled Visits":
        navigation.navigate("ScheduledVisits");
        return;
      case "View Products":
        navigation.navigate("ViewProducts");
        return;
      case "Competition Review":
        navigation.navigate("CompetitionReview");
        return;
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Header />
        <View className="mx-4">
          {/* HERO */}
          <View className="bg-secondary dark:bg-primary rounded-lg p-3">
            <Text className="text-2xl text-white font-semibold">Overview</Text>
            <View className="pt-8">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-base">
                  Registered outlets:
                </Text>
                <Text className="text-white text-base">
                  {userOutlets.length || "..."}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-base">Scheduled visits:</Text>
                <Text className="text-white text-base">0</Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-base">Completed visits:</Text>
                <Text className="text-white text-base">0</Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-base">Pending visits:</Text>
                <Text className="text-white text-base">0</Text>
              </View>
            </View>
          </View>

          {/* NAVIGATIONS */}
          <View className="mt-6 mb-16">
            {routes.map((route) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleNavigation(route)}
                key={route}
                className="flex-row justify-start items-center border border-secondary dark:border-primaryLight rounded-lg mb-2 p-2"
              >
                {generateIcon(route)}
                <Text className="text-[15px] font-semibold text-darkNeutral dark:text-lightText">
                  {route}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

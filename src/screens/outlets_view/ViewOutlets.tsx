import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/header/Header";

import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { COLORS } from "../../common/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";

import { httpRequest } from "../../lib";
import { useAuth } from "../../context/auth/AuthContext";
import { showLogs } from "../../helpers/logger";
import { Outlet } from "../../types/outlets";
import {
  getLocalData,
  saveDataLocally,
} from "../../helpers/local.data.handler";
import { getUserNetworkStatus } from "../../helpers/get.network.status";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewOutlets() {
  const [userOutlets, setUserOutlets] = useState<Outlet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { state } = useAuth();

  async function SearchOutlet() {}

  useEffect(() => {
    async function getUserOutlets() {
      const localData = await getLocalData("UserOutlets");
      setUserOutlets(localData);
    }

    getUserOutlets();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />

      {userOutlets.length === 0 ? (
        <View className="flex items-center justify-center">
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mx-3">
            <View className="border border-gray-300 dark:border-authDark flex-row justify-between items-center rounded-lg h-14">
              <TextInput
                value={searchQuery}
                onChangeText={(val) => setSearchQuery(val)}
                placeholder="Search for Outlets..."
                placeholderTextColor={COLORS.authDark}
                className="text-[17px] h-full w-[80%] ml-3 text-darkNeutral dark:text-lightText"
              />

              {searchQuery ? (
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => setSearchQuery("")}
                >
                  <AntDesign name="close" size={28} color={COLORS.primary} />
                </TouchableOpacity>
              ) : (
                <EvilIcons name="search" size={30} color={COLORS.primary} />
              )}
            </View>
          </View>

          <View className="mt-6 mb-16">
            {/* TABLE HEADER */}
            <Text className="text-darkNeutral dark:text-lightText mb-3 mx-3 text-base font-semibold">
              Total Outlets:{" "}
              <Text className="text-primary font-bold">
                {userOutlets.length}
              </Text>
            </Text>
            <View className="bg-secondary flex-row items-center justify-between p-5">
              <Text className="text-white text-base font-bold">
                Outlet Names
              </Text>
              <Text className="text-white text-base font-bold">
                Last Visited
              </Text>
            </View>

            {/* TABLE ITEMS */}
            <View>
              <FlatList
                data={userOutlets}
                keyExtractor={(userOutlets) => userOutlets.outletCode}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item: outlet, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("OutletDetailsScreen", {
                        outletCode: outlet.outletCode,
                      })
                    }
                    activeOpacity={0.6}
                    className={`flex-row items-center justify-between p-4 ${
                      index !== userOutlets.length - 1 &&
                      "border-b border-b-gray-200 dark:border-b-authDark"
                    } `}
                  >
                    <Text className="text-base text-darkNeutral dark:text-lightText">
                      {outlet.name.length > 20
                        ? `${outlet.name.slice(0, 20)}...`
                        : outlet.name}
                    </Text>
                    <Text className="ml-auto text-darkNeutral dark:text-lightText">
                      {new Date(outlet.lastvisit).toDateString() ===
                      "Invalid Date"
                        ? "-"
                        : new Date(outlet.lastvisit).toDateString()}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

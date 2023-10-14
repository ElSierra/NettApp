import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../../components/header/Header";

import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { COLORS } from "../../common/colors";
import { outletsData } from "./data";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/theme/ThemeContext";

export default function ViewOutlets() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();

  async function SearchOutlet() {}

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />

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

        <View>
          {/* TABLE HEADER */}
          <View className="bg-secondary flex-row items-center justify-between p-5 mt-6">
            <Text className="text-white text-base font-bold">Outlet Names</Text>
            <Text className="text-white text-base font-bold">Last Visited</Text>
          </View>

          {/* TABLE ITEMS */}
          <View>
            <FlatList
              data={outletsData}
              keyExtractor={(outletsData) => outletsData.outletCode}
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
                    index !== outletsData.length - 1 &&
                    "border-b border-b-gray-200 dark:border-b-authDark"
                  } `}
                >
                  <Text className="text-base text-darkNeutral dark:text-lightText">
                    {outlet.name.length > 20
                      ? `${outlet.name.slice(0, 20)}...`
                      : outlet.name}
                  </Text>
                  <Text className="ml-auto text-darkNeutral dark:text-lightText">
                    {new Date(outlet.lastvisit).toDateString()}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

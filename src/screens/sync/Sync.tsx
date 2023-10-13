import { View, Text, ScrollView, SafeAreaView, Platform } from "react-native";

export default function Sync() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={`mx-3 ${Platform.OS === "android" && "mt-12"}`}
      >
        <Text className="text-3xl font-bold text-darkNeutral dark:text-lightText">
          Sync
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

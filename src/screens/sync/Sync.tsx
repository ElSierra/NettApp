import { View, Text, ScrollView, SafeAreaView } from "react-native";

export default function Sync() {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="mx-3">
        <Text className="text-3xl font-bold">Sync</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

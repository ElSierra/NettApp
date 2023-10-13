import { View, Text, SafeAreaView } from "react-native";
import Header from "../../components/header/Header";

export default function ViewProducts() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />
    </SafeAreaView>
  );
}

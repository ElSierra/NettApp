import { View, Text, ScrollView, Dimensions } from "react-native";
import AnimatedLottieView from "lottie-react-native";

export default function ThursdaySchedule() {
  const { width } = Dimensions.get("window");

  return (
    <ScrollView className="flex-1 bg-white dark:bg-darkTheme">
      <View>
        <View
          style={{
            width: width * 0.9,
            height: 290,
          }}
        >
          <AnimatedLottieView
            source={require("../../../assets/animations/register.json")}
          />
        </View>
        <Text className="text-center text-base font-semibold text-darkNeutral dark:text-lightText">
          No Scheduled record
        </Text>
      </View>
    </ScrollView>
  );
}

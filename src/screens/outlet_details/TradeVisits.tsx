import { View, Text, Dimensions, ScrollView } from "react-native";
import { Outlet } from "../../types/outlets";
import CustomButton from "../../common/button";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import AnimatedLottie from "lottie-react-native";

export default function TradeVisits({
  outlet,
}: {
  outlet: Outlet | undefined;
}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = Dimensions.get("window");

  return (
    <ScrollView className="flex-1 bg-white dark:bg-darkTheme">
      <View className="mt-4 mx-6">
        <View>
          <View
            style={{
              width: width * 0.9,
              height: 290,
            }}
          >
            <AnimatedLottie
              source={require("../../assets/animations/norecord.json")}
            />
          </View>
          <Text className="text-center text-base font-semibold text-darkNeutral dark:text-lightText">
            No Trade Visit Record yet
          </Text>
        </View>

        {/* <View className="bg-secondary p-4 rounded-lg flex-row justify-between items-center mt-3">
        <Text className="text-white text-xl font-semibold">Brushmills</Text>
        <Text className="text-white text-xl font-semibold">₦250,000</Text>
      </View> */}
        <View className="mt-12">
          <CustomButton
            variant="small"
            clickHandler={() => navigation.goBack()}
          >
            <View className="flex-row items-center">
              <Ionicons name="chevron-back-sharp" size={20} color="white" />
              <Text className="text-white font-semibold text-base">
                Back to Details
              </Text>
            </View>
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
}

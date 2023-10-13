import { View, Text, ScrollView } from "react-native";
import { Outlet } from "../../types/outlets";
import CustomButton from "../../common/button";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";

export default function OutletInfo({ outlet }: { outlet: Outlet | undefined }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-darkTheme">
      <View className="mt-4 mx-6">
        <View>
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              Outlet Name
            </Text>
            <Text className="text-base text-darkNeutral dark:text-lightText">
              {outlet?.name}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              Address
            </Text>
            <Text className="w-40 text-right text-[15px] text-darkNeutral dark:text-lightText">
              {outlet?.address}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              State
            </Text>
            <Text className="w-40 text-right text-[15px] text-darkNeutral dark:text-lightText">
              {outlet?.state}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              Region
            </Text>
            <Text className="w-40 text-right text-[15px] text-darkNeutral dark:text-lightText">
              {outlet?.region}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              City
            </Text>
            <Text className="w-40 text-right text-[15px] text-darkNeutral dark:text-lightText">
              {outlet?.city}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              Channel
            </Text>
            <Text className="w-40 text-right text-[15px] text-darkNeutral dark:text-lightText">
              {outlet?.channel || "-"}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              Sub-Channel
            </Text>
            <Text className="w-40 text-right text-[15px] text-darkNeutral dark:text-lightText">
              {outlet?.subChannel || "-"}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              Name of Manager
            </Text>
            <Text className="w-40 text-right text-[15px] text-darkNeutral dark:text-lightText">
              {outlet?.managerName || "-"}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
              Phone of Manager
            </Text>
            <Text className="w-40 text-right text-[15px] text-darkNeutral dark:text-lightText">
              {outlet?.managerPhoneNumber || "-"}
            </Text>
          </View>
        </View>

        <View className="mt-10">
          <CustomButton
            variant="small"
            clickHandler={() => navigation.goBack()}
          >
            <View className="flex-row items-center">
              <Ionicons name="chevron-back-sharp" size={20} color="white" />
              <Text className="text-white font-semibold text-base">
                Back to Outlets
              </Text>
            </View>
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
}

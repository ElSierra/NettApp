import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../common/colors";

export default function TuesdaySchedule() {
  const { width } = Dimensions.get("window");

  return (
    <ScrollView className="flex-1 bg-white dark:bg-darkTheme">
      <View className="mx-4">
        {/* <View>
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
      </View> */}

        <View
          className={`bg-secondary p-4 rounded-lg mt-5 flex-row justify-between items-start`}
        >
          <View>
            <Text className="text-white text-[26px] font-bold mb-2">
              Tipsy Lounge
            </Text>
            <Text className="text-white text-[16px] font-semibold">
              1, Bende Road, Umu Obasi, Umuahia
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.6}>
            <Entypo
              name="dots-three-vertical"
              size={22}
              color={COLORS.lightText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

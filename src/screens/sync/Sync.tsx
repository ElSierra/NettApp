import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import Header from "../../components/header/Header";
import CustomButton from "../../common/button";
import { useModal } from "../../context/modal/ModalContext";
import AnimatedLottieView from "lottie-react-native";

export default function Sync() {
  const { showModalAndContent } = useModal();
  const { width } = Dimensions.get("window");

  function handleSync() {
    showModalAndContent({
      title: "Sync Data",
      message: "Do you want to Sync your Data?",
      action: "SyncData",
      actionBtnText: "Yes",
      param: "none",
    });
  }
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <ScrollView showsVerticalScrollIndicator={false} className={`mx-3`}>
        <Header />
        <Text className="text-2xl font-bold text-darkNeutral dark:text-lightText text-center">
          Sync Data
        </Text>
        <View
          style={{
            width: width,
            height: 290,
          }}
        >
          <AnimatedLottieView
            source={require("../../assets/animations/schedule.json")}
          />
        </View>
        <Text className="text-base text-darkNeutral dark:text-lightText text-center font-semibold">
          Sync and get your updated data
        </Text>
        <CustomButton
          variant="large"
          classnames="mt-4"
          clickHandler={handleSync}
        >
          <Text>Proceed</Text>
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
}

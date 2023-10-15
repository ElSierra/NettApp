import { View, Text, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { COLORS } from "../../common/colors";
import LottieView from "lottie-react-native";
import { styles } from "./styles";

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onboardingRef = useRef<Onboarding | any>(null);

  async function handleOnboardingFinish() {
    // COMMON ACTIONS.RESET ENSURES USERS WONT BE ABLE TO NAVIGATE BACK TO ONBOARDING SCREEN
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );

    // await AsyncStorage.setItem("userHasOnboarded", "true");
  }

  // SLIDE INDICATOR
  function indicatorComponent({ selected }: any) {
    return (
      <View
        className={`w-4 h-4 flex items-center justify-center rounded-full p-2 ${
          selected ? "border border-lightText" : "border border-slate"
        }`}
      >
        <View
          className={`w-2 h-2 rounded-full ${
            selected ? "bg-lightText" : "bg-gray-500"
          }`}
        ></View>
      </View>
    );
  }

  return (
    <Onboarding
      ref={onboardingRef}
      DotComponent={indicatorComponent}
      onSkip={() => onboardingRef.current?.goToPage(2, true)}
      onDone={handleOnboardingFinish}
      titleStyles={styles.title}
      subTitleStyles={styles.subTitle}
      // SKIP BUTTON
      SkipButtonComponent={() => (
        <TouchableOpacity
          onPress={() => onboardingRef.current?.goToPage(2, true)}
          className="flex-row items-center"
        >
          <Text className="ml-2 text-[18px] text-lightText">Skip</Text>
          <MaterialIcons
            name="double-arrow"
            size={15}
            color={COLORS.lightText}
          />
        </TouchableOpacity>
      )}
      // NEXT BUTTON
      NextButtonComponent={() => (
        <TouchableOpacity
          onPress={() => onboardingRef.current?.goNext()}
          className="flex-row items-center gap-1"
        >
          <Text className="text-[18px] text-lightText">Next</Text>
          <View className="mr-1">
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              color={COLORS.lightText}
            />
          </View>
        </TouchableOpacity>
      )}
      // GET STARTED BUTTON
      DoneButtonComponent={() => (
        <TouchableOpacity
          onPress={handleOnboardingFinish}
          className="flex-row items-center"
        >
          <Text className="mr-2 text-[18px] text-lightText">Get Started</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={15}
            color={COLORS.lightText}
          />
        </TouchableOpacity>
      )}
      pages={[
        {
          backgroundColor: COLORS.primary,
          image: (
            <View style={styles.lottieWrapper}>
              <LottieView
                source={require("../../assets/animations/welcome.json")}
                loop
              />
            </View>
          ),
          title: "Welcome to NetApp",
          subtitle:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          backgroundColor: COLORS.secondary,
          image: (
            <View style={styles.lottieWrapper}>
              <LottieView
                source={require("../../assets/animations/register.json")}
              />
            </View>
          ),
          title: "Register Various Outlets",
          subtitle:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          backgroundColor: "#121825",
          image: (
            <View style={styles.lottieWrapper}>
              <LottieView
                source={require("../../assets/animations/schedule.json")}
                loop
              />
            </View>
          ),
          title: "Schedule Visits",
          subtitle:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ]}
    />
  );
}

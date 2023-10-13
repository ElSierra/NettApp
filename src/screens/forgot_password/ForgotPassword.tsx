import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Divider } from "react-native-paper";
import LogoSVG from "../../assets/images/logo.svg";
import CustomButton from "../../common/button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/theme/ThemeContext";
import { COLORS } from "../../common/colors";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <View className="ml-2 mb-10">
        <LogoSVG width={"50%"} height={80} />
        <Divider />
      </View>

      <ScrollView>
        <View className="mx-3">
          {/* WELCOME TEXTS */}
          <View className="flex-col items-center justify-center mt-2">
            <Text className="text-4xl font-semibold text-darkNeutral dark:text-lightText">
              Forgot Password
            </Text>
            <Text className="text-base font-medium text-slate-500 text-darkNeutral dark:text-lightText">
              Don’t worry, we will send you reset instructions
            </Text>

            {/* LOGIN FORM */}
            <View className="pt-10">
              {/* EMAIL INPUT */}
              <View>
                <Text className="text-[17px] font-semibold text-darkNeutral dark:text-lightText">
                  Email Address
                </Text>
                <TextInput
                  value={email}
                  onChangeText={(val) => setEmail(val)}
                  className="w-[100%] mt-2"
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#cecece" : "#EEEEEE",
                    },
                  ]}
                  placeholder="Enter your Email Address"
                />
              </View>

              {/* SUBMIT BUTTON */}
              <View className="mt-6">
                <CustomButton variant="large">Reset Password</CustomButton>
              </View>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View className="flex-row items-center justify-center gap-2 mt-4">
                  <Ionicons
                    name="chevron-back-circle-outline"
                    size={24}
                    color={isDarkMode ? COLORS.lightText : COLORS.dark}
                  />

                  <Text className="text-base text-center text-darkNeutral dark:text-lightText">
                    Back to Login
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="mt-72">
                <Divider />
                <Text className="text-base mt-3 text-darkNeutral dark:text-lightText">
                  © Copyright {new Date().getFullYear()}.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

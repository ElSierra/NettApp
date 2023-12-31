import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useState } from "react";
import { TextInput, Divider } from "react-native-paper";
import LogoSVG from "../../assets/images/logo.svg";
import CustomButton from "../../common/button";
import { styles } from "./styles";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { httpRequest } from "../../lib";
import { useTheme } from "../../context/theme/ThemeContext";
import { useAlert } from "../../context/alert/AlertContext";
import { useAuth } from "../../context/auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState(
    "adijat_oladele@nubiaville.onmicrosoft.com"
  );
  const [password, setPassword] = useState("Deejah");
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation<NavigationProp<any>>();
  const { isDarkMode } = useTheme();
  const { showAlertAndContent } = useAlert();
  const { setActiveUser } = useAuth();

  async function LoginUser() {
    if (!email || !password) {
      return showAlertAndContent({
        type: "error",
        message: "Please provide both Email and Password",
      });
    }
    try {
      setLoading(true);
      const dbResponse = await httpRequest.post("/login", {
        identity: email,
        password,
      });

      if (dbResponse.data.status === 200) {
        setLoading(false);
        await setActiveUser(dbResponse.data.userCode);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "TabStack" }],
          })
        );

        Platform.OS === "ios" &&
          showAlertAndContent({
            type: "success",
            message: `Welcome, ${email}`,
          });
      } else {
        setLoading(false);
        return showAlertAndContent({
          type: "error",
          message: "Login failed. Ensure your Login Credentials are correct",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      {/* LOGO */}
      <View className={`ml-2 mb-10 ${Platform.OS === "android" && "mt-10"}`}>
        <LogoSVG width={"50%"} height={80} />
        <Divider />
      </View>
      <ScrollView>
        <View className="mx-3">
          {/* WELCOME TEXTS */}
          <View className="flex-col items-center justify-center mt-2">
            <Text className="text-4xl font-semibold text-darkNeutral dark:text-lightText">
              Welcome Back!
            </Text>
            <Text className="text-base font-medium text-slate-500 mt-2 text-darkNeutral dark:text-lightText">
              Login to your NettApp Account
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
                  autoCapitalize="none"
                  placeholder="Enter your Email Address"
                />
              </View>

              {/* PASSWORD INPUT */}
              <View className="mt-6">
                <Text className="text-[17px] font-semibold text-darkNeutral dark:text-lightText">
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={(val) => setPassword(val)}
                  secureTextEntry={hidePassword}
                  autoCapitalize="none"
                  placeholder="Enter your Passsword"
                  right={
                    <TextInput.Icon
                      icon={hidePassword ? "eye" : "eye-off"}
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  }
                  className="w-[100%] mt-2"
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#cecece" : "#EEEEEE",
                    },
                  ]}
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text className="text-base text-right mt-3 underline text-secondary dark:text-blue-800">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* SUBMIT BUTTON */}
              <View className="mt-10">
                <CustomButton
                  variant="large"
                  clickHandler={loading ? () => {} : LoginUser}
                  // clickHandler={() => navigation.navigate("TabStack")}
                  classnames="flex items-center justify-center"
                >
                  {loading ? (
                    <ActivityIndicator color={"#fff"} size="small" />
                  ) : (
                    "Login"
                  )}
                </CustomButton>
              </View>

              <View className="mt-32">
                <Divider style={{ width: "100%" }} />
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

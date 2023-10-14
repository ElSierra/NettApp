import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import LogoSVG from "../../assets/images/logo.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { COLORS } from "../../common/colors";
import { useTheme } from "../../context/theme/ThemeContext";
import { useAuth } from "../../context/auth/AuthContext";

export default function Header() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();
  const { removeActiveUser } = useAuth();

  async function logoutUser() {
    removeActiveUser();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }

  return (
    <View className="ml-2 mb-6">
      <View
        className={`flex-row justify-between items-center w-full ${
          Platform.OS === "android" && "mt-10"
        }`}
      >
        <LogoSVG width={"50%"} height={70} />

        <TouchableOpacity onPress={logoutUser}>
          <MaterialIcons
            name="logout"
            size={28}
            color={isDarkMode ? COLORS.lightText : COLORS.dark}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
      <Divider />
    </View>
  );
}

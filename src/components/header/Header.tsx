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
import { useModal } from "../../context/modal/ModalContext";

export default function Header() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();

  const { showModalAndContent } = useModal();

  function handleLogout() {
    showModalAndContent({
      title: "Log Out",
      message: "Do you want to Log out of your account?",
      action: "LogOut",
      actionBtnText: "Yes",
      param: "none",
    });
  }

  return (
    <View className="ml-2 mb-6">
      <View
        className={`flex-row justify-between items-center w-full ${
          Platform.OS === "android" && "mt-10"
        }`}
      >
        <LogoSVG width={"50%"} height={70} />

        <TouchableOpacity onPress={handleLogout}>
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

import { View, Text, TouchableOpacity } from "react-native";
import LogoSVG from "../../assets/images/logo.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { COLORS } from "../../common/colors";
import { useTheme } from "../../context/theme/ThemeContext";

export default function Header() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();

  return (
    <View className="ml-2 mb-6">
      <View className="flex-row justify-between items-center w-full">
        <LogoSVG width={"50%"} height={70} />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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

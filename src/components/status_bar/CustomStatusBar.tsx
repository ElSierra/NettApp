import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../context/theme/ThemeContext";

export default function CustomStatusBar() {
  const { isDarkMode } = useTheme();

  return <StatusBar style={isDarkMode ? "light" : "dark"} />;
}

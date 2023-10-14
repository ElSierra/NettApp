import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import { useAlert } from "../../context/alert/AlertContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Portal } from "react-native-paper";
import Animated, {
  FadeInUp,
  FadeOutUp,
  runOnJS,
} from "react-native-reanimated";
import { ForbiddenIcon, InfoIcon, VerifyIcon } from "../icons";
import { useTheme } from "../../context/theme/ThemeContext";
import { BlurView } from "expo-blur";

export default function Alert() {
  const { alertType, message, showAlert, closeAlert, delay } = useAlert();
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");
  const colorForbidden = isDarkMode ? "#ff0000" : "#400000";
  const color = isDarkMode ? "white" : "black";
  const tint = isDarkMode ? "dark" : "light";

  const renderIcon = () => {
    switch (alertType) {
      case "error":
        return <ForbiddenIcon size={20} color={colorForbidden} />;
      case "success":
        return <VerifyIcon size={20} color={"green"} />;
      case "info":
        return <InfoIcon size={20} color={color} />;
    }
  };

  function callback() {
    "worklet";
    runOnJS(handleClose)();
  }

  function handleClose() {
    closeAlert();
  }

  return (
    <Portal>
      {showAlert && (
        <TouchableWithoutFeedback onPress={closeAlert}>
          <Animated.View
            style={{
              height: 60 + insets.top,
              width: width,
              backgroundColor:
                alertType === "error"
                  ? "#D8000061"
                  : alertType === "success"
                  ? "#4CF10062"
                  : "#00000058",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            entering={FadeInUp.springify().withCallback(callback)}
            exiting={FadeOutUp.springify().delay(delay)}
          >
            <BlurView
              tint={tint}
              style={{ position: "absolute", width, height: 60 + insets.top }}
              intensity={50}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
                paddingBottom: 20,
              }}
            >
              {renderIcon()}
              <Text
                style={{
                  color,
                  fontSize: 16,
                }}
              >
                {message}
              </Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </Portal>
  );
}

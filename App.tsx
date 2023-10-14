import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { AuthProvider } from "./src/context/auth/AuthContext";
import CustomStatusBar from "./src/components/status_bar/CustomStatusBar";
import { ThemeProvider } from "./src/context/theme/ThemeContext";
import "react-native-gesture-handler";
import { AlertProvider } from "./src/context/alert/AlertContext";
import Alert from "./src/components/alert/Alert";
import { ModalProvider } from "./src/context/modal/ModalContext";
import LogoutModal from "./src/components/modals/Modal";
import ReusableModal from "./src/components/modals/ReusableModal";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#020257",
      secondary: "#B18D21E5",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <AlertProvider>
            <AuthProvider>
              <ModalProvider>
                <NavigationContainer>
                  <RootNavigator />
                  <CustomStatusBar />
                  <Alert />
                  <LogoutModal />
                  <ReusableModal />
                </NavigationContainer>
              </ModalProvider>
            </AuthProvider>
          </AlertProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

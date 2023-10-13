import * as Font from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider } from "./src/context/auth/AuthContext";
import CustomStatusBar from "./src/components/status_bar/CustomStatusBar";
import { ThemeProvider } from "./src/context/theme/ThemeContext";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#020257",
      secondary: "#B18D21E5",
    },
  };

  async function loadFonts() {
    try {
      await Font.loadAsync({
        OSReg: require("./src/assets/fonts/OpenSans-Regular.ttf"),
        OSBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
        OSRSemiB: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
        OSLight: require("./src/assets/fonts/OpenSans-Light.ttf"),
      });
      setFontLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  }

  useEffect(() => {
    async function loadApp() {
      await loadFonts();
      SplashScreen.preventAutoHideAsync()
        .then(() => {
          if (fontLoaded) {
            SplashScreen.hideAsync();
          }
        })
        .catch((error) => {
          console.error("Error preventing auto hide:", error);
        });
    }

    loadApp();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {fontLoaded ? (
          <ThemeProvider>
            <AuthProvider>
              <NavigationContainer>
                <RootNavigator />
                <CustomStatusBar />
              </NavigationContainer>
            </AuthProvider>
          </ThemeProvider>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

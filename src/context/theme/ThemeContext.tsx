import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useColorScheme } from "nativewind";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContextType, ThemeProviderProps } from "../../types/theme";

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function checkTheme() {
      const storedTheme = await AsyncStorage.getItem("theme");
      setIsDarkMode(storedTheme === "dark" || colorScheme === "dark");
    }

    checkTheme();
  }, [colorScheme]);

  async function toggleTheme() {
    await AsyncStorage.removeItem("theme");
    toggleColorScheme();
    setIsDarkMode(!isDarkMode);
    const storedTheme = await AsyncStorage.getItem("theme");
    const themeToStore = storedTheme === "light" ? "dark" : "light";
    await AsyncStorage.setItem("theme", themeToStore);
  }

  const values: ThemeContextType = {
    toggleTheme,
    isDarkMode,
    setIsDarkMode,
    toggleColorScheme,
    refresh,
    setRefresh,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

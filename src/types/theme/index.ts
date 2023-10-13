import { Dispatch, ReactNode, SetStateAction } from "react";

export type ThemeContextType = {
  toggleTheme: () => void;
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  toggleColorScheme: () => void;
};

export type ThemeProviderProps = {
  children: ReactNode;
};

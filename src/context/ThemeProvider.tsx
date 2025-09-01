import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { View, useColorScheme } from "react-native";
import { colors as themeColors } from "../theme/colors";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof themeColors.light;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  colors: themeColors.light,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme(); 
  const [theme, setTheme] = useState<Theme>(systemScheme || "light");

  useEffect(() => {
    if (systemScheme) setTheme(systemScheme);
  }, [systemScheme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const colors = theme === "light" ? themeColors.light : themeColors.dark;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      <View className={`${theme === "dark" ? "dark" : ""} flex-1`}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

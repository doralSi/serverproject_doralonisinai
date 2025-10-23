import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { createContext, useContext, useState } from "react";

//Step1: create the context
const ThemeContext = createContext();

//Step2: create the provider
export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleMode = () => {
    setIsDark((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleMode, isDark }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

//step 3 - custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a Provider");
  return context;
};

import { ConfigProvider, theme } from "antd";
import React, { type ReactNode, useEffect, useState } from "react";
import { getCurrentTheme, setCurrentTheme } from "../../utils/storage.utils";

const DARK_CLASS = "dark";

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  isDark: false,
  toggleTheme: () => console.error("no theme provider"),
} as IThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = getCurrentTheme();
    setIsDark(theme === "dark");
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setCurrentTheme(isDark ? "light" : "dark");
    setIsDark((prev) => !prev);
  };

  const providerValue = React.useMemo(
    () => ({ isDark, toggleTheme }),
    [isDark, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <ConfigProvider
        direction="ltr"
        theme={{
        //   ...antThemConfig,
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext<IThemeContext>(ThemeContext);

export default ThemeProvider;

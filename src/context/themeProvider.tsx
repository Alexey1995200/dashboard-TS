import {createContext, FC, ReactNode, useContext, useState} from "react";
import {isSystemThemeDark} from "../components/dashboard/const";
import {getFromLS, saveToLS} from "../components/dashboard/utils";
export const THEME = {
  dark: 'dark',
  light: 'light',
} as const;
type Theme = keyof typeof THEME;
export interface ThemeContextProps {
  currentTheme: Theme;
  changeCurrentTheme: (theme: Theme) => void
}
export const ThemeContext = createContext<ThemeContextProps>(null!);
export const useTheme = () => useContext(ThemeContext);
export interface ThemeProviderProps {
  children: ReactNode;
}
const getTheme = getFromLS('themeState') ? getFromLS('themeState') : (isSystemThemeDark ? THEME.dark: THEME.light)
const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getTheme);
  const handleChangeTheme = (theme: Theme) => {
    setTheme(theme)
    saveToLS('themeState', theme)
  }
  return (
    <ThemeContext.Provider value={{
      currentTheme: theme,
      changeCurrentTheme: handleChangeTheme,

    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

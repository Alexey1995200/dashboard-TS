import {isSystemThemeDark} from "../components/dashboard/const"
import {createContext, FC, ReactNode, useContext, useState} from "react"
import {getFromLS, saveToLS} from "../components/dashboard/utils"
// export const THEME = {
//   dark: 'dark',
//   light: 'light',
// } as const
// type Theme = keyof typeof THEME
export enum ThemeType {
  dark = 'dark',
  light = 'light'
}
export interface ThemeContextProps {
  currentTheme: ThemeType;
  changeCurrentTheme: (theme: ThemeType) => void
}
export const ThemeContext = createContext<ThemeContextProps>(null!)
export const useTheme = () => useContext(ThemeContext)
export interface ThemeProviderProps {
  children: ReactNode
}
const getInitialTheme = () => getFromLS('themeState') ? getFromLS('themeState') : (isSystemThemeDark ? ThemeType.dark : ThemeType.light)
const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<ThemeType>(getInitialTheme)
  const handleChangeTheme = (theme: ThemeType) => {
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
export default ThemeProvider
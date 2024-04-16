import Header from "./header";
import SideBar from "./sideBar";
import {useMemo, useState} from "react";
import Dashboard from "../dashboard";
import './styles.scss'
const Layout = () => {
    const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false)
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(window.matchMedia("(prefers-color-scheme: dark)").matches)
    const changeSideBarVisibility = () => {
        setIsSideBarVisible(!isSideBarVisible)
    }
    const changeDarkThemeState = () => {
        setIsDarkTheme(!isDarkTheme)
    }
    const currentTheme = useMemo(() => (isDarkTheme ? 'dark' : 'light'), [isDarkTheme]);
    return <div>
        <Header
            changeSideBarVisibility={changeSideBarVisibility}
            changeDarkThemeState={changeDarkThemeState}
            isDarkTheme={isDarkTheme}
            currentTheme={currentTheme}
        />
        {isSideBarVisible && <SideBar
            changeSideBarVisibility={changeSideBarVisibility}
        />}
        <div className={'content'}>
            <Dashboard
                isDarkTheme={isDarkTheme}
                currentTheme={currentTheme}
            />
        </div>
    </div>
}
export default Layout
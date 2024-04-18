import Header from "./header";
import SideBar from "./sideBar";
import {useEffect, useMemo, useState} from "react";
import Dashboard from "../dashboard";
import './styles.scss'
import {getFromLS, saveToLS} from "../dashboard/utils";
import {isSystemThemeDark} from "../dashboard/const";
const Layout = () => {
    const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false)
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(isSystemThemeDark)
    const changeSideBarVisibility = () => {
        setIsSideBarVisible(!isSideBarVisible)
    }
    const changeDarkThemeState = () => {
        setIsDarkTheme(!isDarkTheme)
        saveToLS('isDarkTheme', !isDarkTheme)
    }
    useEffect(() => {
        setIsDarkTheme(getFromLS('isDarkTheme'))
    }, []);
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
                setIsDarkTheme={setIsDarkTheme}
            />
        </div>
    </div>
}
export default Layout
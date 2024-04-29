import Header from "./header";
import SideBar from "./sideBar";
import React, {useMemo, useState} from "react";
import Dashboard from "../dashboard";
import './styles.scss'
import {screenHeight, screenWidth} from "../dashboard/const";
interface ILayout {
    isDarkTheme:boolean,
    changeDarkThemeState:()=>void,
    setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}
const Layout = ({changeDarkThemeState, isDarkTheme, setIsDarkTheme}:ILayout) => {
    const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false)
    const changeSideBarVisibility = () => {
        setIsSideBarVisible(!isSideBarVisible)
    }

    const currentTheme = useMemo(() => (isDarkTheme ? 'dark' : 'light'), [isDarkTheme]);
    const headerHeight = (screenWidth>screenHeight) ? '7.5dvh' : '5dvh'
    return (
        <>
            <Header
                changeSideBarVisibility={changeSideBarVisibility}
                changeDarkThemeState={changeDarkThemeState}
                isDarkTheme={isDarkTheme}
                headerHeight={headerHeight}
            />
            {isSideBarVisible && <SideBar
                changeSideBarVisibility={changeSideBarVisibility}
            />}
            <div style={{marginTop:`${headerHeight}`}}>
                <Dashboard
                    isDarkTheme={isDarkTheme}
                    currentTheme={currentTheme}
                    setIsDarkTheme={setIsDarkTheme}
                />
            </div>
        </>
    )
}
export default Layout
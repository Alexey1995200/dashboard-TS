import Header from "./header";
import SideBar from "./sideBar";
import React, {useMemo, useState} from "react";
import Dashboard from "../dashboard";
import './styles.scss'
import {screenHeight, screenWidth} from "../dashboard/const";
import {useTheme} from "../../context/themeProvider";
import {DataProvider} from "../../context/dataContext";

// interface ILayout {
//   isDarkTheme: boolean,
//   setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
// }

const Layout = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false)
  const changeSideBarVisibility = () => {
    setIsSideBarVisible(!isSideBarVisible)
  }
  const headerHeight = (screenWidth > screenHeight) ? '64px' : '48px'
  return (
    <>
      <Header
        changeSideBarVisibility={changeSideBarVisibility}
        headerHeight={headerHeight}
        isSideBarVisible={isSideBarVisible}
      />
      <div style={{marginTop: `${headerHeight}`}}>
        <DataProvider>
          <Dashboard/>
        </DataProvider>
      </div>
    </>
  )
}
export default Layout
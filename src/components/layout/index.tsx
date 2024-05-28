import Header from "./header";
import React, {useMemo, useState} from "react";
import Dashboard from "../dashboard";
import './styles.scss'
import {screenHeight, screenWidth} from "../dashboard/const";
import {DataProvider} from "../../context/dataContext";
import SideBar from "./sideBar";

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
      />
      {isSideBarVisible && <SideBar
          changeSideBarVisibility={changeSideBarVisibility}
      />}
      <div style={{marginTop: `${headerHeight}`}}>
        <DataProvider>
          <Dashboard/>
        </DataProvider>
      </div>
    </>
  )
}
export default Layout
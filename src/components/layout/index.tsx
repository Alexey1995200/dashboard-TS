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
  const headerHeight = (screenWidth > screenHeight) ? 64 : 48
  return (
    <>
      <Header
        changeSideBarVisibility={changeSideBarVisibility}
        headerHeight={headerHeight}
        isSideBarVisible={isSideBarVisible}
      />
      <div style={{marginTop: `${headerHeight}`}}>
        <DataProvider>
          <Dashboard
            headerHeight={headerHeight}
          />
        </DataProvider>
      </div>
    </>
  )
}
export default Layout
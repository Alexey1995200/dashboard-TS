import Header from "./header";
import React, {useState} from "react";
import Dashboard from "../dashboard";
import {screenHeight, screenWidth} from "../dashboard/const";
import {DataProvider} from "../../context/dataContext";

const Layout = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false)

  const changeSideBarVisibility = () => {
    setIsSideBarVisible(!isSideBarVisible)
  }
  const pcHeaderHeightInPX = 64
  const mobileHeaderHeightInPX = 48
  const headerHeight: number = (screenWidth > screenHeight) ? pcHeaderHeightInPX : mobileHeaderHeightInPX
  return (
    <>
      <Header
        changeSideBarVisibility={changeSideBarVisibility}
        headerHeight={headerHeight}
        isSideBarVisible={isSideBarVisible}
      />
      <div style={{marginTop: `${headerHeight}px`}}>
        <DataProvider>
          <Dashboard/>
        </DataProvider>
      </div>
    </>
  )
}
export default Layout
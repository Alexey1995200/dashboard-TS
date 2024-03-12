import Header from "./header";
import SideBar from "./sideBar";
import {useState} from "react";
import Dashboard from "../dashboard";
import './styles.scss'
const Layout = () => {
    const [isSideBarVisible, setIsSideBarVisible] = useState(false)
    const changeSideBarVisibility = () => {
        setIsSideBarVisible(!isSideBarVisible)
    }
    return <div>
        <Header
            changeSideBarVisibility={changeSideBarVisibility}
        />
        {isSideBarVisible && <SideBar
            changeSideBarVisibility={changeSideBarVisibility}
        />}
        <Dashboard/>
    </div>
}
export default Layout
import './styles.scss'
import {handleClickInsideDiv, screenWidth} from "../../dashboard/const";

interface ISideBar {
  changeSideBarVisibility: () => void
}
const sideBarWidth:number = 130
const SideBar = ({
                   changeSideBarVisibility
                 }: ISideBar) =>
  (
    <div>
      <div className="sideBar"
           onClick={handleClickInsideDiv}
           style={{width: `${sideBarWidth}px`}}
      >
        <div className={'sideBar__header'}>
          <button onClick={changeSideBarVisibility} className="remove_btn">&#10006;</button>
        </div>
        <ul className="sideBar__links">
          <li className="sideBar__link">Dashboard</li>
          <li className="sideBar__link">User Profile</li>
          <li className="sideBar__link">Notifications</li>
          <li className="sideBar__link">Tasks</li>
          <li className="sideBar__link">Users</li>
          <li className="sideBar__link">Budget</li>
          <li className="sideBar__link">Log</li>
          <li className="sideBar__link">Last Changes</li>
        </ul>
      </div>
      <div onClick={changeSideBarVisibility} style={{width:`${screenWidth-sideBarWidth}px`, height:'100dvh'}}/>
    </div>
  )
export default SideBar
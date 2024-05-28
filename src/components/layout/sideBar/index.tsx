import './styles.scss'
import {handleClickInsideDiv, screenHeight, screenWidth} from "../../dashboard/const";

interface ISideBar {
  changeSideBarVisibility: () => void;
  headerHeight: number
}

const sideBarWidth: number = 130
const SideBar = ({
                   changeSideBarVisibility,
                   headerHeight
                 }: ISideBar) =>
  (
    <div className={'sideBar__wrapper'}>
      <div className="sideBar"
           onClick={handleClickInsideDiv}
           style={{width: `${sideBarWidth}px`, marginTop:`${headerHeight}px`}}
      >
        {/*<div className={'sideBar__header'}>*/}
          {/*<button onClick={changeSideBarVisibility} className="remove_btn">&#10006;</button>*/}
        {/*</div>*/}
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
      <div onClick={changeSideBarVisibility}
           style={{width: `${screenWidth}px`, height: `${screenHeight}px`}}/>
    </div>
  )
export default SideBar
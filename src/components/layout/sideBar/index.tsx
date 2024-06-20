import './styles.scss'
import {handleClickInsideDiv, screenHeight, screenWidth} from "../../dashboard/const";

interface ISideBar {
  changeSideBarVisibility: () => void;
  headerHeight: number
}

const sideBarWidth: number = 130
const sidebarArr = [
  {
    title: 'Dashboard',
    link: '/'
  },
  {
    title: 'User Profile',
    link: '/'
  },
  {
    title: 'Notifications',
    link: '/'
  },
  {
    title: 'Tasks',
    link: '/'
  },
  {
    title: 'Users',
    link: '/'
  },
  {
    title: 'Budget',
    link: '/'
  },
  {
    title: 'Log',
    link: '/'
  },
  {
    title: 'Last Changes',
    link: '/'
  }
]
const SideBar = ({
                   changeSideBarVisibility,
                   headerHeight
                 }: ISideBar) =>
  (
    <div className={'sideBar__wrapper'}>
      <div className="sideBar"
           onClick={handleClickInsideDiv}
           style={{width: `${sideBarWidth}px`, marginTop: `${headerHeight}px`}}
      >
        <ul className="sideBar__links">
          {sidebarArr.map((item) => (
            <li className={'sideBar__link'} key={`${item.link}${item.title}`}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div onClick={changeSideBarVisibility}
           style={{width: `${screenWidth}px`, height: `${screenHeight}px`}}/>
    </div>
  )
export default SideBar
import './styles.scss'
interface ISideBar {
    changeSideBarVisibility:()=>void
}
const SideBar = ({
                     changeSideBarVisibility
                 }:ISideBar) =>
    (
        <div className="sideBar">
            <div className={'sideBar__header'}><button onClick={changeSideBarVisibility} className="remove_btn">&#10006;</button></div>
            <ul className="sideBar__links">
                <li className="sideBar__link">Dashboard</li>
                <li className="sideBar__link">User Profile</li>
                <li className="sideBar__link">Last Changes</li>
                <li className="sideBar__link">Notifications</li>
            </ul>
        </div>
    )
export default SideBar
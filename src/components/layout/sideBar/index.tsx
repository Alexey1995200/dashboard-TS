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
                <li className="sideBar__link">
                    <details>
                        <summary>Table List</summary>
                        <ul className="sideBar__widgets">
                            <li className="sideBar__widget">Overall Progress</li>
                            <li className="sideBar__widget">Progress Bar</li>
                            <li className="sideBar__widget">Project Launch Date</li>
                            <li className="sideBar__widget">Risks</li>
                            <li className="sideBar__widget">Project Budget</li>
                            <li className="sideBar__widget">Overdue Tasks</li>
                            <li className="sideBar__widget">Project Logs</li>
                            <li className="sideBar__widget">Upcoming Tasks</li>
                            <li className="sideBar__widget">Summary</li>
                            <li className="sideBar__widget">Avg time for Project Task</li>
                        </ul>
                    </details>
                </li>
                <li className="sideBar__link">Last Changes</li>
                <li className="sideBar__link">Notifications</li>
            </ul>
        </div>
    )
export default SideBar
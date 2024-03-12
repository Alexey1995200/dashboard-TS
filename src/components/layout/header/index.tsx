import './styles.scss'
import {auth, Burger, react, user} from "../../../assets/svg";
import {colorFilter} from "../../dashboard";

interface ISideBar {
    changeSideBarVisibility:()=>void
}

const Header = ({
                    changeSideBarVisibility
                }:ISideBar) => {


    
    return (
        <div className={'header__wrapper'}>

            <nav className={'navBar__wrapper'}>
                <Burger
                    color={'white'}
                    style={{margin:'auto 8px'}}
                    onClick={changeSideBarVisibility}
                />
                <img src={react} alt="LOGO" className={'header__logo'} style={colorFilter.green}/>
                <ul className="navBar">
                    <li className="navBar__link">Dashboard</li>
                    <li className="navBar__link">Users</li>
                    <li className="navBar__link">Tasks</li>
                    <li className="navBar__link">Budget</li>
                    <li className="navBar__link">Log</li>
                </ul>

            </nav>
            <div className={'account'}>

                <img src={auth} alt="AUTH" style={{margin:'4px', padding:'4px'}}/>
                <div className={'account__info'}>
                    <span className={'info__name'}>
                    UserName Placeholder
                        {/*{user.name}*/}
                </span>
                    <span className={'info__position'}>
                    manager position
                        {/*{user.position}*/}
                </span>
                </div>
                <img src={user} alt="USER" style={{margin:'4px'}}/>
            </div>
        </div>
    )
}

export default Header
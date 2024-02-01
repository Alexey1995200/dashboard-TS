import './styles.scss'
import {auth, react, user} from "../../assets/svg";

const Header = () => {
    
    
    return (
        <div className={'header__wrapper'}>
            <nav className={'navBar__wrapper'}>
                <img src={react} alt="LOGO" className={'header__logo'}/>
                <ul className="navBar">
                    <li className="navBar__link">Dashboard</li>
                    <li className="navBar__link">Users</li>
                    <li className="navBar__link">Tasks</li>
                    <li className="navBar__link">Budget</li>
                    <li className="navBar__link">Log</li>
                </ul>

            </nav>
            <div className={'account'}>
                <img src={user} alt="USER"/>
                <img src={auth} alt="AUTH" style={{padding:'4px'}}/>
                <div className={'account__info'}>
                    <span className={'info__name'}>
                    User Placeholder
                        {/*{user.name}*/}
                </span>
                    <span className={'info__position'}>
                    manager position
                        {/*{user.position}*/}
                </span>
                </div>
            </div>
        </div>
    )
}

export default Header
import './styles.scss'
import {auth, Burger, darkTheme, lightTheme, react, user} from "../../../assets/svg";
import {colorFilter} from "../../dashboard/const";
import React, {useState} from "react";
import {palette} from "../../../assets/colors";

interface ISideBar {
    changeSideBarVisibility: () => void
    changeDarkThemeState: () => void
    isDarkTheme: boolean,
    headerHeight:string
}

const Header = ({
                    changeSideBarVisibility,
                    changeDarkThemeState,
                    isDarkTheme,
                    headerHeight
                }: ISideBar) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return (
        <div className={'header__wrapper'} id={'Header'} style={{height:headerHeight}}>
            <div className="header__left">
                <Burger
                    color={palette.white}
                    style={{margin: 'auto 32px'}}
                    onClick={changeSideBarVisibility}
                />
                <nav className={'navBar__wrapper'}>
                    <ul className="navBar">
                        <li className="navBar__link">Dashboard</li>
                        <li className="navBar__link">Users</li>
                        <li className="navBar__link">Tasks</li>
                        <li className="navBar__link">Budget</li>
                        <li className="navBar__link">Log</li>
                    </ul>
                </nav>
                <img src={react} alt="LOGO" className={'header__logo'} style={colorFilter.green}/>
            </div>
            <div className="header__right">
                <div className={'account'}>
                    {isLoggedIn ?
                        <>
                            <div className={'account__info'}>
                                <span className={'info__name'}>
                                    UserName Placeholder
                                </span>
                                <span className={'info__position'}>
                                    manager position
                                </span>
                            </div>
                            <img src={user} alt="USER" style={{margin: '4px'}}
                                 onClick={() => setIsLoggedIn(!isLoggedIn)}/>
                        </>
                        :
                        <img className={'account__auth'} src={auth} alt="AUTH"
                             onClick={() => setIsLoggedIn(!isLoggedIn)}/>
                    }
                </div>
                <img src={isDarkTheme ? darkTheme : lightTheme} alt={'changeTheme'} onClick={changeDarkThemeState}
                     style={{height: '36px', padding: '0 16px', display:'flex', alignSelf:'center'}}/>
            </div>
        </div>
    )
}

export default Header;
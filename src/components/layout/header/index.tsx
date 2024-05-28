import './styles.scss'
import {auth, Burger, darkTheme, lightTheme, react, user} from "../../../assets/svg";
import {colorFilter} from "../../dashboard/const";
import React, {useState} from "react";
import {palette} from "../../../assets/colors";
import {useTheme} from "../../../context/themeProvider";
import SideBar from "../sideBar";

interface IHeaderProps {
  changeSideBarVisibility: () => void
  headerHeight: number,
  isSideBarVisible:boolean
}

const Header = ({
                  changeSideBarVisibility,
                  headerHeight,
                  isSideBarVisible
                }: IHeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const navLinks = ['Dashboard', 'Users', 'Tasks', 'Budget', 'Log']

  const {currentTheme, changeCurrentTheme} = useTheme()
  const changeTheme = () => {
    if (currentTheme === "light") {
      changeCurrentTheme("dark")
    } else if (currentTheme === "dark") {
      changeCurrentTheme("light")
    }
  }
  return (
    <>
      <div className={'header__wrapper'} id={'Header'} style={{height: `${headerHeight}px`}}>
        <div className="header__left">
          <Burger
            color={palette.white}
            style={{margin: 'auto 32px'}}
            onClick={changeSideBarVisibility}
          />
          <nav className={'navBar__wrapper'}>
            <ul className="navBar">
              {navLinks.map((navLink) => (
                <li className="navBar__link">{navLink}</li>
              ))}
            </ul>
          </nav>
          <img src={react} alt="LOGO" className={'header__logo'} style={colorFilter.green}/>
        </div>
        <div className="header__right">
          <div className={'account'}>
            {isLoggedIn ?
              <>
                <div className={'account__info'}>
                  <h3 className={'info__name'}>
                    UserName Placeholder
                  </h3>
                  <h4 className={'info__position'}>
                    manager position
                  </h4>
                </div>
                <img src={user} alt="USER" style={{margin: '4px'}}
                     onClick={() => setIsLoggedIn(!isLoggedIn)}/>
              </>
              :
              <img className={'account__auth'} src={auth} alt="AUTH"
                   onClick={() => setIsLoggedIn(!isLoggedIn)}/>
            }
          </div>
          <img className={'changeTheme'} src={currentTheme === 'dark' ? darkTheme : lightTheme} alt={'changeTheme'}
               onClick={changeTheme}/>
        </div>
      </div>
      {isSideBarVisible && <SideBar
          changeSideBarVisibility={changeSideBarVisibility}
          headerHeight={headerHeight}
      />}</>
  )
}

export default Header;
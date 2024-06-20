import {xpAlert, xpError} from "../../../assets/svg";
import React, {SetStateAction, useEffect} from "react";
import './styles.scss'

interface popUpProps {
  type?: string,
  text?: string,
  title?: string,
  isPopUpVisibe: boolean,
  setIsPopUpVisibe: React.Dispatch<SetStateAction<boolean>>
}

const type = {
  alert: "alert",
  error: "error"
}
const type_icon = {
  [type.alert]: xpAlert,
  [type.error]: xpError
}

const PopUp = ({type, text, title, isPopUpVisibe, setIsPopUpVisibe}: popUpProps) => {
  useEffect(() => {
    if (isPopUpVisibe) {
      setTimeout(() => {
          setIsPopUpVisibe(false)
        }, 3000
      )
    }
  }, [isPopUpVisibe]);
  return (
    <div className={`popUp ${isPopUpVisibe ? 'visible' : ''}`}>
      <div className={'popUp-upper'}>
        {(type !== undefined ) && <img className="popUp__ico" src={type_icon[type]} alt=""/>}
        <h2 className="popUp__title">{title}</h2>
      </div>
      <div className="popUp-lower">
        <p className="popUp__text">{text}</p>
      </div>
    </div>
  )
}
export default PopUp
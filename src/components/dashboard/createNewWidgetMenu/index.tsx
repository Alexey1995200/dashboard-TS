import CreateWidgetButtons from "./createNewWidgetButton";
import './style.scss'
import React from "react";
import {handleClickInsideDiv} from "../const";

interface ICreateNewWidgetMenu {
    changeWidgetMenuVisibility: () => void;
    createWidget: (widget: string) => void;
}

const CreateNewWidgetMenu = ({changeWidgetMenuVisibility, createWidget}: ICreateNewWidgetMenu) => {
    return (
        <div className={'createNewWidget-wrapper'}
             onClick={changeWidgetMenuVisibility}
             // style={{backgroundColor: '#80000000'}}
        >
            <div className={'createNewWidget'}
                 onClick={handleClickInsideDiv}
            >
                <h1>Create New Widget</h1>
                <CreateWidgetButtons
                    createWidget={createWidget}
                />
            </div>
        </div>
    )
}
export default CreateNewWidgetMenu
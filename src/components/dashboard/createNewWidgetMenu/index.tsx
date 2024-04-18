import CreateWidgetButtons from "./createNewWidgetButton";
import './style.scss'
import React, {useEffect, useRef} from "react";

interface ICNWM {
    changeWidgetMenuVisibility: () => void;
    createWidget: (widget: string) => void;
}

const CreateNewWidgetMenu = ({changeWidgetMenuVisibility, createWidget}: ICNWM) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };
    return (
        <div className={'createNewWidget-wrapper'}
             onClick={changeWidgetMenuVisibility}
             style={{backgroundColor: '#80000000'}}
        >
            <div className={'createNewWidget'}
                 onClick={handleClick}
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
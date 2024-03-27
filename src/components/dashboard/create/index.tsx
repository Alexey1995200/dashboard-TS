//@ts-nocheck
import React from "react";
import {widgets} from "../const";


// interface ICreateWidget = {
//     addWidget:(widget)=>{}
// }
const CreateWidget = ({addWidget}) => {
    return (
        <li className="createWidget-menu">
        <details>
            <summary>Table List</summary>
            <ul className="sideBar__widgets">
                    {Object.keys(widgets).map((widget) => {
                            return (<button onClick={() => addWidget(widget)}>{widget}</button>)
                        })}
                <li className="sideBar__widget">Overall Progress</li>
            </ul>
        </details>
    </li>
    )
    // return null
}
export default CreateWidget

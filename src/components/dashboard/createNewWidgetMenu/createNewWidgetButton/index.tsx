import './styles.scss'
import React from "react";
import {widgets, widgetsIcons} from "../../const";

interface ICreateWidget {
  createWidget: (widget: string) => void
}
const CreateWidgetButtons = ({createWidget}: ICreateWidget) => {
  return (
    <div className="createWidget-menu">
      {Object.keys(widgets).map((widget) => {
        return (
          <button className={`createWidget-menu__button ${widget}`} onClick={() => createWidget(widget)} key={widget}>
            <img src={widgetsIcons[widget].ico} alt={''}/>
            {widget}
          </button>
        )
      })}
    </div>
  )
}
export default CreateWidgetButtons

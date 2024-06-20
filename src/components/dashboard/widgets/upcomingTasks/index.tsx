import './styles.scss'
import {ConfigProvider, Progress} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {dateToDMY, getDimensions, strokeColor, tasksUpcoming} from "../../const";
import {ITask} from "../../../../DB/db";
import {useTheme} from "../../../../context/themeProvider";
import {theme} from "../../../../assets/colors";
import {useData} from "../../../../context/dataContext";

const UpcTasks = () => {
  const [upcomingScale, setUpcomingScale] = useState(1)
  const upcomingRef = useRef<HTMLDivElement>(null);
  const [tasksArr, setTasksArr] = useState<ITask[]>([],)
  const {currentTheme} = useTheme()
  const {DBData} = useData()
  const handleResize = () => {
    const [width, height] = getDimensions(upcomingRef);
    setUpcomingScale((Math.min(width, height) / 140));
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (upcomingRef.current) {
      resizeObserver.observe(upcomingRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (DBData) setTasksArr(tasksUpcoming(Object.values(DBData.tasks)))
  }, [DBData]);
  return <div className={'upcoming__wrapper'} ref={upcomingRef}
              style={{
                gap: `${upcomingScale > 1.25 ? 4 * upcomingScale : 4}px`,
                color: theme.dashboard.grid.widget.color[currentTheme],
                backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
              }}>
    <h3 className={'centered_title dragHandle'}
        style={{
          transform: `scale(${upcomingScale > 1.25 ? upcomingScale / 1.25 : 1})`,
          padding: `${upcomingScale > 1.5 ? upcomingScale * 4 / 1.5 : 0}px`
        }}
    >Upcoming Tasks</h3>
    <div className={'upcoming__table'}>
      <div className={'table__header'}
           style={{fontSize: `${upcomingScale >= 2.5 ? 16 : upcomingScale > 1.5 ? 11 * (upcomingScale / 1.5) : 11}px`}}>
        <div className={'el'}>Employee</div>
        <div className={'el'}>Task</div>
        <div className={'el'}>Deadline</div>
        <div className={'el'}>Workload</div>
      </div>
      <div className={'table__body'}
           style={{fontSize: `${upcomingScale >= 2.5 ? 16 : upcomingScale > 1.5 ? 11 * (upcomingScale / 1.5) : 11}px`}}>

        {tasksArr.every(task => task.isCompleted)
          ? <div className={'goodNews'}> all tasks completed </div>
          : tasksArr.map((task) =>
            <div className={'table__row'} key={`${task.task}${task.id}`}>
              <div className={'el'}>{task.employee.name}</div>
              <div className={'el'}>{task.task}</div>
              <div className={'el'}>{dateToDMY(task.deadline)}</div>
              <div className={'el'}><ConfigProvider
                theme={{
                  components: {
                    Progress: {
                      fontSize: upcomingScale >= 2.5 ? 16 : upcomingScale > 1.5 ? 11 * (upcomingScale / 1.5) : 11,
                      fontSizeSM: upcomingScale >= 2.5 ? 16 : upcomingScale > 1.5 ? 11 * (upcomingScale / 1.5) : 11,
                      colorText: theme.dashboard.grid.widget.color[currentTheme],
                    },
                  },
                }}
              ><Progress percent={task.employee.workload} strokeColor={strokeColor} size={"small"}/>
              </ConfigProvider>
              </div>
            </div>
          )}
      </div>
    </div>
  </div>
}
export default UpcTasks

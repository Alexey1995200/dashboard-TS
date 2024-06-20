import './styles.scss'
import React, {useEffect, useRef, useState} from "react";
import {dateToDMY, differenceInDaysWithToday, getDimensions} from "../../const";
import {ITask} from "../../../../DB/db";
import {theme} from "../../../../assets/colors";
import {useTheme} from "../../../../context/themeProvider";
import {useData} from "../../../../context/dataContext";

const OverdueTasks = () => {
  const [overdueScale, setOverdueScale] = useState<number>(1)
  const [tasksArr, setTasksArr] = useState<ITask[]>([{
    id: 0,
    task: 'string',
    deadline: 0,
    employee: {
      fullName: 'string',
      name: 'string',
      id: 0,
      workload: 0,
      avgDays: 0
    },
    isCompleted: false
  }])
  const {currentTheme} = useTheme()
  const {DBData} = useData()
  const overdueRef = useRef<HTMLDivElement>(null);
  const handleResize = () => {
    const [width, height] = getDimensions(overdueRef);

    setOverdueScale((Math.min(width, height) / 140));
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (overdueRef.current) {
      resizeObserver.observe(overdueRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (DBData) setTasksArr(Object.values(DBData.tasks))
  }, [DBData]);

  return (
    <div className={'overdue__wrapper'} ref={overdueRef}
         style={{
           gap: `${overdueScale > 1.25 ? 4 * overdueScale : 4}px`,
           color: theme.dashboard.grid.widget.color[currentTheme],
           backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
         }}>
      <h3 className={'centered_title dragHandle'}
          style={{
            transform: `scale(${overdueScale > 1.25 ? overdueScale / 1.25 : 1})`,
            padding: `${overdueScale > 1.5 ? overdueScale * 4 / 1.5 : 0}px`
          }}>Overdue Tasks</h3>
      <div className={'overdue__table'}
           style={{fontSize: `${overdueScale >= 2.5 ? 16 : overdueScale > 1.5 ? 11 * (overdueScale / 1.5) : 11}px`}}>
        <ul className={'table__header'}>
          <li>Overdue</li>
          <li>Tasks</li>
          <li>Deadline</li>
          <li>Employee</li>
        </ul>
        <div className={'table__body'}
             style={{
               fontSize: `${overdueScale >= 2.5 ? 16 : overdueScale > 1.5 ? 11 * (overdueScale / 1.5) : 11}px`,
             }}>
          {tasksArr.every(task => differenceInDaysWithToday(task.deadline) === 0)
            ? <div className={'goodNews'}> not a single task is overdue </div>
            : tasksArr.map((task) => (
                <div className={'table__row'} key={task.employee.id}>
                  <div
                    className={`days ${differenceInDaysWithToday(task.deadline) < 7 ? 'days_lite'
                      : differenceInDaysWithToday(task.deadline) <= 14 ? 'days_med' : 'days_high'}`}>
                    <div className={'indicator'} content={''}/>
                    {differenceInDaysWithToday(task.deadline)} days
                  </div>
                  <div>{task.task}</div>
                  <div>{dateToDMY(task.deadline)}</div>
                  <div>{task.employee.fullName ? task.employee.fullName : task.employee.name}</div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  )
}
export default OverdueTasks


import './styles.scss'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {format} from "date-fns";
import {IWidgetEl} from "../../interfaces";
import {palette, theme} from "../../../../assets/colors";
const OverdueTasks = ({currentTheme}:IWidgetEl) => {
    const [overdueScale, setOverdueScale]=useState(1)
    const [tasks, setTasks] = useState([{
        task: 'status upd for board',
        deadline: format(new Date(946681261001), "dd.MM.yyyy"),
        days: 0,
        employee: 'employee',
        employeeId: 0,
        employeeShort: 'emp'
    }])
    const overdueRef = useRef<HTMLDivElement>(null);
    const getDimensions = () => {
        if (overdueRef.current) {
            const { width, height } = overdueRef.current.getBoundingClientRect();
            
            return [width, height];
        } return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();
        
        setOverdueScale((Math.min(width, height)/140));
    };
    useEffect(() => {
        handleResize();
        fetch('/db/overdueDB/tasks')
            .then((response) => response.json())
            .then((response) => {
                setTasks(response.overTasks)
            })
        const resizeObserver = new ResizeObserver(handleResize);
        if (overdueRef.current) {
            resizeObserver.observe(overdueRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    const themeFontColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black;
    }, [currentTheme]);
    const themeBackgroundColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.BGColor[currentTheme] : palette.white;
    }, [currentTheme]);
        return (
        <div className={'overdue__wrapper'} ref={overdueRef}
             style={{
                 gap: `${overdueScale > 1.25 ? 4 * overdueScale : 4}px`,
                 backgroundColor:themeBackgroundColor,
                 color:themeFontColor,
             }}>
            <h3 className={'centered_title dragHandle'}
                style={{
                    transform: `scale(${overdueScale > 1.25 ? overdueScale/1.25 : 1})`,
                    padding: `${overdueScale > 1.5 ? overdueScale * 4 / 1.5 : 0}px`
            }}>Overdue Tasks</h3>
            <div className={'overdue__table'} style={{ fontSize: `${overdueScale >= 2.5 ? 16 : overdueScale > 1.5 ? 11 * (overdueScale / 1.5) : 11}px`}}>
                <div className={'table__header'} >
                    <div>Overdue</div>
                    <div>Tasks</div>
                    <div>Deadline</div>
                    <div>Employee</div>
                </div>
                <div className={'table__body' }
                     style={{
                         fontSize: `${overdueScale >= 2.5 ? 16 : overdueScale > 1.5 ? 11 * (overdueScale / 1.5) : 11}px`,
                     }}>
                    {tasks.every(task => task.days === 0)
                        ? <div className={'goodNews'}> not a single task is overdue </div>
                        : tasks.map((task) =>  (
                            <div className={'table__row'} key={task.employeeId} >
                                <div
                                    className={`days ${task.days < 7 ? 'days_lite' : task.days <= 14 ? 'days_med' : 'days_high'}`}>
                                    <div className={'indicator'} content={''}/>
                                    {task.days} days
                                </div>

                                <div>{task.task}</div>
                                <div>{task.deadline}</div>
                                <div>{task.employee}</div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
export default OverdueTasks


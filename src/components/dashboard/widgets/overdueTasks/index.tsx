import './styles.scss'
import React, {useEffect, useRef, useState} from "react";
import {format} from "date-fns";
import {IWidgetEl} from "../../interfaces";
import {dateToDMY, differenceInDaysWithToday, localDateTimestampMS, tasksInOverdue} from "../../const";
import {IEmployee, ITask} from "../../../../DB/db";

const OverdueTasks = ({themeFontColor, themeBackgroundColor, DBData}: IWidgetEl) => {
    const [overdueScale, setOverdueScale] = useState(1)
    const [tasks, setTasks] = useState<ITask[]>([{
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
    const overdueRef = useRef<HTMLDivElement>(null);
    const getDimensions = () => {
        if (overdueRef.current) {
            const {width, height} = overdueRef.current.getBoundingClientRect();
            return [width, height];
        }
        return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();

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
        if (DBData) setTasks(tasksInOverdue(DBData))
    }, [DBData]);

    return (
        <div className={'overdue__wrapper'} ref={overdueRef}
             style={{
                 gap: `${overdueScale > 1.25 ? 4 * overdueScale : 4}px`,
                 backgroundColor: themeBackgroundColor,
                 color: themeFontColor,
             }}>
            <h3 className={'centered_title dragHandle'}
                style={{
                    transform: `scale(${overdueScale > 1.25 ? overdueScale / 1.25 : 1})`,
                    padding: `${overdueScale > 1.5 ? overdueScale * 4 / 1.5 : 0}px`
                }}>Overdue Tasks</h3>
            <div className={'overdue__table'}
                 style={{fontSize: `${overdueScale >= 2.5 ? 16 : overdueScale > 1.5 ? 11 * (overdueScale / 1.5) : 11}px`}}>
                <div className={'table__header'}>
                    <div>Overdue</div>
                    <div>Tasks</div>
                    <div>Deadline</div>
                    <div>Employee</div>
                </div>
                <div className={'table__body'}
                     style={{
                         fontSize: `${overdueScale >= 2.5 ? 16 : overdueScale > 1.5 ? 11 * (overdueScale / 1.5) : 11}px`,
                     }}>
                    {tasks.every(task => differenceInDaysWithToday(task.deadline) === 0)
                        ? <div className={'goodNews'}> not a single task is overdue </div>
                        : tasks.map((task) => (
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


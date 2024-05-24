import './styles.scss'
import {ConfigProvider, Progress} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {dateToDMY, strokeColor, tasksUpcoming} from "../../const";
import {IWidgetEl} from "../../interfaces";
import {ITask} from "../../../../DB/db";
const UpcTasks = ({themeFontColor, themeBackgroundColor, DBData}: IWidgetEl) => {
    const [upcomingScale, setUpcomingScale] = useState(1)
    const upcomingRef = useRef<HTMLDivElement>(null);
    const [tasks, setTasks] = useState<ITask[]>([],)
    const getDimensions = () => {
        if (upcomingRef.current) {

            const {width, height} = upcomingRef.current.getBoundingClientRect();
            return [width, height];
        }
        return [0, 0];
    };
    const handleResize = () => {

        const [width, height] = getDimensions();
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
        if (DBData){
            setTasks(tasksUpcoming(DBData))
        }
    }, [DBData]);
    return <div className={'upcoming__wrapper'} ref={upcomingRef}
                style={{
                    gap: `${upcomingScale > 1.25 ? 4 * upcomingScale : 4}px`,
                    backgroundColor: themeBackgroundColor,
                    color: themeFontColor,
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

                {tasks.every(task => task.isCompleted)
                    ? <div className={'goodNews'}> all tasks completed </div>
                    : tasks.map((task) => <div className={'table__row'} key={`${task.task}${task.id}`}>
                            <div className={'el'}>{task.employee.name}</div>
                            <div className={'el'}>{task.task}</div>
                            <div className={'el'}>{dateToDMY(task.deadline)}</div>
                            <div className={'el'}><ConfigProvider
                                theme={{
                                    components: {
                                        Progress: {
                                            fontSize: upcomingScale >= 2.5 ? 16 : upcomingScale > 1.5 ? 11 * (upcomingScale / 1.5) : 11,
                                            fontSizeSM: upcomingScale >= 2.5 ? 16 : upcomingScale > 1.5 ? 11 * (upcomingScale / 1.5) : 11,
                                            colorText: themeFontColor,
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

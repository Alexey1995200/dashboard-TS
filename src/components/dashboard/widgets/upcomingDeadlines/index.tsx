import './styles.scss'
import {ConfigProvider, Progress} from "antd";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {strokeColor} from "../../const";
import {palette, theme} from "../../../../assets/colors";
import {IWidgetEl} from "../../interfaces";
const UpcTasks = ({currentTheme}: IWidgetEl) => {
    const [upcomingScale, setUpcomingScale] = useState(1)
    const upcomingRef = useRef<HTMLDivElement>(null);
    const [tasks, setTasks] = useState([{
        employee: 'employee',
        employeeId: 0,
        task: 'task',
        deadline: 'string',
        workload: 100
    }],)
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
        fetch('db/upcDeadlinesDB/tasks')
            .then((response) => response.json())
            .then((response) => {
                setTasks(response.upcTasks)
            })
        const resizeObserver = new ResizeObserver(handleResize);
        if (upcomingRef.current) {
            resizeObserver.observe(upcomingRef.current);
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

                {tasks.every(task => task.workload === 100)
                    ? <div className={'goodNews'}> all tasks completed </div>
                    : tasks.map((task) => <div className={'table__row'} key={task.employeeId}>
                            <div className={'el'}>{task.employee}</div>
                            <div className={'el'}>{task.task}</div>
                            <div className={'el'}>{task.deadline}</div>
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
                            ><Progress percent={task.workload} strokeColor={strokeColor} size={"small"}/>
                            </ConfigProvider>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    </div>
}
export default UpcTasks

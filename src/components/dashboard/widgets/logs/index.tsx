import {comment, copy, priority, tag, update, alert, checked} from "../../../../assets/svg";
import './styles.scss'
import {getTime} from "date-fns";
import {useEffect, useMemo, useRef, useState} from "react";
import {palette, theme} from "../../../../assets/colors";
import {IWidgetEl} from "../../interfaces";


interface ILog {
    type: string,
    user: string,
    date: number,
    recordNum: number,
    task: string,
}

interface ILogs {
    log: ILog
}

const LOG_TYPES = {
    ASSIGNED: "ASSIGNED",
    PRIORITY_CHANGE: "PRIORITY_CHANGE",
    SUBTASK: "SUBTASK",
    UPDATE: "UPDATE",
    OVERDUE: "OVERDUE",
    COMMENT: "COMMENT",
    FINISHED: "FINISHED",
}

const LOG_ICONS_MAPPING = {
    [LOG_TYPES.ASSIGNED]: tag,
    [LOG_TYPES.PRIORITY_CHANGE]: priority,
    [LOG_TYPES.SUBTASK]: copy,
    [LOG_TYPES.UPDATE]: update,
    [LOG_TYPES.OVERDUE]: alert,
    [LOG_TYPES.COMMENT]: comment,
    [LOG_TYPES.FINISHED]: checked,


}

const LOG_TITLE_MAPPING = {
    [LOG_TYPES.ASSIGNED]: "Task Assigned",
    [LOG_TYPES.PRIORITY_CHANGE]: "Task Priority Changed",
    [LOG_TYPES.SUBTASK]: "New SubTask",
    [LOG_TYPES.UPDATE]: "Task Updated",
    [LOG_TYPES.OVERDUE]: "Task Overdue",
    [LOG_TYPES.COMMENT]: "New Comment",
    [LOG_TYPES.FINISHED]: "Task Finished",
}

const AssignedLog = ({log}: ILogs) => `Task ${log.task} assigned to ${log.user}`
const PriorityChange = ({log}: ILogs) => `${log.task} overdue is High, Priority of task changed`
const NewSubTask = ({log}: ILogs) => `New subtask added to task ${log.task} by ${log.user}`
const UpdateTask = ({log}: ILogs) => `Task ${log.task} updated by ${log.user}`
const OverdueTask = ({log}: ILogs) => `Task ${log.task} is overdue`
const NewComment = ({log}: ILogs) => `${log.user} commented on task ${log.task}`
const FinishedTask = ({log}: ILogs) => `${log.user} commented on task ${log.task}`

const LOG_DESCRIPTION_COMPONENTS_MAPPING = {
    [LOG_TYPES.ASSIGNED]: AssignedLog,
    [LOG_TYPES.PRIORITY_CHANGE]: PriorityChange,
    [LOG_TYPES.SUBTASK]: NewSubTask,
    [LOG_TYPES.UPDATE]: UpdateTask,
    [LOG_TYPES.OVERDUE]: OverdueTask,
    [LOG_TYPES.COMMENT]: NewComment,
    [LOG_TYPES.FINISHED]: FinishedTask,
}
const ProjectLogs = ({currentTheme}: IWidgetEl) => {
    const [logs, setLogs] = useState([])
    const [user, setUser] = useState([])
    const [isAllLogsShown, setIsAllLogsShown] = useState(false);
    const showAllLogs = () => {
        setIsAllLogsShown(!isAllLogsShown);
    };
    const shownLogs = isAllLogsShown ? logs : logs.slice(-3);
    useEffect(() => {
        fetch('db/logs/users')
            .then((response) => response.json())
            .then((response) => {
                setUser(response.users)
            })
        fetch('db/logs/')
            .then((response) => response.json())
            .then((response) => {
                setLogs(response.logs)
            })
    }, []);
    const LogContentComponent = (logs: ILogs): string => {
        const logTextBuilder = LOG_DESCRIPTION_COMPONENTS_MAPPING[logs.log.type]
        return (
            logTextBuilder(logs)
        )
    }
    const daysLeft = (timestamp: number) => Math.floor((localtimestamp - timestamp) / (1000 * 60 * 60 * 24))
    const localDate = new Date();
    const localtimestamp = getTime(localDate)
    const [logBuilderScale, setLogBuilderScale] = useState(1)
    const logBuilderRef = useRef<HTMLDivElement>(null);
    const getDimensions = () => {
        if (logBuilderRef.current) {
            const {width, height} = logBuilderRef.current.getBoundingClientRect();
            return [width, height];
        }
        return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();
        setLogBuilderScale((Math.min(width, height) / 120));
    };
    useEffect(() => {
        handleResize();
        const resizeObserver = new ResizeObserver(handleResize);
        if (logBuilderRef.current) {
            resizeObserver.observe(logBuilderRef.current);
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
        <div className={'logBuilder'} ref={logBuilderRef} style={{
            backgroundColor: themeBackgroundColor,
            color: themeFontColor
        }}>
            <div className={'centered_title dragHandle'}
                 style={{
                     transform: `scale(${logBuilderScale > 1.25 ? logBuilderScale / 1.25 : 1})`,
                     padding: `${logBuilderScale > 1.5 ? logBuilderScale * 8 / 1.5 : 0}px`
                 }}
            >Project Logs
            </div>
            <div className={'logBuilder__body'}>
                <div className={'logs__el'}>
                    {(logs.length === 0) ? <div className={'goodNews'} style={{color: 'black'}}> Log is empty </div>
                        : shownLogs.map((log: ILog) => (
                            <div className={'logs__el_wrapper'}
                                 style={{
                                     fontSize: `${logBuilderScale > 3 ? logBuilderScale * 8 / 2 : 12}px`
                                 }}
                                 key={log.recordNum}>
                                <img
                                    src={LOG_ICONS_MAPPING[log.type]}
                                    className={'el__ico'}
                                    alt={''}
                                    style={{
                                        backgroundColor: themeBackgroundColor,
                                        border: `2px solid ${themeBackgroundColor}`,
                                    }}
                                />
                                <div className={'el__upper'}>
                                    <div className={'el__title'}>
                                        {LOG_TITLE_MAPPING[log.type]}
                                    </div>
                                    <div className={'el__days'}
                                         style={{
                                             fontSize: `${logBuilderScale > 3 ? logBuilderScale * 8 / 2 : 8}px`
                                         }}>{daysLeft(log.date)} days
                                    </div>
                                </div>
                                <div className={'el__text'}>
                                    <p>
                                        {LogContentComponent({log})}
                                    </p>
                                </div>
                            </div>
                        ))

                    }

                </div>
            </div>
            {(logs.length > 0) &&
                <div onClick={showAllLogs} className={'logs__button'}>
                    {isAllLogsShown ? 'Show Last 3 Logs' : 'View All Logs'}
                </div>
            }
        </div>)
}
export default ProjectLogs
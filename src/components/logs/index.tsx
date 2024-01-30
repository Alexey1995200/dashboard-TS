// @ts-nocheck
import {comment, copy, priority, tag, update, alert, checked} from "../../assets/svg";
import './styles.scss'
import {format, getTime} from "date-fns";
import {useEffect, useRef, useState} from "react";
import OverdueTasks from "../overdueTasks";

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

const AssignedLog = ({log}) => `Task ${log.task} assigned to ${log.user}`
const PriorityChange = ({log}) => `${log.task} overdue is High, Priority of task changed`
const NewSubTask = ({log}) => `New subtask added to task ${log.task} by ${log.user}`
const UpdateTask = ({log}) => `Task ${log.task} updated by ${log.user}`
const OverdueTask = ({log}) => `Task ${log.task} is overdue`
const NewComment = ({log}) => `${log.user} commented on task ${log.task}`
const FinishedTask = ({log}) => `${log.user} commented on task ${log.task}`

const LOG_DESCRIPTION_COMPONENTS_MAPPING = {
    [LOG_TYPES.ASSIGNED]: AssignedLog,
    [LOG_TYPES.PRIORITY_CHANGE]: PriorityChange,
    [LOG_TYPES.SUBTASK]: NewSubTask,
    [LOG_TYPES.UPDATE]: UpdateTask,
    [LOG_TYPES.OVERDUE]: OverdueTask,
    [LOG_TYPES.COMMENT]: NewComment,
    [LOG_TYPES.FINISHED]: FinishedTask,
}

const users = [
    {
        name: 'Bill Gates',
        id: 0
    }, {
        name: 'Steven Jobs',
        id: 1
    }, {
        name: 'Stephan Wozniak',
        id: 2
    }, {
        name: 'Mark Zuckerberg',
        id: 3
    },
]

const logs = [
    {
        type: LOG_TYPES.SUBTASK,
        user: users[0].name,
        date: 1704103200000,
        recordNum: 0,
        task: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    }, {
        type: LOG_TYPES.ASSIGNED,
        user: users[1].name,
        date: 1704103200000,
        recordNum: 1,
        task: 'task1',
    }, {
        type: LOG_TYPES.PRIORITY_CHANGE,
        user: users[0].name,
        date: 1704189600000,
        recordNum: 2,
        task: 'Tsk {2}',
    }, {
        type: LOG_TYPES.SUBTASK,
        user: users[2].name,
        date: 1704276000000,
        recordNum: 3,
        task: 'tsk3',
    }, {
        type: LOG_TYPES.UPDATE,
        user: users[3].name,
        date: 1704448800000,
        recordNum: 4,
        task: 'Task4',
        img: update,
    }, {
        type: LOG_TYPES.OVERDUE,
        user: users[3].name,
        date: 1704535200000,
        recordNum: 5,
        task: 'Ta5k',
    }, {
        type: LOG_TYPES.COMMENT,
        user: users[2].name,
        date: 1704708000000,
        recordNum: 6,
        task: '6Task',
    }, {
        type: LOG_TYPES.FINISHED,
        user: users[0].name,
        date: 1704794400000,
        recordNum: 7,
        text: '7ask',
    },
]

// <Logg user={user} log={log} />

const LogBuilder = (props) => {
    const [log, setLog] = useState(logs)
    const [isAllLogsShown, setIsAllLogsShown] = useState(false);
    const showAllLogs = () => {
        setIsAllLogsShown(!isAllLogsShown);
    };
    const shownLogs = isAllLogsShown ? log : log.slice(-3);
    // useEffect(() => {
    //     fetch('db/logs/log')
    //         .then((response) => response.json())
    //         .then((response) => {
    //             setLog(response.log)
    //         })
    // }, []);
    const LogContentComponent = (props) => {
        console.log('clogg', props.log)
        const logTextBuilder = LOG_DESCRIPTION_COMPONENTS_MAPPING[props.log.type]
        return (
            logTextBuilder(props)
        )
    }
    const LogComponent = () => {
        // return(
        //     <div className={'logs__el_wrapper'} key={log.recordNum}>
        //         <img src={LOG_ICONS_MAPPING[log.type]} className={'el__ico'} alt={''}/>
        //         <div className={'el__upper'}>
        //             <div className={'el__title'}>
        //                 {LOG_TITLE_MAPPING[log.type]}
        //             </div>
        //             <div className={'el__days'}>{daysLeft(log.date)}</div>
        //         </div>
        //         <div className={'el__text'}>
        //             <LogContentComponentn  />
        //         </div>
        //     </div>
        // )
    }
    const daysLeft = (timestamp: number) => Math.floor((localtimestamp - timestamp) / (1000 * 60 * 60 * 24))
    const localDate = new Date();
    const localtimestamp = getTime(localDate)

    const [logBuilderScale, setLogBuilderScale] = useState(1)
    const logBuilderRef = useRef<HTMLDivElement>(null);
    const getDimensions = () => {
        if (logBuilderRef.current) {
            const {width, height} = logBuilderRef.current.getBoundingClientRect();
            console.log('debug ', width, height)
            return [width, height];
        }
        return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();
        console.log(width, height)
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


    return <div className={'logBuilder'} ref={logBuilderRef}>
        <div className={'default_dashboard_title dragHandle'}

             style={{
                 transform: `scale(${logBuilderScale > 1.25 ? logBuilderScale / 1.25 : 1})`,
                 padding: `${logBuilderScale > 1.5 ? logBuilderScale * 8 / 1.5 : 0}px`
             }}
        >Project Logs
        </div>
        <div className={'logBuilder__body'}>
            <div className={'logs__el'}>
                {(log.length === 0) ? <div className={'goodNews'} style={{color: 'black'}}> Log is empty </div>
                    : shownLogs.map((log) => (
                        <div className={'logs__el_wrapper'}
                             style={{
                                 fontSize: `${logBuilderScale > 3 ? logBuilderScale * 8 / 2 : 12}px`
                             }}
                             key={log.recordNum}>
                            <img src={LOG_ICONS_MAPPING[log.type]} className={'el__ico'} alt={''}/>
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
                                <LogContentComponent
                                    log={log}

                                    {...props}
                                />
                            </div>
                        </div>
                    ))

                }

            </div>
            {(log.length > 0) ?
                <div onClick={showAllLogs} className={'logs__button'}>
                    {isAllLogsShown ? 'Show Last 3 Logs' : 'View All Logs'}
                </div>
                : <div/>
            }
        </div>
    </div>
}




// map((log) => {
//   return (
//       <LogComponent
//           {...log}
//       />
//   )
// })
//


export default LogBuilder
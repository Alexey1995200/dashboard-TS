import {comment, copy, priority, tag, update, alert, checked} from "../../assets/svg";
import './styles.scss'
import {format, getTime} from "date-fns";
import {useEffect, useRef, useState} from "react";

interface ILog {
    type: string,
    text: string,
    img: string,
    user: string;
    date: number,
    recordNum: number
}

const logTypes = [
    {
        id: 0,
        type: 'Task Assigned',
        img: tag,
        text: 'Task {log.task} assigned to {log.user}',
    }, {
        id: 1,
        type: 'Task Priority Changed',
        text: '{log.task} overdue is High, Priority of task changed',
        img: priority,
    }, {
        id: 2,
        type: 'New SubTask',
        text: 'New subtask added to task {log.task} by {log.user}',
        img: copy,
    }, {
        id: 3,
        type: 'Task Updated',
        text: 'Task {log.task} updated by {log.user}',
        img: update,
    }, {
        id: 4,
        type: 'Task Overdue',
        text: 'Task {log.task} is overdue',
        img: alert,
    }, {
        id: 5,
        type: 'New Comment',
        text: '{log.user} commented on task {log.task}',
        img: comment,
    }, {
        id: 6,
        type: 'Task Finished',
        text: '{log.user} finished task {log.task}',
        img: checked,
    },


]


// function replaceWithValues(template) {
//     const dataSource = {
//         task,
//         user
//     }
//     // 0. go with while loop
//     // 1. get with regex templates
// //     2. split by .
// //     3. replace() dataSource[arr[0]][arr[1]]
// }

const localDate = new Date();
const localtimestamp = getTime(localDate)
const ProjectLogs = () => {

    const [isAllLogsShown, setIsAllLogsShown] = useState(false);
    const [log, setLog] = useState([{
        type: 'string',
        user: 'string',
        date: 0,
        recordNum: 0,
        img: 'string',
        text: 'string',
    }])
    const showAllLogs = () => {
        setIsAllLogsShown(!isAllLogsShown);
    };

    const shownLogs = isAllLogsShown ? log : log.slice(-3);

    const daysLeft = (timestamp: number) => Math.floor((localtimestamp - timestamp) / (1000 * 60 * 60 * 24))

    const [logsScale, setLogsScale] = useState(1)
    const logsRef = useRef<HTMLDivElement>(null);
    const getDimensions = () => {
        if (logsRef.current) {
            const {width, height} = logsRef.current.getBoundingClientRect();

            return [width, height];
        }
        return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();

        setLogsScale((Math.min(width, height) / 120));
    };

    useEffect(() => {
        handleResize();
        fetch('db/logs/log')
            .then((response) => response.json())
            .then((response) => {
                setLog(response.log)
            })
        const resizeObserver = new ResizeObserver(handleResize);
        if (logsRef.current) {
            resizeObserver.observe(logsRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);


    return (
        <div className={'logs__wrapper'} ref={logsRef}>
            <div className={'default_dashboard_title logs__title dragHandle'}
                 style={{
                     transform: `scale(${logsScale > 1.25 ? logsScale / 1.25 : 1})`,
                     padding: `${logsScale > 1.5 ? logsScale * 8 / 1.5 : 0}px`
                 }}
            >Project Logs
            </div>
            <div className={'logs__list'}>
                {shownLogs.map((log) => {
                        return (
                            <div className={'logs__el'} key={log.recordNum}>
                                <div className={'el__header'}>
                                    <div className={'img'}><img className={'ico'} src={log.img} alt={'img'}/></div>
                                    <div className={'header__title'}>
                                        <div className={'title__text'}>{log.type}</div>
                                        <div className={'title__days'}>{daysLeft(log.date)} days</div>
                                    </div>
                                </div>
                                <div className={'el__body'}>
                                    <div content={''} className={'body__line_placeholder'}>
                                        <div className={'body__line'}/>
                                    </div>
                                    <div className={'body__text'}>{log.text}</div>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
            <div onClick={showAllLogs} className={'logs__button'}>
                {isAllLogsShown ? 'Show Last 3 Logs' : 'View All Logs'}
            </div>
        </div>
    )
}

export default ProjectLogs
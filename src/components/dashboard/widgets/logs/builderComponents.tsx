import {copy, priority, tag, update, alert, comment, checked} from "../../../../assets/svg";

export interface ILog {
    type: string,
    user: string,
    date: number,
    recordNum: number,
    task: string,
}
export interface ILogs {
    log: ILog
}
export const LOG_TYPES = {
    ASSIGNED: "ASSIGNED",
    PRIORITY_CHANGE: "PRIORITY_CHANGE",
    SUBTASK: "SUBTASK",
    UPDATE: "UPDATE",
    OVERDUE: "OVERDUE",
    COMMENT: "COMMENT",
    FINISHED: "FINISHED",
}
export const LOG_ICONS_MAPPING = {
    [LOG_TYPES.ASSIGNED]: tag,
    [LOG_TYPES.PRIORITY_CHANGE]: priority,
    [LOG_TYPES.SUBTASK]: copy,
    [LOG_TYPES.UPDATE]: update,
    [LOG_TYPES.OVERDUE]: alert,
    [LOG_TYPES.COMMENT]: comment,
    [LOG_TYPES.FINISHED]: checked,
}
export const LOG_TITLE_MAPPING = {
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

export const LOG_DESCRIPTION_COMPONENTS_MAPPING = {
    [LOG_TYPES.ASSIGNED]: AssignedLog,
    [LOG_TYPES.PRIORITY_CHANGE]: PriorityChange,
    [LOG_TYPES.SUBTASK]: NewSubTask,
    [LOG_TYPES.UPDATE]: UpdateTask,
    [LOG_TYPES.OVERDUE]: OverdueTask,
    [LOG_TYPES.COMMENT]: NewComment,
    [LOG_TYPES.FINISHED]: FinishedTask,
}
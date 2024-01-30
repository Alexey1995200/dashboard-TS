import {alert, checked, comment, copy, priority, tag, update} from "../assets/svg";


const LOG_TYPES = {
    ASSIGNED: "ASSIGNED",
    PRIORITY_CHANGE: "PRIORITY_CHANGE",
    SUBTASK: "SUBTASK",
    UPDATE: "UPDATE",
    OVERDUE: "OVERDUE",
    COMMENT: "COMMENT",
    FINISHED: "FINISHED",
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

export {logs, users}
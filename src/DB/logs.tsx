import {alert, checked, comment, copy, priority, tag, update} from "../assets/svg";

const log = [
    {
        type: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
        user: 'User{0}',
        date: 1704103200000,
        recordNum: 0,
        img: comment,
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    },{
        type: 'Task Assigned',
        user: 'User{1}',
        date: 1704103200000,
        recordNum: 1,
        img: tag,
        text: 'Task {log.task} assigned to {log.user}',
    }, {
        type: 'Task Priority Changed',
        user: 'User{2}',
        date: 1704189600000,
        recordNum: 2,
        text: '{log.task} overdue is High, Priority of task changed',
        img: priority,
    }, {
        type: 'New SubTask',
        user: 'User{3}',
        date: 1704276000000,
        recordNum: 3,
        text: 'New subtask added to task {log.task} by {log.user}',
        img: copy,
    }, {
        type: 'Task Updated',
        user: 'User{4}',
        date: 1704448800000,
        recordNum: 4,
        text: 'Task {log.task} updated by {log.user}',
        img: update,
    }, {
        type: 'Task Overdue',
        user: 'User{5}',
        date: 1704535200000,
        recordNum: 5,
        text: 'Task {log.task} is overdue',
        img: alert,
    }, {
        type: 'New Comment',
        user: 'User{6}',
        date: 1704708000000,
        recordNum: 6,
        text: '{log.user} commented on task {log.task}',
        img: comment,
    }, {
        type: 'Task Finished',
        user: 'User{7}',
        date: 1704794400000,
        recordNum: 7,
        text: '{log.user} finished task {log.task}',
        img: checked,
    },
]

export {log}
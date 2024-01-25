import {format} from "date-fns";

const localDate: Date = new Date()
const localDateTimestamp: number = new Date().getTime()
let dealine: Date = new Date(localDate)
let deadlineTimestamp: number = dealine.getTime();

const overTasks = [
    {
        task: 'status upd for board',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        days: Math.floor((deadlineTimestamp - localDateTimestamp) / (1000 * 60 * 60 * 24)),
        employee: 'Paula',
        employeeId: 0,
        employeeShort: 'Paola'
    }, {
        task: 'finish UX optimization',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 4 * 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        days: Math.floor((deadlineTimestamp - localDateTimestamp) / (1000 * 60 * 60 * 24)),
        employee: 'Catherine',
        employeeId: 1,
        employeeShort: 'Kate'
    }, {
        task: 'configure mobile view',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 10 * 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        days: Math.floor((deadlineTimestamp - localDateTimestamp) / (1000 * 60 * 60 * 24)),
        employee: 'Nancy',
        employeeId: 2,
        employeeShort: 'Nancy'
    }, {
        task: 'ralational db connections',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 24 * 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        days: Math.floor((deadlineTimestamp - localDateTimestamp) / (1000 * 60 * 60 * 24)),
        employee: 'Georg',
        employeeId: 3,
        employeeShort: 'Geo'
    }, {
        task: 'The Task is Veeeeeeeeeeeeeeeeeeeeeeeeery Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong to describe in this area',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 69 * 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        days: Math.floor((deadlineTimestamp - localDateTimestamp) / (1000 * 60 * 60 * 24)),
        employee: 'Tester',
        employeeId: 4,
        employeeShort: 'Test'
    }
]

export {overTasks}
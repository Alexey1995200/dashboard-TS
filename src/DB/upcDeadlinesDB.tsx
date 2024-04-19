import {format} from "date-fns";

const localDate: Date = new Date()
const localDateTimestamp: number = new Date().getTime()
let dealine: Date = new Date(localDate)
let deadlineTimestamp: number = dealine.getTime();

const upcTasks = [
    {
        employee: 'Catherine',
        employeeId: 0,
        task: 'Interactive Dashboard features',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 4 * 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        workload: 34
    }, {
        employee: 'Georg',
        employeeId: 1,
        task: 'FB api connect',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 24 * 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        workload: 56
    }, {
        employee: 'Nancy',
        employeeId: 2,
        task: 'Set-UP test environment',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 10000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        workload: 15
    }, {
        employee: 'Paula',
        employeeId: 3,
        task: 'finalize testing plan',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        workload: 11
    }, {
        employee: 'Tester',
        employeeId: 4,
        task: 'The Task is Veeeeeeeeeeeeeeeeeeeeeeeeery Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong to describe in this area',
        deadline: format(new Date(deadlineTimestamp = (localDate.getTime() + 95 * 1000 * 60 * 60 * 24)), "dd.MM.yyyy"),
        workload: 69
    },
]

export {upcTasks}
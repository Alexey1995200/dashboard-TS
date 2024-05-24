import {palette} from "../assets/colors";
import {ILog} from "../components/dashboard/widgets/logs/builderComponents";

export interface IEmployee {
    fullName?: string,
    name: string,
    id?: number,
    workload?: number,
    avgDays?: number,
    role?: string
}

export interface ITask {
    id: number,
    task: string,
    deadline: number,
    employee: IEmployee,
    isCompleted: boolean
}

export interface IBudgetData {
    id: number,
    type: string,
    text: string,
    value: number,
    color: string
}

const localDateTimeStamp: number = new Date().getTime()
const finishProjectTimestampMS = 1735682399000
const localDateTimestamp: number = new Date().getTime()
export type employee = Record<string, IEmployee>


const LOG_TYPES = {
    ASSIGNED: "ASSIGNED",
    PRIORITY_CHANGE: "PRIORITY_CHANGE",
    SUBTASK: "SUBTASK",
    UPDATE: "UPDATE",
    OVERDUE: "OVERDUE",
    COMMENT: "COMMENT",
    FINISHED: "FINISHED",
}

const employees: employee = {
    alex: {
        name: 'Alex',
        fullName:'Oleksii',
        id: 0,
        workload: 100,
        role: 'projectLeader'
    },
    paula: {
        name: 'Paula',
        id: 1,
        workload: 11,
        avgDays: 7.7
    },
    kate: {
        fullName: 'Catherine',
        name: 'Kate',
        id: 2,
        workload: 15,
        avgDays: 4.5
    },
    nancy: {
        name: 'Nancy',
        id: 3,
        workload: 67,
        avgDays: 3.7
    },
    georg: {
        fullName: 'Georgy',
        name: 'Georg',
        id: 4,
        workload: 56,
        avgDays: 5.3
    },
    test: {
        fullName: 'Tester',
        name: 'test',
        id: 5,
        workload: 95
    },
    richard: {
        name: 'Richard',
        id: 6,
        workload: 13,
        avgDays: 6.4
    },
    gates: {
        name: 'Bill Gates',
        id: 10
    }, jobs: {
        name: 'Steven Jobs',
        id: 11
    }, wozniak: {
        name: 'Stephan Wozniak',
        id: 12
    }, zuckerberg: {
        name: 'Mark Zuckerberg',
        id: 13
    },
}

export interface ITasksProgress {
    id: number;
    title: string;
    percentage: number;
}

export const tasksProgress: ITasksProgress[] = [
    {
        id: 0,
        title: "Planning",
        percentage: 100
    }, {
        id: 1,
        title: "Design",
        percentage: 95
    }, {
        id: 2,
        title: "Development",
        percentage: 86
    }, {
        id: 3,
        title: "Testing",
        percentage: 64
    }, {
        id: 4,
        title: "PreRelease",
        percentage: 0
    }
]

export const tasks: ITask[] = [
    {
        id: 0,
        task: 'status upd for board',
        deadline: localDateTimeStamp + 1000 * 60 * 60 * 24,
        employee: employees.paula,
        isCompleted: false
    }, {
        id: 1,
        task: 'finish UX optimization',
        deadline: localDateTimeStamp + 4 * 1000 * 60 * 60 * 24,
        employee: employees.kate,
        isCompleted: false
    }, {
        id: 2,
        task: 'configure mobile view',
        deadline: localDateTimeStamp + 10 * 1000 * 60 * 60 * 24,
        employee: employees.nancy,
        isCompleted: false
    }, {
        id: 3,
        task: 'relational db connections',
        deadline: localDateTimeStamp + 24 * 1000 * 60 * 60 * 24,
        employee: employees.georg,
        isCompleted: false
    }, {
        id: 4,
        task: 'The Task is Veeeeeeeeeeeeeeeeeeeeeeeeery Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong to describe in this area',
        employee: employees.test,
        deadline: localDateTimeStamp + 95 * 1000 * 60 * 60 * 24,
        isCompleted: false
    }, {
        id: 5,
        task: 'Interactive Dashboard features',
        deadline: localDateTimeStamp - 4 * 1000 * 60 * 60 * 24,
        employee: employees.kate,
        isCompleted: false
    }, {
        id: 6,
        task: 'FB api connect',
        deadline: localDateTimeStamp - 24 * 1000 * 60 * 60 * 24,
        employee: employees.georg,
        isCompleted: false
    }, {
        id: 7,
        task: 'Set-UP test environment',
        deadline: localDateTimeStamp - 100 * 60 * 60 * 24,
        employee: employees.nancy,
        isCompleted: false
    }, {
        id: 8,
        task: 'finalize testing plan',
        deadline: localDateTimeStamp - 96 * 60 * 60 * 24,
        employee: employees.paula,
        isCompleted: false
    }
]
export const budgetData = [
    {
        id: 1,
        type: 'Total Budget',
        text: 'Total Budget',
        value: 52000,
        color: palette.littleBlackDress
    },
    {
        id: 2,
        type: 'Budget AmountUsed',
        text: 'Budget AmountUsed',
        value: 42000,
        color: palette.freshGreen
    },
    {
        id: 3,
        type: 'Current Target Amount',
        text: 'Current Target Amount',
        value: 40000,
        color: palette.tangledWeb
    },
]

const logs = [
    {
        type: LOG_TYPES.SUBTASK,
        user: employees.gates.name,
        date: 1704103200000,
        recordNum: 0,
        task: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    }, {
        type: LOG_TYPES.ASSIGNED,
        user: employees.jobs.name,
        date: 1704103200000,
        recordNum: 1,
        task: 'task1',
    }, {
        type: LOG_TYPES.PRIORITY_CHANGE,
        user: employees.gates.name,
        date: 1704189600000,
        recordNum: 2,
        task: 'Tsk {2}',
    }, {
        type: LOG_TYPES.SUBTASK,
        user: employees.wozniak.name,
        date: 1704276000000,
        recordNum: 3,
        task: 'tsk3',
    }, {
        type: LOG_TYPES.UPDATE,
        user: employees.zuckerberg.name,
        date: 1704448800000,
        recordNum: 4,
        task: 'Task4',
    }, {
        type: LOG_TYPES.OVERDUE,
        user: employees.zuckerberg.name,
        date: 1704535200000,
        recordNum: 5,
        task: 'Ta5k',
    }, {
        type: LOG_TYPES.COMMENT,
        user: employees.wozniak.name,
        date: 1704708000000,
        recordNum: 6,
        task: '6Task',
    }, {
        type: LOG_TYPES.FINISHED,
        user: employees.gates.name,
        date: 1704794400000,
        recordNum: 7,
        task: '7ask',
    },
]
export const DB: IDB = {
    // localDateTimeStamp: localDateTimeStamp,
    finishProjectTimestampMS: finishProjectTimestampMS,
    startProjectTimestampMS: 1704103200000,
    serverTimestampMS: localDateTimestamp,
    employees: employees,
    tasks: tasks,
    tasksProgress: tasksProgress,
    budgetData: budgetData,
    logs:logs,
}

export interface IDB {
    // localDateTimeStamp?: number,
    startProjectTimestampMS: number,
    finishProjectTimestampMS: number,
    serverTimestampMS?: number,
    employees: Record<string, IEmployee>,
    tasks: ITask[],
    tasksProgress: ITasksProgress[],
    budgetData: IBudgetData[],
    logs:ILog[]
}

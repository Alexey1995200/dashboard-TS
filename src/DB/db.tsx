export interface IEmployee {
    fullName?: string,
    name: string,
    id: number,
    workload: number,
    avgDays?: number
}

export interface ITask {
    id: number,
    task: string,
    deadline: number,
    employee: IEmployee,
    isCompleted: boolean
}

const localDate: Date = new Date()
const finishProjectTimestampMS = 1735682399000
const finishDate: Date = new Date(finishProjectTimestampMS)
const isProjectOnTime = (): boolean => (finishProjectTimestampMS - new Date().getTime()) > 0
const localDateTimestamp: number = new Date().getTime()
export type employee = Record<string, IEmployee>

const employees: employee = {
    paula: {
        name: 'Paula',
        id: 0,
        workload: 11,
        avgDays: 7.7
    },
    kate: {
        fullName: 'Catherine',
        name: 'Kate',
        id: 1,
        workload: 15
    },
    nancy: {
        name: 'Nancy',
        id: 2,
        workload: 67
    },
    georg: {
        fullName: 'Georgy',
        name: 'Georg',
        id: 3,
        workload: 56
    },
    test: {
        fullName: 'Tester',
        name: 'test',
        id: 4,
        workload: 95
    }
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
        deadline: localDate.getTime() + 1000 * 60 * 60 * 24,
        employee: employees.paula,
        isCompleted: false
    }, {
        id: 1,
        task: 'finish UX optimization',
        deadline: localDate.getTime() + 4 * 1000 * 60 * 60 * 24,
        employee: employees.kate,
        isCompleted: false
    }, {
        id: 2,
        task: 'configure mobile view',
        deadline: localDate.getTime() + 10 * 1000 * 60 * 60 * 24,
        employee: employees.nancy,
        isCompleted: false
    }, {
        id: 3,
        task: 'relational db connections',
        deadline: localDate.getTime() + 24 * 1000 * 60 * 60 * 24,
        employee: employees.georg,
        isCompleted: false
    }, {
        id: 4,
        task: 'The Task is Veeeeeeeeeeeeeeeeeeeeeeeeery Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong to describe in this area',
        employee: employees.test,
        deadline: localDate.getTime() + 95 * 1000 * 60 * 60 * 24,
        isCompleted: false
    }, {
        id: 5,
        task: 'Interactive Dashboard features',
        deadline: localDate.getTime() + 4 * 1000 * 60 * 60 * 24,
        employee: employees.kate,
        isCompleted: false
    }, {
        id: 6,
        task: 'FB api connect',
        deadline: localDate.getTime() + 24 * 1000 * 60 * 60 * 24,
        employee: employees.georg,
        isCompleted: false
    }, {
        id: 7,
        task: 'Set-UP test environment',
        deadline: localDate.getTime() + 10000 * 60 * 60 * 24,
        employee: employees.nancy,
        isCompleted: false
    }, {
        id: 8,
        task: 'finalize testing plan',
        deadline: localDate.getTime() + 1000 * 60 * 60 * 24,
        employee: employees.paula,
        isCompleted: false
    }
]

export const DB = {qwe:'qwerty'}

// export const DB:IDB = {
//     localDate: localDate,
//     finishProjectTimestampMS: finishProjectTimestampMS,
//     finishDate: finishDate,
//     // isProjectOnTime: () => (finishProjectTimestampMS - new Date().getTime()) > 0,      //todo to front
//     serverTimestamp: localDateTimestamp,
//     employees: employees,
//     tasks: tasks,
//     tasksProgress: tasksProgress
// }
export interface IDB {
    localDate?:Date,
    finishDate?:Date,
    finishProjectTimestampMS:number,
    serverTimestamp?:number,
    employees: Record<string, IEmployee>,
    tasks: ITask[],
    tasksProgress: ITasksProgress[],
}

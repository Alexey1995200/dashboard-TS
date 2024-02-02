// @ts-nocheck
import {delay, http, HttpResponse} from 'msw'
import {finishDate, finishTimestampMS, mainColors, summDB} from '../DB/db'
import {percentage, tasks} from "../DB/progressDB";
import {overTasks} from "../DB/overdueDB";
import {budgetData, overBudgetPercent} from "../DB/budgetDB";
import {upcTasks} from "../DB/upcDeadlinesDB";
import {logs, users} from "../DB/logs";
import {defaultDBposition} from "../DB/gridDB";

export const handlers = [

    http.get('/db/colors', async () => {
        //await delay(5000)
            return HttpResponse.json({
                mainColors
            })
        }
    ),
    http.get('/db/progressDB/percentage', async () => {
        //await delay(5000)
            return HttpResponse.json({
                percentage
            })
        }
    ),
    http.get('db/progressDB/tasks', async () => {
        //await delay(5000)
            return  HttpResponse.json({
            tasks
        })
    }
    ),
    http.get('db/overdueDB/tasks', async () => {
        //await delay(5000)
        return HttpResponse.json({
            overTasks
        })
    }),
    http.get('db/budgetDB/data', async () => {
        //await delay(5000)
        return HttpResponse.json({
            budgetData: budgetData
        })
    }),
    http.get('db/budgetDB/overPercent', async () => {
        //await delay(5000)
        return HttpResponse.json({
            overBudgetPercent
        })
    }),
    http.get('db/summDB', async () => {
        //await delay(5000)
        return HttpResponse.json({
            summDB
        })
    }),
    http.get('db/finDate', async () => {
        //await delay(5000)
        return HttpResponse.json({
            finishDate
        })
    }),
    http.get('db/finTimestamp', async () => {
        //await delay(5000)
        return HttpResponse.json({
            finishTimestampMS
        })
    }),
    http.get('db/upcDeadlinesDB/tasks', async () => {
        //await delay(5000)
        return HttpResponse.json({
            upcTasks
        })
    }),
    http.get('db/logs', async () => {
        //await delay(5000)
        return HttpResponse.json({
            logs
        })
    }),
    http.get('db/logs/users', async () => {
        //await delay(5000)
        return HttpResponse.json({
            users
        })
    }),
    http.get('db/gird/defaultDBposition', async () => {
        //await delay(5000)
        return HttpResponse.json({
            defaultDBposition
        })
    }),
    http.get('/localstorage', async (key, value) => {
        return (localStorage.getItem(key))?.[value]
    }),

// return JSON.parse(global.localStorage.getItem(key))?.[value] || null;


    // http.post('/gridParams/currentBreakpoint', async ({ request }) => {
    //     setCurrentBreakpoint.set(response)
    //
    //     // Don't forget to declare a semantic "201 Created"
    //     // response and send back the newly created post!
    //     return HttpResponse.json(newPost, { status: 201 })
    // }),
    // http.post('/breakpoints', () => {
    //     // Note that you DON'T have to stringify the JSON!
    //     return HttpResponse.json({
    //         user: {
    //             id: 'abc-123',
    //             name: 'John Maverick',
    //         },
    //     })
    // }),

]

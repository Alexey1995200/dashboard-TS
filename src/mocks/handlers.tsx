import {http, HttpResponse} from 'msw'
import {finishDate, finishTimestampMS, mainColors, summDB} from '../DB/db'
import {percentage, tasks} from "../DB/progressDB";
import {overTasks} from "../DB/overdueDB";
import {budgetData, overBudgetPercent} from "../DB/budgetDB";
import {upcTasks} from "../DB/upcDeadlinesDB";
import {log} from "../DB/logs";
// import {setCurrentBreakpoint} from "../DB/gridDB";

export const handlers = [

    http.get('/db/colors', async () => {
            return HttpResponse.json({
                mainColors
            })
        }
    ),
    http.get('/db/progressDB/percentage', async () => {
            return HttpResponse.json({
                percentage
            })
        }
    ),
    http.get('db/progressDB/tasks', async () => {
        return HttpResponse.json({
            tasks
        })
    }
    ),
    http.get('db/overdueDB/tasks', async () => {
        return HttpResponse.json({
            overTasks
        })
    }),
    http.get('db/budgetDB/data', async () => {
        return HttpResponse.json({
            budgetData: budgetData
        })
    }),
    http.get('db/budgetDB/overPercent', async () => {
        return HttpResponse.json({
            overBudgetPercent
        })
    }),
    http.get('db/summDB', async () => {
        return HttpResponse.json({
            summDB
        })
    }),
    http.get('db/finDate', async () => {
        return HttpResponse.json({
            finishDate
        })
    }),
    http.get('db/finTimestamp', async () => {
        return HttpResponse.json({
            finishTimestampMS
        })
    }),
    http.get('db/upcDeadlinesDB/tasks', async () => {
        return HttpResponse.json({
            upcTasks
        })
    }),
    http.get('db/logs/log', async () => {
        return HttpResponse.json({
            log
        })
    }),
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

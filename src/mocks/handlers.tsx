import {delay, http, HttpResponse} from 'msw'
import {finishDate, finishTimestampMS, summDB} from '../DB/db'
import {avgData, percentage, tasks} from "../DB/progressDB";
import {overTasks} from "../DB/overdueDB";
import {budgetData, overBudgetPercent} from "../DB/budgetDB";
import {upcTasks} from "../DB/upcDeadlinesDB";
import {logs, users} from "../DB/logs";

export const handlers = [
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
    http.get('db/logs', async () => {
        return HttpResponse.json({
            logs
        })
    }),
    http.get('db/logs/users', async () => {
        return HttpResponse.json({
            users
        })
    }),
    http.get('db/progressDB/avgData', async () => {
        return HttpResponse.json({
            avgData
        })
    }),
    http.get('/rgl_layout', () => {
            if (localStorage.getItem('rgl_layout')) {
                return HttpResponse.json(localStorage.getItem('rgl_layout'))
            } else return HttpResponse.error()
        },
    ),
    http.get('/rgl_layouts', () => {
            if (localStorage.getItem('rgl_layouts')) {
                return HttpResponse.json(localStorage.getItem('rgl_layouts'))
            } else return HttpResponse.error()
        },
    ),
    http.put('/DB_upload', async ({request},) => {
        const location = request.headers.get('save-location')
        const data = await request.json()
        if (data) {
            global.localStorage.setItem(
                `rgl_${location}`,
                JSON.stringify({
                    "value":
                    data
                })
            );
        } else return new HttpResponse(null, {status: 418})
    })
]
import {delay, http, HttpResponse} from 'msw'
import {finishDate, finishTimestampMS, summDB} from '../DB/db'
import {percentage, tasks} from "../DB/progressDB";
import {overTasks} from "../DB/overdueDB";
import {budgetData, overBudgetPercent} from "../DB/budgetDB";
import {upcTasks} from "../DB/upcDeadlinesDB";
import {logs, users} from "../DB/logs";

export const handlers = [


    http.get('/db/progressDB/percentage', async () => {
            //await delay(5000)
            return HttpResponse.json({
                percentage
            })
        }
    ),
    http.get('db/progressDB/tasks', async () => {
            //await delay(5000)
            return HttpResponse.json({
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
    // {
    //     user: {
    //     },
    //     project: {
    //         projectName: "",
    //         projectLeader: "",
    //         startDate: "",
    //         endDate: "",
    //         budget: {
    //         }
    //     },
    //     tasks: {
    //     }
    // },
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

    // http.get('/localstorage?', async ({request}) => {
    //     const searchUrl = ('lstorage?', request.url)
    //     const regex = /[?&]([^=#]+)=([^&#]*)/g;
    //     return (localStorage)
    // }),
    // http.get('/localstorage',  ((breakpoint) => {
    //     return HttpResponse.json{
    //         (localStorage.getItem('rgl'))?.['savedPosition']
    //
    //     }
    //     // return (localStorage.getItem(key))?.[value]
    //     // const json = JSON.parse(localStorage.getItem('rgl'));
    //     // return json.savedPosition[breakpoint] || [Object.keys(json.savedPosition)[0]];
    // })),

    // http.get('/localstorage', (key:string, value:string) => {
    //     return (localStorage.getItem(key))?.[value]
    // }),

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
    // http.get('/rgl_createdWidgetsList', () => {
    //         const localStorageItem = localStorage.getItem('rgl_widgets');
    //         if (localStorageItem) {
    //             const item: string = localStorageItem;
    //             const fix = item.replace(/null/g, '999999')
    //             return HttpResponse.json(fix)
    //         } else return new HttpResponse(null, { status: 418 })
    //     },
    // ),

    http.put('/DB_upload', async ({request},) => {
        const location = request.headers.get('save-location')
        const data = await request.json()
        if (data){
            global.localStorage.setItem(
                `rgl_${location}`,
                JSON.stringify({
                    "value":
                    data
                })
            );
        } else return new HttpResponse(null, { status: 418 })
    })

// return JSON.parse(global.localStorage.getItem(key))?.[value] || null;


]
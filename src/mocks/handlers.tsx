// @ts-nocheck
import {delay, http, HttpResponse} from 'msw'
import {finishDate, finishTimestampMS, mainColors, summDB} from '../DB/db'
import {percentage, tasks} from "../DB/progressDB";
import {overTasks} from "../DB/overdueDB";
import {budgetData, overBudgetPercent} from "../DB/budgetDB";
import {upcTasks} from "../DB/upcDeadlinesDB";
import {logs, users} from "../DB/logs";
import {defaultDBposition} from "../DB/gridDB";

const resolutionNamesCheck = (some) => {
    const resolutionNames = ['phone', 'WQVGA', 'VGA', 'WVGA', 'qHD', 'XGA', 'WXGA', 'WXGAHD', 'HDp', 'FHD', 'WQHD', 'FourK', 'FourKRetina', 'galaxyY', 'galaxyS3', 'F3', 'Tab7in', 'Tab', 'Tab2']
    return resolutionNames.includes(some)
}

const widgetNamesCheck = (some) => {
    const widgetNames = ['OverallProgress', 'ProgressBar', 'LaunchDate', 'Risks', 'Budget', 'OverdueTasks', 'Summary', 'AvgTime', 'UpcTasks', 'ProjectLogs'];
    return widgetNames.includes(some);
}

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
    //
    //     },
    //     project: {
    //         projectName: "",
    //         projectLeader: "",
    //         startDate: "",
    //         endDate: "",
    //         budget: {
    //
    //         }
    //     },
    //     tasks: {
    //
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
    http.get('db/gird/defaultDBposition', async () => {
        //await delay(5000)
        return HttpResponse.json({
            defaultDBposition
        })
    }),
    http.get('/localstorage?', async ({request}) => {
        const searchUrl = ('lstorage?', request.url)
        const regex = /[?&]([^=#]+)=([^&#]*)/g;
        console.log('lst', searchUrl.match(regex))
        return (localStorage)
    }),
    // http.get('/localstorage',  ((breakpoint) => {
    //     return HttpResponse.json{
    //         (localStorage.getItem('rgl'))?.['savedPosition']
    //
    //     }
    //     // console.log('lstorage', key, value)
    //     // return (localStorage.getItem(key))?.[value]
    //     // const json = JSON.parse(localStorage.getItem('rgl'));
    //     // return json.savedPosition[breakpoint] || [Object.keys(json.savedPosition)[0]];
    // })),

    http.get('/localstorage', ((key, value) => {
        return (localStorage.getItem(key))?.[value]
    })),


    http.get('/DB', () => {
        if (localStorage.getItem('rgl_DB')) {
            return HttpResponse.json(localStorage.getItem('rgl_DB'))
        } else return HttpResponse.error()
        },
    ),
    http.get('/WIDGETS', () => {
        if (localStorage.getItem('rgl_widgets')) {
            // return HttpResponse.json(localStorage.getItem('rgl_widgets'))
            const rgl_widgets = localStorage.getItem('rgl_widgets')
            const regex = /null/g
            const fix = rgl_widgets.replace('null', '"Infinity"')
            console.log('fixed', fix, 'unfixed', rgl_widgets)
            return HttpResponse.json(fix)
        } else return new HttpResponse(null, { status: 404 })
        },
    ),

    http.put('/DB_upload', async ({request},) => {
        const data = await request.json()
        console.log('data', data)
        if (Object.keys(data).some(key => resolutionNamesCheck(key))) {
            global.localStorage.setItem(
                "rgl_DB",
                JSON.stringify({
                    "value":
                    data
                })
            );
        }
        else
            // if (Object.keys(data).some(key => widgetNamesCheck(key)))
            {
            global.localStorage.setItem(
                "rgl_widgets",
                JSON.stringify({
                    "value":
                    data
                })
            );
        }

    })

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

import {delay, http, HttpResponse} from 'msw'
import {DB} from "../DB/db";

export const handlers = [
    http.get('/db/', async () => {
        await delay(500)
        return HttpResponse.json(
            JSON.stringify(DB)
        );
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
import {format} from "date-fns";
const mainColors = {
    '0%': '#33a885',
    '100%': '#44ae69',
};
const finishTimestampMS = 1735682399000
const finishDate:Date = new Date(finishTimestampMS);
const isProjectOnTime = ():boolean => (finishTimestampMS - new Date().getTime()) > 0;
const summDB =[
    {
        startDate: format(new Date(1704060001000), "dd.MM.yyyy"),
        endDate: format(new Date(1735682399000), "dd.MM.yyyy"),
        projectLeader: 'Alex',
        overallStatus: isProjectOnTime() ? 'in Time' : 'overdue'
    }
]

export {mainColors, summDB, finishDate, finishTimestampMS}
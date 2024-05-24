import {getCurrentBreakpoint, isMobile} from "./utils";
import OverallProgress from "./widgets/overallProgress";
import ProgressBar from "./widgets/progressBar";
import LaunchDate from "./widgets/launchDate";
import Risks from "./widgets/risks";
import Budget from "./widgets/budget";
import OverdueTasks from "./widgets/overdueTasks";
import Summary from "./widgets/summary";
import AvgTime from "./widgets/avgTime";
import UpcTasks from "./widgets/upcomingTasks";
import ProjectLogs from "./widgets/logs";
import {
    AvgTimeIco,
    BudgetIco, error,
    LaunchDateIco,
    OverallProgressIco,
    OverdueIco,
    ProgressBarIco,
    ProjectLogsIco,
    RiskIco,
    SummaryIco,
    upcTasksIco
} from "../../assets/svg";
import {IBpArr, TBreakpoints} from "./interfaces";
import {palette} from "../../assets/colors";
import React, {ReactElement, ReactNode} from "react";
import {Spinner} from "../../assets/spinner";
import {IDB, ITask} from "../../DB/db";
import {format} from "date-fns";
import {useTheme} from "../../context/themeProvider";

export const strokeColor = {
    '0%': palette.gumdropGreen,
    '100%': palette.freshGreens,
}

export const gridMargins: [number, number] = [10, 10]// Margin between items [x, y] in px
export const gridRowHeight: number = 1
export const colorFilter = {
    green: {
        filter: 'brightness(0) saturate(100%) invert(43%) sepia(8%) saturate(2413%) hue-rotate(88deg) brightness(106%) contrast(102%)',
    },
    red: {
        filter: 'brightness(0) saturate(100%) invert(26%) sepia(57%) saturate(6032%) hue-rotate(340deg) brightness(93%) contrast(85%)',
    }
};
export const useragent: string = window.navigator.userAgent
export const screenWidth: number = window.innerWidth
export const screenHeight: number = window.innerHeight
export const isSystemThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches
export const breakpointsArr: IBpArr = [
    {device: 'phone', resolution: 360 - 1, type: 'desktop'},
    {device: 'WQVGA', resolution: 480 - 1, type: 'desktop'},
    {device: 'VGA', resolution: 640 - 1, type: 'desktop'},
    {device: 'WVGA', resolution: 800 - 1, type: 'desktop'},
    {device: 'qHD', resolution: 960 - 1, type: 'desktop'},
    {device: 'XGA', resolution: 1024 - 1, type: 'desktop'},
    {device: 'WXGA', resolution: 1279 - 1, type: 'desktop'},
    {device: 'WXGAHD', resolution: 1366 - 1, type: 'desktop'},
    {device: 'HDp', resolution: 1600 - 1, type: 'desktop'},
    {device: 'FHD', resolution: 1920 - 1, type: 'desktop'},
    {device: 'WQHD', resolution: 2560 - 1, type: 'desktop'},
    {device: 'FourK', resolution: 3840 - 1, type: 'desktop'},
    {device: 'FourKRetina', resolution: 4096 - 1, type: 'desktop'},
    {device: 'galaxyY', resolution: 320 - 1, type: 'mobile'},
    {device: 'galaxyS3', resolution: 360 - 1, type: 'mobile'},
    {device: 'F3', resolution: 486 - 1, type: 'mobile'},
    {device: 'Tab7in', resolution: 600 - 1, type: 'mobile'},
    {device: 'Tab', resolution: 780 - 1, type: 'mobile'}
];
export const currentBreakpoint: string = getCurrentBreakpoint(isMobile(), screenWidth).device
export const breakpoints = (isMobileVer: boolean): TBreakpoints => {
    return isMobileVer ? {
        ['galaxyY']: 320 - 10,
        ['galaxyS3']: 360 - 10,
        ['F3']: 486 - 10,
        ['Tab7in']: 600 - 10,
        ['Tab']: 780 - 10,

    } : {
        ['phone']: 360 - 10,
        ['WQVGA']: 480 - 10,
        ['VGA']: 640 - 10,
        ['WVGA']: 800 - 10,
        ['qHD']: 960 - 10,
        ['XGA']: 1024 - 10,
        ['WXGA']: 1279 - 10,
        // ['WXGAHD']: 1366 - 10,
        // ['HDp']: 1600 - 10,
        // ['FHD']: 1920 - 10,
        // ['WQHD']: 2560 - 10,
        // ['FourK']: 3840 - 10,
        // ['FourKRetina']: 4096 - 10,
    }
}
export const cols = (isMobileVer: boolean): TBreakpoints => {
    return isMobileVer ? {
        ['galaxyY']: 1, ['galaxyS3']: 2, ['F3']: 4, ['Tab7in']: 6, ['Tab']: 8,
    } : {
        ['phone']: 4,
        ['WQVGA']: 6,
        ['VGA']: 8,
        ['WVGA']: 10,
        ['qHD']: 12,
        ['XGA']: 13,
        ['WXGA']: 16,
        // ['WXGAHD']: 17,
        // ['HDp']: 20,
        // ['FHD']: 24,
        // ['WQHD']: 32,
        // ['FourK']: 48,
        // ['FourKRetina']: 52,
    }
}
export const calculateH = (expectedH: number): number => ((expectedH + gridMargins[1]) / (gridRowHeight + gridMargins[1]))
// old version of formula
// export const calculateW = (expectedWidth) => (expectedWidth + gridMargins[0]) /
// ((screenSize - (gridMargins[0] * (cols[currentBreakpoint] - 1))) / cols[currentBreakpoint] + gridMargins[0]);
export const calculateW = (expectedW: number): number => {
    const breakpoint: number = screenWidth
    const col: number = cols(isMobile())[currentBreakpoint as keyof TBreakpoints];
    return (
        (expectedW + gridMargins[0])
        / (((breakpoint - (gridMargins[0] * (col))) / col)
            + gridMargins[0])
    )
}  //don't give exact width, but pretty close
export const WIDGETS_KEYS = {
    OverallProgress: 'OverallProgress',
    ProgressBar: 'ProgressBar',
    LaunchDate: 'LaunchDate',
    Risks: 'Risks',
    Budget: 'Budget',
    OverdueTasks: 'OverdueTasks',
    Summary: 'Summary',
    AvgTime: 'AvgTime',
    UpcTasks: 'UpcTasks',
    ProjectLogs: 'ProjectLogs'
};
export const widgetsIcons = {
    [WIDGETS_KEYS.OverallProgress]: {ico: OverallProgressIco},
    [WIDGETS_KEYS.ProgressBar]: {ico: ProgressBarIco},
    [WIDGETS_KEYS.LaunchDate]: {ico: LaunchDateIco},
    [WIDGETS_KEYS.Risks]: {ico: RiskIco},
    [WIDGETS_KEYS.Budget]: {ico: BudgetIco},
    [WIDGETS_KEYS.OverdueTasks]: {ico: OverdueIco},
    [WIDGETS_KEYS.Summary]: {ico: SummaryIco},
    [WIDGETS_KEYS.AvgTime]: {ico: AvgTimeIco},
    [WIDGETS_KEYS.UpcTasks]: {ico: upcTasksIco},
    [WIDGETS_KEYS.ProjectLogs]: {ico: ProjectLogsIco},
}
export const widgets = {
    [WIDGETS_KEYS.OverallProgress]:
        {
            key: WIDGETS_KEYS.OverallProgress,
            el: OverallProgress,
            data: {
                i: WIDGETS_KEYS.OverallProgress,
                w: Math.ceil(calculateW(120)),
                h: Math.ceil(calculateH(130)),
                minH: Math.ceil(calculateH(130)),
                minW: Math.ceil(calculateW(100)),
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.ProgressBar]:
        {
            key: WIDGETS_KEYS.ProgressBar,
            el: ProgressBar,
            data: {
                i: WIDGETS_KEYS.ProgressBar,
                w: Math.ceil(calculateW(900)),
                h: Math.ceil(calculateH(120)),
                minH: Math.ceil(calculateH(110)),
                minW: Math.ceil(calculateW(320)),
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.LaunchDate]:
        {
            key: WIDGETS_KEYS.LaunchDate,
            el: LaunchDate,
            data: {
                i: WIDGETS_KEYS.LaunchDate,
                w: Math.ceil(calculateW(120)),
                h: Math.ceil(calculateH(120)),
                minH: Math.ceil(calculateH(120)),
                minW: Math.ceil(calculateW(120)),
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.Risks]:
        {
            key: WIDGETS_KEYS.Risks,
            el: Risks,
            data: {
                i: WIDGETS_KEYS.Risks,
                w: Math.ceil(calculateW(120)),
                h: Math.ceil(calculateH(120)),
                minH: Math.ceil(calculateH(120)),
                minW: Math.ceil(calculateW(120)),
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.Budget]:
        {
            key: WIDGETS_KEYS.Budget,
            el: Budget,
            data: {
                i: WIDGETS_KEYS.Budget,
                w: Math.ceil(calculateW(386)),
                h: Math.ceil(calculateH(164)),
                minH: Math.ceil(calculateH(164)), maxH: Math.ceil(calculateH(164)),
                minW: Math.ceil(calculateW(386)),
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.OverdueTasks]:
        {
            key: WIDGETS_KEYS.OverdueTasks,
            el: OverdueTasks,
            data: {
                i: WIDGETS_KEYS.OverdueTasks,
                w: Math.ceil(calculateW(386)),
                h: Math.ceil(calculateH(164)),
                minH: Math.ceil(calculateH(120)),
                minW: Math.ceil(calculateW(275)),
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.Summary]:
        {
            key: WIDGETS_KEYS.Summary,
            el: Summary,
            data: {
                i: WIDGETS_KEYS.Summary,
                w: Math.ceil(calculateW(120)),
                h: Math.ceil(calculateH(120)),
                minH: Math.ceil(calculateH(120)),
                minW: Math.ceil(calculateW(120)),
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.AvgTime]:
        {
            key: WIDGETS_KEYS.AvgTime,
            el: AvgTime,
            data: {
                i: WIDGETS_KEYS.AvgTime,
                w: Math.ceil(calculateW(386)), h: calculateH(164),
                minW: Math.ceil(calculateW(386)), maxW: calculateW(800),
                minH: calculateH(164), maxH: calculateH(480),
                isResizable: true,
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.UpcTasks]:
        {
            key: WIDGETS_KEYS.UpcTasks,
            el: UpcTasks,
            data: {
                i: WIDGETS_KEYS.UpcTasks,
                w: Math.ceil(calculateW(386)),
                h: Math.ceil(calculateH(164)),
                minH: Math.ceil(calculateH(120)),
                minW: Math.ceil(calculateW(275)),
                x: 0,
                y: Infinity
            }
        },
    [WIDGETS_KEYS.ProjectLogs]:
        {
            key: WIDGETS_KEYS.ProjectLogs,
            el: ProjectLogs,
            data: {
                i: WIDGETS_KEYS.ProjectLogs,
                w: Math.ceil(calculateW(186)),
                h: Math.ceil(calculateH(336)),
                minH: Math.ceil(calculateH(240)),
                minW: Math.ceil(calculateW(149)),
                x: 0,
                y: Infinity
            }
        },
}

export interface LoaderProps {
    children: ReactNode | ReactNode[];
    isLoading: boolean;
    isError: boolean
}

// todo fix it
export const display = (isLoading: boolean, isDataPresent: boolean, Component: ReactElement, themeBackgroundColor?: string, themeFontColor?: string) => {
    const style = {backgroundColor: themeBackgroundColor, color: themeFontColor, height: "92.5dvh"}
    if (screenWidth > 320) {
        if (isLoading) {
            return (
                <div className="widgetLoader" style={style}>
                    <Spinner width={256} height={256} margin={4}/>
                </div>
            )
        } else if (!isLoading && !isDataPresent) {
            return (
                <div className={'widgetError'} style={style}>
                    <img src={error} alt="&#9940;"/>
                </div>
            )
        } else {
            return Component
        }
    }
    return <h1 style={{display: 'flex', flex: 1,}}> This resolution is not supported </h1>
}

// isProjectOnTime: () => (finishProjectTimestampMS - new Date().getTime()) > 0
export const isProjectOnTime = (finishProjectTimestampMS:number): boolean => (finishProjectTimestampMS - new Date().getTime()) > 0
export const localDateTimestampMS: number = new Date().getTime()
export const msInDay = 24*60*60*1000
export const differenceInMs = (ts1:number, ts2:number) => Math.abs(ts1-ts2)
export const differenceInDaysWithToday = (timestamp:number) => Math.ceil(differenceInMs(localDateTimestampMS, timestamp) / msInDay)
export const tasksInOverdue = (DB:IDB):ITask[] => {
    return Object.values(DB.tasks).filter((task) =>
        task.deadline > localDateTimestampMS && !task.isCompleted)
}
export const tasksUpcoming = (DB:IDB):ITask[] => {
    return Object.values(DB.tasks).filter((task) =>
        task.deadline < localDateTimestampMS && !task.isCompleted)
}
export const dateToDMY = (timestamp:number) => format(new Date(timestamp), 'dd.MM.yyyy')

export const setBodyColor = ({color}: any) => {
    document.documentElement.style.setProperty('--bodyColor', color)
}
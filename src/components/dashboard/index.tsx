//@ts-nocheck
import Grid from "./grid/index";
import React, {useEffect, useRef, useState} from "react";
import {
    compactHorizontal, compactNone,
    compactVertical, Desktop,
    desktop, Mobile,
    mobile,
    reset, resetGlobal,
    resetSettings,
    resetTable,
    resize
} from "./../../assets/svg";
import Layout from "./components/layout";
import {gridMargins, gridRowHeight} from "./grid/const";
import OverallProgress from "./widgets/overallProgress";
import ProgressBar from "./widgets/progressBar";
import LaunchDate from "./widgets/launchDate";
import Risks from "./widgets/risks";
import Budget from "./widgets/budget";
import OverdueTasks from "./widgets/overdueTasks";
import Summary from "./widgets/summary";
import AvgTime from "./widgets/avgTime";
import UpcTasks from "./widgets/upcomingDeadlines";
import LogBuilder from "./widgets/logs";

const colorFilter = {
    green: {
        filter: 'brightness(0) saturate(100%) invert(43%) sepia(8%) saturate(2413%) hue-rotate(88deg) brightness(106%) contrast(102%)',
    },
    red: {
        filter: 'brightness(0) saturate(100%) invert(26%) sepia(57%) saturate(6032%) hue-rotate(340deg) brightness(93%) contrast(85%)',
    }
};

const getFromLS = (key: string) => {
    if (localStorage) {
        try {
            // @ts-ignore
            return JSON.parse(localStorage.getItem(key)).value;
        } catch (e) {
            return null
        }
    }
};
const useragent = window.navigator.userAgent
const isMobileVerByUserAgent = () => {
    return (
        useragent.toLowerCase().includes('ipad') ||
        useragent.toLowerCase().includes('iphone') ||
        useragent.toLowerCase().includes('phone') ||
        useragent.toLowerCase().includes('android') ||
        useragent.toLowerCase().includes('mobile')
    );
}
const breakpointsArr = [
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

const Dashboard = () => {
    const screenWidth = window.innerWidth
    const [currentCompactType, setCurrentCompactType]: string = useState('vertical')
    const [fetchedLayout, setFetchedLayout] = useState()
    const [isMobileVer, setIsMobileVer] = useState(() => {
        const isMobile = getFromLS('isMobile')
        return isMobile ? isMobile : isMobileVerByUserAgent()
    })
    const [isAdaptive, setIsAdaptive] = useState(true)
    const [layouts, setLayouts] = useState();
    const [allWidgets, setAllWidgets] = useState([])
    const [widgetList, setWidgetList] = useState([])
    const getCurrentBreakpoint = () => {
        let arrByType
        if (isMobileVer === true) {
            arrByType = breakpointsArr.filter((el) => el.type != 'desktop')
        } else {
            arrByType = breakpointsArr.filter((el) => el.type === 'desktop')
        }
        const filteredArr = arrByType.filter((el) => el.resolution > screenWidth - 1)
        console.log(filteredArr, 'qweasd', screenWidth)
        if (filteredArr.length < 1) {
            return arrByType[arrByType.length - 1]
        } else return filteredArr[0].device
    }
    const currentBreakpoint = getCurrentBreakpoint()

    const breakpoints = () => {
        return isMobileVer ? {
            galaxyY: 320 - 1,
            galaxyS3: 360 - 1,
            F3: 486 - 1,
            Tab7in: 600 - 1,
            Tab: 780 - 1,
            // Tab2: 800 - 1,

        } : {
            phone: 360 - 1,
            WQVGA: 480 - 1,
            VGA: 640 - 1,
            WVGA: 800 - 1,
            qHD: 960 - 1,
            XGA: 1024 - 1,
            WXGA: 1279 - 1,
            WXGAHD: 1366 - 1,
            HDp: 1600 - 1,
            FHD: 1920 - 1,
            WQHD: 2560 - 1,
            FourK: 3840 - 1,
            FourKRetina: 4096 - 1,
        }
    }
    const cols = () => {
        return isMobileVer ? {
                galaxyY: 1,
                galaxyS3: 2,
                F3: 4,
                Tab7in: 6,
                Tab: 8,
                // Tab2: 8,
            } :
            {
                phone: 4,
                WQVGA: 6,
                VGA: 8,
                WVGA: 10,
                qHD: 12,
                XGA: 13,
                WXGA: 16,
                WXGAHD: 17,
                HDp: 20,
                FHD: 24,
                WQHD: 32,
                FourK: 48,
                FourKRetina: 52,
            }
    }

    const resetLocalSettings = () => {
        setIsMobileVer(isMobileVerByUserAgent()) // Call the function to get the boolean value
        setIsAdaptive(true)
    }
    const resetLocalTable = () => {
        localStorage.removeItem("rgl_DB");
        setLayouts();
        //todo fix this shit later
    }
    const resetLocalStorage = () => {
        if (global.localStorage) {
            resetLocalSettings()
            resetLocalTable()
            localStorage.clear()
        }
    };
    const saveToLS = (key: string, value: any) => {
        if (global.localStorage) {
            global.localStorage.setItem(
                key,
                JSON.stringify({
                    value
                })
            );
        }
    };

    useEffect(() => {
        fetch('/DB')
            .then((response) => response.json())
            .then((response) => {
                console.log(response, 'qweasd')
                if (!!JSON.parse(response).value) {
                    setFetchedLayout(JSON.parse(response).value);
                } else {
                    console.error('saved position is empty');
                    setFetchedLayout(undefined);
                }
            })
        fetch('/WIDGETS')                           //todo fetch json err to bool or if null - nothing else etc
            .then((response) => response.json())
            .then((response) => {
                if (!!JSON.parse(response).value) {
                    const keys = [];
                    JSON.parse(response).value.forEach(obj => {
                        keys.push(obj.key);
                    });
                    setWidgetList(keys)
                    console.log('qweasd allwidget seted', keys)
                } else {
                    console.error('saved position is empty');
                    setWidgetList([]);
                }
            })

    }, []);

    useEffect(() => {
        setLayouts(fetchedLayout)
    }, [fetchedLayout]);
    const forcedMobileVersion = () => {
        setIsMobileVer(true)
        setIsAdaptive(true)
        saveToLS('isMobile', true)
        saveToLS('isAdaptive', true)
    }
    const forcedDesktopVersion = () => {
        setIsMobileVer(false)
        setIsAdaptive(true)
        saveToLS('isMobile', false)
        saveToLS('isAdaptive', true)
    }
    const changeCompactType = () => {
        if (currentCompactType === 'vertical') {
            setCurrentCompactType('horizontal')
            console.log('compact', 'vertical-horizontal')
        } else if (currentCompactType === 'horizontal') {
            setCurrentCompactType(null)
            console.log('compact', 'horizontal-null')
        } else if (currentCompactType === null) {
            setCurrentCompactType('vertical')
            console.log('compact', 'null-vertical')
        }

        // "horizontal" | "vertical" | null.

    }
    const uploadRGLData = async (data) => {

        console.log('Before fetch:', JSON.stringify(data));
        try {
            const response = await fetch('/DB_upload', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('sended resp', response)
            const json = await response.json();
            console.log('Success:', JSON.stringify(json));
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // const breakpointValue = breakpoints()[currentBreakpoint];
    const calculateH = (expectedH) => ((expectedH + gridMargins[1]) / (gridRowHeight + gridMargins[1]))
    // const calculateW = (expectedWidth) => (expectedWidth + gridMargins[0]) / ((screenSize - (gridMargins[0] * (cols[currentBreakpoint] - 1))) / cols[currentBreakpoint] + gridMargins[0]);
    const calculateW = (expectedW) => (expectedW + gridMargins[0]) / (parseFloat((breakpoints()[currentBreakpoint] - (gridMargins[0] * (cols()[currentBreakpoint]))) / cols()[currentBreakpoint]) + gridMargins[0])  //don't give exact width, but pretty close
    console.log('qweasdzxc', breakpoints()[currentBreakpoint], cols()[currentBreakpoint])
    const WIDGET_TEMPLATE = {
        key: '',
        el: <></>
    }
    const WIDGETS_KEYS = {
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

    const widgets = {
        [WIDGETS_KEYS.OverallProgress]:
            {
                key: WIDGETS_KEYS.OverallProgress,
                el: OverallProgress,
                data: {
                    i: WIDGETS_KEYS.OverallProgress,
                    w: Math.ceil(calculateW(120)),
                    h: Math.ceil(calculateH(120)),
                    minH: Math.ceil(calculateH(90)),
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
                    w: Math.ceil(calculateW(276)), h: calculateH(164),
                    minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
                    minH: calculateH(164), maxH: calculateH(200),
                    isResizable: false,
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
                el: LogBuilder,
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
        [WIDGETS_KEYS.AvgTime]:
            {
                key: WIDGETS_KEYS.AvgTime,
                el: AvgTime
            },
    }

    const handleLayoutChange = (layout, layouts) => {
        if (allWidgets.length > 0) {
            uploadRGLData(layouts)
            uploadRGLData(allWidgets)
            // saveToLS('savedPosition', layouts);
            // prevLayoutsRef.current = layouts; // Update the ref instead of the state
        }
    };

    const removeByKeyOnClick = (key) => {
        setAllWidgets(allWidgets.filter(widget => widget.key !== key));
    }
    const removeAllOnClick = () => setAllWidgets([])

    const uniqueID = () => Math.random().toString(16).slice(-4);

    const addWidgetByKeyOnClick = (widget) => {
        const newWidget = {
            ...WIDGET_TEMPLATE,
            key: widget,
            el: widgets[widget].el,
            data: widgets[widget].data
        }
        setAllWidgets([...allWidgets, newWidget]);
        // setLayouts([...layouts])
    }

// if (!layouts) return null
    if (screenWidth > 320) {
        return (
            <div className={'wrapper'}>
                <div className={'settings'}
                     style={screenWidth < 460 ? {flexDirection: "column"} : {flexDirection: 'row'}}>
                    <div className={'choose_device same'}>
                        <button onClick={forcedDesktopVersion}>
                            <Desktop
                                height='36px'
                                width='36px'
                                color={(isMobileVer === false) ? 'green' : 'red'}
                            />
                        </button>
                        <button onClick={forcedMobileVersion}>
                            <Mobile
                                height='36px'
                                width='36px'
                                color={(isMobileVer === true) ? 'green' : 'red'}
                            />
                        </button>

                    </div>
                    <div className={'change_params same'}>
                        <button onClick={changeCompactType}
                            // className={currentCompactType ? 'active' : 'inactive'}
                        >
                            {(currentCompactType === 'vertical') ?
                                <img src={compactVertical} alt="compactVertical"/>
                                : (currentCompactType === 'horizontal') ?
                                    <img src={compactHorizontal} alt="compactHorizontal"/>
                                    :
                                    <img src={compactNone} alt="compactNone"/>
                            }
                        </button>
                    </div>
                    <div className={'resets same'}>
                        <button onClick={resetLocalTable}><img src={resetTable} alt="Reset Table"/>
                        </button>
                        <button onClick={resetLocalSettings}><img src={resetSettings}
                                                                  alt="Reset Setting"/></button>
                        <button onClick={resetLocalStorage}><img src={resetGlobal} alt="Reset All"/>
                        </button>
                    </div>
                </div>
                {layouts ? (
                    <Grid
                        currentCompactType={currentCompactType}
                        layouts={layouts}
                        setLayouts={setLayouts}
                        allWidgets={allWidgets}
                        setAllWidgets={setAllWidgets}
                        currentBreakpoint={currentBreakpoint}
                        breakpoints={breakpoints()}
                        cols={cols()}
                        isAdaptive={isAdaptive}
                        isMobileVer={isMobileVer}
                        screenSize={screenWidth}
                        widgetList={widgetList}
                        removeByKeyOnClick={removeByKeyOnClick}
                        removeAllOnClick={removeAllOnClick}
                        addWidgetByKeyOnClick={addWidgetByKeyOnClick}
                        onLayoutChange={handleLayoutChange}
                        widgets={widgets}
                    />
                ) : (
                    <div>There's no widgets added</div>
                )}

            </div>
        )
    } else {
        return <h1 style={{display: 'flex', flex: 1,}}> This resolution is not supported </h1>
    }
}
export default Dashboard;
export {colorFilter}
//@ts-nocheck
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import RGL, {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './grid.css'
import OverallProgress from './components/overallProgress'
import ProgressBar from "./components/progressBar";
import LaunchDate from "./components/launchDate";
import Risks from "./components/risks";
import Budget from "./components/budget";
import OverdueTasks from "./components/overdueTasks";
import Summary from "./components/summary";
import AvgTime from "./components/avgTime";
import UpcTasks from "./components/upcomingDeadlines";
import './normalize.css'
import './clean_style.css'
import LogBuilder from "./components/logs";


const ReactGridLayout = WidthProvider(RGL);


// {
//     key: 'UpcTasks24343',
//     el: UpcTasks
// }
// const test = (widget) => {
//     const MyWidget = widget.el
//     return (
//         <div>
//             <MyWidget  />
//         </div>
//     )
// }

// {
//     key: 'UpcTasks24343',
//     el: <UpcTasks />
// }
// const test = (widget) => {
//     return (
//         <div>
//             {widget.el} // CAN'T PASS PROPS
//         </div>
//     )
// }


const Grid = ({
                  // isVerticalCompact,
                  currentCompactType,
                  layouts,
                  // currentBreakpoint,
                  // setCurrentBreakpoint,
                  breakpoints,
                  cols,
                  isMobileVer,
                  isAdaptive,
                  setLayouts
              }) => {

    const breakpointsArr = () => {
        return isMobileVer ? [
            {device: 'galaxyY', resolution: 320 - 1},
            {device: 'galaxyS3', resolution: 360 - 1},
            {device: 'F3', resolution: 486 - 1},
            {device: 'Tab7in', resolution: 600 - 1},
            {device: 'Tab', resolution: 780 - 1}
        ] : [
            {device: 'phone', resolution: 360 - 1},
            {device: 'WQVGA', resolution: 480 - 1},
            {device: 'VGA', resolution: 640 - 1},
            {device: 'WVGA', resolution: 800 - 1},
            {device: 'qHD', resolution: 960 - 1},
            {device: 'XGA', resolution: 1024 - 1},
            {device: 'WXGA', resolution: 1279 - 1},
            {device: 'WXGAHD', resolution: 1366 - 1},
            {device: 'HDp', resolution: 1600 - 1},
            {device: 'FHD', resolution: 1920 - 1},
            {device: 'WQHD', resolution: 2560 - 1},
            {device: 'FourK', resolution: 3840 - 1},
            {device: 'FourKRetina', resolution: 4096 - 1}
        ]
    };
    const colsArr = () => {
        if (isAdaptive) {
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
                };
        }
    };
    const [allWidgets, setAllWidgets] = useState([])
    const gridLayoutRef = useRef(null);
    const ResponsiveGridLayout = WidthProvider(Responsive);
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const breakpointsTestArr = [
        { device: 'phone', resolution: 360 - 1, type: 'desktop' },
        { device: 'WQVGA', resolution: 480 - 1, type: 'desktop' },
        { device: 'VGA', resolution: 640 - 1, type: 'desktop' },
        { device: 'WVGA', resolution: 800 - 1, type: 'desktop' },
        { device: 'qHD', resolution: 960 - 1, type: 'desktop' },
        { device: 'XGA', resolution: 1024 - 1, type: 'desktop' },
        { device: 'WXGA', resolution: 1279 - 1, type: 'desktop' },
        { device: 'WXGAHD', resolution: 1366 - 1, type: 'desktop' },
        { device: 'HDp', resolution: 1600 - 1, type: 'desktop' },
        { device: 'FHD', resolution: 1920 - 1, type: 'desktop' },
        { device: 'WQHD', resolution: 2560 - 1, type: 'desktop' },
        { device: 'FourK', resolution: 3840 - 1, type: 'desktop' },
        { device: 'FourKRetina', resolution: 4096 - 1, type: 'desktop' },
        { device: 'galaxyY', resolution: 320 - 1, type: 'mobile' },
        { device: 'galaxyS3', resolution: 360 - 1, type: 'mobile' },
        { device: 'F3', resolution: 486 - 1, type: 'mobile' },
        { device: 'Tab7in', resolution: 600 - 1, type: 'mobile' },
        { device: 'Tab', resolution: 780 - 1, type: 'mobile' }
    ];
    const getCurrentBreakpoint = (screenWidth) => {
        let arrByType
        if (isMobileVer === true) {
            arrByType = breakpointsTestArr .filter((el) => el.type != 'desktop')
        } else {arrByType = breakpointsTestArr .filter((el) => el.type === 'desktop')}
        const filteredArr = arrByType.filter((el) => el.resolution > screenWidth)
        if (filteredArr.length < 1) {
            return arrByType[arrByType.length - 1]
        } else return filteredArr[0].device
    }
    // useEffect(() => {
    //     setCurrentBreakpoint(getCurrentBreakpoint(screenSize))
    // }, []);
    const [currentBreakpoint, setCurrentBreakpoint] = useState(
        // () => getCurrentBreakpoint(screenSize)
        getCurrentBreakpoint(screenSize)
    )
    console.log(currentBreakpoint, 'qweqweqwe')
    const gridMargins: [number, number] = [10, 10]// Margin between items [x, y] in px
    const gridRowHeight = 1

    const calculateH = (expectedH) => ((expectedH + gridMargins[1]) / (gridRowHeight + gridMargins[1]))
    // const calculateW = (expectedWidth) => (expectedWidth + gridMargins[0]) / ((screenSize - (gridMargins[0] * (cols[currentBreakpoint] - 1))) / cols[currentBreakpoint] + gridMargins[0]);
    const calculateW = (expectedW) => (expectedW + gridMargins[0]) / (parseFloat((breakpoints[currentBreakpoint] - (gridMargins[0] * (cols[currentBreakpoint]))) / cols[currentBreakpoint]) + gridMargins[0])  //don't give exact width, but pretty close

    // Responsive.getBreakpointFromWidth(breakpoints, screenSize)
    console.log(cols, breakpoints, currentBreakpoint, 'qweqwe')
    console.log(layouts, 'qwe_layouts')

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


    function deepEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
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

    const onBreakpointChange = (breakpoint) => {
        console.log('qwe before on change', currentBreakpoint)
        setCurrentBreakpoint(breakpoint)
        console.log('qwe after on change', currentBreakpoint)
    };
    useEffect(() => {
        onBreakpointChange()
    }, []);
    const onLayoutChange = (layout, layouts) => {
        uploadRGLData(layouts)
        console.log(layouts, '123qwe')
        saveToLS('savedPosition', layouts);
        prevLayoutsRef.current = layouts; // Update the ref instead of the state
    };

    const prevLayoutsRef = useRef(layouts);
    // useEffect(() => {
    //     // console.log('123qwe useeffect')
    //     if (deepEqual(prevLayoutsRef.current, layouts)) {
    //         saveToLS('savedPosition', layouts);
    //     }
    //
    // }, [layouts]);

    const saveToLS = (key, value) => {
        if (global.localStorage) {
            // console.log('log', 'saveToLS')
            global.localStorage.setItem(
                "rgl",
                JSON.stringify({
                    [key]: value
                })
            );
        }
    };
    // console.log([...layouts])
    const removeByKeyOnClick = (key) => {
        setAllWidgets(allWidgets.filter(widget => widget.key !== key));
    }
    const removeAllOnClick = () => setAllWidgets([])
    const uniqueID = () => Math.random().toString(16).slice(-4);
    const addWidgetByKeyOnClick = (widget) => {
        console.log(widgets, widget, 'qwe',)
        const newWidget = {
            ...WIDGET_TEMPLATE,
            key: widget,
            el: widgets[widget].el,
            data: widgets[widget].data
        }
        setAllWidgets([...allWidgets, newWidget]);
        // setLayouts([...layouts])
    }
    // const test = () => {
    //     Object.keys(widgets).map((widget) => {
    //         const widgetEl = widgets[widget].el
    //         const widgetKey = widgets[widget].key
    //             return  {
    //                 key: widgetKey,
    //                 el: widgetEl
    //             }
    //         }
    //     )
    // }
    // console.log('test', test())

    // console.log(Object.keys(allWidgets), 'widget')
    return (
        <div>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {Object.keys(widgets).map((widget) => {
                    console.log(widget, 'widgettt')
                    return (<button onClick={() => addWidgetByKeyOnClick(widget)}>{widget}</button>)
                })}
                <div
                    className="remove_btn"
                    style={{
                        // position: "absolute",
                        // right: "2px",
                        // top: 0,
                        cursor: "pointer"
                    }}
                    onClick={() => removeAllOnClick()}
                >
                    &#10006;
                </div>
            </div>
            <ResponsiveGridLayout
                ref={gridLayoutRef}
                className={'grid_wrapper'}
                layouts={layouts}
                breakpoints={breakpoints}
                cols={cols}
                // verticalCompact={isVerticalCompact}
                compactType={currentCompactType}
                rowHeight={gridRowHeight}
                onBreakpointChange={onBreakpointChange}
                draggableHandle=".dragHandle"
                margin={gridMargins}
                isDraggable={true}
                isResizable={true}
                isBounded={false}
                allowOverlap={false}
                onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
                // preventCollision={true}
            >
                {/*{allWidgets.map((widget) => {*/}
                {/*    const WidgetEl = widget.el*/}
                {/*    return (*/}
                {/*        <div*/}
                {/*            className={"widget"}*/}
                {/*            key={widget.key}>*/}
                {/*            <WidgetEl*/}
                {/*            />*/}
                {/*            /!*<div style={{*!/*/}
                {/*            /!*    background: 'gray',*!/*/}
                {/*            /!*    fontSize: '24px',*!/*/}
                {/*            /!*    margin: 'auto',*!/*/}
                {/*            /!*    height: '100%',*!/*/}
                {/*            /!*    textAlign: 'center'*!/*/}
                {/*            /!*}}>*!/*/}
                {/*            /!*    <div style={{*!/*/}
                {/*            /!*        position: 'relative',*!/*/}
                {/*            /!*        top: '50%',*!/*/}
                {/*            /!*        transform: 'translate(0, -50%)'*!/*/}
                {/*            /!*    }}>{widget.key}</div>*!/*/}
                {/*            /!*</div>*!/*/}
                {/*            <span*/}
                {/*                className="remove_btn"*/}
                {/*                style={{*/}
                {/*                    position: "absolute",*/}
                {/*                    right: "2px",*/}
                {/*                    top: 0,*/}
                {/*                    cursor: "pointer"*/}
                {/*                }}*/}
                {/*                onClick={() => removeByKeyOnClick(widget.key)}*/}
                {/*            >*/}
                {/*            &#10006;*/}
                {/*        </span>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*})}*/}

                {allWidgets.map((widget) => {
                    const WidgetEl = widget.el
                    return (
                        <div
                            className={"widget"}
                            key={widget.key}
                            data-grid={widget.data}
                        >

                            <WidgetEl
                                // key={widget.key}
                                // data-grid={widget.data}
                            />
                            {/*<div style={{*/}
                            {/*    background: 'gray',*/}
                            {/*    fontSize: '24px',*/}
                            {/*    margin: 'auto',*/}
                            {/*    height: '100%',*/}
                            {/*    textAlign: 'center'*/}
                            {/*}}>*/}
                            {/*    <div style={{*/}
                            {/*        position: 'relative',*/}
                            {/*        top: '50%',*/}
                            {/*        transform: 'translate(0, -50%)'*/}
                            {/*    }}>{widget.key}</div>*/}
                            {/*</div>*/}
                            <span
                                className="remove_btn"
                                style={{
                                    position: "absolute",
                                    right: "2px",
                                    top: 0,
                                    cursor: "pointer"
                                }}
                                onClick={() => removeByKeyOnClick(widget.key)}
                            >
                            &#10006;
                        </span>
                        </div>
                    )
                })}

            </ResponsiveGridLayout>
        </div>
    );
};

export default Grid;

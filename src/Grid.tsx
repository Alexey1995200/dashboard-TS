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



const Grid = ({
                  currentCompactType,
                  layouts,
                  setLayouts,
                  breakpoints,
                  cols,
                  isMobileVer,
                  isAdaptive,
                  // setLayouts

              }) => {
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
    const [currentBreakpoint, setCurrentBreakpoint] = useState(
        // () => getCurrentBreakpoint(screenSize)
        getCurrentBreakpoint(screenSize)
    )


    const gridMargins = [10, 10]// Margin between items [x, y] in px
    const gridRowHeight = 1
    const calculateH = (expectedH) => ((expectedH + gridMargins[1]) / (gridRowHeight + gridMargins[1]))
    // const calculateW = (expectedWidth) => (expectedWidth + gridMargins[0]) / ((screenSize - (gridMargins[0] * (cols[currentBreakpoint] - 1))) / cols[currentBreakpoint] + gridMargins[0]);
    const calculateW = (expectedW) => (expectedW + gridMargins[0]) / (parseFloat((breakpoints[currentBreakpoint] - (gridMargins[0] * (cols[currentBreakpoint]))) / cols[currentBreakpoint]) + gridMargins[0])  //don't give exact width, but pretty close
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
        setCurrentBreakpoint(breakpoint)
    };

    const onLayoutChange = (layout, layouts, allWidgets) => {
        uploadRGLData(layouts)
        uploadRGLData(allWidgets)
        saveToLS('savedPosition', layouts);
        //     prevLayoutsRef.current = layouts; // Update the ref instead of the state
        // console.log(layouts, '123qwe')
        // saveToLS('savedPosition', layouts);
        // prevLayoutsRef.current = layouts; // Update the ref instead of the state
    };
    const prevLayoutsRef = useRef(layouts);
    useEffect(() => {
        if (deepEqual(prevLayoutsRef.current, layouts)) {
            saveToLS('savedPosition', layouts);
        }
        // if (deepEqual(prevLayoutsRef.current, layouts)) {
        //     saveToLS('savedPosition', layouts);
        // }
    }, [layouts]);

    // const saveToLS = (key, value) => {
    //     if (global.localStorage) {
    //         // console.log('log', 'saveToLS')
    //         global.localStorage.setItem(
    //             "rgl",
    //             JSON.stringify({
    //                 [key]: value
    //             })
    //         );
    //         global.localStorage.setItem(
    //             "rgl_props",
    //             JSON.stringify({
    //                 isMobileVer: isMobileVer,
    //                 isAdaptive: isAdaptive,
    //             }),
    //         );
    //         global.localStorage.setItem(
    //             "rgl_isMobileVer",
    //             JSON.stringify({
    //                 isMobileVer
    //             }),
    //             "rgl_isAdaptive",
    //             JSON.stringify({
    //                 isAdaptive
    //             })
    //         );
    //     }
    // };


    return (
        <ResponsiveGridLayout
            ref={gridLayoutRef}
            className={'grid_wrapper'}
            layouts={layouts}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={gridRowHeight}
            onBreakpointChange={onBreakpointChange}
            draggableHandle=".dragHandle"
            margin={gridMargins}
            isDraggable={true}
            isResizable={true}
            isBounded={false}
            allowOverlap={false}
            onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts, allWidgets)}
            currentCompactType={currentCompactType}
        >
            <div key={'OverallProgress'}>
                <OverallProgress/>
            </div>
            <div key={'ProgressBar'}>
                <ProgressBar/>
            </div>
            <div key={'LaunchDate'}>
                <LaunchDate/>
            </div>
            <div key={'Risks'}>
                <Risks/>
            </div>
            <div key={'Budget'}>
                <Budget/>
            </div>
            <div key={'OverdueTasks'}>
                <OverdueTasks/>
            </div>
            <div key={'Summary'}>
                <Summary/>
            </div>
            <div key={'AvgTime'}>
                <AvgTime/>
            </div>
            <div key={'UpcTasks'}>
                <UpcTasks/>
            </div>
            <div key={'ProjectLogs'}>
                <LogBuilder/>
            </div>

        </ResponsiveGridLayout>
        // </div>
    );
};

export default Grid;

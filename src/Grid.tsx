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


const Grid = ({}) => {
    const gridLayoutRef = useRef(null);
    const ResponsiveGridLayout = WidthProvider(Responsive);
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('x1');
    // const currentBreakpoint='x8'
    const [isVerticalCompact, setIsVerticalCompact] = useState(true)

    const breakpoints = {x0: 0, x1: 159};
    for (let i = 2; i <= 27; i++) {
        breakpoints[`x${i}`] = breakpoints[`x${i - 1}`] + 160;
    }
    const cols = {x0: 1};
    for (let i = 1; i <= 27; i++) {
        cols[`x${i}`] = i * 20;
        // console.log(cols)
    }
    const gridMargins = [10, 10]// Margin between items [x, y] in px
    const gridRowHeight = 1

    const calculateH = (expectedH) => ((expectedH + gridMargins[1]) / (gridRowHeight + gridMargins[1]))

// const calculateW = (expectedWidth) => (expectedWidth + gridMargins[0]) / ((screenSize - (gridMargins[0] * (cols[currentBreakpoint] - 1))) / cols[currentBreakpoint] + gridMargins[0]);

    const calculateW = (expectedW) => (expectedW + gridMargins[0]) / (parseFloat((breakpoints[currentBreakpoint] - (gridMargins[0] * (cols[currentBreakpoint]))) / cols[currentBreakpoint]) + gridMargins[0])  //don't give exact width, but pretty close
    const responsiveLayouts: any = {
        x8: [
            {
                i: 'iVC',
                x: 0, y: 0,
                w: 999999, h: calculateH(20),
                minW: calculateW(10), maxW: calculateW(999999),
                minH: calculateH(10), maxH: calculateH(50),
                static: true
            }, {
                i: 'OverallProgress',
                x: 0, y: 1,
                w: Math.ceil(calculateW(140)), h: calculateH(120),
                minW: calculateW(120), maxW: calculateW(800),
                minH: calculateH(120), maxH: calculateH(800),
                // static: false,                 //static position and size  (isDraggable & isResizable):false
                // isDraggable: false,
                // isResizable: true,
            },
            {
                i: 'ProgressBar',
                x: 19, y: 1,
                w: Math.ceil(calculateW(900)), h: calculateH(120),
                minW: 40,
                minH: calculateH(120), maxH: calculateH(120)
            },
            {
                i: 'LaunchDate',
                x: 134, y: 1,
                w: calculateW(185), h: calculateH(120),
                minW: calculateW(120), maxW: calculateW(800),
                minH: calculateH(120), maxH: calculateH(600)
            },
            {
                i: 'Risks',
                x: 0, y: 2,
                w: Math.ceil(calculateW(230)), h: calculateH(164),
                minW: calculateW(170), maxW: calculateW(800),
                minH: calculateH(80), maxH: calculateH(600),
            },
            {
                i: 'Budget',
                x: 31, y: 2,
                w: Math.ceil(calculateW(390)), h: calculateH(164),
                minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
                minH: calculateH(164), maxH: calculateH(200)
            },
            {
                i: 'OverdueTasks',
                x: 82, y: 2,
                w: Math.ceil(calculateW(400)), h: calculateH(164),
                minW: Math.ceil(calculateW(300)), maxW: Math.ceil(calculateW(1200)),
                minH: calculateH(95), maxH: calculateH(400)
            },
            {
                i: 'Summary',
                x: 0, y: 3,
                w: Math.ceil(calculateW(230)), h: calculateH(164),
                minW: calculateW(180), maxW: calculateW(800),
                minH: calculateH(144), maxH: calculateH(600),
            },
            {
                i: 'AvgTime',
                x: 31, y: 3,
                w: Math.ceil(calculateW(390)), h: calculateH(164),
                minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
                minH: calculateH(164), maxH: calculateH(200),
                isResizable: false,
            },
            {
                i: 'UpcTasks',
                x: 82, y: 3,
                w: Math.ceil(calculateW(400)), h: calculateH(164),
                minW: Math.ceil(calculateW(300)), maxW: Math.ceil(calculateW(1200)),
                minH: calculateH(95), maxH: calculateH(400)
            },
            {
                i: 'ProjectLogs',
                x: 134, y: 2,
                w: Math.ceil(calculateW(186)), h: calculateH(336),
                minW: Math.ceil(calculateW(150)), maxW: Math.ceil(calculateW(1111)),
                minH: calculateH(336), maxH: calculateH(900)
            },
            {
                i: 'reset',
                x: 0, y: 72,
                w: 999999, h: calculateH(20),
                minW: calculateW(10), maxW: calculateW(999999),
                minH: calculateH(10), maxH: calculateH(50),
                static: true
            },
        ],
    };

    // const getFromLS = (key) => {
    //     if (global.localStorage) {
    //         try {
    //             return JSON.parse(global.localStorage.getItem("rgl-8")) || null;
    //         } catch (e) {
    //             /* Ignore parsing errors */
    //         }
    //     }
    //     return null;
    // };

    const getFromLS = (key) => {
        if (global.localStorage) {
            try {
                console.log('log', 'getFromLS')
                return JSON.parse(global.localStorage.getItem("rgl-8"))?.[key] || null;
            } catch (e) {
                console.log('i catched err', 'log')
            }
        }
        return null;
    };

    const [layouts, setLayouts] = useState(() => {
        // const storedLayouts = getFromLS('savedPosition'); // Adjusted to directly get "x8" from localStorage
        // const storedLayouts = getFromLS(`${currentBreakpoint}`) || responsiveLayouts[currentBreakpoint];
        const storedLayouts = getFromLS(`savedPosition`) || responsiveLayouts[currentBreakpoint];
        console.log('Stored Layouts:', storedLayouts);
        return storedLayouts || JSON.parse(JSON.stringify(responsiveLayouts));
    });


    function deepEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }


    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint);
        console.log('Current Breakpoint:', breakpoint);
    };
    const onLayoutChange = (layout, layouts) => {
        saveToLS('savedPosition', layouts);
        prevLayoutsRef.current = layouts; // Update the ref instead of the state
    };
    const changeCompactView = () => {
        setIsVerticalCompact(!isVerticalCompact)
    }
    const refresh = () => window.location.reload(true)
    const resetSavedPosition = () => {
        if (global.localStorage) {
            global.localStorage.removeItem("rgl-8");
            // Avoid forced page reload here
            setLayouts(JSON.parse(JSON.stringify(responsiveLayouts))); // Reset layouts to the default
            setCurrentBreakpoint('x1'); // Reset breakpoint to the default
            refresh()
        }
    };
    const prevLayoutsRef = useRef(layouts);
    useEffect(() => {
        if (!deepEqual(prevLayoutsRef.current, layouts)) {
            saveToLS('savedPosition', layouts);
            // saveToLS(`${currentBreakpoint}`, layouts);
            setLayouts(layouts);
        }
    }, [layouts]);

    const saveToLS = (key, value) => {
        if (global.localStorage) {
            console.log('log', 'saveToLS')
            global.localStorage.setItem(
                "rgl-8",
                JSON.stringify({
                    [key]: value
                })
            );
        }
    };


    return (
        <ResponsiveGridLayout
            ref={gridLayoutRef}
            className={'grid_wrapper'}
            layouts={layouts}
            breakpoints={breakpoints}
            cols={cols}
            verticalCompact={isVerticalCompact}
            rowHeight={gridRowHeight}
            onBreakpointChange={onBreakpointChange}
            draggableHandle=".dragHandle"
            margin={gridMargins}
            isDraggable={true}
            isResizable={true}
            isBounded={false}
            allowOverlap={false}
            onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        >
            <button key="iVC" onClick={changeCompactView}>Change compact view</button>
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
            <button key={"reset"} className={'dragHandle'} onClick={resetSavedPosition}>Reset Saved Positions</button>
        </ResponsiveGridLayout>
        // </div>
    );
};

export default Grid;

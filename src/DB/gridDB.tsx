// import {useState} from "react";
//
// const breakpoints = {x0: 0, x1: 159};
// for (let i = 2; i <= 27; i++) {
//     breakpoints[`x:${i}`] = breakpoints[`x:${i - 1}`] + 160;
// }
// const cols = {x0: 1};
// for (let i = 1; i <= 27; i++) {
//     cols[`x:${i}`] = i * 20;
// }
// const [currentBreakpoint, setCurrentBreakpoint] = useState(0)
// // const gridMargins = [10, 10]// Margin between items [x, y] in px
// // const gridRowHeight = 1
// const calculateH = (expectedH:number) => ((expectedH + gridMargins[1]) / (gridRowHeight + gridMargins[1]))
// // const calculateW = (expectedWidth) => (expectedWidth + gridMargins[0]) / ((screenSize - (gridMargins[0] * (cols[currentBreakpoint] - 1))) / cols[currentBreakpoint] + gridMargins[0]);
// const calculateW = (expectedW:number) => (expectedW + gridMargins[0]) / (parseFloat((breakpoints[currentBreakpoint] - (gridMargins[0] * (cols[currentBreakpoint]))) / cols[currentBreakpoint]) + gridMargins[0])  //don't give exact width, but pretty close
//
//
//
// const responsiveLayouts: any = {
//     x8: [
//         {
//             i: 'iVC',
//             x: 0, y: -1,
//             w: 999999, h: calculateH(20),
//             minW: calculateW(10), maxW: calculateW(999999),
//             minH: calculateH(10), maxH: calculateH(50),
//             static: true
//         },{
//             i: 'OverallProgress',
//             x: 0, y: 0,
//             w: Math.ceil(calculateW(140)), h: calculateH(120),
//             minW: calculateW(120), maxW: calculateW(800),
//             minH: calculateH(120), maxH: calculateH(800),
//             // static: false,                 //static position and size  (isDraggable & isResizable):false
//             // isDraggable: false,
//             // isResizable: true,
//         },
//         {
//             i: 'ProgressBar',
//             x: 19, y: 0,
//             w: Math.ceil(calculateW(900)), h: calculateH(120),
//             minW: 40,
//             minH: calculateH(120), maxH: calculateH(120)
//         },
//         {
//             i: 'LaunchDate',
//             x: 134, y: 0,
//             w: calculateW(185), h: calculateH(120),
//             minW: calculateW(120), maxW: calculateW(800),
//             minH: calculateH(120), maxH: calculateH(600)
//         },
//         {
//             i: 'Risks',
//             x: 0, y: 1,
//             w: Math.ceil(calculateW(230)), h: calculateH(164),
//             minW: calculateW(170), maxW: calculateW(800),
//             minH: calculateH(80), maxH: calculateH(600),
//         },
//         {i: 'Budget',
//             x: 31, y: 1,
//             w: Math.ceil(calculateW(390)), h: calculateH(164),
//             minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
//             minH: calculateH(164), maxH: calculateH(200)
//         },
//         {i: 'OverdueTasks',
//             x: 82, y: 1,
//             w: Math.ceil(calculateW(400)), h: calculateH(164),
//             minW: Math.ceil(calculateW(300)), maxW: Math.ceil(calculateW(1200)),
//             minH: calculateH(95), maxH: calculateH(400)
//         },
//         {i: 'Summary',
//             x: 0, y: 2,
//             w: Math.ceil(calculateW(230)), h: calculateH(164),
//             minW: calculateW(180), maxW: calculateW(800),
//             minH: calculateH(144), maxH: calculateH(600),
//         },
//         {i: 'AvgTime',
//             x: 31, y: 2,
//             w: Math.ceil(calculateW(390)), h: calculateH(164),
//             minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
//             minH: calculateH(164), maxH: calculateH(200),
//             isResizable: false,
//         },
//         {i: 'UpcTasks',
//             x: 82, y: 2,
//             w: Math.ceil(calculateW(400)), h: calculateH(164),
//             minW: Math.ceil(calculateW(300)), maxW: Math.ceil(calculateW(1200)),
//             minH: calculateH(95), maxH: calculateH(400)
//         },
//         {i: 'ProjectLogs',
//             x: 134, y: 1,
//             w: Math.ceil(calculateW(186)), h: calculateH(336),
//             minW: Math.ceil(calculateW(150)), maxW: Math.ceil(calculateW(1111)),
//             minH: calculateH(336),maxH: calculateH(900)
//         },
//     ],
// };
//
// export {responsiveLayouts, setCurrentBreakpoint}
export default 0
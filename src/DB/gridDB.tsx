// // import {useState} from "react";
// //
// // const breakpoints = {x0: 0, x1: 159};
// // for (let i = 2; i <= 27; i++) {
// //     breakpoints[`x:${i}`] = breakpoints[`x:${i - 1}`] + 160;
// // }
// // const cols = {x0: 1};
// // for (let i = 1; i <= 27; i++) {
// //     cols[`x:${i}`] = i * 20;
// // }
// // const [currentBreakpoint, setCurrentBreakpoint] = useState(0)
// // // const gridMargins = [10, 10]// Margin between items [x, y] in px
// // // const gridRowHeight = 1
// // const calculateH = (expectedH:number) => ((expectedH + gridMargins[1]) / (gridRowHeight + gridMargins[1]))
// // // const calculateW = (expectedWidth) => (expectedWidth + gridMargins[0]) / ((screenSize - (gridMargins[0] * (cols[currentBreakpoint] - 1))) / cols[currentBreakpoint] + gridMargins[0]);
// // const calculateW = (expectedW:number) => (expectedW + gridMargins[0]) / (parseFloat((breakpoints[currentBreakpoint] - (gridMargins[0] * (cols[currentBreakpoint]))) / cols[currentBreakpoint]) + gridMargins[0])  //don't give exact width, but pretty close
// //
// //
// // const responsiveLayouts: any = {
// //     x8: [
// //         {
// //             i: 'iVC',
// //             x: 0, y: -1,
// //             w: 999999, h: calculateH(20),
// //             minW: calculateW(10), maxW: calculateW(999999),
// //             minH: calculateH(10), maxH: calculateH(50),
// //             static: true
// //         },{
// //             i: 'OverallProgress',
// //             x: 0, y: 0,
// //             w: Math.ceil(calculateW(140)), h: calculateH(120),
// //             minW: calculateW(120), maxW: calculateW(800),
// //             minH: calculateH(120), maxH: calculateH(800),
// //             // static: false,                 //static position and size  (isDraggable & isResizable):false
// //             // isDraggable: false,
// //             // isResizable: true,
// //         },
// //         {
// //             i: 'ProgressBar',
// //             x: 19, y: 0,
// //             w: Math.ceil(calculateW(900)), h: calculateH(120),
// //             minW: 40,
// //             minH: calculateH(120), maxH: calculateH(120)
// //         },
// //         {
// //             i: 'LaunchDate',
// //             x: 134, y: 0,
// //             w: calculateW(185), h: calculateH(120),
// //             minW: calculateW(120), maxW: calculateW(800),
// //             minH: calculateH(120), maxH: calculateH(600)
// //         },
// //         {
// //             i: 'Risks',
// //             x: 0, y: 1,
// //             w: Math.ceil(calculateW(230)), h: calculateH(164),
// //             minW: calculateW(170), maxW: calculateW(800),
// //             minH: calculateH(80), maxH: calculateH(600),
// //         },
// //         {i: 'Budget',
// //             x: 31, y: 1,
// //             w: Math.ceil(calculateW(390)), h: calculateH(164),
// //             minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
// //             minH: calculateH(164), maxH: calculateH(200)
// //         },
// //         {i: 'OverdueTasks',
// //             x: 82, y: 1,
// //             w: Math.ceil(calculateW(400)), h: calculateH(164),
// //             minW: Math.ceil(calculateW(300)), maxW: Math.ceil(calculateW(1200)),
// //             minH: calculateH(95), maxH: calculateH(400)
// //         },
// //         {i: 'Summary',
// //             x: 0, y: 2,
// //             w: Math.ceil(calculateW(230)), h: calculateH(164),
// //             minW: calculateW(180), maxW: calculateW(800),
// //             minH: calculateH(144), maxH: calculateH(600),
// //         },
// //         {i: 'AvgTime',
// //             x: 31, y: 2,
// //             w: Math.ceil(calculateW(390)), h: calculateH(164),
// //             minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
// //             minH: calculateH(164), maxH: calculateH(200),
// //             isResizable: false,
// //         },
// //         {i: 'UpcTasks',
// //             x: 82, y: 2,
// //             w: Math.ceil(calculateW(400)), h: calculateH(164),
// //             minW: Math.ceil(calculateW(300)), maxW: Math.ceil(calculateW(1200)),
// //             minH: calculateH(95), maxH: calculateH(400)
// //         },
// //         {i: 'ProjectLogs',
// //             x: 134, y: 1,
// //             w: Math.ceil(calculateW(186)), h: calculateH(336),
// //             minW: Math.ceil(calculateW(150)), maxW: Math.ceil(calculateW(1111)),
// //             minH: calculateH(336),maxH: calculateH(900)
// //         },
// //     ],
// // };
// //
// // export {responsiveLayouts, setCurrentBreakpoint}
// // export default 0
//
//
// const defaultDBposition:any = {
//
//     default: [
//         {
//             "w": 19,
//             "h": 11.818181818181818,
//             "x": 0,
//             "y": 0,
//             "i": "OverallProgress",
//             "minW": 16.26694473409802,
//             "maxW": 101.35557872784149,
//             "minH": 11.818181818181818,
//             "maxH": 73.63636363636364,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 97,
//             "h": 11.818181818181818,
//             "x": 19,
//             "y": 0,
//             "i": "ProgressBar",
//             "minW": 40,
//             "minH": 11.818181818181818,
//             "maxH": 11.818181818181818,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 24,
//             "h": 12,
//             "x": 116,
//             "y": 0,
//             "i": "LaunchDate",
//             "minW": 16.26694473409802,
//             "maxW": 101.35557872784149,
//             "minH": 11,
//             "maxH": 55.45454545454545,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 26,
//             "h": 16,
//             "x": 0,
//             "y": 11.818181818181818,
//             "i": "Risks",
//             "minW": 22.52346193952033,
//             "maxW": 101.35557872784149,
//             "minH": 8.181818181818182,
//             "maxH": 55.45454545454545,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 51,
//             "h": 16,
//             "x": 26,
//             "y": 11.818181818181818,
//             "i": "Budget",
//             "minW": 50,
//             "maxW": 57.559958289885294,
//             "minH": 15.818181818181818,
//             "maxH": 19.09090909090909,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 39,
//             "h": 16,
//             "x": 77,
//             "y": 11.818181818181818,
//             "i": "OverdueTasks",
//             "minW": 39,
//             "maxW": 152,
//             "minH": 9.545454545454545,
//             "maxH": 37.27272727272727,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 26,
//             "h": 16,
//             "x": 0,
//             "y": 27.81818181818182,
//             "i": "Summary",
//             "minW": 23.774765380604794,
//             "maxW": 101.35557872784149,
//             "minH": 14,
//             "maxH": 55.45454545454545,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 51,
//             "h": 16,
//             "x": 26,
//             "y": 27.81818181818182,
//             "i": "AvgTime",
//             "minW": 50,
//             "maxW": 57.559958289885294,
//             "minH": 15.818181818181818,
//             "maxH": 19.09090909090909,
//             "moved": false,
//             "static": false,
//             "isResizable": true
//         },
//         {
//             "w": 39,
//             "h": 16,
//             "x": 77,
//             "y": 27.81818181818182,
//             "i": "UpcTasks",
//             "minW": 39,
//             "maxW": 152,
//             "minH": 9.545454545454545,
//             "maxH": 37.27272727272727,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 24,
//             "h": 32,
//             "x": 116,
//             "y": 12,
//             "i": "ProjectLogs",
//             "minW": 21,
//             "maxW": 141,
//             "minH": 31.454545454545453,
//             "maxH": 82.72727272727273,
//             "moved": false,
//             "static": false
//         }
//     ]
//
//
// }
//
// export {defaultDBposition}
//
//
// /*
//
// // import {useState} from "react";
// //
// // const breakpoints = {x0: 0, x1: 159};
// // for (let i = 2; i <= 27; i++) {
// //     breakpoints[`x:${i}`] = breakpoints[`x:${i - 1}`] + 160;
// // }
// // const cols = {x0: 1};
// // for (let i = 1; i <= 27; i++) {
// //     cols[`x:${i}`] = i * 20;
// // }
// // const [currentBreakpoint, setCurrentBreakpoint] = useState(0)
// // // const gridMargins = [10, 10]// Margin between items [x, y] in px
// // // const gridRowHeight = 1
// // const calculateH = (expectedH:number) => ((expectedH + gridMargins[1]) / (gridRowHeight + gridMargins[1]))
// // // const calculateW = (expectedWidth) => (expectedWidth + gridMargins[0]) / ((screenSize - (gridMargins[0] * (cols[currentBreakpoint] - 1))) / cols[currentBreakpoint] + gridMargins[0]);
// // const calculateW = (expectedW:number) => (expectedW + gridMargins[0]) / (parseFloat((breakpoints[currentBreakpoint] - (gridMargins[0] * (cols[currentBreakpoint]))) / cols[currentBreakpoint]) + gridMargins[0])  //don't give exact width, but pretty close
// //
// //
// // const responsiveLayouts: any = {
// //     x8: [
// //         {
// //             i: 'iVC',
// //             x: 0, y: -1,
// //             w: 999999, h: calculateH(20),
// //             minW: calculateW(10), maxW: calculateW(999999),
// //             minH: calculateH(10), maxH: calculateH(50),
// //             static: true
// //         },{
// //             i: 'OverallProgress',
// //             x: 0, y: 0,
// //             w: Math.ceil(calculateW(140)), h: calculateH(120),
// //             minW: calculateW(120), maxW: calculateW(800),
// //             minH: calculateH(120), maxH: calculateH(800),
// //             // static: false,                 //static position and size  (isDraggable & isResizable):false
// //             // isDraggable: false,
// //             // isResizable: true,
// //         },
// //         {
// //             i: 'ProgressBar',
// //             x: 19, y: 0,
// //             w: Math.ceil(calculateW(900)), h: calculateH(120),
// //             minW: 40,
// //             minH: calculateH(120), maxH: calculateH(120)
// //         },
// //         {
// //             i: 'LaunchDate',
// //             x: 134, y: 0,
// //             w: calculateW(185), h: calculateH(120),
// //             minW: calculateW(120), maxW: calculateW(800),
// //             minH: calculateH(120), maxH: calculateH(600)
// //         },
// //         {
// //             i: 'Risks',
// //             x: 0, y: 1,
// //             w: Math.ceil(calculateW(230)), h: calculateH(164),
// //             minW: calculateW(170), maxW: calculateW(800),
// //             minH: calculateH(80), maxH: calculateH(600),
// //         },
// //         {i: 'Budget',
// //             x: 31, y: 1,
// //             w: Math.ceil(calculateW(390)), h: calculateH(164),
// //             minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
// //             minH: calculateH(164), maxH: calculateH(200)
// //         },
// //         {i: 'OverdueTasks',
// //             x: 82, y: 1,
// //             w: Math.ceil(calculateW(400)), h: calculateH(164),
// //             minW: Math.ceil(calculateW(300)), maxW: Math.ceil(calculateW(1200)),
// //             minH: calculateH(95), maxH: calculateH(400)
// //         },
// //         {i: 'Summary',
// //             x: 0, y: 2,
// //             w: Math.ceil(calculateW(230)), h: calculateH(164),
// //             minW: calculateW(180), maxW: calculateW(800),
// //             minH: calculateH(144), maxH: calculateH(600),
// //         },
// //         {i: 'AvgTime',
// //             x: 31, y: 2,
// //             w: Math.ceil(calculateW(390)), h: calculateH(164),
// //             minW: Math.ceil(calculateW(386)), maxW: calculateW(450),
// //             minH: calculateH(164), maxH: calculateH(200),
// //             isResizable: false,
// //         },
// //         {i: 'UpcTasks',
// //             x: 82, y: 2,
// //             w: Math.ceil(calculateW(400)), h: calculateH(164),
// //             minW: Math.ceil(calculateW(300)), maxW: Math.ceil(calculateW(1200)),
// //             minH: calculateH(95), maxH: calculateH(400)
// //         },
// //         {i: 'ProjectLogs',
// //             x: 134, y: 1,
// //             w: Math.ceil(calculateW(186)), h: calculateH(336),
// //             minW: Math.ceil(calculateW(150)), maxW: Math.ceil(calculateW(1111)),
// //             minH: calculateH(336),maxH: calculateH(900)
// //         },
// //     ],
// // };
// //
// // export {responsiveLayouts, setCurrentBreakpoint}
// // export default 0
//
//
// const defaultDBposition:any = {
//
//     default: [
//         {
//             "w": 19,
//             "h": 11.818181818181818,
//             "x": 0,
//             "y": 0,
//             "i": "OverallProgress",
//             "minW": 16.26694473409802,
//             "maxW": 101.35557872784149,
//             "minH": 11.818181818181818,
//             "maxH": 73.63636363636364,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 97,
//             "h": 11.818181818181818,
//             "x": 19,
//             "y": 0,
//             "i": "ProgressBar",
//             "minW": 40,
//             "minH": 11.818181818181818,
//             "maxH": 11.818181818181818,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 24,
//             "h": 12,
//             "x": 116,
//             "y": 0,
//             "i": "LaunchDate",
//             "minW": 16.26694473409802,
//             "maxW": 101.35557872784149,
//             "minH": 11,
//             "maxH": 55.45454545454545,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 26,
//             "h": 16,
//             "x": 0,
//             "y": 11.818181818181818,
//             "i": "Risks",
//             "minW": 22.52346193952033,
//             "maxW": 101.35557872784149,
//             "minH": 8.181818181818182,
//             "maxH": 55.45454545454545,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 51,
//             "h": 16,
//             "x": 26,
//             "y": 11.818181818181818,
//             "i": "Budget",
//             "minW": 50,
//             "maxW": 57.559958289885294,
//             "minH": 15.818181818181818,
//             "maxH": 19.09090909090909,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 39,
//             "h": 16,
//             "x": 77,
//             "y": 11.818181818181818,
//             "i": "OverdueTasks",
//             "minW": 39,
//             "maxW": 152,
//             "minH": 9.545454545454545,
//             "maxH": 37.27272727272727,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 26,
//             "h": 16,
//             "x": 0,
//             "y": 27.81818181818182,
//             "i": "Summary",
//             "minW": 23.774765380604794,
//             "maxW": 101.35557872784149,
//             "minH": 14,
//             "maxH": 55.45454545454545,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 51,
//             "h": 16,
//             "x": 26,
//             "y": 27.81818181818182,
//             "i": "AvgTime",
//             "minW": 50,
//             "maxW": 57.559958289885294,
//             "minH": 15.818181818181818,
//             "maxH": 19.09090909090909,
//             "moved": false,
//             "static": false,
//             "isResizable": true
//         },
//         {
//             "w": 39,
//             "h": 16,
//             "x": 77,
//             "y": 27.81818181818182,
//             "i": "UpcTasks",
//             "minW": 39,
//             "maxW": 152,
//             "minH": 9.545454545454545,
//             "maxH": 37.27272727272727,
//             "moved": false,
//             "static": false
//         },
//         {
//             "w": 24,
//             "h": 32,
//             "x": 116,
//             "y": 12,
//             "i": "ProjectLogs",
//             "minW": 21,
//             "maxW": 141,
//             "minH": 31.454545454545453,
//             "maxH": 82.72727272727273,
//             "moved": false,
//             "static": false
//         }
//     ]
//
//
// }
//
// export {defaultDBposition}                                      // todo make default and make it work
//  */

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


const defaultDBposition:any =         {
    "x8": [
        {
            "i": "iVC",
            "x": 0,
            "y": 0,
            "w": 999999,
            "h": 2.727272727272727,
            "minW": 2.502606882168926,
            "maxW": 125131.47028154327,
            "minH": 1.8181818181818181,
            "maxH": 5.454545454545454,
            "static": true
        },
        {
            "i": "OverallProgress",
            "x": 0,
            "y": 1,
            "w": 19,
            "h": 11.818181818181818,
            "minW": 16.26694473409802,
            "maxW": 101.35557872784149,
            "minH": 11.818181818181818,
            "maxH": 73.63636363636364
        },
        {
            "i": "ProgressBar",
            "x": 19,
            "y": 1,
            "w": 114,
            "h": 11.818181818181818,
            "minW": 40,
            "minH": 11.818181818181818,
            "maxH": 11.818181818181818
        },
        {
            "i": "LaunchDate",
            "x": 134,
            "y": 1,
            "w": 24.400417101147028,
            "h": 11.818181818181818,
            "minW": 16.26694473409802,
            "maxW": 101.35557872784149,
            "minH": 11.818181818181818,
            "maxH": 55.45454545454545
        },
        {
            "i": "Risks",
            "x": 0,
            "y": 2,
            "w": 31,
            "h": 15.818181818181818,
            "minW": 22.52346193952033,
            "maxW": 101.35557872784149,
            "minH": 8.181818181818182,
            "maxH": 55.45454545454545
        },
        {
            "i": "Budget",
            "x": 31,
            "y": 2,
            "w": 51,
            "h": 15.818181818181818,
            "minW": 50,
            "maxW": 57.559958289885294,
            "minH": 15.818181818181818,
            "maxH": 19.09090909090909
        },
        {
            "i": "OverdueTasks",
            "x": 82,
            "y": 2,
            "w": 52,
            "h": 15.818181818181818,
            "minW": 39,
            "maxW": 152,
            "minH": 9.545454545454545,
            "maxH": 37.27272727272727
        },
        {
            "i": "Summary",
            "x": 0,
            "y": 3,
            "w": 31,
            "h": 15.818181818181818,
            "minW": 23.774765380604794,
            "maxW": 101.35557872784149,
            "minH": 14,
            "maxH": 55.45454545454545
        },
        {
            "i": "AvgTime",
            "x": 31,
            "y": 3,
            "w": 51,
            "h": 15.818181818181818,
            "minW": 50,
            "maxW": 57.559958289885294,
            "minH": 15.818181818181818,
            "maxH": 19.09090909090909,
            "isResizable": false
        },
        {
            "i": "UpcTasks",
            "x": 82,
            "y": 3,
            "w": 52,
            "h": 15.818181818181818,
            "minW": 39,
            "maxW": 152,
            "minH": 9.545454545454545,
            "maxH": 37.27272727272727
        },
        {
            "i": "ProjectLogs",
            "x": 134,
            "y": 2,
            "w": 25,
            "h": 31.454545454545453,
            "minW": 21,
            "maxW": 141,
            "minH": 31.454545454545453,
            "maxH": 82.72727272727273
        },
        {
            "i": "reset",
            "x": 0,
            "y": 0,
            "w": 999999,
            "h": 2.727272727272727,
            "minW": 2.502606882168926,
            "maxW": 125131.47028154327,
            "minH": 1.8181818181818181,
            "maxH": 5.454545454545454,
            "static": true
        }
    ],
    "x6": [
        {
            "w": 120,
            "h": 2.727272727272727,
            "x": 0,
            "y": 3,
            "i": "iVC",
            "minW": 2.502606882168926,
            "maxW": 125131.47028154327,
            "minH": 1.8181818181818181,
            "maxH": 5.454545454545454,
            "moved": false,
            "static": true
        },
        {
            "w": 19,
            "h": 11.818181818181818,
            "x": 0,
            "y": 5.727272727272727,
            "i": "OverallProgress",
            "minW": 16.26694473409802,
            "maxW": 101.35557872784149,
            "minH": 11.818181818181818,
            "maxH": 73.63636363636364,
            "moved": false,
            "static": false
        },
        {
            "w": 114,
            "h": 11.818181818181818,
            "x": 6,
            "y": 17.545454545454547,
            "i": "ProgressBar",
            "minW": 40,
            "minH": 11.818181818181818,
            "maxH": 11.818181818181818,
            "moved": false,
            "static": false
        },
        {
            "w": 24.400417101147028,
            "h": 11.818181818181818,
            "x": 95.59958289885297,
            "y": 36.72727272727273,
            "i": "LaunchDate",
            "minW": 16.26694473409802,
            "maxW": 101.35557872784149,
            "minH": 11.818181818181818,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 31,
            "h": 15.818181818181818,
            "x": 0,
            "y": 36.72727272727273,
            "i": "Risks",
            "minW": 22.52346193952033,
            "maxW": 101.35557872784149,
            "minH": 8.181818181818182,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 51,
            "h": 15.818181818181818,
            "x": 31,
            "y": 36.72727272727273,
            "i": "Budget",
            "minW": 50,
            "maxW": 57.559958289885294,
            "minH": 15.818181818181818,
            "maxH": 19.09090909090909,
            "moved": false,
            "static": false
        },
        {
            "w": 52,
            "h": 15.818181818181818,
            "x": 68,
            "y": 52.54545454545455,
            "i": "OverdueTasks",
            "minW": 39,
            "maxW": 152,
            "minH": 9.545454545454545,
            "maxH": 37.27272727272727,
            "moved": false,
            "static": false
        },
        {
            "w": 31,
            "h": 15.818181818181818,
            "x": 0,
            "y": 52.54545454545455,
            "i": "Summary",
            "minW": 23.774765380604794,
            "maxW": 101.35557872784149,
            "minH": 14,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 51,
            "h": 15.818181818181818,
            "x": 31,
            "y": 68.36363636363636,
            "i": "AvgTime",
            "minW": 50,
            "maxW": 57.559958289885294,
            "minH": 15.818181818181818,
            "maxH": 19.09090909090909,
            "moved": false,
            "static": false,
            "isResizable": false
        },
        {
            "w": 52,
            "h": 15.818181818181818,
            "x": 68,
            "y": 84.18181818181817,
            "i": "UpcTasks",
            "minW": 39,
            "maxW": 152,
            "minH": 9.545454545454545,
            "maxH": 37.27272727272727,
            "moved": false,
            "static": false
        },
        {
            "w": 25,
            "h": 31.454545454545453,
            "x": 95,
            "y": 99.99999999999999,
            "i": "ProjectLogs",
            "minW": 21,
            "maxW": 141,
            "minH": 31.454545454545453,
            "maxH": 82.72727272727273,
            "moved": false,
            "static": false
        },
        {
            "w": 120,
            "h": 2.727272727272727,
            "x": 0,
            "y": 34,
            "i": "reset",
            "minW": 2.502606882168926,
            "maxW": 125131.47028154327,
            "minH": 1.8181818181818181,
            "maxH": 5.454545454545454,
            "moved": false,
            "static": true
        }
    ],
    "x7": [
        {
            "w": 19,
            "h": 11.818181818181818,
            "x": 0,
            "y": 0,
            "i": "OverallProgress",
            "minW": 16.26694473409802,
            "maxW": 101.35557872784149,
            "minH": 11.818181818181818,
            "maxH": 73.63636363636364,
            "moved": false,
            "static": false
        },
        {
            "w": 96,
            "h": 11.818181818181818,
            "x": 19,
            "y": 0,
            "i": "ProgressBar",
            "minW": 40,
            "minH": 11.818181818181818,
            "maxH": 11.818181818181818,
            "moved": false,
            "static": false
        },
        {
            "w": 24.400417101147028,
            "h": 11.818181818181818,
            "x": 115.59958289885297,
            "y": 0,
            "i": "LaunchDate",
            "minW": 16.26694473409802,
            "maxW": 101.35557872784149,
            "minH": 11.818181818181818,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 26,
            "h": 16,
            "x": 0,
            "y": 11.818181818181818,
            "i": "Risks",
            "minW": 22.52346193952033,
            "maxW": 101.35557872784149,
            "minH": 8.181818181818182,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 51,
            "h": 15.818181818181818,
            "x": 26,
            "y": 11.818181818181818,
            "i": "Budget",
            "minW": 50,
            "maxW": 57.559958289885294,
            "minH": 15.818181818181818,
            "maxH": 19.09090909090909,
            "moved": false,
            "static": false
        },
        {
            "w": 39,
            "h": 15,
            "x": 77,
            "y": 11.818181818181818,
            "i": "OverdueTasks",
            "minW": 39,
            "maxW": 152,
            "minH": 9.545454545454545,
            "maxH": 37.27272727272727,
            "moved": false,
            "static": false
        },
        {
            "w": 26,
            "h": 16,
            "x": 0,
            "y": 27.81818181818182,
            "i": "Summary",
            "minW": 23.774765380604794,
            "maxW": 101.35557872784149,
            "minH": 14,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 51,
            "h": 15.818181818181818,
            "x": 26,
            "y": 27.636363636363637,
            "i": "AvgTime",
            "minW": 50,
            "maxW": 57.559958289885294,
            "minH": 15.818181818181818,
            "maxH": 19.09090909090909,
            "moved": false,
            "static": false,
            "isResizable": false
        },
        {
            "w": 39,
            "h": 16,
            "x": 77,
            "y": 26.81818181818182,
            "i": "UpcTasks",
            "minW": 39,
            "maxW": 152,
            "minH": 9.545454545454545,
            "maxH": 37.27272727272727,
            "moved": false,
            "static": false
        },
        {
            "w": 24,
            "h": 31.454545454545453,
            "x": 116,
            "y": 11.818181818181818,
            "i": "ProjectLogs",
            "minW": 21,
            "maxW": 141,
            "minH": 31.454545454545453,
            "maxH": 82.72727272727273,
            "moved": false,
            "static": false
        }
    ],
    "x9": [
        {
            "w": 19,
            "h": 11.818181818181818,
            "x": 0,
            "y": 5.727272727272727,
            "i": "OverallProgress",
            "minW": 16.26694473409802,
            "maxW": 101.35557872784149,
            "minH": 11.818181818181818,
            "maxH": 73.63636363636364,
            "moved": false,
            "static": false
        },
        {
            "w": 114,
            "h": 11.818181818181818,
            "x": 19,
            "y": 5.727272727272727,
            "i": "ProgressBar",
            "minW": 40,
            "minH": 11.818181818181818,
            "maxH": 11.818181818181818,
            "moved": false,
            "static": false
        },
        {
            "w": 24.400417101147028,
            "h": 11.818181818181818,
            "x": 134,
            "y": 5.727272727272727,
            "i": "LaunchDate",
            "minW": 16.26694473409802,
            "maxW": 101.35557872784149,
            "minH": 11.818181818181818,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 31,
            "h": 15.818181818181818,
            "x": 0,
            "y": 17.545454545454547,
            "i": "Risks",
            "minW": 22.52346193952033,
            "maxW": 101.35557872784149,
            "minH": 8.181818181818182,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 51,
            "h": 15.818181818181818,
            "x": 31,
            "y": 17.545454545454547,
            "i": "Budget",
            "minW": 50,
            "maxW": 57.559958289885294,
            "minH": 15.818181818181818,
            "maxH": 19.09090909090909,
            "moved": false,
            "static": false
        },
        {
            "w": 52,
            "h": 15.818181818181818,
            "x": 82,
            "y": 17.545454545454547,
            "i": "OverdueTasks",
            "minW": 39,
            "maxW": 152,
            "minH": 9.545454545454545,
            "maxH": 37.27272727272727,
            "moved": false,
            "static": false
        },
        {
            "w": 31,
            "h": 15.818181818181818,
            "x": 0,
            "y": 36.72727272727273,
            "i": "Summary",
            "minW": 23.774765380604794,
            "maxW": 101.35557872784149,
            "minH": 14,
            "maxH": 55.45454545454545,
            "moved": false,
            "static": false
        },
        {
            "w": 51,
            "h": 15.818181818181818,
            "x": 31,
            "y": 36.72727272727273,
            "i": "AvgTime",
            "minW": 50,
            "maxW": 57.559958289885294,
            "minH": 15.818181818181818,
            "maxH": 19.09090909090909,
            "moved": false,
            "static": false,
            "isResizable": false
        },
        {
            "w": 52,
            "h": 15.818181818181818,
            "x": 82,
            "y": 36.72727272727273,
            "i": "UpcTasks",
            "minW": 39,
            "maxW": 152,
            "minH": 9.545454545454545,
            "maxH": 37.27272727272727,
            "moved": false,
            "static": false
        },
        {
            "w": 25,
            "h": 31.454545454545453,
            "x": 134,
            "y": 36.72727272727273,
            "i": "ProjectLogs",
            "minW": 21,
            "maxW": 141,
            "minH": 31.454545454545453,
            "maxH": 82.72727272727273,
            "moved": false,
            "static": false
        }
    ]
}

export {defaultDBposition}
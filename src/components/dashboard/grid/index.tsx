//@ts-nocheck
import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import RGL, {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css'
import OverallProgress from './../widgets/overallProgress'
import ProgressBar from "./../widgets/progressBar";
import LaunchDate from "./../widgets/launchDate";
import Risks from "./../widgets/risks";
import Budget from "./../widgets/budget";
import OverdueTasks from "./../widgets/overdueTasks";
import Summary from "./../widgets/summary";
import AvgTime from "./../widgets/avgTime";
import UpcTasks from "./../widgets/upcomingDeadlines";
import ProjectLogs from "./../widgets/logs";
import {gridMargins, gridRowHeight} from "./../const";
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
                  allWidgets,
                  currentCompactType,
                  layouts,
                  breakpoints,
                  cols,
                  widgets,
                  onLayoutChange,
                  addWidgetByKeyOnClick,
                  removeByKeyOnClick,
                  removeAllOnClick,
              }) => {

    const gridLayoutRef = useRef(null);
    // const ResponsiveGridLayout = WidthProvider(Responsive);
    const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);      //todo ask why it useMemo?

    // useEffect(() => {
    // }, [layouts]);
    //
    //
    //
    // useEffect(() => {
    //     for (let i = 0; i < widgetList.length; i++) {
    //         addWidgetByKeyOnClick(widgetList[i])
    //     }                                                   //todo must create widgets in restart, but don't work
    // }, []);

    return (
        <div>
            <ResponsiveGridLayout
                ref={gridLayoutRef}
                className={'grid_wrapper'}
                layouts={layouts}
                breakpoints={breakpoints}
                cols={cols}
                compactType={currentCompactType}
                rowHeight={gridRowHeight}
                currentCompactType={currentCompactType}
                draggableHandle=".dragHandle"
                margin={gridMargins}
                isDraggable={true}
                isResizable={true}
                isBounded={false}
                allowOverlap={false}
                onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
                // preventCollision={true}
            >
                {allWidgets.map((widget) => {
                    const WidgetEl = widget.el
                    return (
                        <div
                            className={"widget"}
                            key={widget.key}
                            data-grid={widget.data}
                        >

                            <WidgetEl

                            />
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


// {/*{allWidgets.map((widget) => {*/}
// {/*    const WidgetEl = widget.el*/}
// {/*    return (*/}
// {/*        <div*/}
// {/*            className={"widget"}*/}
// {/*            key={widget.key}>*/}
// {/*            <WidgetEl*/}
// {/*            />*/}
// {/*            /!*<div style={{*!/*/}
// {/*            /!*    background: 'gray',*!/*/}
// {/*            /!*    fontSize: '24px',*!/*/}
// {/*            /!*    margin: 'auto',*!/*/}
// {/*            /!*    height: '100%',*!/*/}
// {/*            /!*    textAlign: 'center'*!/*/}
// {/*            /!*}}>*!/*/}
// {/*            /!*    <div style={{*!/*/}
// {/*            /!*        position: 'relative',*!/*/}
// {/*            /!*        top: '50%',*!/*/}
// {/*            /!*        transform: 'translate(0, -50%)'*!/*/}
// {/*            /!*    }}>{widget.key}</div>*!/*/}
// {/*            /!*</div>*!/*/}
// {/*            <span*/}
// {/*                className="remove_btn"*/}
// {/*                style={{*/}
// {/*                    position: "absolute",*/}
// {/*                    right: "2px",*/}
// {/*                    top: 0,*/}
// {/*                    cursor: "pointer"*/}
// {/*                }}*/}
// {/*                onClick={() => removeByKeyOnClick(widget.key)}*/}
// {/*            >*/}
// {/*            &#10006;*/}
// {/*        </span>*/}
// {/*        </div>*/}
// {/*    )*/}
// {/*})}*/}
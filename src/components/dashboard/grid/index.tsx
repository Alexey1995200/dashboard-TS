import React, {ReactElement, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import RGL, {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css'
import {Breakpoints, gridMargins, gridRowHeight} from "./../const";
import {ILayouts, IWidget, IWidgetData, IWidgets} from "../index";
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

interface IGrid {
    allWidgets:IWidget[];
    currentCompactType:"vertical" | "horizontal" | null | undefined;
    layouts:ILayouts;
    breakpoints:Breakpoints;
    cols:Breakpoints;
    widgets:IWidgets;
    handleLayoutChange:(layout: IWidgetData[], layouts: ILayouts)=>void;
    removeByKeyOnClick:()=>{};
}

const Grid = ({
                  allWidgets,
                  currentCompactType,
                  layouts,
                  breakpoints,
                  cols,
                  handleLayoutChange,
                  removeByKeyOnClick,
              }:IGrid) => {

    const gridLayoutRef = useRef(null);
    // const ResponsiveGridLayout = WidthProvider(Responsive);
    const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);      //todo ask why it useMemo?


    return (
        <div>
            <ResponsiveGridLayout
                ref={gridLayoutRef}
                className={'grid_wrapper'}
                layouts={layouts as ReactGridLayout.Layout}
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
                onLayoutChange={(layout, layouts) => handleLayoutChange(layout, layouts)}
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
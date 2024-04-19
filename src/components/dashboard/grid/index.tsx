import React, {ComponentType, ReactElement, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import RGL, {Layouts, Responsive, ResponsiveProps, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css'
import {gridMargins, gridRowHeight} from "../const";
import {Breakpoints, ILayouts, IWidget, IWidgetData, IWidgetEl, IWidgets, TCurrentTheme} from "../interfaces";
import {theme} from "../../../assets/colors";

interface IGrid {
    allWidgets: IWidget[];
    currentCompactType: "vertical" | "horizontal" | null | undefined;
    layouts: ILayouts | undefined;
    breakpoints: Breakpoints;
    cols: Breakpoints;
    widgets: IWidgets;
    handleLayoutChange: (layout: IWidgetData[], layouts: ILayouts) => void;
    removeByKeyOnClick: (key: string) => void;
    currentTheme: TCurrentTheme
}

const Grid = ({
                  allWidgets,
                  currentCompactType,
                  layouts,
                  breakpoints,
                  cols,
                  handleLayoutChange,
                  removeByKeyOnClick,
                  currentTheme
              }: IGrid) => {
    const gridLayoutRef = useRef(null);
    const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
    return (
        <div>
            <ResponsiveGridLayout
                ref={gridLayoutRef}
                className={'grid_wrapper'}
                layouts={layouts as Layouts}
                breakpoints={breakpoints}
                cols={cols}
                rowHeight={gridRowHeight}
                compactType={currentCompactType}
                draggableHandle=".dragHandle"
                margin={gridMargins}
                isDraggable={true}
                isResizable={true}
                isBounded={false}
                allowOverlap={false}
                onLayoutChange={(layout, layouts) => handleLayoutChange(layout, layouts)}
                style={{backgroundColor: currentTheme ? theme.dashboard.grid.BGColor[currentTheme] : 'b2b2b2'}}
            >
                {allWidgets &&
                    allWidgets.map((widget) => {
                        const WidgetEl: React.FC<IWidgetEl> = widget.el
                        return (
                            <div
                                className={"widget"}
                                key={widget.key}
                                data-grid={widget.data}
                            >
                                <WidgetEl
                                    currentTheme={currentTheme}
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
                    })

                }


            </ResponsiveGridLayout>
        </div>
    );
};

export default Grid;
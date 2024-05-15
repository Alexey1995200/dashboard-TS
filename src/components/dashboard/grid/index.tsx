import React, {useMemo, useRef} from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css'
import {gridMargins, gridRowHeight} from "../const";
import {Breakpoints, ILayouts, IWidget, IWidgetData, IWidgetEl, IWidgets, TCurrentTheme, TLoading} from "../interfaces";
import {palette, theme} from "../../../assets/colors";
import {DataProvider, useData} from "../../../context/dataContext";
import {IDB} from "../../../DB/db";

interface IGrid {
    allWidgets: IWidget[];
    currentCompactType: "vertical" | "horizontal" | null | undefined;
    breakpoints: Breakpoints;
    cols: Breakpoints;
    widgets: IWidgets;
    handleLayoutChange: (layout: IWidgetData[], layouts: ILayouts) => void;
    removeByKeyOnClick: (key: string) => void;
    currentTheme: TCurrentTheme;
    DBData: IDB | null;
    isDataLoading: boolean;
}

const Grid = ({
                  allWidgets,
                  currentCompactType,
                  breakpoints,
                  cols,
                  handleLayoutChange,
                  removeByKeyOnClick,
                  currentTheme,
                  DBData,
                  isDataLoading
              }: IGrid) => {
    const gridLayoutRef = useRef(null);
    const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
    const themeWidgetFontColor = () => currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black
    const themeWidgetBackgroundColor = () => currentTheme ? theme.dashboard.grid.widget.BGColor[currentTheme] : palette.white

    // const {
    //     tasks,
    //     employees,
    //     finishProjectTimestampMS,
    //     tasksProgress,
    //     isLoading
    // } = useData()
    return (
        <ResponsiveGridLayout
            ref={gridLayoutRef}
            className={'grid_wrapper'}
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
                            <DataProvider
                            >
                                <WidgetEl
                                    currentTheme={currentTheme}
                                    themeFontColor={themeWidgetFontColor()}
                                    themeBackgroundColor={themeWidgetBackgroundColor()}
                                    DBData={DBData}
                                    isDataLoading={isDataLoading}
                                />
                            </DataProvider>

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
    );
};

export default Grid;
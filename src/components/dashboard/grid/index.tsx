import React, {useEffect, useMemo, useRef} from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css'
import {gridMargins, gridRowHeight} from "../const";
import {Breakpoints, ILayouts, IWidget, IWidgetData, IWidgets, TCurrentTheme} from "../interfaces";
import {palette, theme} from "../../../assets/colors";
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
  isLayoutHandledOnce:boolean;
  setIsGridRenderedOnce:React.Dispatch<React.SetStateAction<boolean>>;
  isGridRenderedOnce:boolean
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
                isLayoutHandledOnce,
                setIsGridRenderedOnce,
                isGridRenderedOnce
              }: IGrid) => {
  const gridLayoutRef = useRef(null);
  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
  const themeWidgetFontColor = currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black
  const themeWidgetBackgroundColor = currentTheme ? theme.dashboard.grid.widget.BGColor[currentTheme] : palette.white
  setIsGridRenderedOnce(true)
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
      style={{
        backgroundColor: currentTheme ? theme.dashboard.grid.BGColor[currentTheme] : palette.tangledWeb,
      }}
      // onBreakpointChange={} todo
    >
      {allWidgets && breakpoints && cols && isGridRenderedOnce &&
        allWidgets.map(({el : WidgetEl, key, data}) => {
          // const WidgetEl: React.FC<IWidgetEl> = widget.el
          return (
            <div
              className={"widget"}
              key={key}
              data-grid={data}
            >
              <WidgetEl
                currentTheme={currentTheme}
                themeFontColor={themeWidgetFontColor}
                themeBackgroundColor={themeWidgetBackgroundColor}
                DBData={DBData}
              />
              <span
                className="remove_btn"
                style={{
                  position: "absolute",
                  right: "2px",
                  top: 0,
                  cursor: "pointer"
                }}
                onClick={() => removeByKeyOnClick(key)}
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
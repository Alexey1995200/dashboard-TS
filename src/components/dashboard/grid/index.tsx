import React, {useMemo, useRef, useState} from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css'
import {gridMargins, gridRowHeight} from "../const";
import {Breakpoints, ExtendedCompactType, ILayouts, IWidget, IWidgetData, IWidgets} from "../interfaces";
import {theme} from "../../../assets/colors";
import {IDB} from "../../../DB/db";
import {ThemeType} from "../../../context/themeProvider";

interface IGridProps {
  allWidgets: IWidget[];
  currentCompactType: ExtendedCompactType;
  breakpoints: Breakpoints;
  cols: Breakpoints;
  widgets: IWidgets;
  handleLayoutChange: (layout: IWidgetData[], layouts: ILayouts) => void;
  removeByKeyOnClick: (key: string) => void;
  currentTheme: ThemeType;
  DBData: IDB | null;
  isDataLoading: boolean;
  isLayoutHandledOnce: boolean;
}

const Grid = ({
  allWidgets,
  currentCompactType,
  breakpoints,
  cols,
  handleLayoutChange,
  removeByKeyOnClick,
  currentTheme,
}: IGridProps) => {
  const [isBreakpointChanged, setIsBreakpointChanged] = useState<boolean>(false)
  const gridLayoutRef = useRef(null);
  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

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
        backgroundColor: theme.dashboard.grid.BGColor[currentTheme]
      }}
      onBreakpointChange={
        () => setIsBreakpointChanged(true)
      }
    >
      {
        allWidgets &&
        isBreakpointChanged &&   // test with allWidgets.length  and without allWidgets
        allWidgets.map(({el: WidgetEl, key, data}) => {
          return (
            <div
              className={"widget"}
              key={key}
              data-grid={data}
            >
              <WidgetEl/>
              <span
                className="widget__remove_btn"
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


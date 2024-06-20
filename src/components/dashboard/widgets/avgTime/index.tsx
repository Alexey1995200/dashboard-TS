import './styles.scss'
import {theme} from "../../../../assets/colors";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {IEmployee} from "../../../../DB/db";
import {useTheme} from "../../../../context/themeProvider";
import {useData} from "../../../../context/dataContext";
import {cutName, getDimensions} from "../../const";
import Chart from "../../../chart";


const AvgTime = () => {
  const avgRef = useRef<HTMLDivElement>(null)
  const avgDragRef = useRef<HTMLDivElement>(null)
  const [avgScale, setAvgScale] = useState<number>(1)
  const [widgetWidth, setWidgetWidth] = useState<number>(0)
  const [widgetHeight, setWidgetHeight] = useState<number>(0)
  const [dragHandleHeight, setDragHandleHeight] = useState<number>(0)
  const [employeesArr, setEmployeesArr] = useState<IEmployee[]>([
    {
      name: 'placeholder',
      id: 1,
      workload: 1,
      avgDays: 1
    }
  ])
  const {currentTheme} = useTheme()
  const {DBData} = useData()
  const barWidth = useMemo(() => {
    const chartWidth = widgetWidth - 80
    return chartWidth / (employeesArr).length * .5
  }, [widgetWidth, employeesArr])
  const handleResize = () => {
    const [width, height] = getDimensions(avgRef);
    setWidgetWidth(width)
    setWidgetHeight(height)
    setAvgScale((Math.min(width / 2, height) / 140));
    const [dragWidth, dragHeight] = getDimensions(avgDragRef);
    setDragHandleHeight(dragHeight)
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);//todo read about  ̶e̶v̶e̶n̶t̶_l̶i̶s̶t̶e̶n̶e̶r̶ / resize observer
    if (avgRef.current) {
      resizeObserver.observe(avgRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (DBData) {
      const emp = Object.values(DBData.employees).filter((employee) =>
        employee.avgDays ? employee.avgDays : false)
      setEmployeesArr(emp)
    }
  }, [DBData]);

  const avgData = employeesArr
    .filter(employee => typeof employee.avgDays === 'number')
    .map(employee => ({
      x: employee.name ? employee.name : employee.fullName,
      y: employee.avgDays
    }));

  const avgDataFix = useMemo(() => {
    return avgData.map(employee => ({
      ...employee,
      x: cutName((employee.x ? employee.x : 'Name'), 5)
    }));
  }, [avgData])
  return (
    <div className={'avgTime__wrapper'}
         style={{
           color: theme.dashboard.grid.widget.color[currentTheme],
           backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
         }}
         ref={avgRef}
    >
      <div className={'centered_title dragHandle'}
           style={{transform: `scale(${avgScale > 1.25 ? avgScale / 1.25 : 1})`}}
           ref={avgDragRef}
      >Avg Handle Time in days for Project-Task
      </div>
      <Chart
        // @ts-ignore
        data={avgDataFix}
        chartStyle={{height: `${(widgetHeight - dragHandleHeight)}px`}}
      />
    </div>
  )
}
export default AvgTime
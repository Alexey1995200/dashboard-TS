import {useEffect, useMemo, useRef, useState} from "react";
import {useTheme} from "../../context/themeProvider";

import './styles.scss'
import {palette, theme} from "../../assets/colors";
import {getDimensions} from "../dashboard/const";

interface IIncomingData {
  x: string
  y: number
}
interface ChartProps {
  data: IIncomingData[],
  chartStyle?:any
}
const Chart = ({data, chartStyle}:ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartRefWidth, setChartRefWidth] = useState<number>(0)
  const [chartRefHeight, setChartRefHeight] = useState<number>(0)
  const {currentTheme} = useTheme()
  const handleResize = () => {
    const [width, height] = getDimensions(chartRef);
    setChartRefWidth(width)
    setChartRefHeight(height)
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize)
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  const yValues = data.map(obj => obj.y)
  const maxY: number = Math.max(...yValues)
  const roundToNiceValue = (number:number) => {
    if (number < 50) {
      if (number <= 10) {
        return Math.ceil(number / 10) * 10;
      } else {
        return Math.ceil(number / 50) * 50;
      }
    } else if (number < 100) {
      return Math.ceil(number / 100) * 100;
    } else {
      const scale = Math.pow(10, Math.floor(Math.log10(number)) - 1);
      return Math.ceil(number / scale) * scale;
    }
  }
  const paddingsLR = 16
  const heightForX = 24 //in px
  const widthForItem = (chartRefWidth - paddingsLR) / data.length
  const widthOfBar = widthForItem * 0.5
  const heightForYBar = chartRefHeight - heightForX
  const barHeightPerPoint = chartRefHeight / roundToNiceValue(maxY)
  const calculateBarHeight = (value: number): number => value * barHeightPerPoint
  const calculateBarSpace = (value: number): number => heightForYBar - calculateBarHeight(value)
  return (
    <div className="chart" ref={chartRef} style={chartStyle}>
      <div className="chart__y" style={{padding: `0 ${paddingsLR}px`}}>
        {data.map((item) => (
          <div
            className="y__place"
            key={item.x}
            style={{height: heightForYBar, width:`${widthForItem}px`}}
          >
            <div className="y__bar">
              <div className="bar__num"
                   style={{
                     height: `${calculateBarSpace(item.y)}px`,
                     width: `${widthOfBar}px`,
                     backgroundColor: "transparent"
                   }}
              >{item.y}</div>
              <div
                className="bar"
                style={{
                  height: `${calculateBarHeight(item.y)}px`,
                  width: `${widthOfBar}px`,
                  backgroundColor: palette.freshGreen
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="chart__x" style={{padding: `0 ${paddingsLR}px`}}>
        {data.map((item) => (
          <div
            className={'x__item'}
            key={item.x}
            style={{width: `${widthForItem}px`}}
          >
            <div className={'fakeTable'}/>
            <div className="item" style={{color: theme.dashboard.grid.widget.color[currentTheme]}}>{item.x}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Chart
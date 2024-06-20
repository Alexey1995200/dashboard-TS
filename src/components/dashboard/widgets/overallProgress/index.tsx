import {ConfigProvider, Progress} from "antd";
import React, {useEffect, useRef, useState} from "react";
import './styles.scss';
import {strokeColor} from "../../const";
import {useTheme} from "../../../../context/themeProvider";
import {theme} from "../../../../assets/colors";
import {useData} from "../../../../context/dataContext";

const OverallProgress = () => {
  const [overallScale, setOverallScale] = useState(1)
  const [percentage, setPercentage] = useState(Math.random() * 100)
  const overallProgressRef = useRef<HTMLDivElement>(null);
  const {currentTheme} = useTheme()
  const {DBData} = useData()

  useEffect(() => {
    if (DBData)  {
      const totalPercentage = DBData.tasksProgress.reduce((accumulator, object) => {
          return accumulator + object.percentage;
        }, 0
      )
      const calculatePercentage: number = totalPercentage / DBData.tasksProgress.length
      setPercentage(calculatePercentage)
    }
  }, [DBData]);
  const getDimensions = () => {
    if (overallProgressRef.current) {
      const {width, height} = overallProgressRef.current.getBoundingClientRect();
      return [width, height]
    }
  };
  const handleResize = () => {
    const dimensions = getDimensions();
    if (!dimensions) return;
    const [width, height] = dimensions
    setOverallScale((Math.min(width, height) / 120));
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (overallProgressRef.current) {
      resizeObserver.observe(overallProgressRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div
      ref={overallProgressRef}
      className={'overallProgress'}
      style={{
        backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
        color: theme.dashboard.grid.widget.color[currentTheme],
      }}
    >
      <div className={'centered_title overallProgress__title dragHandle'}
           style={{transform: `scale(${overallScale > 1.25 ? overallScale / 1.25 : 1})`}}>Overall Progress
      </div>
      <ConfigProvider
        theme={{
          components: {
            Progress: {
              circleTextFontSize: '24',
              circleTextColor: theme.dashboard.grid.widget.color[currentTheme],
            },
          },
        }}
      >
        <Progress
          style={{transform: `scale(${overallScale > 1.25 ? overallScale / 1.25 : 1})`}}
          size={96}
          strokeWidth={12}
          type="dashboard"
          percent={Math.round(percentage)}
          gapDegree={180}
          strokeColor={strokeColor}
          className={'antProgOverall'}
        />
      </ConfigProvider>
    </div>
  );
};

export default OverallProgress;

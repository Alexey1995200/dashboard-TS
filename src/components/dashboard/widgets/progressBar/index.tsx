import {ConfigProvider, Progress} from "antd";
import './styles.scss'
import {waiting} from "../../../../assets/svg";
import {useEffect, useState} from "react";
import {strokeColor} from "../../const";
import {theme} from "../../../../assets/colors";
import {useTheme} from "../../../../context/themeProvider";
import {useData} from "../../../../context/dataContext";

interface ITasks {
  id: number;
  title: string;
  percentage: number;
}

const ProgressBar = () => {
  const [percentage, setPercentage] = useState<number>(0)
  const {currentTheme} = useTheme()
  const {DBData} = useData()
  useEffect(() => {
    if (DBData) {
      const totalPercentage = DBData.tasksProgress.reduce((accumulator, object) => {
          return accumulator + object.percentage;
        }, 0
      )
      const calculatePercentage: number = totalPercentage / DBData.tasksProgress.length
      if (Object.keys(DBData.tasksProgress).length) setPercentage(calculatePercentage)
    }
  }, [DBData]);
  return (
    <div
      className={'progressBar'}
      style={{
        color: theme.dashboard.grid.widget.color[currentTheme],
        backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
      }}
    >
      <Progress
        percent={percentage}
        strokeColor={strokeColor}
        showInfo={false}
        className={'progressBar__bar dragHandle'}
      />
      <div className={'progressBar__tasks'}>
        {DBData && DBData.tasksProgress.map((task: ITasks) => (
            <div
              className={'task'}
              key={`${task.id}`}>
              {task.title}
              {
                task.percentage === 100 ? (
                  <>
                    <div className={'circle'}>
                      <div className={'checked'}/>
                    </div>
                    <div>Completed</div>
                  </>
                ) : task.percentage === 0 ? (
                  <>
                    <img className={'waiting'} src={waiting} alt={'waiting'}/>
                    <div>Waiting</div>
                  </>
                ) : (
                  <ConfigProvider
                    theme={{
                      components: {
                        Progress: {
                          circleTextFontSize: '16px',
                          circleTextColor: theme.dashboard.grid.widget.color[currentTheme]
                        },
                      },
                    }}
                  > <Progress type="dashboard" percent={task.percentage} strokeColor={strokeColor}
                              strokeWidth={12} size={60} gapDegree={0.001}/>
                  </ConfigProvider>
                )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
export default ProgressBar
import './styles.scss'
import {getTime} from "date-fns";
import {useEffect, useRef, useState} from "react";
import {
  ILog,
  ILogs,
  LOG_DESCRIPTION_COMPONENTS_MAPPING,
  LOG_ICONS_MAPPING,
  LOG_TITLE_MAPPING
} from "./builderComponents";
import {useTheme} from "../../../../context/themeProvider";
import {theme} from "../../../../assets/colors";
import {useData} from "../../../../context/dataContext";
import {getDimensions} from "../../const";

const ProjectLogs = () => {
  const [isAllLogsShown, setIsAllLogsShown] = useState(false);
  const [logs, setLogs] = useState<ILog[]>([])
  const {currentTheme} = useTheme()
  const {DBData} = useData()
  const showAllLogs = () => {
    setIsAllLogsShown(!isAllLogsShown);
  };
  const shownLogs = isAllLogsShown ? logs : (logs && logs.slice(-3))

  useEffect(() => {
    if (DBData) setLogs(DBData.logs)
  }, [DBData]);
  const LogContentComponent = (logs: ILogs): string => {
    const logTextBuilder = LOG_DESCRIPTION_COMPONENTS_MAPPING[logs.log.type]
    return (
      logTextBuilder(logs)
    )
  }
  const daysLeft = (timestamp: number) => Math.floor((localtimestamp - timestamp) / (1000 * 60 * 60 * 24))
  const localDate = new Date();
  const localtimestamp = getTime(localDate)
  const [logBuilderScale, setLogBuilderScale] = useState(1)
  const logBuilderRef = useRef<HTMLDivElement>(null);
  const handleResize = () => {
    const [width, height] = getDimensions(logBuilderRef);
    setLogBuilderScale((Math.min(width, height) / 120));
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (logBuilderRef.current) {
      resizeObserver.observe(logBuilderRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div className={'logBuilder'} ref={logBuilderRef} style={{
      backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
      color: theme.dashboard.grid.widget.color[currentTheme]
    }}>
      <div className={'centered_title dragHandle'}
           style={{
             transform: `scale(${logBuilderScale > 1.25 ? logBuilderScale / 1.25 : 1})`,
             padding: `${logBuilderScale > 1.5 ? logBuilderScale * 8 / 1.5 : 0}px`
           }}
      >Project Logs
      </div>
      <div className={'logBuilder__body'}>
        {(logs === null || logs.length < 1 ) ?
          <div className={'goodNews'} style={{color: 'black'}}> Log is empty </div> :
          <div className={'logs__el'}>
            {shownLogs.map((log: ILog) => (
              <div className={'logs__el_wrapper'}
                   style={{
                     fontSize: `${logBuilderScale > 3 ? logBuilderScale * 8 / 2 : 12}px`
                   }}
                   key={log.recordNum}>
                <img
                  src={LOG_ICONS_MAPPING[log.type]}
                  className={'el__ico'}
                  alt={''}
                  style={{
                    backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
                    border: `2px solid ${theme.dashboard.grid.widget.BGColor[currentTheme]}`,
                  }}
                />
                <div className={'el__upper'}>
                  <div className={'el__title'}>
                    {LOG_TITLE_MAPPING[log.type]}
                  </div>
                  <div className={'el__days'}
                       style={{
                         fontSize: `${logBuilderScale > 3 ? logBuilderScale * 8 / 2 : 8}px`
                       }}>{daysLeft(log.date)} days
                  </div>
                </div>
                <div className={'el__text'}>
                  <p>
                    {LogContentComponent({log})}
                  </p>
                </div>
              </div>
            ))
            }
          </div>
        }
      </div>
      {(logs.length > 3) &&
          <div onClick={showAllLogs} className={'logs__button'}>
            {isAllLogsShown ? 'Show Last 3 Logs' : 'View All Logs'}
          </div>
      }
    </div>)
}
export default ProjectLogs
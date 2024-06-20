import './styles.scss'
import {finish} from "../../../../assets/svg";
import {useEffect, useRef, useState} from "react";
import {theme} from '../../../../assets/colors';
import {useTheme} from "../../../../context/themeProvider";
import {useData} from "../../../../context/dataContext";
import {getDimensions} from "../../const";

const LaunchDate = () => {
  const [launchDateScale, setLaunchDateScale] = useState<number>(1)
  const launchDateRef = useRef<HTMLDivElement>(null);
  const [finishDateTimeStampMS, setFinishDateTimeStampMS] = useState<number>(0)
  const [serverTimestamp, setServerTimestamp] = useState<number>(0)
  const {currentTheme} = useTheme()
  const {DBData} = useData()
  const handleResize = () => {
    const [width, height] = getDimensions(launchDateRef);
    setLaunchDateScale((Math.min(width, height) / 120));
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (launchDateRef.current) {
      resizeObserver.observe(launchDateRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (DBData) {
      setFinishDateTimeStampMS(DBData.finishProjectTimestampMS)
      setServerTimestamp(DBData.serverTimestampMS)
    }
  }, [DBData]);

  interface IOptions {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }

  const options: IOptions = {weekday: 'long', day: 'numeric', month: 'long',};
  const timeLeftMS = finishDateTimeStampMS - serverTimestamp
  const daysLeft = Math.floor(timeLeftMS / (1000 * 60 * 60 * 24));
  return <div className={'launchDate'}
              ref={launchDateRef}
              style={{
                backgroundColor: theme.dashboard.grid.widget.launchDate[currentTheme],
                color: theme.dashboard.grid.widget.color[currentTheme]
              }}>
    <div className={'launchDate__title centered_title dragHandle'}
         style={{transform: `scale(${launchDateScale > 1.25 ? launchDateScale / 1.25 : 1})`}}><p>Project</p>
      <p>Launch Date</p></div>
    <div className={'launchDate__body'}
         style={{transform: `scale(${launchDateScale > 1.25 ? launchDateScale / 1.25 : 1})`}}>
      <img src={finish} alt='🏁'/>
      <div className={'launchDate__timer'}>
        <div
          className={'launchDate__date'}>{new Date(finishDateTimeStampMS).toLocaleDateString(undefined, options)}</div>
        <div className={'launchDate__daysLeft'}>{daysLeft} Days</div>
      </div>
    </div>
  </div>
}
export default LaunchDate

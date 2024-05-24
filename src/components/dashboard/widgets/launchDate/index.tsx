import './styles.scss'
import {finish} from "../../../../assets/svg";
import {useEffect, useMemo, useRef, useState} from "react";
import {palette, theme} from '../../../../assets/colors';
import {IWidgetEl} from "../../interfaces";
import {display} from "../../const";

const LaunchDate = ({currentTheme, DBData, isDataLoading}: IWidgetEl) => {
    const [launchDateScale, setLaunchDateScale] = useState<number>(1)
    const launchDateRef = useRef<HTMLDivElement>(null);
    const [finishDateTimeStampMS, setFinishDateTimeStampMS] = useState<number>(0)
    const getDimensions = () => {
        if (launchDateRef.current) {
            const {width, height} = launchDateRef.current.getBoundingClientRect();
            return [width, height];
        }
        return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();
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
        if (DBData != null)
            setFinishDateTimeStampMS(DBData?.finishProjectTimestampMS)
    }, [DBData]);

    interface IOptions {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    const options: IOptions = {weekday: 'long', day: 'numeric', month: 'long',};
    const localDate = new Date();
    const timeLeftMS = finishDateTimeStampMS - localDate.getTime();
    const daysLeft = Math.floor(timeLeftMS / (1000 * 60 * 60 * 24));
    const themeFontColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black;
    }, [currentTheme]);
    const themeBackgroundColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.launchDate[currentTheme] : palette.white;
    }, [currentTheme]);
    const widgetComponent = <div className={'launchDate'}
                                 ref={launchDateRef}
                                 style={{backgroundColor: themeBackgroundColor, color: themeFontColor}}>
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
    return display(!!isDataLoading, !!DBData, widgetComponent, themeBackgroundColor, themeFontColor)
}
export default LaunchDate

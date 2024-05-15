import './styles.scss'
import {finish} from "../../../../assets/svg";
import {useEffect, useMemo, useRef, useState} from "react";
import {palette, theme} from '../../../../assets/colors';
import {IWidgetEl} from "../../interfaces";
const LaunchDate = ({currentTheme}: IWidgetEl) => {
    const [launchDateScale, setLaunchDateScale] = useState<number>(1)
    const launchDateRef = useRef<HTMLDivElement>(null);
    const [finishDate, setFinishDate] = useState<string>('0')
    const [finishDateTimeStampMS, setFinishDateTimeStampMS] = useState<number>(0)
    console.log(typeof finishDate)
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
        // fetch('/db/finDate')
        //     .then((response) => response.json())
        //     .then((response) => {
        //         setFinishDate(response.finishDate)
        //     })
        // fetch('/db/finTimestamp')
        //     .then((response) => response.json())
        //     .then((response) => {
        //         setFinishDateTimeStampMS(response.finishTimestampMS)
        //     })
        const resizeObserver = new ResizeObserver(handleResize);
        if (launchDateRef.current) {
            resizeObserver.observe(launchDateRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

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
    return (
        <div className={'launchDate'}
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
                        className={'launchDate__date'}>{new Date(finishDate).toLocaleDateString(undefined, options)}</div>
                    <div className={'launchDate__daysLeft'}>{daysLeft} Days</div>
                </div>
            </div>
        </div>
    )
}
export default LaunchDate

import {format} from "date-fns";
import './styles.scss'
import {useEffect, useMemo, useRef, useState} from "react";
import {finishTimestampMS} from "../../../../DB/db";
import {use} from "msw/lib/core/utils/internal/requestHandlerUtils";
import {IWidgetEl} from "../../interfaces";
import {palette, theme} from "../../../../assets/colors";

// const isProjectOnTime = () => {
//     if ((finishDate - new Date()) > 0) return true
// }
interface ISummaryElement {
    startDate: 'string',
    endDate: 'string',
    projectLeader: 'string',
    overallStatus: 'string',
}

const Summary = ({currentTheme}:IWidgetEl) => {
    const [summaryScale, setSummaryScale]=useState<number>(1)
    const summaryRef = useRef<HTMLDivElement>(null);
    const [summDB, setSummDB] =useState<ISummaryElement[]>([{
        startDate: 'string',
        endDate: 'string',
        projectLeader: 'string',
        overallStatus: 'string',
    }])
    const [finishTimestampMS, setFinishTimestampMS] = useState<number>(0)
    const getDimensions = () => {
        if (summaryRef.current) {
            const { width, height } = summaryRef.current.getBoundingClientRect();
            
            return [width, height];
        } return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();
        
        setSummaryScale((Math.min(width, height)/165));
    };
    const isProjectOnTime = ():boolean => (finishTimestampMS - new Date().getTime()) > 0;
    useEffect(() => {
        handleResize();
        fetch('/db/summDB')
            .then((response) => response.json())
            .then((response) => {
                setSummDB(response.summDB)
            })
        fetch('db/finTimestamp')
            .then((response) => response.json())
            .then((response) => {
                setFinishTimestampMS(response.finishTimestampMS)
            })
        const resizeObserver = new ResizeObserver(handleResize);
        if (summaryRef.current) {
            resizeObserver.observe(summaryRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    const themeFontColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black;
    }, [currentTheme]);
    const themeBackgroundColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.BGColor[currentTheme] : palette.white;
    }, [currentTheme]);
    return (
        <div className={'summary__wrapper'} ref={summaryRef} style={{backgroundColor:themeBackgroundColor, color:themeFontColor}}>
            <div className={'centered_title dragHandle'}
                 style={{
                     transform: `scale(${summaryScale > 1.25 ? summaryScale / 1.25 : 1})`,
                     paddingTop:`${summaryScale > 1.5 ? summaryScale*4/1.5 : 0}px`
            }}
            > Summary</div>
            <div className={'summary__table'} style={{fontSize: `${summaryScale > 1.25 ? 12 * summaryScale / 1.25 : 12}px`}}>
                <div className={'row'}>
                    <div>Start Date:</div>
                    <div>{summDB[0].startDate}</div>
                </div>
                <div className={'row'}>
                    <div>End Date:</div>
                    <div>{summDB[0].endDate}</div>
                </div>
                <div className={'row'}>
                    <div>project Leader:</div>
                    <div>{summDB[0].projectLeader}</div>
                </div>
                <div className={'row'}>
                    <div>Overall Status:</div>
                    <div className={`status__${isProjectOnTime() ? 'good' : 'bad'}`}>{summDB[0].overallStatus}</div>
                </div>
            </div>
        </div>
    )
}

export default Summary
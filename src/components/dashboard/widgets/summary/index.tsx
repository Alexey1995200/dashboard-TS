import './styles.scss'
import {useEffect, useRef, useState} from "react";
import {IWidgetEl} from "../../interfaces";
import {dateToDMY, isProjectOnTime} from "../../const";
interface ISummaryElement {
    startDate: number,
    endDate: number,
    projectLeader: string,
    overallStatus: boolean,
}
const Summary = ({themeFontColor, themeBackgroundColor, DBData}:IWidgetEl) => {
    const [summaryScale, setSummaryScale]=useState<number>(1)
    const summaryRef = useRef<HTMLDivElement>(null);
    const [summDB, setSummDB] =useState<ISummaryElement>({
        startDate: 0,
        endDate: 0,
        projectLeader: 'string',
        overallStatus: false,
    })
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
    useEffect(() => {
        handleResize();
        const resizeObserver = new ResizeObserver(handleResize);
        if (summaryRef.current) {
            resizeObserver.observe(summaryRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    useEffect(() => {
        if (DBData){
            setSummDB(
                {
                    startDate: DBData.startProjectTimestampMS,
                    endDate: DBData.finishProjectTimestampMS,
                    projectLeader:
                        Object.values(DBData.employees).filter(employee => employee.role === 'projectLeader')
                            .map(employee => employee.name)
                            .toString(),
                    overallStatus: isProjectOnTime(DBData.finishProjectTimestampMS),
                }
            )
        }
    }, [DBData]);
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
                    <div>{dateToDMY(summDB.startDate)}</div>
                </div>
                <div className={'row'}>
                    <div>End Date:</div>
                    <div>{dateToDMY(summDB.endDate)}</div>
                </div>
                <div className={'row'}>
                    <div>project Leader:</div>
                    <div>{summDB.projectLeader}</div>
                </div>
                <div className={'row'}>
                    <div>Overall Status:</div>
                    <div className={`status__${isProjectOnTime(summDB.endDate) ? 'good' : 'bad'}`}>{
                        summDB.overallStatus ? 'onTime' : 'overdue'}</div>
                </div>
            </div>
        </div>
    )
}

export default Summary
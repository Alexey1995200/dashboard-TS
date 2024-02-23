import './styles.scss'
import {finish} from "../../assets/svg";
import {useEffect, useRef, useState} from "react";
const LaunchDate = ({}) => {
    const [launchDateScale, setLaunchDateScale]=useState(1)
    const launchDateRef = useRef<HTMLDivElement>(null);
    const [finishDate, setFinishDate] = useState(new Date())
    const [finishDateTimeStampMS, setFinishDateTimeStampMS] = useState(new Date().getTime())
    const getDimensions = () => {
        if (launchDateRef.current) {
            const { width, height } = launchDateRef.current.getBoundingClientRect();
            
            return [width, height];
        } return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();
        
        setLaunchDateScale((Math.min(width, height)/120));
    };

    useEffect(() => {
        handleResize();
        fetch('/db/finDate')
            .then((response) => response.json())
            .then((response) => {
                setFinishDate(response.finishDate)
            })
        fetch('/db/finTimestamp')
            .then((response) => response.json())
            .then((response) => {
                setFinishDateTimeStampMS(response.finishTimestampMS)
            })
        const resizeObserver = new ResizeObserver(handleResize);
        if (launchDateRef.current) {
            resizeObserver.observe(launchDateRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    interface IOptions {
        weekday:'long',
        day:'numeric',
        month: 'long'
    }

    const options:IOptions = {weekday: 'long',day: 'numeric',month: 'long',};
    const localDate = new Date();
    const timeLeftMS = finishDateTimeStampMS - localDate.getTime();
    const daysLeft = Math.floor(timeLeftMS / (1000 * 60 * 60 * 24));
    return (
        <div className={'launchDate'} ref={launchDateRef}>
            <div className={'launchDate__title centered_title dragHandle'} style={{ transform: `scale(${launchDateScale > 1.25 ? launchDateScale/1.25 : 1})` }}><p>Project</p><p>Launch Date</p></div>
            <div className={'launchDate__body'} style={{ transform: `scale(${launchDateScale > 1.25 ? launchDateScale : 1})` }}>
                <img src={finish} alt='🏁'/>
                <div className={'launchDate__timer'}>
                    <div className={'launchDate__date'}>{new Date(finishDate).toLocaleDateString(undefined, options)}</div>
                    <div className={'launchDate__daysLeft'}>{daysLeft} Days</div>
                </div>
            </div>
        </div>
    )
}

export default LaunchDate

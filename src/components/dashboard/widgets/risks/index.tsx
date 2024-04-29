import './styles.scss'
import {useEffect, useRef, useState} from "react";
import {format} from "date-fns";
import {IWidgetEl} from "../../interfaces";
interface IOverTaskElement {
    task: string,
    deadline: string,
    days: number,
    employee: string,
    employeeId: number,
    employeeShort: string,
}
interface IRisks {
    id: number;
    num: number;
    description: string;
}
const Risks = ({themeFontColor, themeBackgroundColor}: IWidgetEl) => {
    const [risksScale, setRisksScale] = useState<number>(1)
    const risksRef = useRef<HTMLDivElement>(null);
    const [overTasks, setOverTasks] = useState<IOverTaskElement[]>([{
        task: 'status upd for board',
        deadline: format(new Date(32503676461000), "dd.MM.yyyy"),
        days: Math.floor((946681261001) / (1000 * 60 * 60 * 24)),
        employee: 'employee',
        employeeId: 0,
        employeeShort: 'emp'
    }])
    const [overPercent, setOverPercent] = useState(0)
    const getDimensions = () => {
        if (risksRef.current) {
            const {width, height} = risksRef.current.getBoundingClientRect();
            return [width, height];
        }
        return [0, 0];
    };
    const handleResize = () => {
        const [width, height] = getDimensions();
        setRisksScale((Math.min(width, height) / 165));
    };
    useEffect(() => {
        handleResize();
        fetch('/db/overdueDB/tasks')
            .then((response) => response.json())
            .then((response) => {
                setOverTasks(response.overTasks)
            })
        fetch('/db/budgetDB/overPercent')
            .then((response) => response.json())
            .then((response) => {
                setOverPercent(response.overBudgetPercent)
            })
        const resizeObserver = new ResizeObserver(handleResize);
        if (risksRef.current) {
            resizeObserver.observe(risksRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    const taskMedRisk = (overTasks.filter(task => task.days >= 7 && task.days <= 14)).length;
    const taskHiRisk = (overTasks.filter(task => task.days >= 14)).length;
    const risks: IRisks[] = [
        {
            id: 0,
            num: overPercent,
            description: 'Currently Over Target Budget'
        }, {
            id: 1,
            num: taskMedRisk,
            description: 'Overdue med.risk'
        }, {
            id: 2,
            num: taskHiRisk,
            description: 'Overdue hi.risk'
        },
    ]
    return (
        <div className={'risks__wrapper'} ref={risksRef} style={{backgroundColor:themeBackgroundColor, color:themeFontColor}}>
            <div className={'centered_title dragHandle'}
                style={{
                    transform: `scale(${risksScale > 1.25 ? risksScale / 1.25 : 1})`,
                    paddingTop: `${risksScale > 1.5 ? risksScale * 4 / 1.5 : 0}px`
                }}> Risks
            </div>
            <div className={'risks'}
                style={{fontSize: `${risksScale > 1.25 ? 12 * risksScale / 1.25 : 12}px`}}>
                {risks.every(risk => risk.num <= 0) ? <div className={'goodNews'}>all good</div> :
                    risks.map((risk) => (
                            <div key={risk.id}
                                 className={`risks__el ${risk.num > 0 ?
                                     (risk.id === 1 ? 'yellow' : (risk.id === 0 || risk.id === 2 ? 'red' : ''))
                                     : ''}`}
                            >
                                <div className={`risk__num ${risk.num > 0 ? '' : 'green'}`}
                                     style={{width: `${risksScale > 1.25 ? 36 * risksScale / 1.25 : 27.5}px`}}
                                >
                                    {risk.id === 0 ? `${Number(risk.num).toFixed(1)}%` : risk.num}
                                </div>
                                <div className={`risk__description`}>
                                    {risk.description}
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Risks
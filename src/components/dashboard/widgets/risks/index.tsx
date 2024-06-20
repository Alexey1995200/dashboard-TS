import './styles.scss'
import {useEffect, useRef, useState} from "react";
import {differenceInDaysWithToday, getDimensions} from "../../const";
import {ITask} from "../../../../DB/db";
import {theme} from "../../../../assets/colors";
import {useTheme} from "../../../../context/themeProvider";
import {useData} from "../../../../context/dataContext";

interface IRisks {
  id: number;
  num: number;
  description: string;
}

const Risks = () => {
  const [risksScale, setRisksScale] = useState<number>(1)
  const risksRef = useRef<HTMLDivElement>(null);
  const [overTasks, setOverTasks] = useState<ITask[]>()
  const [overBudgetPercent, setOverBudgetPercent] = useState(0)
  const {currentTheme} = useTheme()
  const {DBData} = useData()
  const handleResize = () => {
    const [width, height] = getDimensions(risksRef);
    setRisksScale((Math.min(width, height) / 165));
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (risksRef.current) {
      resizeObserver.observe(risksRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (DBData) {
      setOverTasks(Object.values(DBData.tasks))
      setOverBudgetPercent(+((DBData.budgetData[2].value) / (DBData.budgetData[1].value)).toFixed(2))
    }
  }, [DBData]);
  const taskMedRisk = () => {
    if (overTasks) {
      return (overTasks.filter(task =>
        differenceInDaysWithToday(task.deadline) >= 7 && differenceInDaysWithToday(task.deadline) <= 14)).length
    }
    return 0
  }
  const taskHiRisk = () => {
    if (overTasks) {
      return (overTasks.filter(task =>
        differenceInDaysWithToday(task.deadline) >= 14)).length
    }
    return 0
  }
  const risks: IRisks[] = [
    {
      id: 0,
      num: overBudgetPercent,
      description: 'Currently Over Target Budget'
    }, {
      id: 1,
      num: taskMedRisk(),
      description: 'Overdue med.risk'
    }, {
      id: 2,
      num: taskHiRisk(),
      description: 'Overdue hi.risk'
    },
  ]
  return (
    <div className={'risks__wrapper'} ref={risksRef}
         style={{
           color: theme.dashboard.grid.widget.color[currentTheme],
           backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
         }}>
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
              <div
                key={risk.id}
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
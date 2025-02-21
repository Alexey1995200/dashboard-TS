import './styles.scss'
import VictoryColumns from "./components/Columns_Victory";
import {useEffect, useRef, useState} from "react";
import {theme} from "../../../../assets/colors";
import {useTheme} from "../../../../context/themeProvider";
import {useData} from "../../../../context/dataContext";
import {getDimensions} from "../../const";

interface IBudjData {
  id: number;
  type: string;
  text: string;
  value: number;
  color: string
}

const Budget = () => {
  const [budgetScale, setBudgetScale] = useState(1)
  const [overBudgetPercent, setOverBudgetPercent] = useState(0)
  const [data, setData] = useState<IBudjData[]>([{
    id: 1,
    type: 'Type(title)',
    text: 'Title',
    value: 0,
    color: 'string'
  }, {
    id: 2,
    type: 'Type(title)',
    text: 'Title',
    value: 0,
    color: 'string'
  }])
  const budgetRef = useRef<HTMLDivElement>(null);
  const {DBData} = useData()
  const {currentTheme} = useTheme()
  const handleResize = () => {
    const [width, height] = getDimensions(budgetRef);
    setBudgetScale((Math.min(width, height) / 165));
  };
  useEffect(() => {
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (budgetRef.current) {
      resizeObserver.observe(budgetRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (DBData) setData(DBData.budgetData)
  }, [DBData]);
  useEffect(() => {
    if (DBData && data.length === 3) {
      setOverBudgetPercent(+((data[2].value) / (data[1].value)).toFixed(2))
    }
  }, [data]);

  if (data[0] && data[1] && data[2]) {
    return (
      <div className={'budget__wrapper'}
           ref={budgetRef}
           style={{
             backgroundColor: theme.dashboard.grid.widget.BGColor[currentTheme],
             color: theme.dashboard.grid.widget.color[currentTheme]
           }}
      >
        <h3 className={'centered_title dragHandle'}
            style={{
              transform: `scale(${budgetScale > 1.25 ? budgetScale / 1.5 : 1})`,
            }}
        >
          Project Budget
        </h3>
        <div className={'budget'}>
          <div className={'budget__columns dragHandle'}>
            <div className={'columns'}
                 style={{transform: `scale(${budgetScale > 1.25 ? budgetScale / 1.5 : 1})`}}>
              <VictoryColumns
                columnsData={data}
              />
            </div>
            <div className={'columns__categories'}>
              {data.map((column) => (
                  <div className={'column__category'}
                       key={column.id}
                       style={{fontSize: `${budgetScale > 1.25 ? 8 * budgetScale / 1.5 : 8}px`}}
                  >
                    <div
                      className={`category__color`}
                      content={''}
                      style={{backgroundColor: column.color}}
                    />
                    <div className={'category__title'}>{column.type}</div>
                  </div>
                )
              )
              }
            </div>
          </div>
          <div className={'budget__money'}
               style={{fontSize: `${budgetScale > 1.25 ? 12 * budgetScale / 1.25 : 12}px`}}>
            <div className={'block'}>
              <div>Total Budget</div>
              <div className={'bold'}>{data[0].value}</div>
            </div>
            <div className={'block'}>
              <div>Remaining</div>
              <div className={'bold'}>{(data[0].value) - (data[1].value)}</div>
            </div>
            <div className={'block'}>
              <div>Currently</div>
              <div className={'over'}>
                <div style={overBudgetPercent > 0 ? {color: 'red'} : {}} className={'bold'}>
                  {overBudgetPercent}%
                </div>
                <div style={{color: 'red'}}
                     className={'over__add'}>{(overBudgetPercent > 0) ? 'Over Target' : ''}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return <></>
}

export default Budget

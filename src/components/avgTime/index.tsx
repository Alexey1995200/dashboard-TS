import './styles.scss'
import {VictoryAxis, VictoryBar, VictoryChart, VictoryLabel} from 'victory';


const AvgTime = () => {
    const data = [
        {x: 'Georg', y: 5.3},
        {x: 'Kate', y: 4.5},
        {x: 'Nancy', y: 3.7},
        {x: 'Paula', y: 7.7},
        {x: 'Richard', y: 6.4}
    ];
    return (
        <div className={'avgTime__wrapper'}>
            <div className={'default_dashboard_title dragHandle'}
            >Avg Handle Time in days for Prjct-Task</div>
            {/*<div>*/}
                <div className={'bar'}>
                    <svg width={294} height={114}>
                        <VictoryBar
                            standalone={false}
                            width={294}
                            height={114}
                            padding={
                                {
                                    left: 20,
                                    right: 20,
                                    top:20,
                                    // bottom:20
                                }
                            }
                            data={data}
                            barWidth={36}
                            x="x"
                            y="y"
                            labels={({ datum }) => datum.y}
                            labelComponent={<VictoryLabel dy={-4} />}
                            style={{
                                data:
                                    {fill: "#45af6a"},
                                labels:{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                }

                            }}
                        />
                    </svg>
                </div>

                <div className={'users'}>
                    {data.map((data) => (
                            <div className={'user'} key={data.x + data.y}>
                                <div className={'fakeTable'} content={'123'}/>
                                <div className={'user__name'}>
                                    {data.x.length > 5 ? `${data.x.substring(0, 4)}...` : data.x}
                                </div>

                            </div>
                        )
                    )
                    }
                </div>
            {/*</div>*/}
        </div>
    )
}

export default AvgTime
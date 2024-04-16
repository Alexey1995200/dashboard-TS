import './styles.scss'
import {VictoryAxis, VictoryBar, VictoryChart, VictoryLabel} from 'victory';
import {palette, theme} from "../../../../assets/colors";
import {IWidgetEl} from "../../interfaces";
import {useMemo} from "react";

const data = [
    {x: 'Georg', y: 5.3},
    {x: 'Kate', y: 4.5},
    {x: 'Nancy', y: 3.7},
    {x: 'Paula', y: 7.7},
    {x: 'Richard', y: 6.4}
];
const AvgTime = ({currentTheme}:IWidgetEl) => {
    const themeFontColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.color[currentTheme] : palette.black;
    }, [currentTheme]);

    const themeBackgroundColor = useMemo(() => {
        return currentTheme ? theme.dashboard.grid.widget.BGColor[currentTheme] : palette.white;
    }, [currentTheme]);
    return (
        <div className={'avgTime__wrapper'}
            style={{
                color: themeFontColor,
                backgroundColor: themeBackgroundColor,
        }}
        >
            <div className={'centered_title dragHandle'}
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
                                }
                            }
                            data={data}
                            barWidth={36}
                            x="x"
                            y="y"
                            labels={({ datum }) => datum.y}
                            labelComponent={<VictoryLabel dy={-4} style={{ fontSize:'14px', backgroundColor:'red', fill:themeFontColor}}/>}
                            style={{
                                data:
                                    {fill: palette.freshGreen},
                                // labels:{
                                //     fontSize: '10px',
                                //     fontWeight: 700,
                                //     color: themeFontColor,
                                // }
                            }}
                        />
                    </svg>
                </div>

                <div className={'users'}>
                    {data.map((data) => (
                            <div className={'user'} key={data.x + data.y}>
                                <div className={'fakeTable'}/>
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
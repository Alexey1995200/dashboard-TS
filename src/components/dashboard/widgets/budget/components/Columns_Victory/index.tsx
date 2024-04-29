import {VictoryAxis, VictoryBar, VictoryChart} from "victory";
import React from "react";
import {IWidgetEl} from "../../../../interfaces";
interface IColumnData {
    id: number,
    type: string,
    text: string,
    value: number,
    color: string
}
interface IVictory {
    columnsData: IColumnData[]
}
type TVictoryColumns = IVictory & IWidgetEl
const VictoryColumns = ({columnsData}: TVictoryColumns) => {
    return (
        <div className={'vColumns'}>
            <div className={'vColumns__chart'}>
                <VictoryChart
                    domain={{x: [0, columnsData.length + 1]}}
                    height={170}
                    width={256}
                >
                    <VictoryAxis
                        tickValues={[]}
                        style={
                            {
                                axis: {stroke: "transparent"},
                                ticks: {stroke: "transparent"}
                            }
                        }
                    />
                    <VictoryAxis
                        tickValues={[0, 20000, 40000, 60000]}
                        dependentAxis
                        tickFormat={(x) => (`$${x / 1000}k`)}
                        style={
                            {
                                tickLabels: {fontSize: 10, fill: '#8f9190'},
                                axis: {stroke: "transparent"},
                                ticks: {stroke: "transparent"}
                            }
                        }
                    />
                    <VictoryBar
                        barWidth={24}
                        width={50}
                        height={50}
                        data={columnsData}
                        x="id"
                        y="value"
                        style={
                            {
                                data:
                                    {
                                        fill: ({datum}) =>
                                            datum.color
                                    },
                            }
                        }
                    />
                </VictoryChart>
            </div>
        </div>
    )
}


export default VictoryColumns
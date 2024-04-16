import {VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend} from "victory";
import React from "react";
import {palette} from "../../../../../../assets/colors";
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
                    // domainPadding={25}
                    domain={{x: [0, columnsData.length + 1]}}
                    // domainPadding={{x:[5,5],y:[5,5]}}
                    // domainPadding={{ x: 100 }}
                    height={170}
                    width={256}
                    // padding={{left: 56, top:0 , right: 0, bottom: 0}}
                >
                    <VictoryAxis
                        tickValues={[]}
                        style={
                            {
                                // axisLabel: {fontSize: 10, padding: 30},
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
                                // axisLabel: {fontSize: 10, padding: 30},
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
            {/*<div className={'vColumns__legend'}>*/}
            {/*    <VictoryLegend*/}
            {/*        // x={0} y={16}*/}
            {/*                   title="Legend"*/}
            {/*                   centerTitle*/}
            {/*                   orientation="vertical"*/}
            {/*                   gutter={20}*/}
            {/*                   style={{border: {stroke: "black"}, title: {fontSize: 20}}}*/}
            {/*                   // data={datum.text}*/}
            {/*                   colorScale={colors}*/}
            {/*    />*/}
            {/*</div>*/}


        </div>
    )
}


export default VictoryColumns